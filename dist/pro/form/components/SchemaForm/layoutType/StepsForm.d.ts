import React from 'react';
import type { ProFormGridConfig } from '../../../typing';
import type { FormSchema, ProFormPropsType } from '../typing';
type StepsFormProps<T, ValueType> = ProFormPropsType<T, ValueType> & Pick<FormSchema, 'steps'> & {
    layoutType: 'StepsForm';
    forceUpdate: React.Dispatch<React.SetStateAction<[]>>;
} & Pick<ProFormGridConfig, 'grid'>;
declare const StepsForm: <T, ValueType>({ steps, columns, forceUpdate, grid, ...props }: {
    layoutType: "StepsForm";
    columns: import("../typing").ProFormColumnsType<T, ValueType>[][];
} & {
    onFinish?: ((values: T) => Promise<boolean | void>) | undefined;
    current?: number | undefined;
    stepsProps?: import("../../../../../base").StepsProps | undefined;
    formProps?: import("../../..").ProFormProps<T> | undefined;
    onCurrentChange?: ((current: number) => void) | undefined;
    stepsRender?: ((steps: {
        key: string;
        title?: React.ReactNode;
    }[], defaultDom: React.ReactNode) => React.ReactNode) | undefined;
    formRef?: React.MutableRefObject<import("../../../BaseForm/BaseForm").ProFormInstance<any> | null | undefined> | undefined;
    formMapRef?: React.MutableRefObject<React.MutableRefObject<import("../../..").FormInstance<any> | undefined>[]> | undefined;
    stepFormRender?: ((from: React.ReactNode) => React.ReactNode) | undefined;
    stepsFormRender?: ((from: React.ReactNode, submitter: React.ReactNode) => React.ReactNode) | undefined;
    submitter?: false | import("../..").SubmitterProps<{
        step: number;
        onPre: () => void;
        form?: import("../../..").FormInstance<any> | undefined;
    }> | undefined;
    containerStyle?: React.CSSProperties | undefined;
    layoutRender?: ((layoutDom: {
        stepsDom: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
        formDom: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    }) => React.ReactNode) | undefined;
} & Omit<import("../../../../../base/form/context").FormProviderProps, "children"> & Pick<FormSchema, "steps"> & {
    layoutType: 'StepsForm';
    forceUpdate: React.Dispatch<React.SetStateAction<[]>>;
} & Pick<ProFormGridConfig, "grid">) => React.JSX.Element;
export default StepsForm;
