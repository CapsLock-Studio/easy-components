import * as React from 'react';
import type { ValidateMessages } from 'rc-field-form/lib/interface';
import type { Options } from 'scroll-into-view-if-needed';
import type { RequiredMark } from '../form/Form';
import type { InputProps } from '../input';
import type { Locale } from '../locale';
import type { SpaceProps } from '../space';
import type { TabsProps } from '../tabs';
import type { ComponentStyleConfig, ConfigConsumerProps, CSPConfig, PopupOverflow, Theme, ThemeConfig, WaveConfig } from '../../base/Config/ConfigContext';
import { ConfigConsumer, ConfigContext } from './ConfigContext';
import type { RenderEmptyHandler } from './defaultRenderEmpty';
import useConfig from './hooks/useConfig';
import type { SizeType } from './SizeContext';
import SizeContext from './SizeContext';
export declare const warnContext: (componentName: string) => void;
export { ConfigConsumer, ConfigContext, type ConfigConsumerProps, type CSPConfig, type RenderEmptyHandler, type ThemeConfig, };
export declare const configConsumerProps: string[];
export interface ConfigProviderProps {
    getTargetContainer?: () => HTMLElement | Window;
    getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
    prefixCls?: string;
    children?: React.ReactNode;
    renderEmpty?: RenderEmptyHandler;
    csp?: CSPConfig;
    autoInsertSpaceInButton?: boolean;
    form?: ComponentStyleConfig & {
        validateMessages?: ValidateMessages;
        requiredMark?: RequiredMark;
        colon?: boolean;
        scrollToFirstError?: Options | boolean;
    };
    input?: ComponentStyleConfig & {
        classNames?: InputProps['classNames'];
        styles?: InputProps['styles'];
        autoComplete?: string;
    };
    select?: ComponentStyleConfig & {
        showSearch?: boolean;
    };
    pagination?: ComponentStyleConfig & {
        showSizeChanger?: boolean;
    };
    locale?: Locale;
    pageHeader?: {
        ghost: boolean;
    };
    componentSize?: SizeType;
    componentDisabled?: boolean;
    space?: {
        size?: SizeType | number;
        className?: SpaceProps['className'];
        classNames?: SpaceProps['classNames'];
        style?: SpaceProps['style'];
        styles?: SpaceProps['styles'];
    };
    virtual?: boolean;
    /** @deprecated Please use `popupMatchSelectWidth` instead */
    dropdownMatchSelectWidth?: boolean;
    popupMatchSelectWidth?: boolean;
    popupOverflow?: PopupOverflow;
    theme?: ThemeConfig;
    alert?: ComponentStyleConfig;
    anchor?: ComponentStyleConfig;
    calendar?: ComponentStyleConfig;
    carousel?: ComponentStyleConfig;
    cascader?: ComponentStyleConfig;
    collapse?: ComponentStyleConfig;
    divider?: ComponentStyleConfig;
    drawer?: ComponentStyleConfig;
    typography?: ComponentStyleConfig;
    skeleton?: ComponentStyleConfig;
    segmented?: ComponentStyleConfig;
    statistic?: ComponentStyleConfig;
    steps?: ComponentStyleConfig;
    image?: ComponentStyleConfig;
    layout?: ComponentStyleConfig;
    list?: ComponentStyleConfig;
    mentions?: ComponentStyleConfig;
    modal?: ComponentStyleConfig;
    progress?: ComponentStyleConfig;
    result?: ComponentStyleConfig;
    slider?: ComponentStyleConfig;
    breadcrumb?: ComponentStyleConfig;
    menu?: ComponentStyleConfig;
    checkbox?: ComponentStyleConfig;
    descriptions?: ComponentStyleConfig;
    empty?: ComponentStyleConfig;
    radio?: ComponentStyleConfig;
    rate?: ComponentStyleConfig;
    switch?: ComponentStyleConfig;
    transfer?: ComponentStyleConfig;
    avatar?: ComponentStyleConfig;
    message?: ComponentStyleConfig;
    tag?: ComponentStyleConfig;
    table?: ComponentStyleConfig;
    card?: ComponentStyleConfig;
    tabs?: ComponentStyleConfig & Pick<TabsProps, 'indicatorSize'>;
    timeline?: ComponentStyleConfig;
    timePicker?: ComponentStyleConfig;
    upload?: ComponentStyleConfig;
    notification?: ComponentStyleConfig;
    tree?: ComponentStyleConfig;
    colorPicker?: ComponentStyleConfig;
    datePicker?: ComponentStyleConfig;
    /**
     * Wave is special component which only patch on the effect of component interaction.
     */
    wave?: WaveConfig;
}
export declare const defaultPrefixCls = "ipass";
declare const setGlobalConfig: ({ prefixCls, theme, }: Pick<ConfigProviderProps, "prefixCls"> & {
    theme?: ThemeConfig | Theme | undefined;
}) => void;
export declare const globalConfig: () => {
    getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
    getRootPrefixCls: () => string;
    getTheme: () => ThemeConfig;
};
declare const ConfigProvider: React.FC<ConfigProviderProps> & {
    /** @private internal Usage. do not use in your production */
    ConfigContext: typeof ConfigContext;
    /** @deprecated Please use `ConfigProvider.useConfig().componentSize` instead */
    SizeContext: typeof SizeContext;
    config: typeof setGlobalConfig;
    useConfig: typeof useConfig;
};
export default ConfigProvider;
