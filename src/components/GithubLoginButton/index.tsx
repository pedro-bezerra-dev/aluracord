import { ButtonHTMLAttributes, ReactNode } from 'react'
import Image from 'next/image'

import { GithubLoginButtonWrapper } from './styles'

import githubIcon from '../../assets/icons/github.svg'

type GithubLoginButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
}

export function GithubLoginButton({
  children,
  className,
  ...props
}:GithubLoginButtonProps) {
  return (
    <GithubLoginButtonWrapper
      className={`highlighted-bold ${className}`}
      {...props}
    >
      <Image
        src={githubIcon}
        alt='GitHub icon'
        width={32}
        height={32}
      />
      {children}
    </GithubLoginButtonWrapper>
  )
}
