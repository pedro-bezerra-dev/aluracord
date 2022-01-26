import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonWrapper } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  outlined?: boolean;
}

export function Button({ children, outlined, ...props }:ButtonProps) {
  return (
    <ButtonWrapper className={outlined ? 'highlighted-bold outlined' : 'highlighted-bold'} {...props}>
      {children}
    </ButtonWrapper>
  )
}
