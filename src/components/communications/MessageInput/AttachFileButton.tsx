import { AttachmentIcon } from '@chakra-ui/icons'
import { IconButton, useToast } from '@chakra-ui/react'
import React, { useCallback, useRef } from 'react'

import { FileInfo } from './FilePreview'

export const AttachFileButton = ({
  setFiles,
}: {
  setFiles: (files: FileInfo[]) => void
}): JSX.Element => {
  const toast = useToast()
  const importFileRef = useRef<HTMLInputElement>(null)

  const handleChooseFile = useCallback(() => {
    if (importFileRef.current && importFileRef.current.files?.length) {
      const fileInfos: FileInfo[] = []

      for (let i = 0; i < importFileRef.current.files.length; i++) {
        const file = importFileRef.current.files.item(i)
        console.log(file)

        if (file) {
          if (file.size > 5000000) {
            toast({
              status: 'error',
              title: 'Upload failed',
              description: 'File size is too large',
            })
          } else {
            fileInfos.push({
              name: file.name,
              size: file.size,
              type: file.type,
              url: URL.createObjectURL(file),
            })
          }
        }
      }

      setFiles(fileInfos)
    }
  }, [toast])

  const handleButtonClick = () => {
    importFileRef.current?.click()
  }

  return (
    <>
      <input
        multiple
        id="choose-file-input"
        ref={importFileRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleChooseFile}
        style={{ display: 'none' }}
      />
      <IconButton
        size="XS"
        aria-label="Attach File"
        icon={<AttachmentIcon />}
        onClick={handleButtonClick}
        variant="ghost"
        pr={2}
        sx={{
          _hover: {
            background: 'none',
          },
          _focus: {
            boxShadow: 'none',
          },
          _active: {
            background: 'none',
          },
        }}
      />
    </>
  )
}
