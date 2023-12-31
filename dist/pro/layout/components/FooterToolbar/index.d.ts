import type { GenerateStyle } from '../../../../providers';
import type { ReactNode } from 'react';
import React from 'react';
import type { RouteContextType } from '../../context/RouteContext';
import type { FooterToolBarToken } from './style';
export type FooterToolbarProps = {
    extra?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    renderContent?: (props: FooterToolbarProps & RouteContextType & {
        leftWidth?: string;
    }, dom: JSX.Element) => ReactNode;
    prefixCls?: string;
    stylish?: GenerateStyle<FooterToolBarToken>;
    children?: React.ReactNode;
    portalDom?: boolean;
};
declare const FooterToolbar: React.FC<FooterToolbarProps>;
export { FooterToolbar };
