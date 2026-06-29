import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'お名前を入力してください。'),
  email: z.string().trim().min(1, 'メールアドレスを入力してください。').email('メールアドレスの形式を確認してください。'),
  category: z.enum(['PRODUCT', 'ALLERGY', 'BULK_ORDER', 'MEDIA_EVENT', 'OTHER'], {
    errorMap: () => ({ message: 'お問い合わせ種別を選択してください。' }),
  }),
  message: z.string().trim().min(1, 'お問い合わせ内容を入力してください。'),
})

export type ContactSchema = z.infer<typeof contactSchema>
