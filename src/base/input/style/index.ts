import type { CSSObject } from '@/StyleContext'
import { clearFix, resetComponent } from '../../style'
import { genCompactItemStyle } from '../../style/compact-item'
import type { GlobalToken } from '../../theme/interface'
import type { FullToken, GenerateStyle } from '../../theme/internal'
import { genComponentStyleHook, mergeToken } from '../../theme/internal'

export interface SharedComponentToken {
  /**
   * @desc 輸入框橫向內邊距
   * @descEN Horizontal padding of input
   */
  paddingInline: number
  /**
   * @desc 小號輸入框橫向內邊距
   * @descEN Horizontal padding of small input
   */
  paddingInlineSM: number
  /**
   * @desc 大號輸入框橫向內邊距
   * @descEN Horizontal padding of large input
   */
  paddingInlineLG: number
  /**
   * @desc 輸入框縱向內邊距
   * @descEN Vertical padding of input
   */
  paddingBlock: number
  /**
   * @desc 小號輸入框縱向內邊距
   * @descEN Vertical padding of small input
   */
  paddingBlockSM: number
  /**
   * @desc 大號輸入框縱向內邊距
   * @descEN Vertical padding of large input
   */
  paddingBlockLG: number
  /**
   * @desc 前/後置標籤背景色
   * @descEN Background color of addon
   */
  addonBg: string
  /**
   * @desc 懸浮態邊框色
   * @descEN Hover border color
   */
  hoverBorderColor: string
  /**
   * @desc 激活態邊框色
   * @descEN Active border color
   */
  activeBorderColor: string
  /**
   * @desc 激活態陰影
   * @descEN Box-shadow when active
   */
  activeShadow: string
  /**
   * @desc 錯誤狀態時激活態陰影
   * @descEN Box-shadow when active in error status
   */
  errorActiveShadow: string
  /**
   * @desc 警告狀態時激活態陰影
   * @descEN Box-shadow when active in warning status
   */
  warningActiveShadow: string
}

export interface ComponentToken extends SharedComponentToken { }

export interface SharedInputToken {
  inputAffixPadding: number
}

interface InputToken extends FullToken<'Input'>, SharedInputToken { }

export const genPlaceholderStyle = (color: string): CSSObject => ({
  // Firefox
  '&::-moz-placeholder': {
    opacity: 1,
  },
  '&::placeholder': {
    color,
    userSelect: 'none',
  },
  '&:placeholder-shown': {
    textOverflow: 'ellipsis',
  },
})

export const genHoverStyle = (token: InputToken): CSSObject => ({
  borderColor: token.hoverBorderColor,
})

export const genActiveStyle = (token: InputToken) => ({
  borderColor: token.activeBorderColor,
  boxShadow: token.activeShadow,
  outline: 0,
})

export const genDisabledStyle = (token: InputToken): CSSObject => ({
  color: token.colorTextDisabled,
  backgroundColor: token.colorBgContainerDisabled,
  borderColor: token.colorBorder,
  boxShadow: 'none',
  cursor: 'not-allowed',
  opacity: 1,

  '&:hover': {
    ...genHoverStyle(mergeToken<InputToken>(token, { hoverBorderColor: token.colorBorder })),
  },
})

const genInputLargeStyle = (token: InputToken): CSSObject => {
  const { paddingBlockLG, fontSizeLG, lineHeightLG, borderRadiusLG, paddingInlineLG } = token

  return {
    padding: `${paddingBlockLG}px ${paddingInlineLG}px`,
    fontSize: fontSizeLG,
    lineHeight: lineHeightLG,
    borderRadius: borderRadiusLG,
  }
}

export const genInputSmallStyle = (token: InputToken): CSSObject => ({
  padding: `${token.paddingBlockSM}px ${token.paddingInlineSM}px`,
  borderRadius: token.borderRadiusSM,
})

export const genStatusStyle = (token: InputToken, parentCls: string): CSSObject => {
  const {
    componentCls,
    colorError,
    colorWarning,
    errorActiveShadow,
    warningActiveShadow,
    colorErrorBorderHover,
    colorWarningBorderHover,
  } = token

  return {
    [`&-status-error:not(${parentCls}-disabled):not(${parentCls}-borderless)${parentCls}`]: {
      borderColor: colorError,

      '&:hover': {
        borderColor: colorErrorBorderHover,
      },

      '&:focus, &-focused': {
        ...genActiveStyle(
          mergeToken<InputToken>(token, {
            activeBorderColor: colorError,
            activeShadow: errorActiveShadow,
          }),
        ),
      },

      [`${componentCls}-prefix, ${componentCls}-suffix`]: {
        color: colorError,
      },
    },
    [`&-status-warning:not(${parentCls}-disabled):not(${parentCls}-borderless)${parentCls}`]: {
      borderColor: colorWarning,

      '&:hover': {
        borderColor: colorWarningBorderHover,
      },

      '&:focus, &-focused': {
        ...genActiveStyle(
          mergeToken<InputToken>(token, {
            activeBorderColor: colorWarning,
            activeShadow: warningActiveShadow,
          }),
        ),
      },

      [`${componentCls}-prefix, ${componentCls}-suffix`]: {
        color: colorWarning,
      },
    },
  }
}

export const genBasicInputStyle = (token: InputToken): CSSObject => ({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  minWidth: 0,
  padding: `${token.paddingBlock}px ${token.paddingInline}px`,
  color: token.colorText,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  backgroundColor: token.colorBgContainer,
  backgroundImage: 'none',
  borderWidth: token.lineWidth,
  borderStyle: token.lineType,
  borderColor: token.colorBorder,
  borderRadius: token.borderRadius,
  transition: `all ${token.motionDurationMid}`,
  ...genPlaceholderStyle(token.colorTextPlaceholder),

  '&:hover': {
    ...genHoverStyle(token),
  },

  '&:focus, &-focused': {
    ...genActiveStyle(token),
  },

  '&-disabled, &[disabled]': {
    ...genDisabledStyle(token),
  },

  '&-borderless': {
    '&, &:hover, &:focus, &-focused, &-disabled, &[disabled]': {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
  },

  // Reset height for `textarea`s
  'textarea&': {
    maxWidth: '100%', // prevent textarea resize from coming out of its container
    height: 'auto',
    minHeight: token.controlHeight,
    lineHeight: token.lineHeight,
    verticalAlign: 'bottom',
    transition: `all ${token.motionDurationSlow}, height 0s`,
    resize: 'vertical',
  },

  // Size
  '&-lg': {
    ...genInputLargeStyle(token),
  },
  '&-sm': {
    ...genInputSmallStyle(token),
  },
})

export const genInputGroupStyle = (token: InputToken): CSSObject => {
  const { componentCls, ipassCls } = token

  return {
    position: 'relative',
    display: 'table',
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,

    // Undo padding and float of grid classes
    [`&[class*='col-']`]: {
      paddingInlineEnd: token.paddingXS,

      '&:last-child': {
        paddingInlineEnd: 0,
      },
    },

    // Sizing options
    [`&-lg ${componentCls}, &-lg > ${componentCls}-group-addon`]: {
      ...genInputLargeStyle(token),
    },

    [`&-sm ${componentCls}, &-sm > ${componentCls}-group-addon`]: {
      ...genInputSmallStyle(token),
    },

    [`&-lg ${ipassCls}-select-single ${ipassCls}-select-selector`]: {
      height: token.controlHeightLG,
    },

    [`&-sm ${ipassCls}-select-single ${ipassCls}-select-selector`]: {
      height: token.controlHeightSM,
    },

    [`> ${componentCls}`]: {
      display: 'table-cell',

      '&:not(:first-child):not(:last-child)': {
        borderRadius: 0,
      },
    },

    [`${componentCls}-group`]: {
      [`&-addon, &-wrap`]: {
        display: 'table-cell',
        width: 1,
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',

        '&:not(:first-child):not(:last-child)': {
          borderRadius: 0,
        },
      },

      '&-wrap > *': {
        display: 'block !important',
      },

      '&-addon': {
        position: 'relative',
        padding: `0 ${token.paddingInline}px`,
        color: token.colorText,
        fontWeight: 'normal',
        fontSize: token.fontSize,
        textAlign: 'center',
        backgroundColor: token.colorFillAlter,
        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
        borderRadius: token.borderRadius,
        transition: `all ${token.motionDurationSlow}`,
        lineHeight: 1,

        // Reset Select's style in addon
        [`${ipassCls}-select`]: {
          margin: `-${token.paddingBlock + 1}px -${token.paddingInline}px`,

          [`&${ipassCls}-select-single:not(${ipassCls}-select-customize-input):not(${ipassCls}-pagination-size-changer)`]:
          {
            [`${ipassCls}-select-selector`]: {
              backgroundColor: 'inherit',
              border: `${token.lineWidth}px ${token.lineType} transparent`,
              boxShadow: 'none',
            },
          },

          '&-open, &-focused': {
            [`${ipassCls}-select-selector`]: {
              color: token.colorPrimary,
            },
          },
        },

        [`${ipassCls}-cascader-picker`]: {
          margin: `-9px -${token.paddingInline}px`,
          backgroundColor: 'transparent',
          [`${ipassCls}-cascader-input`]: {
            textAlign: 'start',
            border: 0,
            boxShadow: 'none',
          },
        },
      },

      '&-addon:first-child': {
        borderInlineEnd: 0,
      },

      '&-addon:last-child': {
        borderInlineStart: 0,
      },
    },

    [`${componentCls}`]: {
      width: '100%',
      marginBottom: 0,
      textAlign: 'inherit',

      '&:focus': {
        zIndex: 1, // Fix https://gw.alipayobjects.com/zos/rmsportal/DHNpoqfMXSfrSnlZvhsJ.png
        borderInlineEndWidth: 1,
      },

      '&:hover': {
        zIndex: 1,
        borderInlineEndWidth: 1,

        [`${componentCls}-search-with-button &`]: {
          zIndex: 0,
        },
      },
    },

    // Reset rounded corners
    [`> ${componentCls}:first-child, ${componentCls}-group-addon:first-child`]: {
      borderStartEndRadius: 0,
      borderEndEndRadius: 0,

      // Reset Select's style in addon
      [`${ipassCls}-select ${ipassCls}-select-selector`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
    },

    [`> ${componentCls}-affix-wrapper`]: {
      [`&:not(:first-child) ${componentCls}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
      },

      [`&:not(:last-child) ${componentCls}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
    },

    [`> ${componentCls}:last-child, ${componentCls}-group-addon:last-child`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,

      // Reset Select's style in addon
      [`${ipassCls}-select ${ipassCls}-select-selector`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
      },
    },

    [`${componentCls}-affix-wrapper`]: {
      '&:not(:last-child)': {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
        [`${componentCls}-search &`]: {
          borderStartStartRadius: token.borderRadius,
          borderEndStartRadius: token.borderRadius,
        },
      },

      [`&:not(:first-child), ${componentCls}-search &:not(:first-child)`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
      },
    },

    [`&${componentCls}-group-compact`]: {
      display: 'block',
      ...clearFix(),

      [`${componentCls}-group-addon, ${componentCls}-group-wrap, > ${componentCls}`]: {
        '&:not(:first-child):not(:last-child)': {
          borderInlineEndWidth: token.lineWidth,

          '&:hover': {
            zIndex: 1,
          },

          '&:focus': {
            zIndex: 1,
          },
        },
      },

      '& > *': {
        display: 'inline-block',
        float: 'none',
        verticalAlign: 'top',
        borderRadius: 0,
      },

      [`
        & > ${componentCls}-affix-wrapper,
        & > ${componentCls}-number-affix-wrapper,
        & > ${ipassCls}-picker-range
      `]: {
        display: 'inline-flex',
      },

      '& > *:not(:last-child)': {
        marginInlineEnd: -token.lineWidth,
        borderInlineEndWidth: token.lineWidth,
      },

      // Undo float for .ant-input-group .ant-input
      [`${componentCls}`]: {
        float: 'none',
      },

      // reset border for Select, DatePicker, AutoComplete, Cascader, Mention, TimePicker, Input
      [`& > ${ipassCls}-select > ${ipassCls}-select-selector,
      & > ${ipassCls}-select-auto-complete ${componentCls},
      & > ${ipassCls}-cascader-picker ${componentCls},
      & > ${componentCls}-group-wrapper ${componentCls}`]: {
        borderInlineEndWidth: token.lineWidth,
        borderRadius: 0,

        '&:hover': {
          zIndex: 1,
        },

        '&:focus': {
          zIndex: 1,
        },
      },

      [`& > ${ipassCls}-select-focused`]: {
        zIndex: 1,
      },

      // update z-index for arrow icon
      [`& > ${ipassCls}-select > ${ipassCls}-select-arrow`]: {
        zIndex: 1,
      },

      [`& > *:first-child,
      & > ${ipassCls}-select:first-child > ${ipassCls}-select-selector,
      & > ${ipassCls}-select-auto-complete:first-child ${componentCls},
      & > ${ipassCls}-cascader-picker:first-child ${componentCls}`]: {
        borderStartStartRadius: token.borderRadius,
        borderEndStartRadius: token.borderRadius,
      },

      [`& > *:last-child,
      & > ${ipassCls}-select:last-child > ${ipassCls}-select-selector,
      & > ${ipassCls}-cascader-picker:last-child ${componentCls},
      & > ${ipassCls}-cascader-picker-focused:last-child ${componentCls}`]: {
        borderInlineEndWidth: token.lineWidth,
        borderStartEndRadius: token.borderRadius,
        borderEndEndRadius: token.borderRadius,
      },

      [`& > ${ipassCls}-select-auto-complete ${componentCls}`]: {
        verticalAlign: 'top',
      },

      [`${componentCls}-group-wrapper + ${componentCls}-group-wrapper`]: {
        marginInlineStart: -token.lineWidth,
        [`${componentCls}-affix-wrapper`]: {
          borderRadius: 0,
        },
      },

      [`${componentCls}-group-wrapper:not(:last-child)`]: {
        [`&${componentCls}-search > ${componentCls}-group`]: {
          [`& > ${componentCls}-group-addon > ${componentCls}-search-button`]: {
            borderRadius: 0,
          },

          [`& > ${componentCls}`]: {
            borderStartStartRadius: token.borderRadius,
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,
            borderEndStartRadius: token.borderRadius,
          },
        },
      },
    },
  }
}

const genInputStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const { componentCls, controlHeightSM, lineWidth } = token

  const FIXED_CHROME_COLOR_HEIGHT = 16
  const colorSmallPadding = (controlHeightSM - lineWidth * 2 - FIXED_CHROME_COLOR_HEIGHT) / 2

  return {
    [componentCls]: {
      ...resetComponent(token),
      ...genBasicInputStyle(token),
      ...genStatusStyle(token, componentCls),

      '&[type="color"]': {
        height: token.controlHeight,

        [`&${componentCls}-lg`]: {
          height: token.controlHeightLG,
        },
        [`&${componentCls}-sm`]: {
          height: controlHeightSM,
          paddingTop: colorSmallPadding,
          paddingBottom: colorSmallPadding,
        },
      },

      '&[type="search"]::-webkit-search-cancel-button, &[type="search"]::-webkit-search-decoration':
      {
        '-webkit-appearance': 'none',
      },
    },
  }
}

const genAllowClearStyle = (token: InputToken): CSSObject => {
  const { componentCls } = token
  return {
    // ========================= Input =========================
    [`${componentCls}-clear-icon`]: {
      lineHeight: 0,
      margin: 0,
      color: token.colorTextQuaternary,
      fontSize: token.fontSizeIcon,
      // https://codesandbox.io/s/wizardly-sun-u10br
      cursor: 'pointer',
      transition: `color ${token.motionDurationSlow}`,

      '&:hover': {
        color: token.colorTextTertiary,
      },

      '&:active': {
        color: token.colorText,
      },

      '&-hidden': {
        visibility: 'hidden',
      },

      '&-has-suffix': {
        margin: `0 ${token.inputAffixPadding}px`,
      },
    },
  }
}

const genAffixStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const {
    componentCls,
    inputAffixPadding,
    colorTextDescription,
    motionDurationSlow,
    colorIcon,
    colorIconHover,
    iconCls,
  } = token

  return {
    [`${componentCls}-affix-wrapper`]: {
      ...genBasicInputStyle(token),
      display: 'inline-flex',

      [`&:not(${componentCls}-affix-wrapper-disabled):hover`]: {
        ...genHoverStyle(token),
        zIndex: 1,
        [`${componentCls}-search-with-button &`]: {
          zIndex: 0,
        },
      },

      '&-focused, &:focus': {
        zIndex: 1,
      },

      '&-disabled': {
        [`${componentCls}[disabled]`]: {
          background: 'transparent',
        },
      },

      [`> input${componentCls}`]: {
        padding: 0,
        fontSize: 'inherit',
        border: 'none',
        borderRadius: 0,
        outline: 'none',

        '&::-ms-reveal': {
          display: 'none',
        },

        '&:focus': {
          boxShadow: 'none !important',
        },
      },

      '&::before': {
        display: 'inline-block',
        width: 0,
        visibility: 'hidden',
        content: '"\\a0"',
      },

      [`${componentCls}`]: {
        '&-prefix, &-suffix': {
          display: 'flex',
          flex: 'none',
          alignItems: 'center',

          '> *:not(:last-child)': {
            marginInlineEnd: token.paddingXS,
          },
        },

        '&-show-count-suffix': {
          color: colorTextDescription,
        },

        '&-show-count-has-suffix': {
          marginInlineEnd: token.paddingXXS,
        },

        '&-prefix': {
          marginInlineEnd: inputAffixPadding,
        },

        '&-suffix': {
          marginInlineStart: inputAffixPadding,
        },
      },

      ...genAllowClearStyle(token),

      // Password
      [`${iconCls}${componentCls}-password-icon`]: {
        color: colorIcon,
        cursor: 'pointer',
        transition: `all ${motionDurationSlow}`,

        '&:hover': {
          color: colorIconHover,
        },
      },

      // status
      ...genStatusStyle(token, `${componentCls}-affix-wrapper`),
    },
  }
}

const genGroupStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const { componentCls, colorError, colorWarning, borderRadiusLG, borderRadiusSM } = token

  return {
    [`${componentCls}-group`]: {
      // Style for input-group: input with label, with button or dropdown...
      ...resetComponent(token),
      ...genInputGroupStyle(token),

      '&-wrapper': {
        display: 'inline-block',
        width: '100%',
        textAlign: 'start',
        verticalAlign: 'top',

        // Size
        '&-lg': {
          [`${componentCls}-group-addon`]: {
            borderRadius: borderRadiusLG,
            fontSize: token.fontSizeLG,
          },
        },
        '&-sm': {
          [`${componentCls}-group-addon`]: {
            borderRadius: borderRadiusSM,
          },
        },

        // Status
        '&-status-error': {
          [`${componentCls}-group-addon`]: {
            color: colorError,
            borderColor: colorError,
          },
        },
        '&-status-warning': {
          [`${componentCls}-group-addon`]: {
            color: colorWarning,
            borderColor: colorWarning,
          },
        },

        '&-disabled': {
          [`${componentCls}-group-addon`]: {
            ...genDisabledStyle(token),
          },
        },

        // Fix the issue of using icons in Space Compact mode
        [`&:not(${componentCls}-compact-first-item):not(${componentCls}-compact-last-item)${componentCls}-compact-item`]:
        {
          [`${componentCls}, ${componentCls}-group-addon`]: {
            borderRadius: 0,
          },
        },

        [`&:not(${componentCls}-compact-last-item)${componentCls}-compact-first-item`]: {
          [`${componentCls}, ${componentCls}-group-addon`]: {
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,
          },
        },

        [`&:not(${componentCls}-compact-first-item)${componentCls}-compact-last-item`]: {
          [`${componentCls}, ${componentCls}-group-addon`]: {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0,
          },
        },
      },
    },
  }
}

const genSearchInputStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const { componentCls, ipassCls } = token
  const searchPrefixCls = `${componentCls}-search`
  return {
    [searchPrefixCls]: {
      [`${componentCls}`]: {
        '&:hover, &:focus': {
          borderColor: token.colorPrimaryHover,

          [`+ ${componentCls}-group-addon ${searchPrefixCls}-button:not(${ipassCls}-btn-primary)`]: {
            borderInlineStartColor: token.colorPrimaryHover,
          },
        },
      },

      [`${componentCls}-affix-wrapper`]: {
        borderRadius: 0,
      },

      // fix slight height diff in Firefox:
      [`${componentCls}-lg`]: {
        lineHeight: token.lineHeightLG - 0.0002,
      },

      [`> ${componentCls}-group`]: {
        [`> ${componentCls}-group-addon:last-child`]: {
          insetInlineStart: -1,
          padding: 0,
          border: 0,

          [`${searchPrefixCls}-button`]: {
            paddingTop: 0,
            paddingBottom: 0,
            borderStartStartRadius: 0,
            borderStartEndRadius: token.borderRadius,
            borderEndEndRadius: token.borderRadius,
            borderEndStartRadius: 0,
            boxShadow: 'none',
          },

          [`${searchPrefixCls}-button:not(${ipassCls}-btn-primary)`]: {
            color: token.colorTextDescription,

            '&:hover': {
              color: token.colorPrimaryHover,
            },

            '&:active': {
              color: token.colorPrimaryActive,
            },

            [`&${ipassCls}-btn-loading::before`]: {
              insetInlineStart: 0,
              insetInlineEnd: 0,
              insetBlockStart: 0,
              insetBlockEnd: 0,
            },
          },
        },
      },

      [`${searchPrefixCls}-button`]: {
        height: token.controlHeight,

        '&:hover, &:focus': {
          zIndex: 1,
        },
      },

      [`&-large ${searchPrefixCls}-button`]: {
        height: token.controlHeightLG,
      },

      [`&-small ${searchPrefixCls}-button`]: {
        height: token.controlHeightSM,
      },

      // ===================== Compact Item Customized Styles =====================
      [`&${componentCls}-compact-item`]: {
        [`&:not(${componentCls}-compact-last-item)`]: {
          [`${componentCls}-group-addon`]: {
            [`${componentCls}-search-button`]: {
              marginInlineEnd: -token.lineWidth,
              borderRadius: 0,
            },
          },
        },

        [`&:not(${componentCls}-compact-first-item)`]: {
          [`${componentCls},${componentCls}-affix-wrapper`]: {
            borderRadius: 0,
          },
        },

        [`> ${componentCls}-group-addon ${componentCls}-search-button,
        > ${componentCls},
        ${componentCls}-affix-wrapper`]: {
          '&:hover,&:focus,&:active': {
            zIndex: 2,
          },
        },

        [`> ${componentCls}-affix-wrapper-focused`]: {
          zIndex: 2,
        },
      },
    },
  }
}

const genTextAreaStyle: GenerateStyle<InputToken> = (token) => {
  const { componentCls, paddingLG } = token
  const textareaPrefixCls = `${componentCls}-textarea`

  return {
    [textareaPrefixCls]: {
      position: 'relative',

      '&-show-count': {
        [`> ${componentCls}`]: {
          height: '100%',
        },

        [`${componentCls}-data-count`]: {
          position: 'absolute',
          bottom: -token.fontSize * token.lineHeight,
          insetInlineEnd: 0,
          color: token.colorTextDescription,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        },
      },

      '&-allow-clear': {
        [`> ${componentCls}`]: {
          paddingInlineEnd: paddingLG,
        },
      },

      [`&-affix-wrapper${textareaPrefixCls}-has-feedback`]: {
        [`${componentCls}`]: {
          paddingInlineEnd: paddingLG,
        },
      },

      [`&-affix-wrapper${componentCls}-affix-wrapper`]: {
        padding: 0,

        [`> textarea${componentCls}`]: {
          fontSize: 'inherit',
          border: 'none',
          outline: 'none',

          '&:focus': {
            boxShadow: 'none !important',
          },
        },

        [`${componentCls}-suffix`]: {
          margin: 0,

          '> *:not(:last-child)': {
            marginInline: 0,
          },

          // Clear Icon
          [`${componentCls}-clear-icon`]: {
            position: 'absolute',
            insetInlineEnd: token.paddingXS,
            insetBlockStart: token.paddingXS,
          },

          // Feedback Icon
          [`${textareaPrefixCls}-suffix`]: {
            position: 'absolute',
            top: 0,
            insetInlineEnd: token.paddingInline,
            bottom: 0,
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            margin: 'auto',
            pointerEvents: 'none',
          },
        },
      },
    },
  }
}

export function initInputToken(token: GlobalToken): SharedInputToken {
  return mergeToken<InputToken>(token, {
    inputAffixPadding: token.paddingXXS,
  })
}

export const initComponentToken = (token: GlobalToken): SharedComponentToken => {
  const {
    controlHeight,
    fontSize,
    lineHeight,
    lineWidth,
    controlHeightSM,
    controlHeightLG,
    fontSizeLG,
    lineHeightLG,
    paddingSM,
    controlPaddingHorizontalSM,
    controlPaddingHorizontal,
    colorFillAlter,
    colorPrimaryHover,
    controlOutlineWidth,
    controlOutline,
    colorErrorOutline,
    colorWarningOutline,
  } = token

  return {
    paddingBlock: Math.max(
      Math.round(((controlHeight - fontSize * lineHeight) / 2) * 10) / 10 - lineWidth,
      0,
    ),
    paddingBlockSM: Math.max(
      Math.round(((controlHeightSM - fontSize * lineHeight) / 2) * 10) / 10 - lineWidth,
      0,
    ),
    paddingBlockLG:
      Math.ceil(((controlHeightLG - fontSizeLG * lineHeightLG) / 2) * 10) / 10 - lineWidth,
    paddingInline: paddingSM - lineWidth,
    paddingInlineSM: controlPaddingHorizontalSM - lineWidth,
    paddingInlineLG: controlPaddingHorizontal - lineWidth,
    addonBg: colorFillAlter,
    activeBorderColor: colorPrimaryHover,
    hoverBorderColor: colorPrimaryHover,
    activeShadow: `0 0 0 ${controlOutlineWidth}px ${controlOutline}`,
    errorActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorErrorOutline}`,
    warningActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorWarningOutline}`,
  }
}

// ============================== Export ==============================
export default genComponentStyleHook(
  'Input',
  (token) => {
    const inputToken = mergeToken<InputToken>(token, initInputToken(token))

    return [
      genInputStyle(inputToken),
      genTextAreaStyle(inputToken),
      genAffixStyle(inputToken),
      genGroupStyle(inputToken),
      genSearchInputStyle(inputToken),
      // =====================================================
      // ==             Space Compact                       ==
      // =====================================================
      genCompactItemStyle(inputToken),
    ]
  },
  initComponentToken,
)
