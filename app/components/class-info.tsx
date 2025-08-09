import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  BookOpen,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  User,
  Users,
  XCircle,
} from 'lucide-react'

export function ClassInfo({ classInfo }: { classInfo: IClassInfo }) {
  const getFeatureBadges = () => {
    const features = []
    if (classInfo.practice) features.push({ label: 'Thực hành', variant: 'secondary' as const })
    if (classInfo.internship) features.push({ label: 'Thực tập', variant: 'outline' as const })
    if (classInfo.vlvh) features.push({ label: 'VLVH', variant: 'destructive' as const })
    if (classInfo.teachingOnline) features.push({ label: 'Online', variant: 'default' as const })
    if (classInfo.teachingBlended)
      features.push({ label: 'Blended', variant: 'secondary' as const })
    return features
  }

  const formatTimePlace = (timePlace: any) => {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
    const dayName = days[timePlace.day] || `T${timePlace.day}`
    const timeSlot = timePlace.dayTime > 6 ? 'Chiều' : 'Sáng'
    return `${timeSlot} ${dayName}: Tiết ${timePlace.from}-${timePlace.to}, ${timePlace.place}`
  }

  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardContent className='p-4'>
        {/* Header - Compact */}
        <div className='flex items-start justify-between mb-3'>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-1'>
              <h4 className='font-semibold text-base'>Lớp {classInfo.classId}</h4>
              <span className='text-xs text-muted-foreground'>
                ({classInfo.studentNum}/{classInfo.studentNumRange})
              </span>
            </div>
            <p className='text-sm text-muted-foreground truncate'>{classInfo.info}</p>
          </div>
          <div className='flex gap-1 flex-wrap justify-end ml-2'>
            {classInfo.program && (
              <Badge variant='destructive' className='text-xs px-2 py-0'>
                {classInfo.program}
              </Badge>
            )}
            <Badge
              variant={
                classInfo.classType === 'LT'
                  ? 'default'
                  : classInfo.classType === 'BT'
                    ? 'secondary'
                    : 'outline'
              }
              className='text-xs px-2 py-0'
            >
              {classInfo.classType}
            </Badge>
          </div>
        </div>

        {/* Feature badges - Compact */}
        {getFeatureBadges().length > 0 && (
          <div className='flex flex-wrap gap-1 mb-3'>
            {getFeatureBadges().map((feature, index) => (
              <Badge key={index} variant={feature.variant} className='text-xs px-2 py-0'>
                {feature.label}
              </Badge>
            ))}
          </div>
        )}

        {/* Basic Info - Compact Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mb-3'>
          <div className='flex items-center gap-2'>
            <Users className='w-4 h-4 text-muted-foreground flex-shrink-0' />
            <div className='min-w-0 flex-1'>
              <p className='text-xs text-muted-foreground'>Giảng viên</p>
              <p className='font-medium text-sm truncate'>
                {classInfo.teachers.map((t) => t.fullName).join(', ')}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <Clock className='w-4 h-4 text-muted-foreground flex-shrink-0' />
            <div className='min-w-0 flex-1'>
              <p className='text-xs text-muted-foreground'>Thời gian</p>
              <p className='font-medium text-sm truncate'>{classInfo.placeTimeInfo.trim()}</p>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <MapPin className='w-4 h-4 text-muted-foreground flex-shrink-0' />
            <div className='min-w-0 flex-1'>
              <p className='text-xs text-muted-foreground'>Sĩ số</p>
              <p className='font-medium text-sm'>
                {classInfo.studentNum}/{classInfo.studentNumRange}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Information - Accordion */}
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='details' className='border-0'>
            <AccordionTrigger className='py-2 text-sm hover:no-underline'>
              <span className='flex items-center gap-2'>
                <BookOpen className='w-4 h-4' />
                Thông tin chi tiết
              </span>
            </AccordionTrigger>
            <AccordionContent className='pb-2'>
              <div className='space-y-3'>
                {/* Class Details */}
                <div className='grid grid-cols-2 gap-3 text-sm'>
                  <div>
                    <p className='text-xs text-muted-foreground'>Mã lớp liên quan</p>
                    <p className='font-medium'>{classInfo.relatedClassId || 'Không có'}</p>
                  </div>
                  <div>
                    <p className='text-xs text-muted-foreground'>Loại học kỳ</p>
                    <p className='font-medium'>{classInfo.semesterType}</p>
                  </div>
                  <div>
                    <p className='text-xs text-muted-foreground'>Lớp chính</p>
                    <p className='font-medium'>{classInfo.mainClass ? 'Có' : 'Không'}</p>
                  </div>
                  <div>
                    <p className='text-xs text-muted-foreground'>Cần thí nghiệm</p>
                    <p className='font-medium'>{classInfo.needTN ? 'Có' : 'Không'}</p>
                  </div>
                </div>

                {/* Teaching Methods */}
                <div>
                  <p className='text-xs text-muted-foreground mb-2'>Phương thức giảng dạy</p>
                  <div className='flex flex-wrap gap-2'>
                    <div className='flex items-center gap-1'>
                      {classInfo.teachingOnline ? (
                        <CheckCircle className='w-3 h-3 text-green-600' />
                      ) : (
                        <XCircle className='w-3 h-3 text-gray-400' />
                      )}
                      <span className='text-xs'>Online</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      {classInfo.teachingBlended ? (
                        <CheckCircle className='w-3 h-3 text-blue-600' />
                      ) : (
                        <XCircle className='w-3 h-3 text-gray-400' />
                      )}
                      <span className='text-xs'>Blended</span>
                    </div>
                  </div>
                </div>

                {/* Time and Place Details */}
                {classInfo.timePlaces && classInfo.timePlaces.length > 0 && (
                  <div>
                    <p className='text-xs text-muted-foreground mb-2'>
                      Chi tiết thời gian - địa điểm
                    </p>
                    <div className='space-y-1'>
                      {classInfo.timePlaces.map((tp, index) => (
                        <div key={index} className='text-xs bg-muted/50 p-2 rounded'>
                          <div className='flex items-center gap-2'>
                            <Calendar className='w-3 h-3' />
                            <span>{formatTimePlace(tp)}</span>
                          </div>
                          <div className='flex items-center gap-2 mt-1'>
                            <Clock className='w-3 h-3' />
                            <span>Tuần: {tp.weeks.join(', ')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Teacher Details */}
          <AccordionItem value='teachers' className='border-0'>
            <AccordionTrigger className='py-2 text-sm hover:no-underline'>
              <span className='flex items-center gap-2'>
                <GraduationCap className='w-4 h-4' />
                Thông tin giảng viên ({classInfo.teachers.length})
              </span>
            </AccordionTrigger>
            <AccordionContent className='pb-2'>
              <div className='space-y-2'>
                {classInfo.teachers.map((teacher, index) => (
                  <div key={teacher.id} className='bg-muted/50 p-3 rounded text-sm'>
                    <div className='flex items-center gap-2 mb-2'>
                      <User className='w-4 h-4' />
                      <span className='font-medium'>{teacher.fullName}</span>
                      <Badge variant='outline' className='text-xs'>
                        {teacher.staffCode}
                      </Badge>
                    </div>
                    <div className='grid grid-cols-2 gap-2 text-xs'>
                      <div className='flex items-center gap-1'>
                        <Mail className='w-3 h-3' />
                        <span className='truncate'>{teacher.email}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Users className='w-3 h-3' />
                        <span>{teacher.gender}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Additional Info */}
          {(classInfo.accessCode || classInfo.calendarInfo) && (
            <AccordionItem value='additional' className='border-0'>
              <AccordionTrigger className='py-2 text-sm hover:no-underline'>
                <span className='flex items-center gap-2'>
                  <Building className='w-4 h-4' />
                  Thông tin bổ sung
                </span>
              </AccordionTrigger>
              <AccordionContent className='pb-2'>
                <div className='space-y-2 text-sm'>
                  {classInfo.accessCode && (
                    <div>
                      <p className='text-xs text-muted-foreground'>Mã truy cập</p>
                      <p className='font-medium'>{classInfo.accessCode}</p>
                    </div>
                  )}
                  {classInfo.calendarInfo && (
                    <div>
                      <p className='text-xs text-muted-foreground'>Thông tin lịch</p>
                      <p className='font-medium'>{classInfo.calendarInfo}</p>
                    </div>
                  )}
                  {classInfo.projectType > 0 && (
                    <div>
                      <p className='text-xs text-muted-foreground'>Loại dự án</p>
                      <p className='font-medium'>Loại {classInfo.projectType}</p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  )
}
