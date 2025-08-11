import { useState } from 'react'

export function useSorter() {
  const [sortBy, setSortBy] = useState('classId')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  return {
    sortBy,
    sortOrder,
    setSortOrder,
    setSortBy,
  }
}

export interface IUseSorter extends ReturnType<typeof useSorter> {}
