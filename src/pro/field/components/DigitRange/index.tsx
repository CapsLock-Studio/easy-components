import useMergedState from 'rc-util/lib/hooks/useMergedState'
import React from 'react'
import { useIntl } from 'react-intl'

import { proTheme } from '@/providers'
import { Input, InputNumber, Space } from '@/base'
import type { ProFieldFC } from '../../index'

export type Value = string | number | undefined | null

export type ValuePair = Value[]

export type FieldDigitRangeProps = {
  text: ValuePair
  placeholder?: string | string[]
  separator?: string
  separatorWidth?: number
}

/**
 * 數字範圍元件
 *
 * @param FieldDigitRangeProps
 */
const FieldDigitRange: ProFieldFC<FieldDigitRangeProps> = (
  {
    text,
    mode: type,
    render,
    placeholder,
    renderFormItem,
    fieldProps,
    separator = '~',
    separatorWidth = 30,
  },
  ref,
) => {
  const { value, defaultValue, onChange, id } = fieldProps
  const intl = useIntl()

  const { token } = proTheme.useToken()
  const [valuePair, setValuePair] = useMergedState(() => defaultValue, {
    value: value,
    onChange: onChange,
  })

  if (type === 'read') {
    const getContent = (number: Value) => {
      const digit = new Intl.NumberFormat(undefined, {
        minimumSignificantDigits: 2,
        ...(fieldProps?.intlProps || {}),
      }).format(Number(number) as number)

      return fieldProps?.formatter?.(digit) || digit
    }
    const dom = (
      <span ref={ref}>
        {getContent(text[0])} {separator} {getContent(text[1])}
      </span>
    )
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom)
    }
    return dom
  }

  if (type === 'edit' || type === 'update') {
    const handleGroupBlur = () => {
      if (Array.isArray(valuePair)) {
        //   僅在兩個值均為數字時才做比較並轉換
        const [value0, value1] = valuePair
        if (
          typeof value0 === 'number' &&
          typeof value1 === 'number' &&
          value0 > value1
        ) {
          setValuePair([value1, value0])
        } else if (value0 === undefined && value1 === undefined) {
          // 當兩個值均為undefined時將值變為undefined，方便required處理
          setValuePair(undefined)
        }
      }
    }

    const handleChange = (index: number, changedValue: Value) => {
      const newValuePair = [...(valuePair || [])]
      newValuePair[index] = changedValue === null ? undefined : changedValue
      setValuePair(newValuePair)
    }
    const placeholderValue = fieldProps?.placeholder ||
      placeholder || [
        intl.formatMessage({ id: 'tableForm.inputPlaceholder', defaultMessage: '請輸入' }),
        intl.formatMessage({ id: 'tableForm.inputPlaceholder', defaultMessage: '請輸入' }),
      ]

    const getInputNumberPlaceholder = (index: number) =>
      Array.isArray(placeholderValue)
        ? placeholderValue[index]
        : placeholderValue

    const Compact = Space.Compact || Input.Group
    const compactProps = !!Space.Compact ? {} : { compact: true }
    const dom = (
      <Compact {...compactProps} onBlur={handleGroupBlur}>
        <InputNumber<number>
          {...fieldProps}
          placeholder={getInputNumberPlaceholder(0)}
          id={id ?? `${id}-0`}
          style={{ width: `calc((100% - ${separatorWidth}px) / 2)` }}
          value={valuePair?.[0]}
          defaultValue={defaultValue?.[0]}
          onChange={(changedValue) => handleChange(0, changedValue)}
        />
        <Input
          style={{
            width: separatorWidth,
            textAlign: 'center',
            borderInlineStart: 0,
            borderInlineEnd: 0,
            pointerEvents: 'none',
            backgroundColor: token?.colorBgContainer,
          }}
          placeholder={separator}
          disabled
        />
        <InputNumber<number>
          {...fieldProps}
          placeholder={getInputNumberPlaceholder(1)}
          id={id ?? `${id}-1`}
          style={{
            width: `calc((100% - ${separatorWidth}px) / 2)`,
            borderInlineStart: 0,
          }}
          value={valuePair?.[1]}
          defaultValue={defaultValue?.[1]}
          onChange={(changedValue) => handleChange(1, changedValue)}
        />
      </Compact>
    )
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom)
    }
    return dom
  }
  return null
}

export default React.forwardRef(FieldDigitRange)
