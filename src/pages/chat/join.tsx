import { useEffect } from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { supabaseClient, connectionExists } from '../../services/supabase'

export default function Join() {
  const router = useRouter()
  const connectionCode = router.query.code

  useEffect(() => {

    if(connectionCode) {
      connectionExists(connectionCode).then(res => {
        if(res === true) {
          const redirectTo = `/chat/${connectionCode}`

          if(!connectionCode) {
            router.push('/join/')
          }

          router.push(redirectTo)
        } else {
          alert('Essa conexão não existe. Verifique o código da conexão.')
          router.push('/join/')
        }
      })
    }

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
