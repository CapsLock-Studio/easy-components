/// <reference types="react" />
import type { ProAliasToken } from '../../../../providers';
export interface StepsFormToken extends ProAliasToken {
    componentCls: string;
}
export declare function useStyle(prefixCls: string): {
    wrapSSR: (node: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>) => import("react").JSX.Element;
    hashId: string;
};
