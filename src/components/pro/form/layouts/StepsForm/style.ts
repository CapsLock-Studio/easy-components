﻿import type { GenerateStyle, ProAliasToken } from '@/providers'
import { useStyle as useIpassStyle } from '@/providers'

export interface StepsFormToken extends ProAliasToken {
  componentCls: string
}

const genStepsFormStyle: GenerateStyle<StepsFormToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-container': {
        width: 'max-content',
        minWidth: '420px',
        maxWidth: '100%',
        margin: 'auto',
      },
      '&-steps-container': {
        maxWidth: '1160px',
        margin: 'auto',
        [`${token.ipassCls}-steps-vertical`]: { height: '100%' },
      },
      '&-step': {
        display: 'none',
        marginBlockStart: '32px',
        '&-active': {
          display: 'block',
        },
        '> form': { maxWidth: '100%' },
      },
    },
  }
}

export function useStyle(prefixCls: string) {
  return useIpassStyle('StepsForm', (token) => {
    const loginFormToken: StepsFormToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    }

    return [genStepsFormStyle(loginFormToken)]
  })
}
