import { useState } from 'react'

export function useFilter() {
  // Filter and sort states
  const [classTypeFilter, setClassTypeFilter] = useState('all')
  const [teacherFilter, setTeacherFilter] = useState('all')
  const [day, setDay] = useState('all')
  const [dayTime, setDayTime] = useState('all')

  return {
    classTypeFilter,
    teacherFilter,
    day,
    setDayTime,
    setDay,
    dayTime,
    setClassTypeFilter,
    setTeacherFilter,
  }
}

export interface IUseFilter extends ReturnType<typeof useFilter> {}
