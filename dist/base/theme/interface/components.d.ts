import type { ComponentToken as WaveToken } from '../../_util/wave/style';
import type { ComponentToken as BadgeComponentToken } from '../../badge/style';
import type { ComponentToken as CalendarComponentToken } from '../../calendar/style';
import type { ComponentToken as CardComponentToken } from '../../card/style';
import type { ComponentToken as CheckboxComponentToken } from '../../checkbox/style';
import type { ComponentToken as CollapseComponentToken } from '../../collapse/style';
import type { ComponentToken as DatePickerComponentToken } from '../../date-picker/style';
import type { ComponentToken as DescriptionsComponentToken } from '../../descriptions/style';
import type { ComponentToken as DrawerComponentToken } from '../../drawer/style';
import type { ComponentToken as EmptyComponentToken } from '../../empty/style';
import type { ComponentToken as InputComponentToken } from '../../input/style';
import type { ComponentToken as InputNumberComponentToken } from '../../input-number/style';
import type { ComponentToken as LayoutComponentToken } from '../../layout/style';
import type { ComponentToken as ListComponentToken } from '../../list/style';
import type { ComponentToken as MenuComponentToken } from '../../menu/style';
import type { ComponentToken as ModalComponentToken } from '../../modal/style';
import type { ComponentToken as PaginationComponentToken } from '../../pagination/style';
import type { ComponentToken as PopoverComponentToken } from '../../popover/style';
import type { ComponentToken as ProgressComponentToken } from '../../progress/style';
import type { ComponentToken as RadioComponentToken } from '../../radio/style';
import type { ComponentToken as ResultComponentToken } from '../../result/style';
import type { ComponentToken as SelectComponentToken } from '../../select/style';
import type { ComponentToken as SkeletonComponentToken } from '../../skeleton/style';
import type { ComponentToken as SpaceComponentToken } from '../../space/style';
import type { ComponentToken as StatisticComponentToken } from '../../statistic/style';
import type { ComponentToken as StatusComponentToken } from '../../status/style';
import type { ComponentToken as StepsComponentToken } from '../../steps/style';
import type { ComponentToken as SwitchComponentToken } from '../../switch/style';
import type { ComponentToken as TableComponentToken } from '../../table/style';
import type { ComponentToken as TabsComponentToken } from '../../tabs/style';
import type { ComponentToken as TooltipComponentToken } from '../../tooltip/style';
import type { ComponentToken as TreeComponentToken } from '../../tree/style';
import type { ComponentToken as TypographyComponentToken } from '../../typography/style';
import type { ComponentToken as FormComponentToken } from '../../form/style';
export interface ComponentTokenMap {
    Affix?: {};
    Badge?: BadgeComponentToken;
    Card?: CardComponentToken;
    Checkbox?: CheckboxComponentToken;
    Collapse?: CollapseComponentToken;
    DatePicker?: DatePickerComponentToken;
    Descriptions?: DescriptionsComponentToken;
    Drawer?: DrawerComponentToken;
    Empty?: EmptyComponentToken;
    Form?: FormComponentToken;
    Grid?: {};
    Input?: InputComponentToken;
    InputNumber?: InputNumberComponentToken;
    Layout?: LayoutComponentToken;
    List?: ListComponentToken;
    Pagination?: PaginationComponentToken;
    Popover?: PopoverComponentToken;
    Radio?: RadioComponentToken;
    Result?: ResultComponentToken;
    Select?: SelectComponentToken;
    Skeleton?: SkeletonComponentToken;
    Statistic?: StatisticComponentToken;
    Status?: StatusComponentToken;
    Switch?: SwitchComponentToken;
    Tabs?: TabsComponentToken;
    Typography?: TypographyComponentToken;
    Calendar?: CalendarComponentToken;
    Steps?: StepsComponentToken;
    Menu?: MenuComponentToken;
    Modal?: ModalComponentToken;
    Tooltip?: TooltipComponentToken;
    Table?: TableComponentToken;
    Tree?: TreeComponentToken;
    Space?: SpaceComponentToken;
    Progress?: ProgressComponentToken;
    /** @private Internal TS definition. Do not use. */
    Wave?: WaveToken;
}
