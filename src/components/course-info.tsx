import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getUniqueValues } from '@/lib/utils'
import {
  Award,
  BookOpen,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  GraduationCap,
  Laptop,
  Users,
  XCircle,
} from 'lucide-react'

export function CourseInfo({ courseData }: { courseData: ICourseData }) {
  const teachers = getUniqueValues(courseData, 'teachers')
  const programs = getUniqueValues(courseData, 'program')
  const semesterTypes = getUniqueValues(courseData, 'semesterType')

  const getExamWeightDisplay = (weight: number) => {
    const processWeight = Math.round(weight * 100)
    const finalWeight = 100 - processWeight
    return `${processWeight}% - ${finalWeight}%`
  }

  const getFeatureBadges = () => {
    const features = []
    if (courseData.blearning)
      features.push({ label: 'B-Learning', icon: Laptop, variant: 'default' as const })
    if (courseData.project)
      features.push({ label: 'Dự án', icon: Building, variant: 'secondary' as const })
    if (courseData.gradProject)
      features.push({
        label: 'Đồ án tốt nghiệp',
        icon: GraduationCap,
        variant: 'secondary' as const,
      })
    if (courseData.intern)
      features.push({ label: 'Thực tập', icon: Award, variant: 'outline' as const })
    if (courseData.svnckh)
      features.push({ label: 'NCKH', icon: BookOpen, variant: 'outline' as const })
    return features
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl flex items-center gap-2'>
          <BookOpen className='w-5 h-5' />
          {courseData.name}
        </CardTitle>
        <CardDescription className='space-y-1'>
          <div>
            Mã môn học: {courseData.courseId} • Số tín chỉ: {courseData.credit}
          </div>
          {courseData.nameEn && (
            <div className='flex items-center gap-2 text-sm'>
              <Globe className='w-4 h-4' />
              {courseData.nameEn}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Basic Info - Always visible */}
        <div className='grid md:grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-muted-foreground'>Giảng viên phối hợp</p>
            <p className='font-medium'>{courseData.coordName}</p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>Tổng số lớp</p>
            <p className='font-medium'>{courseData.classes.length} lớp</p>
          </div>
        </div>

        {/* Feature Badges */}
        {getFeatureBadges().length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {getFeatureBadges().map((feature, index) => (
              <Badge key={index} variant={feature.variant} className='flex items-center gap-1'>
                <feature.icon className='w-3 h-3' />
                {feature.label}
              </Badge>
            ))}
          </div>
        )}

        {/* Detailed Information in Accordion */}
        <Accordion type='multiple' className='w-full'>
          {/* Course Details */}
          <AccordionItem value='details'>
            <AccordionTrigger className='text-left'>
              <div className='flex items-center gap-2'>
                <BookOpen className='w-4 h-4' />
                Thông tin chi tiết môn học
              </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-4'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-muted-foreground'>Thông tin tín chỉ</p>
                  <p className='font-medium'>{courseData.creditInfo}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Hệ số điểm (ĐQT - ĐCK)</p>
                  <p className='font-medium'>{getExamWeightDisplay(courseData.examWeight)}</p>
                </div>
                {courseData.rootNames.length > 0 && (
                  <div>
                    <p className='text-sm text-muted-foreground'>Nhóm môn học</p>
                    <p className='font-medium'>{courseData.rootNames.join(', ')}</p>
                  </div>
                )}
                {programs.length > 0 && (
                  <div>
                    <p className='text-sm text-muted-foreground'>Chương trình đào tạo</p>
                    <p className='font-medium'>{programs.join(', ')}</p>
                  </div>
                )}
              </div>

              {semesterTypes.length > 0 && (
                <div>
                  <p className='text-sm text-muted-foreground'>Loại học kỳ</p>
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {semesterTypes.map((type, index) => (
                      <Badge key={index} variant='outline'>
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {courseData.lastSemesters.length > 0 && (
                <div>
                  <p className='text-sm text-muted-foreground'>Các kỳ gần đây</p>
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {courseData.lastSemesters
                      .sort((a, b) => +b - +a)
                      .slice(0, 5)
                      .map((semester, index) => (
                        <Badge key={index} variant='secondary' className='flex items-center gap-1'>
                          <Calendar className='w-3 h-3' />
                          {semester}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Teaching Staff */}
          <AccordionItem value='staff'>
            <AccordionTrigger className='text-left'>
              <div className='flex items-center gap-2'>
                <Users className='w-4 h-4' />
                Đội ngũ giảng dạy ({teachers.length} giảng viên)
              </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-4'>
              <div>
                <p className='text-sm text-muted-foreground mb-2'>Giảng viên tham gia</p>
                <div className='grid gap-2'>
                  {teachers.map((teacher, index) => (
                    <div key={index} className='flex items-center gap-2 p-2 bg-muted/50 rounded'>
                      <Users className='w-4 h-4 text-muted-foreground' />
                      <span className='font-medium'>{teacher}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className='text-sm text-muted-foreground mb-2'>Cán bộ phụ trách</p>
                <div className='grid gap-2'>
                  {courseData.staffNames.map((staff, index) => (
                    <div key={index} className='flex items-center gap-2 p-2 bg-blue-50 rounded'>
                      <GraduationCap className='w-4 h-4 text-blue-600' />
                      <span className='font-medium'>{staff}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Course Status */}
          <AccordionItem value='status'>
            <AccordionTrigger className='text-left'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='w-4 h-4' />
                Trạng thái môn học
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  {courseData.openned ? (
                    <CheckCircle className='w-4 h-4 text-green-600' />
                  ) : (
                    <XCircle className='w-4 h-4 text-red-600' />
                  )}
                  <span className={courseData.openned ? 'text-green-700' : 'text-red-700'}>
                    {courseData.openned ? 'Đang mở' : 'Đã đóng'}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  {courseData.sdh ? (
                    <CheckCircle className='w-4 h-4 text-blue-600' />
                  ) : (
                    <XCircle className='w-4 h-4 text-gray-600' />
                  )}
                  <span className={courseData.sdh ? 'text-blue-700' : 'text-gray-700'}>
                    {courseData.sdh ? 'Có SDH' : 'Không có SDH'}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Statistics */}
          <AccordionItem value='statistics'>
            <AccordionTrigger className='text-left'>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4' />
                Thống kê lớp học
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className='grid md:grid-cols-3 gap-4'>
                <div className='text-center p-4 bg-blue-50 rounded-lg'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {courseData.classes.length}
                  </div>
                  <div className='text-sm text-blue-700'>Tổng số lớp</div>
                </div>

                <div className='text-center p-4 bg-green-50 rounded-lg'>
                  <div className='text-2xl font-bold text-green-600'>
                    {courseData.classes.reduce((sum, cls) => sum + cls.studentNum, 0)}
                  </div>
                  <div className='text-sm text-green-700'>Tổng sinh viên</div>
                </div>

                <div className='text-center p-4 bg-purple-50 rounded-lg'>
                  <div className='text-2xl font-bold text-purple-600'>{teachers.length}</div>
                  <div className='text-sm text-purple-700'>Số giảng viên</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
