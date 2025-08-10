'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useQuery } from '@/hooks/use-query'
import { Search } from 'lucide-react'
import { useState } from 'react'

export function SearchForm() {
  const { updateParam } = useQuery()
  const [courseId, setCourseId] = useState('')
  const [semester, setSemester] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!courseId.trim() || !semester.trim()) {
      setError('Vui lòng nhập đầy đủ mã học phần và kỳ học')
      return
    }
    updateParam({
      semester,
      courseId,
    })
  }

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Search className='w-5 h-5' />
          Tìm kiếm
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='flex gap-4 items-end'>
          <div className='flex-1'>
            <label htmlFor='courseId' className='block text-sm font-medium mb-2'>
              Mã học phần
            </label>
            <Input
              id='courseId'
              type='text'
              placeholder='Ví dụ: MI1144'
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className='w-full'
            />
          </div>
          <div className='flex-1'>
            <label htmlFor='semester' className='block text-sm font-medium mb-2'>
              Kỳ học
            </label>
            <Input
              id='semester'
              type='text'
              placeholder='Ví dụ: 20241'
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className='w-full'
            />
          </div>
          <Button type='submit' className='px-8 cursor-pointer'>
            Tìm kiếm
          </Button>
        </form>
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
      </CardContent>
    </Card>
  )
}
