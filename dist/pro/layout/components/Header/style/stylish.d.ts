/// <reference types="react" />
import type { GenerateStyle, ProAliasToken } from '../../../../../providers';
export interface stylishToken extends ProAliasToken {
    componentCls: string;
    proLayoutCollapsedWidth: number;
}
export declare function useStylish(prefixCls: string, { stylish, proLayoutCollapsedWidth, }: {
    stylish?: GenerateStyle<stylishToken>;
    proLayoutCollapsedWidth: number;
}): {
    wrapSSR: (node: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>) => import("react").JSX.Element;
    hashId: string;
};
