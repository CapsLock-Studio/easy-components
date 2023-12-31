import React from 'react';
import type { RadioGroupProps, RadioProps } from '../../../../base';
import { Radio } from '../../../../base';
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '../../typing';
export type ProFormRadioGroupProps = ProFormFieldItemProps<RadioGroupProps, HTMLDivElement> & {
    layout?: 'horizontal' | 'vertical';
    radioType?: 'button' | 'radio';
    options?: RadioGroupProps['options'];
} & ProFormFieldRemoteProps;
declare const RadioGroup: React.FC<ProFormRadioGroupProps>;
declare const ProFormRadio: React.ComponentClass<{
    fieldProps?: Partial<import("../../typing").FieldProps<any> & RadioProps> | undefined;
    placeholder?: string | string[] | undefined;
    secondary?: boolean | undefined;
    cacheForSwr?: boolean | undefined;
    disabled?: boolean | undefined;
    width?: number | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    proFieldProps?: import("../../../utils").ProFieldProps | undefined;
    footerRender?: import("../../typing").LightFilterFooterRender | undefined;
    children?: React.ReactNode;
} & Omit<import("..").ProFormItemProps, "valueType"> & Pick<import("../../typing").ProFormGridConfig, "colProps"> & import("../../typing").ExtendsProps & {
    /**
     * Radio
     *
     * @param
     */
    getFormItemProps?: (() => Record<string, any>) | undefined;
    getFieldProps?: (() => Record<string, any>) | undefined;
}, any> | React.FunctionComponent<{
    fieldProps?: Partial<import("../../typing").FieldProps<any> & RadioProps> | undefined;
    placeholder?: string | string[] | undefined;
    secondary?: boolean | undefined;
    cacheForSwr?: boolean | undefined;
    disabled?: boolean | undefined;
    width?: number | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    proFieldProps?: import("../../../utils").ProFieldProps | undefined;
    footerRender?: import("../../typing").LightFilterFooterRender | undefined;
    children?: React.ReactNode;
} & Omit<import("..").ProFormItemProps, "valueType"> & Pick<import("../../typing").ProFormGridConfig, "colProps"> & import("../../typing").ExtendsProps & {
    /**
     * Radio
     *
     * @param
     */
    getFormItemProps?: (() => Record<string, any>) | undefined;
    getFieldProps?: (() => Record<string, any>) | undefined;
}>;
declare const WrappedProFormRadio: typeof ProFormRadio & {
    Group: typeof RadioGroup;
    Button: typeof Radio.Button;
};
export default WrappedProFormRadio;
