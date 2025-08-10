'use client'
import { useToolbar } from '@/hooks/use-toolbar'
import { getFilteredAndSortedClasses } from '@/lib/utils'
import { use } from 'react'
import { ClassInfo } from './class-info'
import { CourseInfo } from './course-info'
import { Toolbar } from './toolbar'

export function CourseResult({ data }: { data: Promise<ICourseData | null> }) {
  const courseData = use(data)
  const toolbar = useToolbar()
  const { classTypeFilter, teacherFilter, sortBy, sortOrder } = toolbar
  // Get filtered and sorted classes
  const dataDisplay = getFilteredAndSortedClasses(
    courseData,
    {
      classTypeFilter,
      teacherFilter,
    },
    {
      sortBy,
      sortOrder,
    },
  )
  if (!courseData) return null

  return (
    <div className='space-y-6'>
      {/* Course Info */}
      <CourseInfo courseData={courseData} />

      {/* Filters and Sort */}
      <Toolbar courseData={courseData} useToolbar={toolbar} />

      {/* Classes List */}
      <div>
        <h3 className='text-lg font-semibold mb-4'>Danh sách lớp ({dataDisplay.length} lớp)</h3>
        <div className='grid gap-4'>
          {dataDisplay.map((classInfo) => (
            <ClassInfo key={classInfo.classId} classInfo={classInfo} />
          ))}
        </div>
      </div>
    </div>
  )
}
