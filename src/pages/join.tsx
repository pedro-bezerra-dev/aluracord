import { useState, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { TextField } from '../components/TextField'

export default function Join() {
  const router = useRouter()
  const [githubUser, setGithubUser] = useState('')
  const [typingFinished, setTypingFinished] = useState(false)
  const [userIsValid, setUserIsValid] = useState(false)
  const [connectionLink, setConnectionLink] = useState('')
  var searchTimeout: NodeJS.Timeout | undefined

  useEffect(() => {
    if(githubUser !== '' && typingFinished) {
      fetch(`https://api.github.com/users/${githubUser}`).then(res => {
        if(res.status === 200) {
          setUserIsValid(true)
        } else if(res.status === 404) {
          setUserIsValid(false)
        }
      })
    }
  }, [githubUser, typingFinished])

  function handleJoinTheConnection(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <Join.Wrapper>
      <div className="container">
        <div className="form-container">
          <h1 className="title">Entre numa conexão existente</h1>
          <form onSubmit={(event) => handleJoinTheConnection(event)}>
            <TextField
              value={githubUser}
              onChange={(event) => setGithubUser(event.target.value)}
              placeholder='Digite seu usuário do GitHub'
              onKeyPress={() => {
                setTypingFinished(false)

                if(searchTimeout !== undefined) {
                  clearTimeout(searchTimeout)
                }

                searchTimeout = setTimeout(() => setTypingFinished(true), 1500)
              }}
            />
            <TextField
              value={connectionLink}
              onChange={(event) => setConnectionLink(event.target.value)}
              placeholder='Insira o link da conexão'
            />
            <Button>Entrar na conexão</Button>
          </form>
          <span className="divisor body">ou</span>
          <Button
            onClick={() => router.push('/')}
            outlined
          >Crie uma nova conexão</Button>
        </div>
        <div className="user-info">
          <div className="avatar">
            {
              userIsValid && githubUser.length > 3 && (
                <>
                  <Image
                    src={`https://github.com/${githubUser}.png`}
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
              githubUser ? githubUser : 'Seu usuário'
            }
          </h2>
        </div>
      </div>
    </Join.Wrapper>
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
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 48px;
    background: ${({ theme }) => theme.colors.secondary};
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .25);
    border-radius: 15px;

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 96px;
      height: 96px;
      background: rgba(255, 255, 255, .05);
      border-radius: 50%;
      overflow: hidden;
      position: relative;

      &::before {
        content: '';
        width: 32px;
        height: 32px;
        background: rgba(255, 255, 255, .1);
        border-radius: 50%;
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
      }
      &::after {
        content: '';
        width: 64px;
        height: 72px;
        background: rgba(255, 255, 255, .1);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      background: rgba(255, 255, 255, .05);
      color: #fff;
      border-radius: 5px;
      max-width: 200px;
      text-align: center;
      overflow-x: auto;
    }
  }
`
