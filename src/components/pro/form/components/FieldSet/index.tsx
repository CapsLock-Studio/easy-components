﻿import type { FormItemProps, SpaceProps } from '@/components/base'
import { Input, Space } from '@/components/base'
import type { GroupProps } from '@/components/base/input'
import { useRefFunction } from '../../../utils'
import toArray from 'rc-util/lib/Children/toArray'
import React, { useCallback, useImperativeHandle, useMemo } from 'react'
import { createField } from '../../BaseForm/createField'
import { useGridHelpers } from '../../helpers'
import type { ProFormItemProps } from '../FormItem'

export type ProFormFieldSetProps<T = any> = {
  value?: T[]
  onChange?: (value: T[]) => void
  space?: SpaceProps | GroupProps
  valuePropName?: string
  type?: 'space' | 'group'
  fieldProps?: any
  convertValue?: ProFormItemProps['convertValue']
  transform?: ProFormItemProps['transform']
  children?: React.ReactNode
}

const FieldSetType = {
  space: Space,
  group: Input.Group,
}

export function defaultGetValueFromEvent(valuePropName: string, ...args: any) {
  const event = args[0]
  if (event && event.target && valuePropName in event.target) {
    return event.target[valuePropName]
  }
  return event
}

const FieldSet: React.FC<ProFormFieldSetProps> = ({
  children,
  value = [],
  valuePropName,
  onChange,
  fieldProps,
  space,
  type = 'space',
  transform,
  convertValue,
  ...rest
}) => {
  /**
   * 使用方法的引用防止閉包
   *
   * @param fileValue
   * @param index
   */
  const fieldSetOnChange = useRefFunction((fileValue: any, index: number) => {
    const newValues = [...value]
    newValues[index] = defaultGetValueFromEvent(
      valuePropName || 'value',
      fileValue,
    )

    onChange?.(newValues)
    fieldProps?.onChange?.(newValues)
  })

  let itemIndex = -1
  const list = toArray(children).map((item: any) => {
    if (React.isValidElement(item)) {
      itemIndex += 1
      const index = itemIndex
      const isProFromItem =
        // @ts-ignore
        item?.type?.displayName === 'ProFormComponent' || item?.props?.readonly
      const forkProps = isProFromItem
        ? {
          key: index,
          ignoreFormItem: true,
          ...((item.props as any) || {}),
          // 如果不是我們自訂的元件 fieldProps 無法識別
          fieldProps: {
            ...(item?.props as any)?.fieldProps,
            onChange: (...restParams: any) => {
              fieldSetOnChange(restParams[0], index)
            },
          },
          value: value?.[index],
          onChange: undefined,
        }
        : {
          key: index,
          ...((item.props as any) || {}),
          value: value?.[index],
          onChange: (itemValue: any) => {
            fieldSetOnChange(itemValue, index);
            (item as any).props.onChange?.(itemValue)
          },
        }
      return React.cloneElement(item, forkProps)
    }
    return item
  })
  const Components = FieldSetType[type] as React.FC<SpaceProps>

  const { RowWrapper } = useGridHelpers(rest)

  /** Input.Group 需要設定 compact */
  const typeProps = useMemo(
    () => ({ ...(type === 'group' ? { compact: true } : {}) }),
    [type],
  )

  const Wrapper: React.FC = useCallback(
    ({ children: dom }: { children?: React.ReactNode }) => (
      <Components {...typeProps} {...(space as SpaceProps)} align="start" wrap>
        {dom}
      </Components>
    ),
    [Components, space, typeProps],
  )

  return <RowWrapper Wrapper={Wrapper}>{list}</RowWrapper>
}

const BaseProFormFieldSet: React.FC<FormItemProps & ProFormFieldSetProps> =
  React.forwardRef(({ children, space, valuePropName, ...rest }, ref) => {
    useImperativeHandle(ref, () => ({}))
    return (
      <FieldSet
        space={space}
        valuePropName={valuePropName}
        {...rest.fieldProps}
        // 把 fieldProps 裡的重設掉
        onChange={undefined}
        {...rest}
      >
        {children}
      </FieldSet>
    )
  })

const ProFormFieldSet = createField<FormItemProps & ProFormFieldSetProps>(
  BaseProFormFieldSet,
) as typeof BaseProFormFieldSet

export default ProFormFieldSet
