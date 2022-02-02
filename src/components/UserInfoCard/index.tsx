import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut } from '../../services/supabase'

import { useAuth } from '../../hooks/useAuth'

import { UserInfoCardWrapper } from './styles'

export function UserInfoCard() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <UserInfoCardWrapper>
      <button
        aria-label='Fazer logout'
        title='Fazer logout'
        className="logout-button"
        style={{
          display: user === undefined ? 'none' : '',
        }}
        onClick={() => {
          signOut().then(() => {
            router.reload()
          })
        }}
      >
        <span className="highlighted-bold">Logout</span>
        <span className="icon" />
      </button>
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
