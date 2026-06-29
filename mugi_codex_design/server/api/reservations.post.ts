import { ZodError } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { reservationSchema } from '~/server/validation/reservation'

const toIssues = (error: ZodError) => {
  const fieldErrors = error.flatten().fieldErrors
  return Object.fromEntries(Object.entries(fieldErrors).filter(([, messages]) => messages && messages.length > 0))
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const parsed = reservationSchema.parse(body)
    const menuIds = parsed.items.map((item) => item.menuItemId)
    const activeCount = await prisma.menuItem.count({
      where: {
        id: { in: menuIds },
        isActive: true,
      },
    })

    if (activeCount !== new Set(menuIds).size) {
      throw createError({
        statusCode: 400,
        statusMessage: '選択された商品を確認してください。',
        data: { ok: false, message: '選択された商品を確認してください。', issues: { items: ['販売中の商品を選択してください。'] } },
      })
    }

    const reservation = await prisma.reservation.create({
      data: {
        customerName: parsed.customerName,
        phone: parsed.phone,
        email: parsed.email,
        pickupDate: new Date(`${parsed.pickupDate}T00:00:00`),
        pickupTime: parsed.pickupTime,
        note: parsed.note,
        items: {
          create: parsed.items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          })),
        },
      },
      select: { id: true },
    })

    setResponseStatus(event, 201)
    return { ok: true, data: { id: reservation.id, message: 'ご予約を受け付けました。' } }
  } catch (error) {
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: '入力内容を確認してください。',
        data: { ok: false, message: '入力内容を確認してください。', issues: toIssues(error) },
      })
    }

    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '予約の保存に失敗しました。',
      data: { ok: false, message: '予約の保存に失敗しました。' },
    })
  }
})
