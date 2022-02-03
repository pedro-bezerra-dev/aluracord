import { useEffect } from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { supabaseClient, createConnection } from '../../services/supabase'

import { useAuth } from '../../hooks/useAuth'

export default function Chat() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    createConnection(user?.user_metadata.user_name)
      .then((connectionCode) => {
        const redirectTo = `/chat/${connectionCode}`

        router.push(redirectTo)
      })
  }, [router, user])

  return null
}

export async function getServerSideProps(ctx:any) {
  const cookies = nookies.get(ctx)
  const sbToken = cookies['sb:token']
  const { user } = await supabaseClient.auth.api.getUser(sbToken)

  if(!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
