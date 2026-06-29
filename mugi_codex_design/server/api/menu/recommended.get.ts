import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const items = await prisma.menuItem.findMany({
    where: {
      isActive: true,
      isRecommended: true,
    },
    orderBy: [{ displayOrder: 'asc' }, { id: 'asc' }],
    take: 4,
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
