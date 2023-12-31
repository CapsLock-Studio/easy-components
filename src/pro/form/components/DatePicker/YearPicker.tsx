import type { DatePickerProps } from '@/base/date-picker'
import React, { useContext } from 'react'
import FieldContext from '../../FieldContext'
import type { ProFormFieldItemProps } from '../../typing'
import ProFormField from '../Field'

const valueType = 'dateYear' as const
const ProFormDatePickerYear: React.FC<ProFormFieldItemProps<DatePickerProps>> =
  React.forwardRef(({ proFieldProps, fieldProps, ...rest }, ref: any) => {
    const context = useContext(FieldContext)

    return (
      <ProFormField
        ref={ref}
        valueType={valueType}
        fieldProps={{
          getPopupContainer: context.getPopupContainer,
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
        filedConfig={{
          valueType,
          customLightMode: true,
        }}
        {...rest}
      />
    )
  })

export default ProFormDatePickerYear
