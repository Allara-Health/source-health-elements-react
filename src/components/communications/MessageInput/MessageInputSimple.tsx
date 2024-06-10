import { ChakraProvider } from '@chakra-ui/react'
import React, { FunctionComponent, useCallback, useRef } from 'react'

import { useMessageInputContext } from '../../../context/input'
import { useClassFactory, useFocusTracking } from '../../../hooks'
import { AutosizeTextarea } from '../../AutosizeTextarea'

import { AttachFileButton } from './AttachFileButton'
import { FilePreview } from './FilePreview'
import { SendMessageButton } from './SendMessageButton'

export const MessageInputSimple: FunctionComponent<unknown> = () => {
  const className = useClassFactory('comms', 'message-input')
  const ref = useRef<HTMLTextAreaElement>(null)
  const { text, handleChange, send, attachments, setAttachments, attachFileToMessage } =
    useMessageInputContext()
  const isFocused = useFocusTracking(ref)
  const classNames = [
    className(),
    isFocused ? className('focused') : '',
    (text || attachments?.length) ?? false ? className('has-text') : '',
  ].join(' ')
  const handleClick = useCallback(() => send(), [send])

  const handleRemoveFile = (index: number) => {
    const newFiles = attachments?.filter((_, i) => i !== index)
    setAttachments(newFiles ?? [])
  }

  return (
    <ChakraProvider>
      <div className={classNames}>
        <div className={className('input-area')}>
          <AutosizeTextarea
            className={className('textarea')}
            placeholder="Enter message..."
            ref={ref}
            onChange={handleChange}
            value={text}
          />
          <div className={className('action-buttons')}>
            <AttachFileButton onFileAttached={attachFileToMessage} />
            <SendMessageButton
              className={className('send-button')}
              size={20}
              onClick={handleClick}
            />
          </div>
        </div>
        {attachments && attachments.length > 0 && (
          <div className={className('file-previews')}>
            <FilePreview files={attachments} onRemove={handleRemoveFile} />
          </div>
        )}
      </div>
    </ChakraProvider>
  )
}
