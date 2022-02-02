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
    const user = supabaseClient.auth.user()

    if(user) {
      setUser(user)
    }

    supabaseClient
      .auth
      .refreshSession()
      .then(({ user }) => {
        if(user) {
          setUser(user)
        }
      })
  }, [])

  async function signInWithGithub() {
    const { error } = await supabaseClient.auth.signIn({
      provider: 'github'
    })

    if(error) {
      throw new Error
    }
  }

  return (
    <AuthContext.Provider value={{user, signInWithGithub}}>
      {children}
    </AuthContext.Provider>
  )
}
