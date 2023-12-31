import type { FormItemProps, SpaceProps } from '../../../../base';
import type { GroupProps } from '../../../../base/input';
import React from 'react';
import type { ProFormItemProps } from '../FormItem';
export type ProFormFieldSetProps<T = any> = {
    value?: T[];
    onChange?: (value: T[]) => void;
    space?: SpaceProps | GroupProps;
    valuePropName?: string;
    type?: 'space' | 'group';
    fieldProps?: any;
    convertValue?: ProFormItemProps['convertValue'];
    transform?: ProFormItemProps['transform'];
    children?: React.ReactNode;
};
export declare function defaultGetValueFromEvent(valuePropName: string, ...args: any): any;
declare const ProFormFieldSet: React.FC<FormItemProps<any> & ProFormFieldSetProps<any>>;
export default ProFormFieldSet;
