﻿import type { GenerateStyle, ProAliasToken } from '@/providers'
import { useStyle as useIpassStyle } from '@/providers'

export interface ProToken extends ProAliasToken {
  componentCls: string
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      width: 'auto',
      '&-title': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '32px',
      },
      '&-overlay': {
        [`${token.ipassCls}-popover-inner-content`]: {
          width: '200px',
          paddingBlock: 0,
          paddingInline: 0,
          paddingBlockEnd: 8,
        },
        [`${token.ipassCls}-tree-node-content-wrapper:hover`]: {
          backgroundColor: 'transparent',
        },
        [`${token.ipassCls}-tree-draggable-icon`]: { cursor: 'grab' },
        [`${token.ipassCls}-tree-treenode`]: {
          alignItems: 'center',
          '&:hover': {
            [`${token.componentCls}-list-item-option`]: {
              display: 'block',
            },
          },
          [`${token.ipassCls}-tree-checkbox`]: {
            marginInlineEnd: '4px',
          },
          [`${token.ipassCls}-tree-title`]: {
            width: '100%',
          },
        },
      },
    },
    [`${token.componentCls}-action-rest-button`]: {
      color: token.colorPrimary,
    },
    [`${token.componentCls}-list`]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingBlockStart: 8,
      [`&${token.componentCls}-list-group`]: {
        paddingBlockStart: 0,
      },
      '&-title': {
        marginBlockStart: '6px',
        marginBlockEnd: '6px',
        paddingInlineStart: '24px',
        color: token.colorTextSecondary,
        fontSize: '12px',
      },

      '&-item': {
        display: 'flex',
        alignItems: 'center',
        maxHeight: 24,
        justifyContent: 'space-between',
        '&-title': {
          flex: 1,
          maxWidth: 80,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-all',
          whiteSpace: 'nowrap',
        },
        '&-option': {
          display: 'none',
          float: 'right',
          cursor: 'pointer',
          '> span': {
            '> span.muiicon': {
              color: token.colorPrimary,
            },
          },
          '> span + span': {
            marginInlineStart: 4,
          },
        },
      },
    },
  }
}

export function useStyle(prefixCls: string) {
  return useIpassStyle('ColumnSetting', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    }

    return [genProStyle(proToken)]
  })
}
