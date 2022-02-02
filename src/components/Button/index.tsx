import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonWrapper } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }:ButtonProps) {
  return (
    <ButtonWrapper
      className={`highlighted-bold ${className}`}
      {...props}
    >
      {children}
    </ButtonWrapper>
  )
}
