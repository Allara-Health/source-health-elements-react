import type { Member, Source } from '@allara-health/source-health-client'
import { createContext, useContext } from 'react'

export interface SourceContextValue {
  /**
   * @private
   *
   * Token used for making API calls.
   *
   * Applications should not access this value directly. It will be provided to API calls
   * transparently by the application
   */
  readonly client: Source

  readonly member: Member | null
}

export const SourceContext = createContext<SourceContextValue | null>(null)

export function useSourceContext(): SourceContextValue {
  const context = useContext(SourceContext)
  if (!context) {
    throw new Error(
      'Could not find SourceElements context; You need to wrap your application in a <SourceElements> provider.',
    )
  }

  return context
}

export function useSourceClient(): Source {
  const { client } = useSourceContext()
  return client
}

export function useMember(): Member | null {
  const { member } = useSourceContext()
  return member
}
