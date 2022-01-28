import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonWrapper } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  outlined?: boolean;
  className?: string;
}

export function Button({ children, outlined, className, ...props }:ButtonProps) {
  return (
    <ButtonWrapper
      className={`${outlined ? 'highlighted-bold outlined' : 'highlighted-bold'} ${className}`}
      {...props}
    >
      {children}
    </ButtonWrapper>
  )
}
