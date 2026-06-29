import type { PickupTime } from '~/constants/pickupTimes'

export interface ReservationItemInput {
  menuItemId: number
  quantity: number
}

export interface ReservationFormState {
  customerName: string
  phone: string
  email: string
  pickupDate: string
  pickupTime: PickupTime | ''
  menuItemId: number | ''
  quantity: number
  note: string
}

export interface CreateReservationRequest {
  customerName: string
  phone: string
  email?: string
  pickupDate: string
  pickupTime: PickupTime
  items: ReservationItemInput[]
  note?: string
}
