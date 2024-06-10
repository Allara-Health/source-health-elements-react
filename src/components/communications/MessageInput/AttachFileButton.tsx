import { AttachmentIcon } from '@chakra-ui/icons'
import { IconButton, useToast } from '@chakra-ui/react'
import React from 'react'

import { ComposerFileAttachment } from '../../../context/thread'
import { useUploadFile } from '../../../hooks/useUploadFile'

interface AttachFileButtonProps {
  onFileAttached: (file: ComposerFileAttachment) => void
}

export const AttachFileButton = ({ onFileAttached }: AttachFileButtonProps): JSX.Element => {
  const toast = useToast()
  // const importFileRef = useRef<HTMLInputElement>(null)
  const { onUpload, isUploading } = useUploadFile({
    onUploaded: (file) => {
      onFileAttached({
        type: 'file',
        file,
      })
    },
    onError: () => {
      toast({
        status: 'error',
        title: 'common.files.uploadFailed',
        description: 'Error uploading file',
      })
    },
  })

  return (
    <>
      <IconButton
        size="XS"
        aria-label="Attach File"
        icon={<AttachmentIcon />}
        onClick={onUpload}
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
        isLoading={isUploading}
      />
    </>
  )
}
