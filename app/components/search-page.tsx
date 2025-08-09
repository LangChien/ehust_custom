import { useToolbar } from '@/hooks/use-toolbar'
import { getFilteredAndSortedClasses } from '@/lib/utils'
import { useState } from 'react'
import { ClassInfo } from './class-info'
import { CourseInfo } from './course-info'
import { SearchForm } from './search'
import { Toolbar } from './toolbar'

export function CourseSearchPage() {
  const [courseData, setCourseData] = useState<ICourseData | null>(null)
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

  return (
    <div className='container mx-auto p-6 max-w-6xl'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Tìm kiếm môn học</h1>
        <p className='text-muted-foreground'>
          Nhập mã học phần và kỳ học để tìm kiếm thông tin lớp học
        </p>
      </div>

      {/* Search Form */}
      <SearchForm setCourseData={setCourseData} />
      {/* Results */}
      {courseData && (
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
      )}
    </div>
  )
}
