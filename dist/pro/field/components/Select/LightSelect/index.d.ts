import React from 'react';
import type { SelectProps } from '../../../../../base';
import type { ProFieldLightProps } from '../../../index';
export type LightSelectProps = {
    label?: string;
    placeholder?: any;
} & ProFieldLightProps;
declare const _default: React.ForwardRefExoticComponent<SelectProps<any, import("rc-select/lib/Select").DefaultOptionType> & {
    label?: string | undefined;
    placeholder?: any;
} & ProFieldLightProps & React.RefAttributes<any>>;
export default _default;
