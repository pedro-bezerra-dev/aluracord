import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import { SupabaseRealtimePayload, RealtimeSubscription } from '@supabase/supabase-js'
import { supabaseClient, getAllMessages, subscribeForChanges } from '../../services/supabase'

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
  const connectionId = router.query.id
  const [messages, setMessages] = useState<Messages>([])
  const [newMessageContent, setNewMessageContent] = useState('')
  const [subscriptionForChanges, setSubscriptionForChanges] = useState<RealtimeSubscription>()

  useEffect(() => {
    const subscription = subscribeForChanges({
      table: 'messages',
      action: 'INSERT',
      callbackForChanges
    })

    getAllMessages().then(messages => setMessages(messages))
    setSubscriptionForChanges(subscription)
  }, [])

  function callbackForChanges(payload:SupabaseRealtimePayload<any>) {
    setMessages((messages) => {
      return [
        ...messages,
        payload.new
      ]
    })
  }

  function handleSendMessage(message: string) {
    const newMessage = {
      from: user?.user_metadata.user_name,
      content: message
    }

    try {
      supabaseClient
        .from('messages')
        .insert([newMessage])
        .then(res => {
          if(res.error) {
            throw new Error
          }
        })
    } catch(error) {
      alert('Algo deu errado. Por favor, tente novamente.')
    }
  }

  function handleShareConnectionLink() {
    if(window) {
      const url = window.location.href
      navigator.clipboard.writeText(url)
      alert('Link da conexão copiado para a área de transferência.')
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
              Compartilhar link
              <Image src={share} alt='Ícone' width={64} height={64} />
            </Button>
            <Button
              className='exit-connection'
              onClick={handleConnectionExit}
            >Sair da conexão</Button>
          </div>
        </header>
        <section className={`chat ${messages.length === 0 ? 'empty' : ''}`}>
          <ul className="messages">
            {
              messages.map(({ id, from, content }) => {
                return (
                  <li key={id} className="message">
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

Chat.Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(10, 21, 31, .98), rgba(10, 21, 31, .98)), url('/hex-pattern.svg'), ${({ theme }) => theme.colors.secondary};

  header {
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
