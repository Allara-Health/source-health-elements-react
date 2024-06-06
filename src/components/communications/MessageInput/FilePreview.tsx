import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import React from 'react'

import { MessageCreateAttachmentInputs } from '../../../context/thread'

interface FilePreviewProps {
  files: MessageCreateAttachmentInputs[]
  onRemove: (index: number) => void
}

export const FilePreview: React.FC<FilePreviewProps> = ({ files, onRemove }) => {
  return (
    <Box mt={2}>
      {files?.map((attachment, index) => (
        <Flex
          key={index}
          p={2}
          border="1px solid #ccc"
          borderRadius="md"
          mb={2}
          alignItems="center"
        >
          {attachment.file.mime_type.startsWith('image/') && (
            <Image
              src={attachment.file.url}
              alt={attachment.file.name}
              boxSize="40px"
              objectFit="cover"
              borderRadius="md"
              mr={2}
            />
          )}
          <Box flex="1">
            <Text fontWeight="bold">{attachment.file.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {attachment?.file?.mime_type}
            </Text>
          </Box>
          <IconButton
            size="sm"
            aria-label="Remove file"
            icon={<CloseIcon />}
            onClick={() => onRemove(index)}
          />
        </Flex>
      ))}
    </Box>
  )
}
