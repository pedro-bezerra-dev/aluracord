import { InputHTMLAttributes } from 'react';
import { TextFieldWrapper } from './styles'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>

export function TextField({ ...props }:TextFieldProps) {
  return (
    <TextFieldWrapper
      className='highlighted-light'
      {...props}
    />
  )
}
