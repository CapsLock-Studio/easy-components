import * as React from 'react'
import { createTheme } from '@/hooks/cssinjs/theme'
import type { ValidateMessages } from 'rc-field-form/lib/interface'
import useMemo from 'rc-util/lib/hooks/useMemo'
import { merge } from 'rc-util/lib/utils/set'
import type { Options } from 'scroll-into-view-if-needed'

import warning from '../_util/warning'
import type { RequiredMark } from '../form/Form'
import ValidateMessagesContext from '../form/validateMessagesContext'
import type { InputProps } from '../input'
import type { Locale } from '../locale'
import LocaleProvider, { MARK } from '../locale'
import type { LocaleContextProps } from '../locale/context'
import LocaleContext from '../locale/context'
import defaultLocale from '../locale/en_US'
import type { SpaceProps } from '../space'
import type { TabsProps } from '../tabs'
import { defaultTheme } from '../theme/context'
import { DesignTokenContext } from '../theme/internal'
import defaultSeedToken from '../theme/themes/seed'
import type {
  ComponentStyleConfig,
  ConfigConsumerProps,
  CSPConfig,
  PopupOverflow,
  Theme,
  ThemeConfig,
  WaveConfig,
} from '@/base/Config/ConfigContext'
import { ConfigConsumer, ConfigContext } from './ConfigContext'
import { registerTheme } from './cssVariables'
import type { RenderEmptyHandler } from './defaultRenderEmpty'
import { DisabledContextProvider } from './DisabledContext'
import useConfig from './hooks/useConfig'
import useTheme from './hooks/useTheme'
import MotionWrapper from './MotionWrapper'
import PropWarning from './PropWarning'
import type { SizeType } from './SizeContext'
import SizeContext, { SizeContextProvider } from './SizeContext'

/**
 * Since too many feedback using static method like `Modal.confirm` not getting theme, we record the
 * theme register info here to help developer get warning info.
 */
let existThemeConfig = false

export const warnContext: (componentName: string) => void =
  process.env.NODE_ENV !== 'production'
    ? (componentName: string) => {
      warning(
        !existThemeConfig,
        componentName,
        `Static function can not consume context like dynamic theme. Please use 'App' component instead.`,
      )
    }
    : /* istanbul ignore next */
    null!

export {
  ConfigConsumer,
  ConfigContext,
  type ConfigConsumerProps,
  type CSPConfig,
  type RenderEmptyHandler,
  type ThemeConfig,
}

export const configConsumerProps = [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
]

// These props is used by `useContext` directly in sub component
const PASSED_PROPS: Exclude<
  keyof ConfigConsumerProps,
  'rootPrefixCls' | 'getPrefixCls' | 'warning'
>[] = [
    'getTargetContainer',
    'getPopupContainer',
    'renderEmpty',
    'pageHeader',
    'input',
    'pagination',
    'form',
    'select',
  ]

export interface ConfigProviderProps {
  getTargetContainer?: () => HTMLElement | Window
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement
  prefixCls?: string
  children?: React.ReactNode
  renderEmpty?: RenderEmptyHandler
  csp?: CSPConfig
  autoInsertSpaceInButton?: boolean
  form?: ComponentStyleConfig & {
    validateMessages?: ValidateMessages
    requiredMark?: RequiredMark
    colon?: boolean
    scrollToFirstError?: Options | boolean
  }
  input?: ComponentStyleConfig & {
    classNames?: InputProps['classNames']
    styles?: InputProps['styles']
    autoComplete?: string
  }
  select?: ComponentStyleConfig & {
    showSearch?: boolean
  }
  pagination?: ComponentStyleConfig & { showSizeChanger?: boolean }
  locale?: Locale
  pageHeader?: {
    ghost: boolean
  }
  componentSize?: SizeType
  componentDisabled?: boolean
  space?: {
    size?: SizeType | number
    className?: SpaceProps['className']
    classNames?: SpaceProps['classNames']
    style?: SpaceProps['style']
    styles?: SpaceProps['styles']
  }
  virtual?: boolean
  /** @deprecated Please use `popupMatchSelectWidth` instead */
  dropdownMatchSelectWidth?: boolean
  popupMatchSelectWidth?: boolean
  popupOverflow?: PopupOverflow
  theme?: ThemeConfig

  // warning?: WarningContextProps;

  alert?: ComponentStyleConfig
  anchor?: ComponentStyleConfig
  calendar?: ComponentStyleConfig
  carousel?: ComponentStyleConfig
  cascader?: ComponentStyleConfig
  collapse?: ComponentStyleConfig
  divider?: ComponentStyleConfig
  drawer?: ComponentStyleConfig
  typography?: ComponentStyleConfig
  skeleton?: ComponentStyleConfig
  segmented?: ComponentStyleConfig
  statistic?: ComponentStyleConfig
  steps?: ComponentStyleConfig
  image?: ComponentStyleConfig
  layout?: ComponentStyleConfig
  list?: ComponentStyleConfig
  mentions?: ComponentStyleConfig
  modal?: ComponentStyleConfig
  progress?: ComponentStyleConfig
  result?: ComponentStyleConfig
  slider?: ComponentStyleConfig
  breadcrumb?: ComponentStyleConfig
  menu?: ComponentStyleConfig
  checkbox?: ComponentStyleConfig
  descriptions?: ComponentStyleConfig
  empty?: ComponentStyleConfig
  radio?: ComponentStyleConfig
  rate?: ComponentStyleConfig
  switch?: ComponentStyleConfig
  transfer?: ComponentStyleConfig
  avatar?: ComponentStyleConfig
  message?: ComponentStyleConfig
  tag?: ComponentStyleConfig
  table?: ComponentStyleConfig
  card?: ComponentStyleConfig
  tabs?: ComponentStyleConfig & Pick<TabsProps, 'indicatorSize'>
  timeline?: ComponentStyleConfig
  timePicker?: ComponentStyleConfig
  upload?: ComponentStyleConfig
  notification?: ComponentStyleConfig
  tree?: ComponentStyleConfig
  colorPicker?: ComponentStyleConfig
  datePicker?: ComponentStyleConfig

  /**
   * Wave is special component which only patch on the effect of component interaction.
   */
  wave?: WaveConfig
}

interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps
  legacyLocale: Locale
}

export const defaultPrefixCls = 'ipass'
let globalPrefixCls: string
let globalTheme: ThemeConfig

function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls
}

function isLegacyTheme(theme: Theme | ThemeConfig): theme is Theme {
  return Object.keys(theme).some((key) => key.endsWith('Color'))
}

const setGlobalConfig = ({
  prefixCls,
  theme,
}: Pick<ConfigProviderProps, 'prefixCls'> & { theme?: Theme | ThemeConfig }) => {
  if (prefixCls !== undefined) {
    globalPrefixCls = prefixCls
  }

  if (theme) {
    if (isLegacyTheme(theme)) {
      warning(
        false,
        'ConfigProvider',
        '`config` of css variable theme is not work in v5. Please use new `theme` config instead.',
      )
      registerTheme(getGlobalPrefixCls(), theme)
    } else {
      globalTheme = theme
    }
  }
}

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) {
      return customizePrefixCls
    }
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls()
  },
  getRootPrefixCls: () => {
    // If Global prefixCls provided, use this
    if (globalPrefixCls) {
      return globalPrefixCls
    }

    // Fallback to default prefixCls
    return getGlobalPrefixCls()
  },
  getTheme: () => globalTheme,
})

const ProviderChildren: React.FC<ProviderChildrenProps> = (props) => {
  const {
    children,
    csp: customCsp,
    autoInsertSpaceInButton,
    alert,
    anchor,
    form,
    locale,
    componentSize,
    space,
    virtual,
    dropdownMatchSelectWidth,
    popupMatchSelectWidth,
    popupOverflow,
    legacyLocale,
    parentContext,
    theme,
    componentDisabled,
    segmented,
    statistic,
    calendar,
    carousel,
    cascader,
    collapse,
    typography,
    checkbox,
    descriptions,
    divider,
    drawer,
    skeleton,
    steps,
    image,
    layout,
    list,
    mentions,
    modal,
    progress,
    result,
    slider,
    breadcrumb,
    menu,
    pagination,
    input,
    empty,
    radio,
    rate,
    switch: SWITCH,
    transfer,
    avatar,
    message,
    tag,
    table,
    card,
    tabs,
    timeline,
    timePicker,
    upload,
    notification,
    tree,
    colorPicker,
    datePicker,
    wave,
    // warning: warningConfig,
  } = props

  // =================================== Context ===================================
  const getPrefixCls = React.useCallback(
    (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls } = props

      if (customizePrefixCls) {
        return customizePrefixCls
      }

      const mergedPrefixCls = prefixCls || parentContext.getPrefixCls('')

      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls
    },
    [parentContext.getPrefixCls, props.prefixCls],
  )

  const csp = customCsp || parentContext.csp

  const mergedTheme = useTheme(theme, parentContext.theme)

  if (process.env.NODE_ENV !== 'production') {
    existThemeConfig = existThemeConfig || !!mergedTheme
  }

  const baseConfig = {
    csp,
    autoInsertSpaceInButton,
    alert,
    anchor,
    locale: locale || legacyLocale,
    space,
    virtual,
    popupMatchSelectWidth: popupMatchSelectWidth ?? dropdownMatchSelectWidth,
    popupOverflow,
    getPrefixCls,
    theme: mergedTheme,
    segmented,
    statistic,
    calendar,
    carousel,
    cascader,
    collapse,
    typography,
    checkbox,
    descriptions,
    divider,
    drawer,
    skeleton,
    steps,
    image,
    input,
    layout,
    list,
    mentions,
    modal,
    progress,
    result,
    slider,
    breadcrumb,
    menu,
    pagination,
    empty,
    radio,
    rate,
    switch: SWITCH,
    transfer,
    avatar,
    message,
    tag,
    table,
    card,
    tabs,
    timeline,
    timePicker,
    upload,
    notification,
    tree,
    colorPicker,
    datePicker,
    wave,
    // warning: warningConfig,
  }

  const config = {
    ...parentContext,
  }

  Object.keys(baseConfig).forEach((key) => {
    // @ts-ignore
    if (baseConfig[key] !== undefined) {
      // @ts-ignore
      (config as any)[key] = baseConfig[key]
    }
  })

  // Pass the props used by `useContext` directly with child component.
  // These props should merged into `config`.
  PASSED_PROPS.forEach((propName) => {
    // @ts-ignore
    const propValue = props[propName]
    if (propValue) {
      (config as any)[propName] = propValue
    }
  })

  const memoedConfig = useMemo(
    () => config,
    config,
    (prevConfig, currentConfig) => {
      const prevKeys = Object.keys(prevConfig) as Array<keyof typeof config>
      const currentKeys = Object.keys(currentConfig) as Array<keyof typeof config>
      return (
        prevKeys.length !== currentKeys.length ||
        prevKeys.some((key) => prevConfig[key] !== currentConfig[key])
      )
    },
  )

  let childNode = (
    <>
      <PropWarning dropdownMatchSelectWidth={dropdownMatchSelectWidth} />
      {children}
    </>
  )

  const validateMessages = React.useMemo(
    () =>
      merge(
        defaultLocale.Form?.defaultValidateMessages || {},
        memoedConfig.locale?.Form?.defaultValidateMessages || {},
        memoedConfig.form?.validateMessages || {},
        form?.validateMessages || {},
      ),
    [memoedConfig, form?.validateMessages],
  )

  if (Object.keys(validateMessages).length > 0) {
    childNode = (
      <ValidateMessagesContext.Provider value={validateMessages}>
        {childNode}
      </ValidateMessagesContext.Provider>
    )
  }

  if (locale) {
    childNode = (
      <LocaleProvider locale={locale} _IPASS_MARK__={MARK}>
        {childNode}
      </LocaleProvider>
    )
  }

  if (componentSize) {
    childNode = <SizeContextProvider size={componentSize}>{childNode}</SizeContextProvider>
  }

  // =================================== Motion ===================================
  childNode = <MotionWrapper>{childNode}</MotionWrapper>

  // ================================ Dynamic theme ================================
  const memoTheme = React.useMemo(() => {
    const { algorithm, token, components, ...rest } = mergedTheme || {}
    const themeObj =
      algorithm && (!Array.isArray(algorithm) || algorithm.length > 0)
        ? createTheme(algorithm)
        : defaultTheme

    const parsedComponents: any = {}
    Object.entries(components || {}).forEach(([componentName, componentToken]) => {
      const parsedToken: typeof componentToken & { theme?: typeof defaultTheme } = {
        ...componentToken,
      }
      if ('algorithm' in parsedToken) {
        if (parsedToken.algorithm === true) {
          parsedToken.theme = themeObj
        } else if (
          Array.isArray(parsedToken.algorithm) ||
          typeof parsedToken.algorithm === 'function'
        ) {
          parsedToken.theme = createTheme(parsedToken.algorithm)
        }
        delete parsedToken.algorithm
      }
      parsedComponents[componentName] = parsedToken
    })

    return {
      ...rest,
      theme: themeObj,

      token: {
        ...defaultSeedToken,
        ...token,
      },

      components: parsedComponents,
    }
  }, [mergedTheme])

  if (theme) {
    childNode = (
      <DesignTokenContext.Provider value={memoTheme}>{childNode}</DesignTokenContext.Provider>
    )
  }

  // ================================== Warning ===================================
  // if (memoedConfig.warning) {
  //   childNode = (
  //     <WarningContext.Provider value={memoedConfig.warning}>{childNode}</WarningContext.Provider>
  //   );
  // }

  // =================================== Render ===================================
  if (componentDisabled !== undefined) {
    childNode = (
      <DisabledContextProvider disabled={componentDisabled}>{childNode}</DisabledContextProvider>
    )
  }

  return <ConfigContext.Provider value={memoedConfig}>{childNode}</ConfigContext.Provider>
}

const ConfigProvider: React.FC<ConfigProviderProps> & {
  /** @private internal Usage. do not use in your production */
  ConfigContext: typeof ConfigContext
  /** @deprecated Please use `ConfigProvider.useConfig().componentSize` instead */
  SizeContext: typeof SizeContext
  config: typeof setGlobalConfig
  useConfig: typeof useConfig
} = (props) => {
  const context = React.useContext<ConfigConsumerProps>(ConfigContext)
  const locale = React.useContext<LocaleContextProps | undefined>(LocaleContext)
  return <ProviderChildren parentContext={context} legacyLocale={locale!} {...props} />
}

ConfigProvider.ConfigContext = ConfigContext
ConfigProvider.SizeContext = SizeContext
ConfigProvider.config = setGlobalConfig
ConfigProvider.useConfig = useConfig

Object.defineProperty(ConfigProvider, 'SizeContext', {
  get: () => {
    warning(
      false,
      'ConfigProvider',
      'ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead.',
    )
    return SizeContext
  },
})

if (process.env.NODE_ENV !== 'production') {
  ConfigProvider.displayName = 'ConfigProvider'
}

export default ConfigProvider
