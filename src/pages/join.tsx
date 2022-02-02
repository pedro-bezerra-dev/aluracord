import { useState, useEffect, FormEvent } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Button } from '../components/Button'
import { GithubLoginButton } from '../components/GithubLoginButton'
import { TextField } from '../components/TextField'
import { UserInfoCard } from '../components/UserInfoCard'

export default function Join() {
  const router = useRouter()
  const [connectionLink, setConnectionLink] = useState('')

  function handleJoinTheConnection(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <>
      <Head>
        <title>Aluracord - Conecte-se a outros</title>
      </Head>

      <Join.Wrapper>
        <div className="container">
          <div className="form-container">
            <h1 className="title">Entre numa conexão existente</h1>
            <form onSubmit={(event) => handleJoinTheConnection(event)}>
              <TextField
                value={connectionLink}
                onChange={(event) => setConnectionLink(event.target.value)}
                placeholder='Insira o código da conexão'
              />
              <GithubLoginButton>Entrar na conexão com o GitHub</GithubLoginButton>
            </form>
            <span className="divisor body">ou</span>
            <Button
              onClick={() => router.push('/')}
            >Crie uma nova conexão</Button>
          </div>
          <UserInfoCard />
        </div>
      </Join.Wrapper>
    </>
  )
}

Join.Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(10, 21, 31, .9), rgba(10, 21, 31, .9)), url('./hex-pattern.svg'), ${({ theme }) => theme.colors.secondary};

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    padding: 48px;
    background: ${({ theme }) => theme.colors.tertiary};
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .25);
    border-radius: 15px;
  }
  .form-container {
    h1 {
      color: #fff;
      margin-bottom: 24px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .divisor {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
      color: ${({ theme }) => theme.colors.quintenary};
      font-size: 14px;
      margin: 16px 0;

      &::before {
        content: '';
        width: 45%;
        height: 1px;
        background: ${({ theme }) => theme.colors.quintenary};
        position: absolute;
        top: 50%;
        left: 0;
      }
      &::after {
        content: '';
        width: 45%;
        height: 1px;
        background: ${({ theme }) => theme.colors.quintenary};
        position: absolute;
        top: 50%;
        right: 0;
      }
    }
  }
`
