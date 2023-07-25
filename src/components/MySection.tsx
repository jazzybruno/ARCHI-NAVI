import * as React from 'react'
import { useMe } from 'hooks/auth'

const MySection = () => {
   const { data: user, error } = useMe()

   return (
      <div className=''>
         {user ? (
            <div>
               <h1 className='text-3xl font-bold'>ようこそ {user.name}様</h1>
            </div>
         ) : (
            <div></div>
         )}
      </div>
   )
}

export default MySection
