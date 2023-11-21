﻿import { Table } from '@/base'
import type { TableColumnType, TableProps } from '@/base'
import { proFieldParsingValueEnumToArray } from '@/pro/field'
import type { ProFieldEmptyText } from '@/pro/field'
import type { ContainerType } from '../Store/Provide'
import type { ProColumns } from '../typing'
import type {
  ProSchemaComponentTypes,
} from '../../utils'
import {
  omitBoolean,
  omitUndefinedAndEmptyArr,
  runFunction,
} from '../../utils'
import {
  columnRender,
  defaultOnFilter,
  renderColumnsTitle,
} from './columnRender'
import { genColumnKey } from './index'

type ColumnToColumnReturnType<T> = (TableColumnType<T> & {
  index?: number
  isExtraColumns?: boolean
  extraColumn?: typeof Table.EXPAND_COLUMN
})[]

type ColumnToColumnParams<T> = {
  columns: ProColumns<T, any>[]
  counter: ReturnType<ContainerType>
  columnEmptyText: ProFieldEmptyText
  type: ProSchemaComponentTypes
} & Pick<TableProps<T>, 'rowKey' | 'childrenColumnName'>

/**
 * 轉化 columns 到 pro 的格式 主要是 render 方法的自行實現
 *
 * @param columns
 * @param map
 * @param columnEmptyText
 */
export function genProColumnToColumn<T>(
  params: ColumnToColumnParams<T> & { marginSM: number },
  parents?: ProColumns<T, any>,
): ColumnToColumnReturnType<T> {
  const {
    columns,
    counter,
    columnEmptyText,
    type,
    marginSM,
    rowKey = 'id',
    childrenColumnName = 'children',
  } = params

  const subNameRecord = new Map()

  return columns
    ?.map((columnProps, columnsIndex) => {
      if (columnProps === Table.EXPAND_COLUMN) return columnProps
      const {
        key,
        dataIndex,
        valueEnum,
        valueType = 'text',
        children,
        onFilter,
        filters = [],
      } = columnProps as ProColumns<T, any>
      const columnKey = genColumnKey(
        key || dataIndex?.toString(),
        [parents?.key, columnsIndex].filter(Boolean).join('-'),
      )
      // 這些都沒有，說明是普通的表格不需要 pro 管理
      const noNeedPro = !valueEnum && !valueType && !children
      if (noNeedPro) {
        return {
          index: columnsIndex,
          ...columnProps,
        }
      }

      /**
       * 是不是展開行和多選按鈕
       */
      const isExtraColumns =
        columnProps === Table.EXPAND_COLUMN

      if (isExtraColumns) {
        return {
          index: columnsIndex,
          isExtraColumns: true,
          hideInSearch: true,
          hideInTable: false,
          hideInForm: true,
          hideInSetting: true,
          extraColumn: columnProps,
        }
      }
      const config = counter.columnsMap[columnKey] || {
        fixed: columnProps.fixed,
      }

      const genOnFilter = () => {
        if (onFilter === true) {
          return (value: string, row: T) =>
            defaultOnFilter(value, row, dataIndex as string[])
        }
        return omitBoolean(onFilter)
      }

      let keyName: string | number | symbol = rowKey as string

      const tempColumns = {
        index: columnsIndex,
        key: columnKey,
        ...columnProps,
        title: renderColumnsTitle(columnProps),
        valueEnum,
        filters:
          filters === true
            ? proFieldParsingValueEnumToArray(
              runFunction<[undefined]>(valueEnum, undefined),
            ).filter((valueItem) => valueItem && valueItem.value !== 'all')
            : filters,
        onFilter: genOnFilter(),
        fixed: config.fixed,
        width: columnProps.width || (columnProps.fixed ? 200 : undefined),
        children: (columnProps as ProColumns<T, any>).children
          ? genProColumnToColumn(
            {
              ...params,
              columns: (columnProps as ProColumns<T, any>)?.children || [],
            },
            { ...columnProps, key: columnKey } as ProColumns<T, any>,
          )
          : undefined,
        render: (text: any, rowData: T, index: number) => {
          if (typeof rowKey === 'function') {
            keyName = rowKey(rowData, index) as string
          }

          let uniqueKey: any
          if (
            typeof rowData === 'object' &&
            rowData !== null &&
            Reflect.has(rowData as any, keyName)
          ) {
            // @ts-ignore
            uniqueKey = rowData[keyName]
            const parentInfo = subNameRecord.get(uniqueKey) || []
            // @ts-ignore
            rowData[childrenColumnName]?.forEach((item: any) => {
              const itemUniqueKey = item[keyName]
              if (!subNameRecord.has(itemUniqueKey)) {
                subNameRecord.set(
                  itemUniqueKey,
                  parentInfo.concat([index, childrenColumnName]),
                )
              }
            })
          }

          const renderProps = {
            columnProps,
            text,
            rowData,
            index,
            columnEmptyText,
            counter,
            type,
            marginSM,
            subName: subNameRecord.get(uniqueKey),
          }
          return columnRender<T>(renderProps)
        },
      }
      return omitUndefinedAndEmptyArr(tempColumns)
    })
    ?.filter((item) => !item.hideInTable) as unknown as (TableColumnType<T> & {
      index?: number
      isExtraColumns?: boolean
      extraColumn?: typeof Table.EXPAND_COLUMN
    })[]
}
