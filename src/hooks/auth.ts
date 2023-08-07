import { useState } from 'react'
import useSWR from 'swr'
import { fetcher, httpClient } from 'services/httpClient'
import { User } from 'types'
import { ApiRoutes, UserRole } from 'utils/constant'

export const useMe = () => {
   const { data, mutate, isLoading, error } = useSWR(ApiRoutes.auth.user, fetcher<User>)
   return { data, mutate, isLoading, error }
}

export const useSignin = () => {
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)

   const signin = async (args: { email: string; password: string; role: UserRole }) => {
      setIsLoading(true)
      setError(null)

      try {
         const response = await httpClient().post(ApiRoutes.auth.signin, args)

         const { data } = response
         setIsLoading(false)

         return data
      } catch (err) {
         setError(err.message)
         setIsLoading(false)
      }
   }
   return { signin, isLoading, error }
}
