export type Pagination<T> = {
  data: T[]
  currentPage: number
  lastPage: number
  total: number
  from: number
  to: number
  perPage: number
}
