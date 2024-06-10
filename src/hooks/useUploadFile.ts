import { File } from '@allara-health/source-health-client'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { useSourceClient } from '../context/elements'

export interface UseUploadFileReturn {
  onUpload: () => void
  isUploading: boolean
}

export interface UseUploadFileArgs {
  onError?: (error: Error) => void
  onUploaded?: (file: File) => void
}

export function useUploadFile(options: UseUploadFileArgs): UseUploadFileReturn {
  const { onError, onUploaded } = options
  const client = useSourceClient()
  const [isUploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>()

  const handleFileChange = useCallback(async () => {
    const inputElement = inputRef.current
    const files = inputElement?.files ?? []
    if (!inputElement || !files || files.length !== 1) {
      return
    }

    const fileToUpload = files[0]

    setUploading(true)

    try {
      const result = await client.files.create({
        purpose: 'message_attachment',
        file: fileToUpload.name,
      })
      if (result) {
        onUploaded?.(result)
      }
    } catch (err) {
      onError?.(err as Error)
    } finally {
      inputElement.value = ''
      setUploading(false)
    }
  }, [onError, onUploaded])

  const onUpload = useCallback(() => {
    inputRef.current?.click()
  }, [inputRef])

  useLayoutEffect(() => {
    const element = document.createElement('input')
    element.setAttribute('type', 'file')
    element.addEventListener('change', handleFileChange)
    element.style.display = 'none'
    document.body.appendChild(element)
    inputRef.current = element

    return () => {
      document.body.removeChild(element)
      inputRef.current = undefined
    }
  }, [handleFileChange])

  return {
    onUpload,
    isUploading,
  }
}
