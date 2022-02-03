import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import nookies from 'nookies'
import { SupabaseRealtimePayload, RealtimeSubscription } from '@supabase/supabase-js'
import {
  supabaseClient,
  getMessages,
  subscribeForChanges,
  insertNewMessage
} from '../../services/supabase'

import { useAuth } from '../../hooks/useAuth'

import { Button } from '../../components/Button'

import share from '../../assets/icons/share.svg'

type Message = {
  id?: number;
  created_at?: string;
  from: string;
  content: string;
}

type Messages = Array<Message>

export default function Chat() {
  const { user } = useAuth()
  const router = useRouter()
  const connectionCode = router.query.id
  const [messages, setMessages] = useState<Messages>([])
  const [loading, setLoading] = useState(true)
  const [newMessageContent, setNewMessageContent] = useState('')
  const [subscriptionForChanges, setSubscriptionForChanges] = useState<RealtimeSubscription>()

  useEffect(() => {
    function callbackForChanges(payload:SupabaseRealtimePayload<any>) {
      if(payload.new.connection_code === connectionCode) {
        setMessages((messages) => {
          return [
            ...messages,
            payload.new
          ]
        })
      }
    }

    const subscription = subscribeForChanges({
      table: 'messages',
      action: 'INSERT',
      callbackForChanges
    })

    if(typeof connectionCode === 'string') {
      getMessages(connectionCode).then(messages => {
        setMessages(messages)
        setLoading(false)
      })
    }
    setSubscriptionForChanges(subscription)
  }, [connectionCode])

  function handleSendMessage(message: string) {
    const newMessage = {
      connection_code: connectionCode,
      from: user?.user_metadata.user_name,
      content: message
    }

    insertNewMessage(newMessage)
  }

  function handleShareConnectionLink() {
    if(window && typeof connectionCode === 'string') {
      navigator.clipboard.writeText(connectionCode)
      alert('Código da conexão copiado para a área de transferência.')
    }
  }

  function handleConnectionExit() {
    if(subscriptionForChanges) {
      try {
        supabaseClient
          .removeSubscription(subscriptionForChanges)
          .then(res => {
            if(res.error) {
              throw new Error
            }

            router.push('/')
          })
      } catch(error) {
        alert('Algo deu errado. Por favor, tente novamente.')
      }
    }
  }

  return (
    <>
      <Head>
        <title>Aluracord - Chat</title>
      </Head>

      <Chat.Wrapper>
        <header>
          <h2 className="title">Aluracord</h2>
          <div className="action-buttons">
            <Button
              className='share-link'
              onClick={handleShareConnectionLink}
            >
              Compartilhar código
              <Image src={share} alt='Ícone' width={24} height={24} />
            </Button>
            <Button
              className='exit-connection'
              onClick={handleConnectionExit}
            >Sair da conexão</Button>
          </div>
        </header>
        <section className={`chat ${loading ? 'empty' : ''}`}>
          <ul className="messages">
            {
              messages.map(({ id, created_at, from, content }) => {
                return (
                  <li key={id} className="message">
                    <header>
                      <div className="user-info">
                        <div className="avatar">
                          <Image
                            src={`https://github.com/${from}.png`}
                            alt='avatar'
                            width={32}
                            height={32}
                          />
                        </div>
                        <span className="name highlighted-bold">{from}</span>
                      </div>
                      <span className="creation-date highlighted-bold">{
                        created_at ?
                        `${new Date(created_at).toLocaleDateString()} | ${new Date(created_at).getHours()}:${new Date(created_at).getMinutes()}`
                        :
                        ''
                      }</span>
                    </header>
                    <p className="body">{content}</p>
                  </li>
                )
              })
            }
          </ul>
        </section>
        <div className="message-editor">
          <textarea
            className="highlighted-light"
            title='Digite sua mensagem'
            placeholder='Digite sua mensagem...'
            value={newMessageContent}
            onChange={(event) => setNewMessageContent(event.target.value)}
            onKeyPress={(event) => {
              if(event.key === 'Enter' && !event.shiftKey) {
                handleSendMessage(newMessageContent)
                setNewMessageContent('')
                event.preventDefault()
              }
            }}
          />
          <Button
            onClick={(event) => {
              handleSendMessage(newMessageContent)
              setNewMessageContent('')
              event.preventDefault()
            }}
          >
            Enviar
          </Button>
        </div>
      </Chat.Wrapper>
    </>
  )
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

Chat.Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(10, 21, 31, .98), rgba(10, 21, 31, .98)), url('/hex-pattern.svg'), ${({ theme }) => theme.colors.secondary};

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 32px;
    width: 100%;
    background: ${({ theme }) => theme.colors.tertiary};
    box-shadow: 0 5px 5px rgba(0, 0, 0, .25);

    h2 {
      color: ${({ theme }) => theme.colors.quintenary};
      font-size: 24px;
    }
    .action-buttons {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        color: ${({ theme }) => theme.colors.secondary};
        border: none;
      }
      .share-link {
        display: flex;
        align-items: center;
        gap: 8px;
        background: ${({ theme }) => theme.colors.quintenary};
        white-space: nowrap;

        &:hover {
          box-shadow: 0 0 5px ${({ theme }) => theme.colors.quintenary};
        }

        span {
          width: 24px !important;
          height: 24px !important;
        }
      }
      .exit-connection {
        background: #cf6679;

        &:hover {
          box-shadow: 0 0 5px #cf6679;
        }
      }
    }
  }
  .chat {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    max-width: 100%;
    height: 100%;
    padding: 16px 32px 32px;
    position: relative;
    overflow-y: auto;

    &.empty {
      &::before {
        content: '';
        width: 96px;
        height: 96px;
        background: conic-gradient(#fff, ${({ theme }) => theme.colors.secondary});
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: loading 1.5s linear infinite;
      }
      &::after {
        content: '';
        width: 80px;
        height: 80px;
        background: ${({ theme }) => theme.colors.secondary};
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .messages {
      display: flex;
      flex-direction: column;

      .message {
        display: flex;
        flex-direction: column;
        gap: 16px;
        list-style: none;
        margin-top: 24px;

        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
        }
        .name {
          color: ${({ theme }) => theme.colors.primary};
        }
        .creation-date {
          color: ${({ theme }) => theme.colors.quintenary};
          opacity: 0.7;
          font-size: 14px;
          letter-spacing: 1px;
        }
        p {
          color: #fff;
        }
      }
    }
  }
  .message-editor {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 16px 32px;

    textarea {
      flex: 9;
      display: flex;
      align-items: center;
      border: none;
      border-radius: 15px;
      padding: 16px 24px;
      width: 100%;
      height: 80px;
      background: #fff;
      color: ${({ theme }) => theme.colors.tertiary};
      resize: none;

      &::placeholder {
        color: ${({ theme }) => theme.colors.tertiary};
        opacity: .75;
      }
      &:focus-visible {
        outline-color: ${({ theme }) => theme.colors.tertiary};
      }
    }
    button {
      flex: 1;
      height: 80px;
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  @keyframes loading {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }
`
