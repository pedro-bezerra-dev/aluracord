import { useEffect, ButtonHTMLAttributes, ReactNode } from 'react'
import Image from 'next/image'

import { useAuth } from '../../hooks/useAuth'

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
  const { user, signInWithGithub } = useAuth()

  async function handleSignInWithGithub() {
    if(user === undefined) {
      await signInWithGithub()
    }
  }

  return (
    <GithubLoginButtonWrapper
      className={`highlighted-bold ${className}`}
      onClick={handleSignInWithGithub}
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
