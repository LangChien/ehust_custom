import { envConfig } from '@/config/env.config'

export const getCourses = async (
  courseId?: string,
  semester?: string,
): Promise<ICourseData | null> => {
  try {
    if (!courseId || !semester) return null
    // Tạo URL kèm query params
    const url = new URL(envConfig.baseUrl)
    url.searchParams.set('courseId', courseId)
    url.searchParams.set('semester', semester)
    url.searchParams.set('sessionId', envConfig.sessionId)
    url.searchParams.set('token', envConfig.token)

    // Gọi API
    const res = await fetch(url.toString(), {
      method: 'GET',
      cache: 'no-store',
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
