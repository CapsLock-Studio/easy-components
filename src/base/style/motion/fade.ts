import type { CSSInterpolation } from '@/StyleContext'
import { Keyframes } from '@/StyleContext'
import type { AliasToken } from '../../theme/internal'
import type { TokenWithCommonCls } from '../../theme/util/genComponentStyleHook'
import { initMotion } from './motion'

export const fadeIn = new Keyframes('ipassFadeIn', {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
})

export const fadeOut = new Keyframes('ipassFadeOut', {
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
})

export const initFadeMotion = (
  token: TokenWithCommonCls<AliasToken>,
  sameLevel = false,
): CSSInterpolation => {
  const { ipassCls } = token
  const motionCls = `${ipassCls}-fade`
  const sameLevelPrefix = sameLevel ? '&' : ''

  return [
    initMotion(motionCls, fadeIn, fadeOut, token.motionDurationMid, sameLevel),
    {
      [`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
        opacity: 0,
        animationTimingFunction: 'linear',
      },

      [`${sameLevelPrefix}${motionCls}-leave`]: {
        animationTimingFunction: 'linear',
      },
    },
  ]
}
