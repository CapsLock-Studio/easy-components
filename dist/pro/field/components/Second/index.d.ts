import React from 'react';
export type FieldDigitProps = {
    text: number;
    placeholder?: string;
};
/**
 * 格式化秒
 *
 * @param result
 * @returns {string}
 */
export declare function formatSecond(result: number): string;
declare const _default: React.ForwardRefExoticComponent<import("../../..").BaseProFieldFC & import("../../..").ProRenderFieldPropsType & FieldDigitProps & React.RefAttributes<any>>;
export default _default;
