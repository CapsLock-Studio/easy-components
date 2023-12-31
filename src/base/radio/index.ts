import type * as React from 'react'
import Group from './group'
import type { RadioProps, RadioRef } from './interface'
import InternalRadio from './radio'
import Button from './radioButton'

export type {
  RadioChangeEvent,
  RadioChangeEventTarget,
  RadioGroupButtonStyle,
  RadioGroupContextProps,
  RadioGroupOptionType,
  RadioGroupProps,
  RadioProps,
  RadioRef,
} from './interface'
export { Button, Group }

type CompoundedComponent = React.ForwardRefExoticComponent<
  RadioProps & React.RefAttributes<RadioRef>
> & {
  Group: typeof Group
  Button: typeof Button
  /** @internal */
  __IPASS_RADIO: boolean
}

const Radio = InternalRadio as CompoundedComponent
Radio.Button = Button
Radio.Group = Group
Radio.__IPASS_RADIO = true
export default Radio
