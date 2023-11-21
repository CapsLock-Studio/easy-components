﻿import type { CSSProperties } from 'react'
import { useContext, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import AddIcon from '@mui/icons-material/Add'
import LoadingButton from '@mui/lab/LoadingButton'

import { ProProvider } from '@/providers'
import { nanoid, runFunction } from '../../../utils'
import { EditOrReadOnlyContext } from '../../BaseForm/EditOrReadOnlyContext'
import type { ProFormListItemProps } from './ListItem'
import { ProFormListItem } from './ListItem'

const ProFormListContainer: React.FC<ProFormListItemProps> = (props) => {
  const intl = useIntl()
  const {
    prefixCls,
    children,
    creatorRecord,
    action,
    fields,
    actionGuard,
    max,
    fieldExtraRender,
    meta,
    containerClassName,
    containerStyle,
    onAfterAdd,
    onAfterRemove,
  } = props
  const { hashId } = useContext(ProProvider)
  const fieldKeyMap = useRef(new Map<string, string>())
  const [loading, setLoading] = useState(false)

  const uuidFields = useMemo(() => {
    return fields.map((field) => {
      if (!fieldKeyMap.current?.has(field.key.toString())) {
        fieldKeyMap.current?.set(field.key.toString(), nanoid())
      }
      const uuid = fieldKeyMap.current?.get(field.key.toString())
      return {
        ...field,
        uuid,
      }
    })
  }, [fields])

  /**
   * 根據行為守衛包裝action函數
   */
  const wrapperAction = useMemo(() => {
    const wrapAction = { ...action }
    const count = uuidFields.length

    if (actionGuard?.beforeAddRow) {
      wrapAction.add = async (...rest) => {
        const success = await actionGuard.beforeAddRow!(...rest, count)
        if (success) {
          const res = action.add(...rest)
          onAfterAdd?.(...rest, count + 1)
          return res
        }
        return false
      }
    } else {
      wrapAction.add = async (...rest) => {
        const res = action.add(...rest)
        onAfterAdd?.(...rest, count + 1)
        return res
      }
    }

    if (actionGuard?.beforeRemoveRow) {
      wrapAction.remove = async (...rest) => {
        const success = await actionGuard.beforeRemoveRow!(...rest, count)
        if (success) {
          const res = action.remove(...rest)
          onAfterRemove?.(...rest, count - 1)
          return res
        }
        return false
      }
    } else {
      wrapAction.remove = async (...rest) => {
        const res = action.remove(...rest)
        onAfterRemove?.(...rest, count - 1)
        return res
      }
    }

    return wrapAction
  }, [
    action,
    actionGuard?.beforeAddRow,
    actionGuard?.beforeRemoveRow,
    onAfterAdd,
    onAfterRemove,
    uuidFields.length,
  ])

  const creatorButton = useMemo(() => {
    if (uuidFields.length === max) return null
    const position = 'bottom'
    const creatorButtonText = intl.formatMessage({
      id: 'editableTable.action.add',
      defaultMessage: '新增一行資料',
    })
    return (
      <LoadingButton
        className={`${prefixCls}-creator-button-${position} ${hashId || ''
          }`.trim()}
        loading={loading}
        startIcon={<AddIcon />}
        onClick={async () => {
          setLoading(true)
          // 如果不是從最上面開始新增，則插入的索引為當前行數
          let index = uuidFields.length
          await wrapperAction.add(runFunction(creatorRecord) || {}, index)
          setLoading(false)
        }}
      >
        {creatorButtonText}
      </LoadingButton>
    )
  }, [
    uuidFields.length,
    max,
    intl,
    prefixCls,
    hashId,
    loading,
    wrapperAction,
    creatorRecord,
  ])
  const readOnlyContext = useContext(EditOrReadOnlyContext)

  const defaultStyle: CSSProperties = {
    width: 'max-content',
    maxWidth: '100%',
    minWidth: '100%',
    ...containerStyle,
  }

  const itemList = useMemo(() => {
    return uuidFields.map((field, index) => {
      return (
        <ProFormListItem
          {...props}
          key={field.uuid}
          field={field}
          index={index}
          action={wrapperAction}
          count={uuidFields.length}
        >
          {children}
        </ProFormListItem>
      )
    })
  }, [children, props, uuidFields, wrapperAction])

  if (readOnlyContext.mode === 'read' || props.readonly === true) {
    return <>{itemList}</>
  }

  return (
    <div style={defaultStyle} className={containerClassName}>
      {itemList}
      {fieldExtraRender && fieldExtraRender(wrapperAction, meta)}
      {creatorButton}
    </div>
  )
}

export { ProFormListContainer }
