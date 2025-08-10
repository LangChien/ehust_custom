import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useQuery = () => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParam = (_searchParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(_searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
      else params.delete(key)
    })
    replace(`${pathname}?${params}`)
  }

  return {
    updateParam,
    searchParams,
  }
}

export interface QueryManager extends ReturnType<typeof useQuery> {}
