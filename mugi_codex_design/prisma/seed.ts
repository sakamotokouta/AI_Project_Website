import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const menuItems = [
  {
    name: '麦の灯り食パン',
    slug: 'mugi-no-akari-shokupan',
    price: 420,
    description: '国産小麦と天然酵母でしっとり焼き上げた、毎朝の定番食パンです。',
    category: 'SHOKUPAN' as const,
    imageUrl: '/images/menu/shokupan.png',
    isRecommended: true,
    isSeasonal: false,
    allergies: ['小麦', '乳'],
    displayOrder: 1,
  },
  {
    name: '天然酵母バゲット',
    slug: 'natural-yeast-baguette',
    price: 360,
    description: '香ばしい皮と軽い酸味が楽しめる、食卓向けの細身バゲットです。',
    category: 'SHOKUPAN' as const,
    imageUrl: '/images/menu/baguette.png',
    isRecommended: true,
    isSeasonal: false,
    allergies: ['小麦'],
    displayOrder: 2,
  },
  {
    name: 'クロワッサン',
    slug: 'croissant',
    price: 280,
    description: '発酵バターを折り込んだ、外はさくっと中はふんわりの一品です。',
    category: 'KASHI' as const,
    imageUrl: '/images/menu/croissant.png',
    isRecommended: true,
    isSeasonal: false,
    allergies: ['小麦', '乳', '卵'],
    displayOrder: 3,
  },
  {
    name: 'くるみと蜂蜜のカンパーニュ',
    slug: 'walnut-honey-campagne',
    price: 520,
    description: 'ローストくるみの食感と蜂蜜のやさしい甘さを合わせました。',
    category: 'SHOKUPAN' as const,
    imageUrl: '/images/menu/campagne.png',
    isRecommended: false,
    isSeasonal: false,
    allergies: ['小麦', 'くるみ'],
    displayOrder: 4,
  },
  {
    name: '季節の果実デニッシュ',
    slug: 'seasonal-fruit-danish',
    price: 460,
    description: '旬の果実と自家製カスタードを重ねた、季節限定のデニッシュです。',
    category: 'SEASONAL' as const,
    imageUrl: '/images/menu/danish.png',
    isRecommended: true,
    isSeasonal: true,
    allergies: ['小麦', '乳', '卵'],
    displayOrder: 5,
  },
  {
    name: '自家製カレーパン',
    slug: 'homemade-curry-bread',
    price: 330,
    description: '野菜の甘みを生かした自家製カレーを包み、軽く揚げました。',
    category: 'SOZAI' as const,
    imageUrl: '/images/menu/curry-bread.png',
    isRecommended: false,
    isSeasonal: false,
    allergies: ['小麦', '乳'],
    displayOrder: 6,
  },
  {
    name: 'クリームパン',
    slug: 'cream-bread',
    price: 260,
    description: '卵の風味を感じるなめらかな自家製クリームをたっぷり詰めました。',
    category: 'KASHI' as const,
    imageUrl: '/images/menu/cream-bread.png',
    isRecommended: false,
    isSeasonal: false,
    allergies: ['小麦', '乳', '卵'],
    displayOrder: 7,
  },
  {
    name: '明太ポテトフランス',
    slug: 'mentaiko-potato-france',
    price: 390,
    description: '明太子とほくほくポテトを合わせた、昼食にも合う惣菜パンです。',
    category: 'SOZAI' as const,
    imageUrl: '/images/menu/mentaiko-potato.png',
    isRecommended: false,
    isSeasonal: false,
    allergies: ['小麦', '乳'],
    displayOrder: 8,
  },
]

async function main() {
  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    })
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
