export type MenuCategory = 'SHOKUPAN' | 'SOZAI' | 'KASHI' | 'SEASONAL'
export type MenuCategoryFilterValue = 'ALL' | MenuCategory

export interface MenuItem {
  id: number
  name: string
  slug: string
  price: number
  description: string
  category: MenuCategory
  imageUrl: string
  isRecommended: boolean
  isSeasonal: boolean
  allergies: string[]
}

export const menuCategoryLabels: Record<MenuCategoryFilterValue, string> = {
  ALL: 'すべて',
  SHOKUPAN: '食パン',
  SOZAI: '惣菜パン',
  KASHI: '菓子パン',
  SEASONAL: '季節限定',
}
