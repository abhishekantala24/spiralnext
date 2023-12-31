
import React from "react"
import { Col } from "react-bootstrap"
import Form from "react-bootstrap/Form"

import { TextInputProps } from "./types"

const TextInput: React.FC<TextInputProps> = (props: TextInputProps): JSX.Element => {
  const {
    controlId,
    label,
    type,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    formGroupClassName,
    inputClassName,
    touched,
    errors,
    disabled,
    restProps,
    rightIcon,
    tooltip,
    maxLength,
    autoComplete,
  } = props

  return (
    <Form.Group as={Col} className={formGroupClassName} controlId={controlId}>
      {label && (
        <Form.Label>
          <span>{label}</span>
          {tooltip && (
            <span className="tooltip">
              {tooltip.icon}
              <span className="tooltiptext">{tooltip.title}</span>
            </span>
          )}
        </Form.Label>
      )}
      {rightIcon ? (
        <div className="input-group">
          <Form.Control
            type={type}
            name={name}
            value={value}
            autoComplete={autoComplete}
            onChange={onChange}
            onBlur={onBlur}
            isValid={touched && !errors}
            isInvalid={touched && !!errors}
            placeholder={placeholder}
            className={inputClassName}
            disabled={disabled}
            as="input"
            {...restProps}
          />
          <span
            className="input-group-text eslint-input-group-text"
            onClick={rightIcon.onRightIconPress}
            role="button"
            aria-hidden
          >
            {rightIcon.state ? rightIcon.toggleON : rightIcon.toggleOff}
          </span>

          <Form.Control.Feedback type="invalid">{touched && errors as React.ReactNode}</Form.Control.Feedback>
        </div>
      ) : (
        <>
          <Form.Control
            type={type}
            name={name}
            value={value}
            autoComplete={autoComplete}
            onChange={onChange}
            onBlur={onBlur}
            isValid={touched && !errors}
            isInvalid={touched && !!errors}
            placeholder={placeholder}
            className={inputClassName}
            disabled={disabled}
            maxLength={maxLength}
            as="input"
            {...restProps}
          />
          <Form.Control.Feedback type="invalid">{touched && errors as React.ReactNode}</Form.Control.Feedback>
        </>
      )}
    </Form.Group>
  )
}

TextInput.defaultProps = {
  errors: "",
  touched: false,
  inputClassName: "",
  formGroupClassName: "",
  placeholder: "",
  onChange: () => {},
  onBlur: () => {},
  label: "",
  disabled: false,
  restProps: {},
  rightIcon: undefined,
  tooltip: undefined,
  maxLength: undefined,
  autoComplete: "on",
}

export default TextInput