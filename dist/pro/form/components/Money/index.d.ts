import React from 'react';
import type { InputNumberProps } from '../../../../base';
import type { ProFieldMoneyProps } from '../../../field';
import type { ProFormFieldItemProps } from '../../typing';
export type ProFormMoneyProps = ProFormFieldItemProps<Omit<ProFieldMoneyProps, 'valueType' | 'text'> & InputNumberProps<number>> & {
    customSymbol?: string;
    locale?: string;
    min?: InputNumberProps<number>['min'];
    max?: InputNumberProps<number>['min'];
};
declare const _default: React.ForwardRefExoticComponent<{
    fieldProps?: Partial<import("../../typing").FieldProps<any> & Omit<import("../../../field").FieldMoneyProps, "text" | "valueType"> & InputNumberProps<number>> | undefined;
    placeholder?: string | string[] | undefined;
    secondary?: boolean | undefined;
    cacheForSwr?: boolean | undefined;
    disabled?: boolean | undefined;
    width?: number | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    proFieldProps?: import("../../..").ProFieldProps | undefined;
    footerRender?: import("../../typing").LightFilterFooterRender | undefined;
    children?: React.ReactNode;
} & Omit<import("..").ProFormItemProps, "valueType"> & Pick<import("../../typing").ProFormGridConfig, "colProps"> & import("../../typing").ExtendsProps & {
    customSymbol?: string | undefined;
    locale?: string | undefined;
    min?: number | undefined;
    max?: number | undefined;
} & React.RefAttributes<any>>;
export default _default;
