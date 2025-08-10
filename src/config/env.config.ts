import { z, ZodError } from 'zod'

const configSchema = z.object({
  baseUrl: z.string(),
  token: z.string(),
  sessionId: z.string(),
})

export const getEnvConfig = () => {
  try {
    const parsedConfig = configSchema.parse({
      baseUrl: process.env.BASE_URL,
      token: process.env.TOKEN,
      sessionId: process.env.SESSION_ID,
    })
    return parsedConfig
  } catch (err) {
    if (err instanceof ZodError) {
      err.issues.forEach((issue) => {
        const field = issue.path.join('.') || '(unknown field)'
        console.error(`Env config error in ${field}: ${issue.message}`)
      })
    } else {
      console.error(err)
    }
    process.exit(1)
  }
}

export const envConfig = getEnvConfig()
