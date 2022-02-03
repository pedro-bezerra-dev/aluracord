import { useEffect } from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { supabaseClient } from '../../services/supabase'

export default function Join() {
  const router = useRouter()
  const connectionCode = router.query.code

  useEffect(() => {
    const redirectTo = `/chat/${connectionCode}`

    if(!connectionCode) {
      router.push('/join/')
    }

    router.push(redirectTo)
  }, [router, connectionCode])

  return null
}

export async function getServerSideProps(ctx:any) {
  const cookies = nookies.get(ctx)
  const sbToken = cookies['sb:token']
  const { user } = await supabaseClient.auth.api.getUser(sbToken)

  if(!user) {
    return {
      redirect: {
        destination: '/join/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
