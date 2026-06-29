import { MenuCategory } from '@prisma/client'
import { prisma } from '~/server/utils/prisma'

const categoryValues = new Set<string>(['ALL', ...Object.values(MenuCategory)])

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = typeof query.category === 'string' ? query.category : 'ALL'

  if (!categoryValues.has(category)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'カテゴリを確認してください。',
      data: { ok: false, message: 'カテゴリを確認してください。' },
    })
  }

  const items = await prisma.menuItem.findMany({
    where: {
      isActive: true,
      ...(category !== 'ALL' ? { category: category as MenuCategory } : {}),
    },
    orderBy: [{ displayOrder: 'asc' }, { id: 'asc' }],
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      description: true,
      category: true,
      imageUrl: true,
      isRecommended: true,
      isSeasonal: true,
      allergies: true,
    },
  })

  return { ok: true, data: items }
})
