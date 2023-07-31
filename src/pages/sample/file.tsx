import type { NextPageWithLayout } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'
import { MainLayout } from 'layouts/main'
import { httpClient } from 'services/httpClient'
import { Attachment } from 'types'

const FilePage: NextPageWithLayout = () => {
   const [images, setImages] = useState(new Map<string, File>())
   const [result, setResult] = useState<Attachment>()

   async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
      if (!e.target.files) return
      const file = e.target.files[0]

      setImages((before) => new Map(before.set(e.target.id, file)))
   }

   async function register(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()

      const formData = new FormData()
      images.forEach((image, key) => formData.append('upload_file', image))

      await httpClient()
         .post(`/api/attachment`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
         .then((response) => {
            alert('アップロードしました')
            setResult(response.data)
         })
         .catch((error) => {
            alert('エラーが発生しました')
         })
   }

   return (
      <>
         {result ? (
            <div>
               <img src={result.url} alt={result.name} />
            </div>
         ) : (
            <form method={'post'} onSubmit={(e) => register(e)}>
               <hr />
               <input
                  id='file01'
                  type='file'
                  accept='image/jpeg, image/png'
                  onChange={(e) => handleUpload(e)}
               />
               <hr />
               <button type={'submit'}>アップロード</button>
            </form>
         )}
      </>
   )
}

FilePage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default FilePage
