import { CourseInfoSkeleton } from '@/components/loading-skeleton'
import { CourseResult } from '@/components/result'
import { SearchForm } from '@/components/search'
import { getCourses } from '@/lib/api'
import { Suspense } from 'react'

interface ISearchParams {
  courseId?: string
  semester?: string
}
export default async function Home({ searchParams }: { searchParams: Promise<ISearchParams> }) {
  const { courseId, semester } = await searchParams
  const data = getCourses(courseId, semester)
  return (
    <div className='container mx-auto p-6 max-w-6xl'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Tìm kiếm môn học</h1>
        <p className='text-muted-foreground'>
          Nhập mã học phần và kỳ học để tìm kiếm thông tin lớp học
        </p>
      </div>

      {/* Search Form */}
      <SearchForm />
      {/* Results */}
      <Suspense key={`${courseId}-${semester}`} fallback={<CourseInfoSkeleton />}>
        <CourseResult data={data} />
      </Suspense>
    </div>
  )
}
