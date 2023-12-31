/// <reference types="react" />
import type { ValidateStatus } from '../../../base/form/FormItem';
type UseFormItemStatus = () => {
    status?: ValidateStatus;
    errors: React.ReactNode[];
    warnings: React.ReactNode[];
};
declare const useFormItemStatus: UseFormItemStatus;
export default useFormItemStatus;
