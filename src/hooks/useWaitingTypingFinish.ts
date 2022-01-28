import { useState } from 'react'

export function useWaitingTypingFinish(searchTimeout:NodeJS.Timeout | undefined) {
  const [typingFinished, setTypingFinished] = useState(false)

  function onKeyPressCallback() {
    setTypingFinished(false)

    if(searchTimeout !== undefined) {
      clearTimeout(searchTimeout)
    }

    searchTimeout = setTimeout(() => {
      setTypingFinished(true)

      if(searchTimeout !== undefined) {
        clearTimeout(searchTimeout)
      }
    }, 2000)
  }

  return { typingFinished, onKeyPressCallback }
}
