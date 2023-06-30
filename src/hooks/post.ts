
import useSWR from "swr"
import { fetcher } from "services/httpClient"
import { Post } from "types"
import { ApiRoutes } from "utils/constant"

export const usePost = () => {
  const { data, mutate, isLoading, error } = useSWR(ApiRoutes.post.index, fetcher<Post[]>)
  return { data, mutate, isLoading, error }
}