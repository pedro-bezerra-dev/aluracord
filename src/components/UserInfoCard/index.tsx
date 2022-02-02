import { useState, useEffect } from 'react'
import Image from 'next/image'

import { useAuth } from '../../hooks/useAuth'

import { UserInfoCardWrapper } from './styles'

export function UserInfoCard() {
  const { user } = useAuth()

  return (
    <UserInfoCardWrapper>
      <div
        className={`avatar ${user ? '' : 'empty'}`}
      >
        {
          user && (
            <>
              <Image
                src={`https://github.com/${user.user_metadata.user_name}.png`}
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
          user ? user.user_metadata.user_name : 'Seu usuário aqui'
        }
      </h2>
    </UserInfoCardWrapper>
  )
}
