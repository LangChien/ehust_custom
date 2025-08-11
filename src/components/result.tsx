'use client'
import { useFilter } from '@/hooks/use-filter'
import { useSorter } from '@/hooks/use-sort'
import { getFilteredAndSortedClasses } from '@/lib/utils'
import { use } from 'react'
import { ClassInfo } from './class-info'
import { CourseInfo } from './course-info'
import { ClassFilter } from './filter'
import { ClassSorter } from './sorter'

export function CourseResult({ data }: { data: Promise<ICourseData | null> }) {
  const courseData = use(data)
  const classFilter = useFilter()
  const classSorter = useSorter()
  // Get filtered and sorted classes
  const dataDisplay = getFilteredAndSortedClasses(courseData, classFilter, classSorter)
  if (!courseData) return null

  return (
    <div className='space-y-6'>
      {/* Course Info */}
      <CourseInfo courseData={courseData} />

      {/* Filters and Sort */}
      <ClassFilter courseData={courseData} classFilter={classFilter} />

      {/* Classes List */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold'>Danh sách lớp ({dataDisplay.length} lớp)</h3>
          <ClassSorter classSorter={classSorter} />
        </div>
        <div className='grid gap-4'>
          {dataDisplay.map((classInfo) => (
            <ClassInfo key={classInfo.classId} classInfo={classInfo} />
          ))}
        </div>
      </div>
    </div>
  )
}
