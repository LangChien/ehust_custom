import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { IUseToolbar } from '@/hooks/use-toolbar'
import { getUniqueValues } from '@/lib/utils'
import { Filter, SortAsc, SortDesc } from 'lucide-react'

export function Toolbar({
  courseData,
  useToolbar,
}: {
  courseData: ICourseData
  useToolbar: IUseToolbar
}) {
  const {
    classTypeFilter,
    setClassTypeFilter,
    setSortBy,
    setSortOrder,
    setTeacherFilter,
    sortBy,
    sortOrder,
    teacherFilter,
  } = useToolbar
  const uniqueTeachers = getUniqueValues(courseData, 'teachers')
  const uniqueClassTypes = getUniqueValues(courseData, 'classType')
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Filter className='w-5 h-5' />
          Bộ lọc và sắp xếp
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid md:grid-cols-4 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Loại lớp</label>
            <Select value={classTypeFilter} onValueChange={setClassTypeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả</SelectItem>
                {uniqueClassTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Giảng viên</label>
            <Select value={teacherFilter} onValueChange={setTeacherFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả</SelectItem>
                {uniqueTeachers.map((teacher) => (
                  <SelectItem key={teacher} value={teacher}>
                    {teacher}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Sắp xếp theo</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='classId'>Mã lớp</SelectItem>
                <SelectItem value='classType'>Loại lớp</SelectItem>
                <SelectItem value='studentNumRange'>Số sinh viên tối đa</SelectItem>
                <SelectItem value='teachers'>Giảng viên</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Thứ tự</label>
            <Button
              variant='outline'
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className='w-full justify-start'
            >
              {sortOrder === 'asc' ? (
                <>
                  <SortAsc className='w-4 h-4 mr-2' />
                  Tăng dần
                </>
              ) : (
                <>
                  <SortDesc className='w-4 h-4 mr-2' />
                  Giảm dần
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
