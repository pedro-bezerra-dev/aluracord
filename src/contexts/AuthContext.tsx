import { useState, useEffect, createContext, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { supabaseClient } from '../services/supabase'

type AuthContextType = {
  user: User | undefined;
  signInWithGithub: (props:SignInWithGithubProps) => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode;
}

type SignInWithGithubProps = {
  redirectTo?: string;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }:AuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const user = supabaseClient.auth.user()

    if(user) {
      setUser(user)
    }

    const { data: authStateListener } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if(session?.user) {
        setUser(session.user)
      }
      if(session?.user === null || session?.user === undefined) {
        setUser(undefined)
      }

      await fetch('/api/auth-cookie', {
        method: 'POST',
        body: JSON.stringify({ event, session }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })

    supabaseClient
      .auth
      .refreshSession()
      .then(({ user }) => {
        if(user) {
          setUser(user)
        }
      })

    return () => {
      authStateListener?.unsubscribe()
    }
  }, [])

  async function signInWithGithub({ redirectTo }:SignInWithGithubProps) {
    const { error } = await supabaseClient.auth.signIn({
      provider: 'github'
    }, {
      redirectTo
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
