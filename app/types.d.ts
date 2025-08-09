interface ITimePlace {
  place: string
  week: string
  dayTime: number
  day: number
  from: number
  to: number
  weeks: number[]
}

interface ITeacher {
  id: number
  fullName: string
  email: string
  gender: string
  staffCode: string
}

interface IClassInfo {
  classId: string
  relatedClassId: string
  courseId: string
  name: string
  program: string
  mainClass: number
  needTN: number // cần thí nghiệm không
  classType: string
  info: string
  semesterType: string
  accessCode: string
  calendarInfo: string
  semester: string
  studentNum: number
  studentNumRange: string
  rootName: string
  creditInfo: string
  timePlaces: ITimePlace[]
  teachers: ITeacher[]
  placeTimeInfo: string
  practice: boolean
  internship: boolean
  vlvh: boolean
  projectType: number
  teachingOnline: boolean
  teachingBlended: boolean
}

interface ICourseInfoBase {
  courseId: string
  name: string
  credit: number
  creditInfo: string
  rootNames: string[]
  coordName: string
  staffNames: string[]
  examWeight: number // hệ số ĐQT (điểm quá trình)/ ĐCK (điểm cuối kỳ)
  blearning: boolean
  project: boolean
  gradProject: boolean
  intern: boolean
  // không quan trọng
  lastSemesters: string[]
  nameEn: string
  sdh: boolean
  openned: boolean
  svnckh: boolean // nghiên cứu khoa học
}

interface ICourseData extends ICourseInfoBase {
  classes: IClassInfo[]
}
