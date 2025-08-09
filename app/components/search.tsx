import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { searchCourses } from '@/lib/api'
import { Search } from 'lucide-react'
import { useState } from 'react'

export interface IProps {
  setCourseData: React.Dispatch<React.SetStateAction<ICourseData | null>>
}

export function SearchForm({ setCourseData }: IProps) {
  const [courseId, setCourseId] = useState('')
  const [semester, setSemester] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!courseId.trim() || !semester.trim()) {
      setError('Vui lòng nhập đầy đủ mã học phần và kỳ học')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await searchCourses(courseId.trim(), semester.trim())
      setCourseData(result)
      if (!result) {
        setError('Không tìm thấy môn học với mã đã nhập')
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tìm kiếm')
    } finally {
      setLoading(false)
    }
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
          <Button type='submit' disabled={loading} className='px-8'>
            {loading ? 'Đang tìm...' : 'Tìm kiếm'}
          </Button>
        </form>
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
      </CardContent>
    </Card>
  )
}
