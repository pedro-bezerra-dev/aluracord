import { useState, useEffect, createContext, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { supabaseClient } from '../services/supabase'

type AuthContextType = {
  user: User | undefined;
  signInWithGithub: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }:AuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    try {
      supabaseClient
        .auth
        .refreshSession()
        .then(({ user, error }) => {
          if(error) {
            throw new Error
          }

          if(user) {
            setUser(user)
          }
        })
    } catch(error) {
      alert('Não conseguimos atualizar a sua sessão. Por favor, faça login novamente.')
    }
  }, [])

  async function signInWithGithub() {
    try {
      const { error } = await supabaseClient.auth.signIn({
        provider: 'github'
      })

      if(error) {
        throw new Error
      }
    } catch(error) {
      alert('Algo deu errado. Por favor, tente novamente.')
    } finally {
      const user = supabaseClient.auth.user()

      if(user) {
        setUser(user)
      }
    }
  }

  return (
    <AuthContext.Provider value={{user, signInWithGithub}}>
      {children}
    </AuthContext.Provider>
  )
}
