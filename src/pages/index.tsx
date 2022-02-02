import { FormEvent } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Button } from '../components/Button'
import { GithubLoginButton } from '../components/GithubLoginButton'
import { UserInfoCard } from '../components/UserInfoCard'

export default function Home() {
  const router = useRouter()

  function handleConnectionCreation(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <>
      <Head>
        <title>Aluracord - Crie sua conexão</title>
      </Head>

      <Home.Wrapper>
        <div className="container">
          <div className="form-container">
            <h1 className="title">Crie uma nova conexão</h1>
            <GithubLoginButton>Criar conexão com o GitHub</GithubLoginButton>
            <span className="divisor body">ou</span>
            <Button
              onClick={() => router.push('/join')}
            >
              Entrar numa conexão
            </Button>
          </div>
          <UserInfoCard />
        </div>
      </Home.Wrapper>
    </>
  )
}

Home.Wrapper = styled.main`
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
