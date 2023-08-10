import { FolderAddOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography, Space, DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import type { NextPageWithLayout } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState, ChangeEvent } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient, httpFormDataClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
import 'easymde/dist/easymde.min.css'

const { Title } = Typography
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

const AdminBlogDetailsPage: NextPageWithLayout = () => {
   const [value, setValue] = useState('Initial value')
   const [form] = Form.useForm()
   const router = useRouter()
   const { id } = router.query
   const [previewImage, setPreviewImage] = useState('')
   const [previewImage1, setPreviewImage1] = useState('')
   const [previewImage2, setPreviewImage2] = useState('')
   const [previewImage3, setPreviewImage3] = useState('')

   const [file, setFile] = useState<File>()
   const [file1, setFile1] = useState<File>()
   const [file2, setFile2] = useState<File>()
   const [file3, setFile3] = useState<File>()

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFile(e.target.files[0])
         setPreviewImage(URL.createObjectURL(e.target.files[0]))
      }
   }

   const handleFileChange1 = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFile1(e.target.files[0])
         setPreviewImage1(URL.createObjectURL(e.target.files[0]))
      }
   }

   const handleFileChange2 = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFile2(e.target.files[0])
         setPreviewImage2(URL.createObjectURL(e.target.files[0]))
      }
   }

   const handleFileChange3 = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFile3(e.target.files[0])
         setPreviewImage3(URL.createObjectURL(e.target.files[0]))
      }
   }

   const onChange = useCallback((value: string) => {
      setValue(value)
   }, [])

   const onFinish = async (values: any) => {
      const formData = new FormData()
      const formData1 = new FormData()
      const formData2 = new FormData()
      const formData3 = new FormData()
      formData.append('upload_file', file)
      formData1.append('upload_file', file1)
      formData2.append('upload_file', file2)
      formData3.append('upload_file', file3)

      let attachmentId,
         attachmentId1,
         attachmentId2,
         attachmentId3 = null

      if (file) {
         let res = await httpFormDataClient().post(`${ApiRoutes.attachment.index}`, formData)
         if (res.status > 400) {
            return
         } else if (res.status == 201) {
            attachmentId = res.data.id
         }
      }

      if (file1) {
         let res = await httpFormDataClient().post(`${ApiRoutes.attachment.index}`, formData1)
         if (res.status > 400) {
            return
         } else if (res.status == 201) {
            attachmentId1 = res.data.id
         }
      }

      if (file2) {
         let res = await httpFormDataClient().post(`${ApiRoutes.attachment.index}`, formData2)
         if (res.status > 400) {
            return
         } else if (res.status == 201) {
            attachmentId2 = res.data.id
         }
      }

      if (file3) {
         let res = await httpFormDataClient().post(`${ApiRoutes.attachment.index}`, formData3)
         if (res.status > 400) {
            return
         } else if (res.status == 201) {
            attachmentId3 = res.data.id
         }
      }

      const data = {
         title: values.title,
         content: values.content,
         categoryId: values.category?.toString(),
         dateTime: values.dateTime.format('YYYY-MM-DD'),
         attachmentId: attachmentId,
         attachments: [attachmentId1, attachmentId2, attachmentId3],
         tag: values.tag,
         relatedPostIds: values.relatedlink,
         status: values.status?.toString(),
         metaTitle: null,
         metaKeyword: null,
         metaDescription: null,
      }
      httpClient()
         .put(`${ApiRoutes.post.index}/${id}`, data)
         .then(() => {
            alert('正常に変更されました。')
            router.push('/admin/blog/list')
         })
         .catch((err) => console.error(err))
   }

   const onCancel = () => {
      router.push('/admin/blog/list')
   }

   useEffect(() => {
      if (id) {
         httpClient()
            .get(`${ApiRoutes.post.index}/${id}`)
            .then((res) => {
               form.setFieldsValue({
                  title: res.data.title,
                  category: res.data.categoryId?.toString(),
                  dateTime: dayjs(res.data.dateTime),
                  status: res.data.status.toString(),
                  tag: res.data.tag,
                  relatedlink: res.data.relatedPostIds,
                  content: res.data.content,
               })
               setPreviewImage(res.data.header.url)
               setPreviewImage1(res.data.thumbnails[0].url)
               setPreviewImage2(res.data.thumbnails[1].url)
               setPreviewImage3(res.data.thumbnails[2].url)
            })
            .catch((err) => console.error(err))
      }
   }, [id])

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            コラム・Blog情報変更
         </Title>

         <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            layout='horizontal'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
         >
            <Form.Item
               label='タイトル'
               name='title'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item label='ヘッダー画像' name='avatar'>
               <div className='avatar-upload h-[150px] w-[150px] border'>
                  <div className='absolute left-[75px] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%] opacity-0'>
                     <FolderAddOutlined style={{ fontSize: '40px' }}></FolderAddOutlined>
                  </div>
                  <input
                     className='avatar-input h-[150px] w-[150px] opacity-0'
                     type='file'
                     onChange={handleFileChange}
                  />
                  <img src={previewImage} className='avatar-image mt-[-150px] w-[150px]' />
               </div>
            </Form.Item>
            <Form.Item label='サムネイル画像' name='thumbnail'>
               <div className='flex'>
                  <div className='avatar-upload h-[150px] w-[150px] border'>
                     <div className='absolute left-[75px] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%] opacity-0'>
                        <FolderAddOutlined style={{ fontSize: '30px' }}></FolderAddOutlined>
                     </div>
                     <input
                        className='avatar-input h-[150px] w-[150px] opacity-0'
                        type='file'
                        onChange={handleFileChange1}
                     />
                     <img src={previewImage1} className='avatar-image mt-[-150px] w-[150px]' />
                  </div>
                  <div className='avatar-upload mx-[20px] h-[150px] w-[150px] border'>
                     <div className='absolute left-[245px] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%] opacity-0'>
                        <FolderAddOutlined style={{ fontSize: '30px' }}></FolderAddOutlined>
                     </div>
                     <input
                        className='avatar-input h-[150px] w-[150px] opacity-0'
                        type='file'
                        onChange={handleFileChange2}
                     />
                     <img src={previewImage2} className='avatar-image mt-[-150px] w-[150px]' />
                  </div>
                  <div className='avatar-upload h-[150px] w-[150px] border'>
                     <div className='absolute left-[415px] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%] opacity-0'>
                        <FolderAddOutlined style={{ fontSize: '30px' }}></FolderAddOutlined>
                     </div>
                     <input
                        className='avatar-input h-[150px] w-[150px] opacity-0'
                        type='file'
                        onChange={handleFileChange3}
                     />
                     <img src={previewImage3} className='avatar-image mt-[-150px] w-[150px]' />
                  </div>
               </div>
            </Form.Item>
            <Form.Item
               label='カテゴリー'
               name='category'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Select>
                  <Select.Option value='1'>カテゴリー1</Select.Option>
                  <Select.Option value='2'>カテゴリー2</Select.Option>
                  <Select.Option value='3'>カテゴリー3</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item
               label='タグ'
               name='tag'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='関連リンク'
               name='relatedlink'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='本文'
               name='content'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <SimpleMDE value={value} onChange={onChange} />
            </Form.Item>
            <Form.Item
               label='日付設定（投稿日）'
               name='dateTime'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <DatePicker allowClear={false} />
            </Form.Item>
            <Form.Item
               label='ステータス'
               name='status'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Select>
                  <Select.Option value='0'>公開</Select.Option>
                  <Select.Option value='1'>非公開</Select.Option>
                  <Select.Option value='2'>下書き</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 11 }}>
               <Space>
                  <Button type='primary' htmlType='submit'>
                     変更する
                  </Button>
                  <Button type='primary' className='!bg-red-500' onClick={onCancel}>
                     キャンセル
                  </Button>
               </Space>
            </Form.Item>
         </Form>
      </>
   )
}

AdminBlogDetailsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminBlogDetailsPage
