import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'メールアドレスを入力してください。').email('メールアドレスの形式を確認してください。'),
//   password: z.string().trim().min(1, 'パスワードを入力してください。'),
//   name: z.string().trim().min(1, 'お名前を入力してください。'),

})

export type LoginSchema = z.infer<typeof loginSchema>
