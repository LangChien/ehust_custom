import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// thứ trong tuần
export const DAY = {
  2: 'Thứ 2',
  3: 'Thứ 3',
  4: 'Thứ 4',
  5: 'Thứ 5',
  6: 'Thứ 6',
  7: 'Thứ 7',
} as const

export const DAY_TIME = {
  1: 'Sáng',
  2: 'Chiều',
}

export const getUniqueValues = <K extends keyof IClassInfo>(
  courseData: ICourseData | undefined,
  key: K,
): IClassInfo[K] extends string[] ? string[] : string[] => {
  if (!courseData) return []
  const result = new Set<string>()
  courseData.classes.forEach((cls) => {
    if (key == 'teachers') cls.teachers.forEach((teacher) => result.add(teacher.fullName))
    else if (typeof cls[key] == 'string') result.add(cls[key])
  })
  return Array.from(result)
}

export const getFilteredAndSortedClasses = (
  courseData: ICourseData | null,
  filter: {
    classTypeFilter: string
    teacherFilter: string
    day: string
    dayTime: string
  },
  sorter: {
    sortBy: string
    sortOrder: 'asc' | 'desc'
  },
) => {
  if (!courseData) return []
  const { classTypeFilter, teacherFilter, day, dayTime } = filter
  let filteredClasses = courseData.classes

  if (classTypeFilter !== 'all')
    filteredClasses = filteredClasses.filter((cls) => cls.classType === classTypeFilter)
  if (day != 'all')
    filteredClasses = filteredClasses.filter((cls) => cls.timePlaces[0].day === +day)
  if (dayTime != 'all')
    filteredClasses = filteredClasses.filter((cls) => cls.timePlaces[0].dayTime === +dayTime)
  if (teacherFilter !== 'all')
    filteredClasses = filteredClasses.filter((cls) =>
      cls.teachers.some((teacher) => teacher.fullName === teacherFilter),
    )

  // Apply sorting
  const { sortBy, sortOrder } = sorter
  filteredClasses.sort((a, b) => {
    let aValue = a[sortBy as keyof IClassInfo]
    let bValue = b[sortBy as keyof IClassInfo]

    if (sortBy === 'teachers') {
      aValue = a.teachers.join(', ')
      bValue = b.teachers.join(', ')
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  return filteredClasses
}
