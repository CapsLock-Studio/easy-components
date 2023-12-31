﻿import { omitUndefined } from '../omitUndefined'
import { compareVersions } from './index'

// Fix to fork version.
const version = '5.1.7'

export const getVersion = () => {
  if (typeof process === 'undefined') return version
  return process?.env?.VERSION || version
}

const openVisibleCompatible = (open?: boolean, onOpenChange?: any) => {
  const props =
    compareVersions(getVersion(), '4.23.0') > -1
      ? {
        open: open,
        onOpenChange: onOpenChange,
      }
      : {
        visible: open,
        onVisibleChange: onOpenChange,
      }

  return omitUndefined(props)
}

export { openVisibleCompatible }
