import type { GenerateStyle, ProAliasToken } from '@/providers'
import { useStyle as useIpassStyle } from '@/providers'

export interface DrawerFormToken extends ProAliasToken {
  componentCls: string
}

const genDrawerFormStyle: GenerateStyle<DrawerFormToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-sidebar-dragger': {
        width: '5px',
        cursor: 'ew-resize',
        padding: '4px 0 0',
        borderTop: '1px solid transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'transparent',
        '&-min-disabled': {
          cursor: 'w-resize',
        },
        '&-max-disabled': {
          cursor: 'e-resize',
        },
      },
    },
  }
}

export function useStyle(prefixCls: string) {
  return useIpassStyle('DrawerForm', (token) => {
    const drawerFormToken: DrawerFormToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    }

    return [genDrawerFormStyle(drawerFormToken)]
  })
}
