import { useState } from 'react'

export function useToolbar() {
  // Filter and sort states
  const [classTypeFilter, setClassTypeFilter] = useState('all')
  const [teacherFilter, setTeacherFilter] = useState('all')
  const [sortBy, setSortBy] = useState('classId')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  return {
    classTypeFilter,
    teacherFilter,
    sortBy,
    sortOrder,
    setSortOrder,
    setSortBy,
    setClassTypeFilter,
    setTeacherFilter,
  }
}

export interface IUseToolbar extends ReturnType<typeof useToolbar> {}
