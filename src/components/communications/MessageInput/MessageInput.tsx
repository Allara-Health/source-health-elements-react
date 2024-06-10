import React, {
  ChangeEvent,
  ComponentType,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react'

import { MessageInputContext, MessageInputContextValue } from '../../../context/input'
import { ComposerFileAttachment, useThreadContext } from '../../../context/thread'

import { MessageInputSimple } from './MessageInputSimple'

export interface MessageInputProps {
  /**
   * Provide a custom message input conponent
   */
  InputComponent?: ComponentType
}

export const MessageInput: FunctionComponent<MessageInputProps> = ({
  InputComponent = MessageInputSimple,
}) => {
  const [text, setText] = useState('')
  const [attachments, setAttachments] = useState<MessageInputContextValue['attachments']>([])
  const { sendMessage } = useThreadContext()

  const attachFileToMessage = useCallback(
    (file: ComposerFileAttachment) => {
      setAttachments((prevAttachments) => [...(prevAttachments || []), file])
    },
    [setAttachments],
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.currentTarget.value)
    },
    [setText],
  )

  const send = useCallback(() => {
    sendMessage({
      text,
      attachments,
    })

    setText('')
    setAttachments([])
  }, [text, setText, attachments, setAttachments])

  const contextValue: MessageInputContextValue = useMemo(
    () => ({
      text,
      setText,
      handleChange,
      send,
      attachments,
      setAttachments,
      attachFileToMessage,
    }),
    [text, setText, handleChange, send, attachments, setAttachments],
  )

  return (
    <MessageInputContext.Provider value={contextValue}>
      <InputComponent />
    </MessageInputContext.Provider>
  )
}
