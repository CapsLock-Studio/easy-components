import React, { useContext, useImperativeHandle, useRef } from 'react'
import { useIntl } from 'react-intl'
import classNames from 'classnames'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { ConfigProvider } from '@/components/base'
import type { SizeType } from '@/components/base/Config/SizeContext'
import { useStyle } from './style'

export type FieldLabelProps = {
  label?: React.ReactNode
  value?: any
  disabled?: boolean
  onClear?: () => void
  size?: SizeType
  ellipsis?: boolean
  placeholder?: React.ReactNode
  className?: string
  formatter?: (value: any) => React.ReactNode
  style?: React.CSSProperties
  bordered?: boolean
  allowClear?: boolean
  downIcon?: React.ReactNode | false
  onClick?: () => void
  /**
   * 點擊標籤的事件，用來喚醒 down menu 狀態
   */
  onLabelClick?: () => void
}

const FieldLabelFunction: React.ForwardRefRenderFunction<
  any,
  FieldLabelProps
> = (props, ref) => {
  const {
    label,
    onClear,
    value,
    disabled,
    onLabelClick,
    ellipsis,
    placeholder,
    className,
    formatter,
    bordered,
    style,
    downIcon,
    allowClear = true,
  } = props
  const { componentSize } = ConfigProvider?.useConfig?.() || {
    componentSize: 'middle',
  }
  const size = componentSize
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext)
  const prefixCls = getPrefixCls('pro-core-field-label')
  const { wrapSSR, hashId } = useStyle(prefixCls)
  const intl = useIntl()
  const clearRef = useRef<SVGSVGElement>(null)
  const labelRef = useRef<HTMLElement>(null)

  useImperativeHandle(ref, () => ({
    labelRef,
    clearRef,
  }))

  const wrapElements = (
    array: (string | JSX.Element)[],
  ): JSX.Element[] | string => {
    if (array.every((item) => typeof item === 'string')) return array.join(',')

    return array.map((item, index) => {
      const comma = index === array.length - 1 ? '' : ','
      if (typeof item === 'string') {
        return (
          <span key={index}>
            {item}
            {comma}
          </span>
        )
      }
      return (
        <span key={index} style={{ display: 'flex' }}>
          {item}
          {comma}
        </span>
      )
    })
  }

  const formatterText = (aValue: any) => {
    if (formatter) {
      return formatter(aValue)
    }
    return Array.isArray(aValue) ? wrapElements(aValue) : aValue
  }

  const getTextByValue = (
    aLabel?: React.ReactNode | React.ReactNode[],
    aValue?: string | string[],
  ): React.ReactNode => {
    if (
      aValue !== undefined &&
      aValue !== null &&
      aValue !== '' &&
      (!Array.isArray(aValue) || aValue.length)
    ) {
      const prefix = aLabel ? (
        <span
          onClick={() => {
            onLabelClick?.()
          }}
          className={`${prefixCls}-text`}
        >
          {aLabel}
          {': '}
        </span>
      ) : (
        ''
      )
      const str = formatterText(aValue)
      if (!ellipsis) {
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {prefix}
            {formatterText(aValue)}
          </span>
        )
      }
      // 普通表單值最大長度41，如2022-06-21 20:11:25 ~ 2022-06-22 20:11:25
      const VALUE_MAX_LENGTH = 41
      const getText = () => {
        const isArrayValue = Array.isArray(aValue) && aValue.length > 1
        const unitText = intl.formatMessage({ id: 'form.lightFilter.itemUnit', defaultMessage: '項' })
        if (
          typeof str === 'string' &&
          str.length > VALUE_MAX_LENGTH &&
          isArrayValue
        ) {
          return `...${aValue.length}${unitText}`
        }
        return ''
      }
      const tail = getText()

      return (
        <span
          title={typeof str === 'string' ? str : undefined}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {prefix}
          <span style={{ paddingInlineStart: 4, display: 'flex' }}>
            {typeof str === 'string'
              ? str?.toString()?.substr?.(0, VALUE_MAX_LENGTH)
              : str}
          </span>
          {tail}
        </span>
      )
    }
    return aLabel || placeholder
  }
  return wrapSSR(
    <span
      className={classNames(
        prefixCls,
        hashId,
        `${prefixCls}-${props.size ?? size ?? 'middle'}`,
        {
          [`${prefixCls}-active`]: !!value || value === 0,
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-bordered`]: bordered,
          [`${prefixCls}-allow-clear`]: allowClear,
        },
        className,
      )}
      style={style}
      ref={labelRef}
      onClick={() => {
        props?.onClick?.()
      }}
    >
      {getTextByValue(label, value)}
      {(value || value === 0) && allowClear && (
        <CloseIcon
          role="button"
          className={classNames(
            `${prefixCls}-icon`,
            hashId,
            `${prefixCls}-close`,
          )}
          onClick={(e) => {
            if (!disabled) onClear?.()
            e.stopPropagation()
          }}
          ref={clearRef}
        />
      )}
      {downIcon !== false
        ? downIcon ?? (
          <ExpandMoreIcon
            className={classNames(
              `${prefixCls}-icon`,
              hashId,
              `${prefixCls}-arrow`,
            )}
          />
        )
        : null}
    </span>,
  )
}

export const FieldLabel = React.forwardRef(FieldLabelFunction)
