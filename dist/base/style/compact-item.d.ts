import type { CSSInterpolation } from '../../StyleContext';
import type { FullToken } from '../theme/internal';
import type { OverrideComponent } from '../theme/util/genComponentStyleHook';
interface CompactItemOptions {
    focus?: boolean;
    /**
     * Some component borders are implemented on child elements
     * like `Select`
     */
    borderElCls?: string;
    /**
     * Some components have special `focus` className especially with popovers
     * like `Select` and `DatePicker`
     */
    focusElCls?: string;
}
export declare function genCompactItemStyle<T extends OverrideComponent>(token: FullToken<T>, options?: CompactItemOptions): CSSInterpolation;
export {};
