import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CourseInfoSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5' />
          <Skeleton className='h-6 w-64' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-48' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-4 w-4' />
            <Skeleton className='h-4 w-32' />
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Basic Info */}
        <div className='grid md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Skeleton className='h-3 w-24' />
            <Skeleton className='h-4 w-32' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-3 w-20' />
            <Skeleton className='h-4 w-16' />
          </div>
        </div>

        {/* Feature Badges */}
        <div className='flex flex-wrap gap-2'>
          <Skeleton className='h-6 w-20' />
          <Skeleton className='h-6 w-16' />
          <Skeleton className='h-6 w-24' />
        </div>

        {/* Accordion Skeleton */}
        <div className='space-y-2'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='border rounded-lg'>
              <div className='flex items-center justify-between p-4'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-32' />
                </div>
                <Skeleton className='h-4 w-4' />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function FiltersSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5' />
          <Skeleton className='h-5 w-32' />
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid md:grid-cols-4 gap-4'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-10 w-full' />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ClassInfoSkeleton() {
  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardContent className='p-4'>
        {/* Header */}
        <div className='flex items-start justify-between mb-3'>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-1'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-3 w-12' />
            </div>
            <Skeleton className='h-3 w-32' />
          </div>
          <div className='flex gap-1 ml-2'>
            <Skeleton className='h-5 w-12' />
            <Skeleton className='h-5 w-8' />
          </div>
        </div>

        {/* Feature badges */}
        <div className='flex flex-wrap gap-1 mb-3'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-12' />
        </div>

        {/* Basic Info Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mb-3'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex items-center gap-2'>
              <Skeleton className='h-4 w-4 flex-shrink-0' />
              <div className='min-w-0 flex-1 space-y-1'>
                <Skeleton className='h-3 w-16' />
                <Skeleton className='h-3 w-24' />
              </div>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className='space-y-1'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-3 w-24' />
              </div>
              <Skeleton className='h-3 w-3' />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ClassesListSkeleton() {
  return (
    <div>
      <div className='flex items-center gap-2 mb-4'>
        <Skeleton className='h-5 w-32' />
        <Skeleton className='h-5 w-16' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ClassInfoSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function ResultsSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Course Info Skeleton */}
      <CourseInfoSkeleton />

      {/* Filters Skeleton */}
      <FiltersSkeleton />

      {/* Classes List Skeleton */}
      <ClassesListSkeleton />
    </div>
  )
}
