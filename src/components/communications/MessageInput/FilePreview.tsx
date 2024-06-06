import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import React from 'react'

export interface FileInfo {
  name: string
  size: number
  type: string
  url: string
}

interface FilePreviewProps {
  files: FileInfo[]
  onRemove: (index: number) => void
}

export const FilePreview: React.FC<FilePreviewProps> = ({ files, onRemove }) => {
  return (
    <Box mt={2}>
      {files.map((file, index) => (
        <Flex
          key={index}
          p={2}
          border="1px solid #ccc"
          borderRadius="md"
          mb={2}
          alignItems="center"
        >
          {file.type.startsWith('image/') && (
            <Image
              src={file.url}
              alt={file.name}
              boxSize="40px"
              objectFit="cover"
              borderRadius="md"
              mr={2}
            />
          )}
          <Box flex="1">
            <Text fontWeight="bold">{file.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {file.type}
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
