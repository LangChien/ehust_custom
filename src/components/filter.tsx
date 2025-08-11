import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IUseFilter } from '@/hooks/use-filter'
import { DAY, DAY_TIME, getUniqueValues } from '@/lib/utils'
import { Filter } from 'lucide-react'

export function ClassFilter({
  courseData,
  classFilter,
}: {
  courseData: ICourseData
  classFilter: IUseFilter
}) {
  const {
    classTypeFilter,
    setClassTypeFilter,
    setTeacherFilter,
    teacherFilter,
    day,
    dayTime,
    setDay,
    setDayTime,
  } = classFilter
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
        <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Loại lớp</label>
            <Select value={classTypeFilter} onValueChange={setClassTypeFilter}>
              <SelectTrigger className='w-full'>
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
              <SelectTrigger className='w-full'>
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
            <label className='block text-sm font-medium mb-2'>Ngày học</label>
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả</SelectItem>
                {Object.entries(DAY).map(([key, value]) => (
                  <SelectItem key={key + value} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Buổi học</label>
            <Select value={dayTime} onValueChange={setDayTime}>
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả</SelectItem>
                {Object.entries(DAY_TIME).map(([key, value]) => (
                  <SelectItem key={key + value} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
