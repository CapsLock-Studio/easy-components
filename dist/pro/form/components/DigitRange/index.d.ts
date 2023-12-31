import React from 'react';
import type { InputNumberProps } from '../../../../base';
import type { ProFormFieldItemProps } from '../../typing';
export type Value = string | number | undefined;
export type ValuePair = Value[];
export type RangeInputNumberProps = Omit<InputNumberProps<number>, 'value' | 'defaultValue' | 'onChange' | 'placeholder'> & {
    value?: ValuePair;
    defaultValue?: ValuePair;
    onChange?: (value?: ValuePair) => void;
};
export type ProFormDigitRangeProps = ProFormFieldItemProps<RangeInputNumberProps> & {
    separator?: string;
    separatorWidth?: number;
};
declare const _default: React.ForwardRefExoticComponent<{
    fieldProps?: Partial<import("../../typing").FieldProps<any> & Omit<InputNumberProps<number>, "value" | "defaultValue" | "placeholder" | "onChange"> & {
        value?: ValuePair | undefined;
        defaultValue?: ValuePair | undefined;
        onChange?: ((value?: ValuePair | undefined) => void) | undefined;
    }> | undefined;
    placeholder?: string | string[] | undefined;
    secondary?: boolean | undefined;
    cacheForSwr?: boolean | undefined;
    disabled?: boolean | undefined;
    width?: number | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    proFieldProps?: import("../../..").ProFieldProps | undefined;
    footerRender?: import("../../typing").LightFilterFooterRender | undefined;
    children?: React.ReactNode;
} & Omit<import("..").ProFormItemProps, "valueType"> & Pick<import("../../typing").ProFormGridConfig, "colProps"> & import("../../typing").ExtendsProps & {
    separator?: string | undefined;
    separatorWidth?: number | undefined;
} & React.RefAttributes<any>>;
export default _default;
