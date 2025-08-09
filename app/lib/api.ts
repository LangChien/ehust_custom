const BASE_URL = 'https://appv6-dot-hust-edu.appspot.com/api/search/course'
const sessionId = '6CFBB1AA-349D-43F5-BAAE-D95BB25C9375-1749922901976_1749922901976'
const token = 'PNiIwCMI7VrDA16n3IQj'

export const searchCourses = async (
  courseId: string,
  semester: string,
): Promise<ICourseData | null> => {
  try {
    // Tạo URL kèm query params
    const url = new URL(BASE_URL)
    url.searchParams.set('courseId', courseId)
    url.searchParams.set('semester', semester)
    url.searchParams.set('sessionId', sessionId)
    url.searchParams.set('token', token)

    // Gọi API
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      console.error('API request failed:', res.status, res.statusText)
      return null
    }
    const dataPaser: { data: ICourseData } = await res.json()
    return dataPaser.data
  } catch (error) {
    console.error('Error fetching courses:', error)
    return null
  }
}
