import { useState, useEffect } from 'react'
import Image from 'next/image'

import { UserInfoCardWrapper } from './styles'

type UserInfoCardProps = {
  githubUser: string;
  typingFinished: boolean;
}

export function UserInfoCard({ githubUser, typingFinished }:UserInfoCardProps) {
  const [userIsValid, setUserIsValid] = useState(false)

  useEffect(() => {
    if(githubUser !== '' && typingFinished) {
      fetch(`https://api.github.com/users/${githubUser}`).then(res => {
        if(res.status === 200) {
          setUserIsValid(true)
        } else if(res.status === 404) {
          setUserIsValid(false)
        }
      })
    }
  }, [githubUser, typingFinished])

  return (
    <UserInfoCardWrapper>
      <div
        className={
          'avatar' +
          ' ' +
          `${githubUser === '' || githubUser.length < 3 ? 'empty' : ''}` +
          ' ' +
          `${githubUser !== '' && githubUser.length >= 3 && !typingFinished ? 'loading' : ''}`
        }
      >
        {
          userIsValid && githubUser.length > 3 && (
            <>
              <Image
                src={`https://github.com/${githubUser}.png`}
                alt="GitHub avatar"
                objectFit='cover'
                width={96}
                height={96}
              />
            </>
          )
        }
      </div>
      <h2 className="name highlighted-bold">
        {
          githubUser ? githubUser : 'Seu usuário'
        }
      </h2>
    </UserInfoCardWrapper>
  )
}
