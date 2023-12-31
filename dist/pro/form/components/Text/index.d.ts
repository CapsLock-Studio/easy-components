import type { InputProps } from '../../../../base';
import type { InputRef, PasswordProps } from '../../../../base/input';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
/**
 * 文字元件
 *
 * @param
 */
declare const ProFormText: React.FC<ProFormFieldItemProps<InputProps, InputRef>>;
declare const Password: React.FC<ProFormFieldItemProps<PasswordProps, InputRef>>;
declare const WrappedProFormText: typeof ProFormText & {
    Password: typeof Password;
};
export default WrappedProFormText;
