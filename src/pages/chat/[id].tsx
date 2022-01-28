import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'

import { Button } from '../../components/Button'

import share from '../../assets/icons/share.svg'

type ChatProps = {
  supabaseAnonKey: string;
  supabaseUrl: string;
}

export default function Chat({ supabaseAnonKey, supabaseUrl }:ChatProps) {
  const router = useRouter()
  const connectionId = router.query.id
  const [newMessageContent, setNewMessageContent] = useState('')

  function handleSendMessage(message: string) {
    console.log(message, 'enviada!')
  }

  return (
    <>
      <Head>
        <title>Aluracord - Chat com [n] pessoas</title>
      </Head>

      <Chat.Wrapper>
        <header>
          <h2 className="title">9 pessoas conectadas</h2>
          <div className="action-buttons">
            <Button className='share-link'>
              Compartilhar link
              <Image src={share} alt='Ícone' width={64} height={64} />
            </Button>
            <Button className='exit-connection'>Sair da conexão</Button>
          </div>
        </header>
        <section className="chat">
          <ul className="messages">
            <li className="message">
              <div className="user-info">
                <div className="avatar">
                  <Image
                    src='https://github.com/peas.png'
                    alt='avatar'
                    width={32}
                    height={32}
                  />
                </div>
                <span className="name highlighted-bold">Peas</span>
              </div>
              <p className="body">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, nihil corrupti. Eius ut cupiditate vitae accusamus sed quidem dolor aliquam sunt, aliquid quis totam rerum vero labore, quo, eos ex?</p>
            </li>
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
          <Button>Enviar</Button>
        </div>
      </Chat.Wrapper>
    </>
  )
}

export async function getServerSideProps() {
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ? process.env.SUPABASE_ANON_KEY : null
  const supabaseUrl = process.env.SUPABASE_URL ? process.env.SUPABASE_URL : null

  return {
    props: {
      supabaseAnonKey,
      supabaseUrl
    }
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
    }
  }
`
