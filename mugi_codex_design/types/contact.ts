export type ContactCategory = 'PRODUCT' | 'ALLERGY' | 'BULK_ORDER' | 'MEDIA_EVENT' | 'OTHER'

export interface ContactFormState {
  name: string
  email: string
  category: ContactCategory | ''
  message: string
}

export interface CreateContactRequest {
  name: string
  email: string
  category: ContactCategory
  message: string
}

export const contactCategoryLabels: Record<ContactCategory, string> = {
  PRODUCT: '商品について',
  ALLERGY: 'アレルギーについて',
  BULK_ORDER: '大口注文',
  MEDIA_EVENT: '取材・イベント',
  OTHER: 'その他',
}
