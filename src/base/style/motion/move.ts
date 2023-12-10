import type { CSSInterpolation } from '@/StyleContext'
import { Keyframes } from '@/StyleContext'
import type { AliasToken } from '../../theme/internal'
import type { TokenWithCommonCls } from '../../theme/util/genComponentStyleHook'
import { initMotion } from './motion'

export const moveDownIn = new Keyframes('ipassMoveDownIn', {
  '0%': {
    transform: 'translate3d(0, 100%, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },

  '100%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },
})

export const moveDownOut = new Keyframes('ipassMoveDownOut', {
  '0%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },

  '100%': {
    transform: 'translate3d(0, 100%, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },
})

export const moveLeftIn = new Keyframes('ipassMoveLeftIn', {
  '0%': {
    transform: 'translate3d(-100%, 0, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },

  '100%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },
})

export const moveLeftOut = new Keyframes('ipassMoveLeftOut', {
  '0%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },

  '100%': {
    transform: 'translate3d(-100%, 0, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },
})

export const moveRightIn = new Keyframes('ipassMoveRightIn', {
  '0%': {
    transform: 'translate3d(100%, 0, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },

  '100%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },
})

export const moveRightOut = new Keyframes('ipassMoveRightOut', {
  '0%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },

  '100%': {
    transform: 'translate3d(100%, 0, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },
})

export const moveUpIn = new Keyframes('ipassMoveUpIn', {
  '0%': {
    transform: 'translate3d(0, -100%, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },

  '100%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },
})

export const moveUpOut = new Keyframes('ipassMoveUpOut', {
  '0%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },

  '100%': {
    transform: 'translate3d(0, -100%, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },
})

type MoveMotionTypes = 'move-up' | 'move-down' | 'move-left' | 'move-right'
const moveMotion: Record<MoveMotionTypes, { inKeyframes: Keyframes; outKeyframes: Keyframes }> = {
  'move-up': {
    inKeyframes: moveUpIn,
    outKeyframes: moveUpOut,
  },
  'move-down': {
    inKeyframes: moveDownIn,
    outKeyframes: moveDownOut,
  },
  'move-left': {
    inKeyframes: moveLeftIn,
    outKeyframes: moveLeftOut,
  },
  'move-right': {
    inKeyframes: moveRightIn,
    outKeyframes: moveRightOut,
  },
}

export const initMoveMotion = (
  token: TokenWithCommonCls<AliasToken>,
  motionName: MoveMotionTypes,
): CSSInterpolation => {
  const { ipassCls } = token
  const motionCls = `${ipassCls}-${motionName}`
  const { inKeyframes, outKeyframes } = moveMotion[motionName]

  return [
    initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid),
    {
      [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
        opacity: 0,
        animationTimingFunction: token.motionEaseOutCirc,
      },

      [`${motionCls}-leave`]: {
        animationTimingFunction: token.motionEaseInOutCirc,
      },
    },
  ]
}
