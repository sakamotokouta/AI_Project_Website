import { ZodError } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { contactSchema } from '~/server/validation/contact'

const toIssues = (error: ZodError) => {
  const fieldErrors = error.flatten().fieldErrors
  return Object.fromEntries(Object.entries(fieldErrors).filter(([, messages]) => messages && messages.length > 0))
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const parsed = contactSchema.parse(body)
    const contact = await prisma.contactInquiry.create({
      data: parsed,
      select: { id: true },
    })

    setResponseStatus(event, 201)
    return { ok: true, data: { id: contact.id, message: 'お問い合わせを受け付けました。' } }
  } catch (error) {
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: '入力内容を確認してください。',
        data: { ok: false, message: '入力内容を確認してください。', issues: toIssues(error) },
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'お問い合わせの保存に失敗しました。',
      data: { ok: false, message: 'お問い合わせの保存に失敗しました。' },
    })
  }
})
