import { FormikErrors, FormikTouched } from "formik"
import { ReactNode } from "react"

export type TextInputProps = {
  input?: any
  type: string
  autoComplete?: string
  name?: string
  formatField?: string
  value: string | undefined
  controlId?: string
  label?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  onFocus?: (e: any) => void
  placeholder?: string
  formGroupClassName?: string
  inputClassName?: string
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined
  errors?: string | FormikErrors<any> | string[] | FormikErrors<any>[] | undefined
  disabled?: boolean
  restProps?: Object
  maxLength?: number
  rightIcon?: {
    state: boolean
    toggleON: ReactNode
    toggleOff: ReactNode
    onRightIconPress: () => void
  }
  tooltip?: {
    title?: string | ReactNode
    icon: ReactNode
  }
}

export type FormChangeEventType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>