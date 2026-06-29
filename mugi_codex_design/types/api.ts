export interface ApiSuccess<T> {
  ok: true
  data: T
}

export interface ApiError {
  ok: false
  message: string
  issues?: Record<string, string[]>
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError
