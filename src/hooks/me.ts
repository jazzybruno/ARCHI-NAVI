
import useSWR from "swr"
import { fetcher } from "services/httpClient"
import { User } from "types"
import { ApiRoutes } from "utils/constant"

export const useMe = () => {
  const { data, mutate, isLoading, error } = useSWR(ApiRoutes.auth.user, fetcher<User>)
  return { data, mutate, isLoading, error }
}