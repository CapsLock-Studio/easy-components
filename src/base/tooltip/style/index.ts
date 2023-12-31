import { resetComponent } from '../../style'
import { initZoomMotion } from '../../style/motion'
import getArrowStyle, { MAX_VERTICAL_CONTENT_RADIUS } from '../../style/placementArrow'
import type { FullToken, GenerateStyle, UseComponentStyleResult } from '../../theme/internal'
import { genComponentStyleHook, genPresetColor, mergeToken } from '../../theme/internal'

export interface ComponentToken {
  /**
   * @desc 文字提示 z-index
   * @descEN z-index of tooltip
   */
  zIndexPopup: number
  /** @deprecated */
  colorBgDefault: string
}

interface TooltipToken extends FullToken<'Tooltip'> {
  // default variables
  tooltipMaxWidth: number
  tooltipColor: string
  tooltipBg: string
  tooltipBorderRadius: number
  tooltipRadiusOuter: number
}

const genTooltipStyle: GenerateStyle<TooltipToken> = (token) => {
  const {
    componentCls, // ipass-tooltip
    tooltipMaxWidth,
    tooltipColor,
    tooltipBg,
    tooltipBorderRadius,
    zIndexPopup,
    controlHeight,
    boxShadowSecondary,
    paddingSM,
    paddingXS,
    tooltipRadiusOuter,
  } = token

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        position: 'absolute',
        zIndex: zIndexPopup,
        display: 'block',
        width: 'max-content',
        maxWidth: tooltipMaxWidth,
        visibility: 'visible',
        transformOrigin: `var(--arrow-x, 50%) var(--arrow-y, 50%)`,
        '&-hidden': {
          display: 'none',
        },

        '--ipass-arrow-background-color': tooltipBg,

        // Wrapper for the tooltip content
        [`${componentCls}-inner`]: {
          minWidth: controlHeight,
          minHeight: controlHeight,
          padding: `${paddingSM / 2}px ${paddingXS}px`,
          color: tooltipColor,
          textAlign: 'start',
          textDecoration: 'none',
          wordWrap: 'break-word',
          backgroundColor: tooltipBg,
          borderRadius: tooltipBorderRadius,
          boxShadow: boxShadowSecondary,
          boxSizing: 'border-box',
        },

        // Limit left and right placement radius
        [[
          `&-placement-left`,
          `&-placement-leftTop`,
          `&-placement-leftBottom`,
          `&-placement-right`,
          `&-placement-rightTop`,
          `&-placement-rightBottom`,
        ].join(',')]: {
          [`${componentCls}-inner`]: {
            borderRadius: Math.min(tooltipBorderRadius, MAX_VERTICAL_CONTENT_RADIUS),
          },
        },

        [`${componentCls}-content`]: {
          position: 'relative',
        },

        // generator for preset color
        ...genPresetColor(token, (colorKey, { darkColor }) => ({
          [`&${componentCls}-${colorKey}`]: {
            [`${componentCls}-inner`]: {
              backgroundColor: darkColor,
            },
            [`${componentCls}-arrow`]: {
              '--ipass-arrow-background-color': darkColor,
            },
          },
        })),
      },
    },

    // Arrow Style
    getArrowStyle<TooltipToken>(
      mergeToken<TooltipToken>(token, {
        borderRadiusOuter: tooltipRadiusOuter,
      }),
      {
        colorBg: 'var(--ipass-arrow-background-color)',
        contentRadius: tooltipBorderRadius,
        limitVerticalRadius: true,
      },
    ),

    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: 'relative',
        maxWidth: 'none',
        margin: token.sizePopupArrow,
      },
    },
  ]
}

// ============================== Export ==============================
export default (prefixCls: string, injectStyle: boolean): UseComponentStyleResult => {
  const useOriginHook = genComponentStyleHook(
    'Tooltip',
    (token) => {
      // Popover use Tooltip as internal component. We do not need to handle this.
      if (injectStyle === false) {
        return []
      }

      const { borderRadius, colorTextLightSolid, colorBgDefault, borderRadiusOuter } = token

      const TooltipToken = mergeToken<TooltipToken>(token, {
        // default variables
        tooltipMaxWidth: 250,
        tooltipColor: colorTextLightSolid,
        tooltipBorderRadius: borderRadius,
        tooltipBg: colorBgDefault,
        tooltipRadiusOuter: borderRadiusOuter > 4 ? 4 : borderRadiusOuter,
      })

      return [genTooltipStyle(TooltipToken), initZoomMotion(token, 'zoom-big-fast')]
    },
    ({ zIndexPopupBase, colorBgSpotlight }) => ({
      zIndexPopup: zIndexPopupBase + 70,
      colorBgDefault: colorBgSpotlight,
    }),
    {
      resetStyle: false,
    },
  )

  return useOriginHook(prefixCls)
}
