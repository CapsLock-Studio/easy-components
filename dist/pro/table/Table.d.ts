import type { ParamsType } from '../../providers';
import type Summary from 'rc-table/lib/Footer/Summary';
import React from 'react';
import type { ProTableProps } from './typing';
/**
 * 🏆 Use Ant Design Table like a Pro! 更快 更好 更方便
 *
 * @param props
 */
declare const ProviderTableContainer: {
    <DataType extends Record<string, any>, Params extends ParamsType = ParamsType, ValueType = "text">(props: ProTableProps<DataType, Params, ValueType>): React.JSX.Element;
    Summary: typeof Summary;
};
export default ProviderTableContainer;
