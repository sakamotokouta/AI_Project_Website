import { ZodError } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { loginSchema } from '~/server/validation/login'


const toIssues = (error: ZodError) => {
  const fieldErrors = error.flatten().fieldErrors
  return Object.fromEntries(Object.entries(fieldErrors).filter(([, messages]) => messages && messages.length > 0))
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const parsed = loginSchema.parse(body)
    console.log('login body:', body)
    const login = await prisma.admin.create({
      data: parsed,
      select: { id: true },
    })

    setResponseStatus(event, 201)
    return { ok: true, data: { id: login.id, message: 'ログイン完了' } }
  } catch (error) {

    

    if (error instanceof ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: '入力内容を確認してください。',
        data: { ok: false, message: '入力内容を確認してください。', issues: toIssues(error) },
      })
    }

    console.log('login error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'ログインに失敗しました。',
      data: { ok: false, message: 'ログインに失敗しました。' },
    })
  }
})
