﻿import type { GenerateStyle, ProAliasToken } from '@/providers'
import { useStyle as useIpassStyle } from '@/providers'

export interface ProLayoutHeaderToken extends ProAliasToken {
  componentCls: string
}

const genProLayoutHeaderStyle: GenerateStyle<ProLayoutHeaderToken> = (
  token,
) => {
  return {
    [`${token.proComponentsCls}-layout`]: {
      [`${token.ipassCls}-layout-header${token.componentCls}`]: {
        height: token.layout?.header?.heightLayoutHeader || 56,
        lineHeight: `${token.layout?.header?.heightLayoutHeader || 56}px`,
        // hitu 用了這個屬性，不能刪除
        zIndex: 19,
        width: '100%',
        paddingBlock: 0,
        paddingInline: 0,
        borderBlockEnd: `1px solid ${token.colorSplit}`,
        backgroundColor:
          token.layout?.header?.colorBgHeader || 'rgba(255, 255, 255, 0.4)',
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
        transition:
          'background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
        '&-fixed-header': {
          position: 'fixed',
          insetBlockStart: 0,
          width: '100%',
          zIndex: 100,
          insetInlineEnd: 0,
        },
        '&-fixed-header-scroll': {
          backgroundColor:
            token.layout?.header?.colorBgScrollHeader ||
            'rgba(255, 255, 255, 0.8)',
        },
        '&-header-actions': {
          display: 'flex',
          alignItems: 'center',
          fontSize: '16',
          cursor: 'pointer',
          '& &-item': {
            paddingBlock: 0,
            paddingInline: 8,
            '&:hover': {
              color: token.colorText,
            },
          },
        },
        '&-header-realDark': { boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 65%)' },
        '&-header-actions-header-action': {
          transition: 'width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
        },
      },
    },
  }
}

export function useStyle(prefixCls: string) {
  return useIpassStyle('ProLayoutHeader', (token) => {
    const ProLayoutHeaderToken: ProLayoutHeaderToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    }
    return [genProLayoutHeaderStyle(ProLayoutHeaderToken)]
  })
}
