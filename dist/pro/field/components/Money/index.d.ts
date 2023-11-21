import React from 'react';
import type { InputNumberProps } from '../../../../base';
export type FieldMoneyProps = {
    text: number;
    moneySymbol?: boolean;
    locale?: string;
    /**
     * 輸入框內容為空的提示內容
     */
    placeholder?: string;
    /**
     * 自訂 money 的 Symbol
     */
    customSymbol?: string;
    /**
     * 自訂 Popover 的值，false 可以關閉他
     */
    numberPopoverRender?: ((props: InputNumberProps, defaultText: string) => React.ReactNode) | boolean;
    /**
     * NumberFormat 的設定，文件可以查看 mdn
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    numberFormatOptions?: {
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
         */
        localeMatcher?: string;
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
         */
        style?: string;
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
         */
        currency?: string;
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
         */
        currencyDisplay?: string;
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
         */
        currencySign?: string;
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
         */
        useGrouping?: boolean;
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
         */
        minimumIntegerDigits?: number;
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
         */
        minimumFractionDigits?: number;
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
         */
        maximumFractionDigits?: number;
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
         */
        minimumSignificantDigits?: number;
        /**
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
         */
        maximumSignificantDigits?: number;
    };
};
declare const _default: React.ForwardRefExoticComponent<import('../../../../providers').BaseProFieldFC & import('../../../../providers').ProRenderFieldPropsType & FieldMoneyProps & React.RefAttributes<any>>;
export default _default;
