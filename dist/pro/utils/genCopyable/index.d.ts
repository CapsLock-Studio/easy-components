import React from 'react';
/**
 * 生成 Copyable 或 Ellipsis 的 dom
 *
 * @param dom
 * @param item
 * @param text
 */
export declare const genCopyable: (dom: React.ReactNode, item: any, text: string) => string | number | boolean | Iterable<React.ReactNode> | React.PromiseLikeOfReactNode | React.JSX.Element | null | undefined;
