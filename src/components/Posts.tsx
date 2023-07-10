import * as React from 'react'
import { usePost } from 'hooks/post'

const Posts = () => {
  const { data } = usePost()

  return (
    <div className='m-4'>
      {data?.data.map((post) => (
        <div className='mb-2 bg-emerald-200 p-2' key={post.id}>
          <h1 className='text-lg font-semibold'>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      )) ?? null}
    </div>
  )
}

export default Posts
