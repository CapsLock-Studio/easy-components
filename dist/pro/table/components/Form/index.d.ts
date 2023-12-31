import React from 'react';
import type { TablePaginationConfig } from '../../../../base';
import type { ActionType, ProTableProps } from '../../typing';
type BaseFormProps<T, U> = {
    pagination?: TablePaginationConfig | false;
    beforeSearchSubmit?: (params: Partial<U>) => any;
    action: React.MutableRefObject<ActionType | undefined>;
    onSubmit?: (params: U) => void;
    onReset?: () => void;
    loading: boolean;
    onFormSearchSubmit: (params: U) => void;
    columns: ProTableProps<T, U, any>['columns'];
    dateFormatter: ProTableProps<T, U, any>['dateFormatter'];
    formRef: ProTableProps<T, U, any>['formRef'];
    type: ProTableProps<T, U, any>['type'];
    cardBordered: ProTableProps<T, U, any>['cardBordered'];
    form: ProTableProps<T, U, any>['form'];
    search: ProTableProps<T, U, any>['search'];
    manualRequest: ProTableProps<T, U, any>['manualRequest'];
};
declare class FormSearch<T, U> extends React.Component<BaseFormProps<T, U> & {
    ghost?: boolean;
}> {
    /** 查詢表單相關的配置 */
    onSubmit: (value: U, firstLoad: boolean) => void;
    onReset: (value: Partial<U>) => void;
    /**
     * 只 Diff 需要用的 props，能減少 5 次左右的render
     *
     * @param next
     * @see 因為 hooks 每次的 setFormSearch 都是新的，所以每次都觸發 render
     * @see action 也是同樣的原因
     * @returns
     */
    isEqual: (next: BaseFormProps<T, U>) => boolean;
    shouldComponentUpdate: (next: BaseFormProps<T, U>) => boolean;
    render: () => React.JSX.Element;
}
export default FormSearch;
