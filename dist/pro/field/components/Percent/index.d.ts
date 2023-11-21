import type { ReactNode } from 'react';
import React from 'react';
export type PercentPropInt = {
    prefix?: ReactNode;
    suffix?: ReactNode;
    text?: number | string;
    precision?: number;
    showColor?: boolean;
    showSymbol?: boolean | ((value: any) => boolean);
    placeholder?: string;
};
declare const _default: React.ForwardRefExoticComponent<import("../../..").BaseProFieldFC & import("../../..").ProRenderFieldPropsType & PercentPropInt & React.RefAttributes<any>>;
export default _default;
