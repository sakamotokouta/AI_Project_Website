import type { ZodError } from 'zod'
import type { ApiResponse } from '~/types/api'
import type { CreateReservationRequest, ReservationFormState } from '~/types/reservation'
import { clientReservationSchema, zodFieldErrors } from '~/utils/validation'

export const useMenuItemForm = () => {
  const step = ref<'input' | 'confirm' | 'complete'>('input')
  const isSubmitting = ref(false)
  const submitError = ref('')
  const createdId = ref<number | null>(null)
  const errors = ref<Record<string, string>>({})
  const form = reactive<ReservationFormState>({
    customerName: '',
    phone: '',
    email: '',
    pickupDate: todayInputValue(),
    pickupTime: '',
    menuItemId: '',
    quantity: 1,
    note: '',
  })

  const payload = computed<CreateReservationRequest | null>(() => {
    if (!form.pickupTime || !form.menuItemId) return null
    return {
      customerName: form.customerName,
      phone: form.phone,
      email: form.email || undefined,
      pickupDate: form.pickupDate,
      pickupTime: form.pickupTime,
      items: [{ menuItemId: Number(form.menuItemId), quantity: Number(form.quantity) }],
      note: form.note || undefined,
    }
  })

  const validate = () => {
    errors.value = {}
    try {
      clientReservationSchema.parse({
        ...form,
        menuItemId: form.menuItemId || 0,
      })
      return true
    } catch (error) {
      errors.value = zodFieldErrors(error as ZodError)
      return false
    }
  }

  const confirm = () => {
    if (validate()) step.value = 'confirm'
  }

  const back = () => {
    submitError.value = ''
    step.value = 'input'
  }

  const submit = async () => {
    if (!payload.value) return
    isSubmitting.value = true
    submitError.value = ''
    try {
      const response = await $fetch<ApiResponse<{ id: number; message: string }>>('/api/reservations', {
        method: 'POST',
        body: payload.value,
      })
      if (response.ok) {
        createdId.value = response.data.id
        step.value = 'complete'
      }
    } catch (error: any) {
      const data = error?.data?.data ?? error?.data
      submitError.value = data?.message ?? '予約を保存できませんでした。'
      if (data?.issues) {
        errors.value = Object.fromEntries(Object.entries(data.issues).map(([key, value]) => [key, Array.isArray(value) ? value[0] : String(value)]))
        step.value = 'input'
      }
    } finally {
      isSubmitting.value = false
    }
  }

  return { step, form, errors, isSubmitting, submitError, createdId, confirm, back, submit }
}
