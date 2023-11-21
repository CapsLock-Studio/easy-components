import type {
  ItemType,
  ProFormRenderValueTypeHelpers,
  ProSchemaRenderValueTypeFunction,
} from '../typing'
import { dependency } from './dependency'
import { divider } from './divider'
import { field } from './field'
import { formList } from './formList'
import { formSet } from './formSet'
import { group } from './group'
import { ignore } from './ignore'

// 按照數組順序執行
const tasks: ProSchemaRenderValueTypeFunction<any, any>[] = [
  ignore,
  group,
  formList,
  formSet,
  divider,
  dependency,
]

export const renderValueType = <DataType, ValueType>(
  item: ItemType<DataType, ValueType>,
  helpers: ProFormRenderValueTypeHelpers<DataType, ValueType>,
) => {
  for (let cur = 0; cur < tasks.length; cur++) {
    const task = tasks[cur]
    const dom = task(item, helpers)

    // False 不再迭代
    // if (dom === false) {
    //   return false;
    if (dom === true) {
      // True 繼續下一次
      continue
    } else {
      // Other Is Dom
      return dom
    }
  }

  // 最後執行
  return field(item, helpers)
}
