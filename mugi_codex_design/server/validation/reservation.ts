import { z } from 'zod'
import { pickupTimes } from '~/constants/pickupTimes'

const today = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

export const reservationSchema = z.object({
  customerName: z.string().trim().min(1, 'お名前を入力してください。'),
  phone: z.string().trim().min(1, '電話番号を入力してください。'),
  email: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === '' ? undefined : value))
    .pipe(z.string().email('メールアドレスの形式を確認してください。').optional()),
  pickupDate: z
    .string()
    .min(1, '受け取り日を選択してください。')
    .refine((value) => {
      const date = new Date(`${value}T00:00:00`)
      return !Number.isNaN(date.getTime()) && date >= today()
    }, '過去の日付は選択できません。'),
  pickupTime: z.enum(pickupTimes, {
    errorMap: () => ({ message: '受け取り時間を選択してください。' }),
  }),
  items: z
    .array(
      z.object({
        menuItemId: z.coerce.number().int().positive('商品を選択してください。'),
        quantity: z.coerce.number().int().min(1, '数量は1以上で入力してください。'),
      }),
    )
    .min(1, '商品を1つ以上選択してください。'),
  note: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
})

export type ReservationSchema = z.infer<typeof reservationSchema>
