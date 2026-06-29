import type { ZodError } from 'zod'
import type { ApiResponse } from '~/types/api'
import type { ContactFormState, CreateContactRequest } from '~/types/contact'
import { clientContactSchema, zodFieldErrors } from '~/utils/validation'

export const useContactForm = () => {
  const step = ref<'input' | 'complete'>('input')
  const isSubmitting = ref(false)
  const submitError = ref('')
  const errors = ref<Record<string, string>>({})
  const form = reactive<ContactFormState>({
    name: '',
    email: '',
    category: '',
    message: '',
  })

  const validate = () => {
    errors.value = {}
    try {
      clientContactSchema.parse(form)
      return true
    } catch (error) {
      errors.value = zodFieldErrors(error as ZodError)
      return false
    }
  }

  const submit = async () => {
    if (!validate()) return
    isSubmitting.value = true
    submitError.value = ''
    try {
      const response = await $fetch<ApiResponse<{ id: number; message: string }>>('/api/contacts', {
        method: 'POST',
        body: form as CreateContactRequest,
      })
      if (response.ok) step.value = 'complete'
    } catch (error: any) {
      const data = error?.data?.data ?? error?.data
      submitError.value = data?.message ?? 'お問い合わせを保存できませんでした。'
      if (data?.issues) {
        errors.value = Object.fromEntries(Object.entries(data.issues).map(([key, value]) => [key, Array.isArray(value) ? value[0] : String(value)]))
      }
    } finally {
      isSubmitting.value = false
    }
  }

  return { step, form, errors, isSubmitting, submitError, submit }
}
