import { ChakraProvider, GridItem, Grid } from '@chakra-ui/react'
import React, { FunctionComponent, useCallback, useRef, useState } from 'react'

import { useMessageInputContext } from '../../../context/input'
import { useClassFactory, useFocusTracking } from '../../../hooks'
import { AutosizeTextarea } from '../../AutosizeTextarea'

import { AttachFileButton } from './AttachFileButton'
import { FileInfo, FilePreview } from './FilePreview'
import { SendMessageButton } from './SendMessageButton'

export const MessageInputSimple: FunctionComponent<unknown> = () => {
  const className = useClassFactory('comms', 'message-input')
  const ref = useRef<HTMLTextAreaElement>(null)
  const { text, handleChange, send } = useMessageInputContext()
  const [files, setFiles] = useState<FileInfo[]>([])
  const isFocused = useFocusTracking(ref)
  const classNames = [
    className(),
    isFocused ? className('focused') : '',
    text || files.length > 0 ? className('has-text') : '',
  ].join(' ')
  const handleClick = useCallback(() => send(), [send])

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
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
            <AttachFileButton setFiles={setFiles} />
            <SendMessageButton
              className={className('send-button')}
              size={20}
              onClick={handleClick}
            />
          </div>
        </div>
        {files.length > 0 && (
          <div className={className('file-previews')}>
            <FilePreview files={files} onRemove={handleRemoveFile} />
          </div>
        )}
      </div>
    </ChakraProvider>
  )
}
