import { Button, Form, Input, Typography, Space, DatePicker, Select } from 'antd'
import dayjs from 'dayjs';
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState, ChangeEvent } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient, httpFormDataClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
import 'easymde/dist/easymde.min.css'

const { Title } = Typography
const { TextArea } = Input

const AdminBlogDetailsPage: NextPageWithLayout = () => {
   const [form] = Form.useForm()
   const router = useRouter()
   const { id } = router.query
   const [previewImage, setPreviewImage] = useState('')

   const [file, setFile] = useState<File>()

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFile(e.target.files[0])
         setPreviewImage(URL.createObjectURL(e.target.files[0]))
      }
   }

   const onFinish = (values: any) => {
      const formData = new FormData;
      formData.append('upload_file', file)

      httpFormDataClient()
         .post(`${ApiRoutes.attachment.index}`, formData)
         .then((res) => {
            const data = {
               title: values.title,
               content: values.content,
               dateTime: values.dateTime.format('YYYY-MM-DD'),
               attachmentId: res.data.id,
               status: values.status.toString(),
               metaTitle: values.metaTitle,
               metaKeyword: values.metaKeyword,
               metaDescription: values.metaDescription
            }
            httpClient()
               .put(`${ApiRoutes.post.index}/${id}`, data)
               .then(() => {
                  alert('正常に変更されました。');
               })
               .catch((err) => console.error(err))
         })
   }

   useEffect(() => {
      let attachmentId = null;

      if (id) {
         httpClient()
            .get(`${ApiRoutes.post.index}/${id}`)
            .then((res) => {
               attachmentId = res.data.attachmentId;
               form.setFieldsValue({
                  title: res.data.title,
                  content: res.data.content,
                  dateTime: dayjs(res.data.dateTime),
                  status: res.data.status?.toString(),
                  metaTitle: res.data.metaTitle,
                  metaKeyword: res.data.metaKeyword,
                  metaDescription: res.data.metaDescription,
               })
               httpClient()
                  .get(`${ApiRoutes.attachment.index}/${attachmentId}`)
                  .then((res) => {
                     setPreviewImage(res.data.url)
                  })
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
            labelCol={{ span: 4 }}
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
            <Form.Item label='画像' name='avatar'>
               <input className='avatar-upload' type='file' onChange={handleFileChange} />
               <img src={previewImage} className='w-[150px] avatar-image' />
            </Form.Item>
            <Form.Item
               label='メタタイトル'
               name='metaTitle'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='メタキーワード'
               name='metaKeyword'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='メタ記述'
               name='metaDescription'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='本文'
               name='content'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <TextArea />
            </Form.Item>
            <Form.Item
               label='投稿日'
               name='dateTime'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <DatePicker />
            </Form.Item>
            <Form.Item
               label='ステータス'
               name='status'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Select>
                  <Select.Option value='1'>公開</Select.Option>
                  <Select.Option value='0'>非公開</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 9 }}>
               <Space>
                  <Button type='primary' htmlType='submit'>
                     変更する
                  </Button>
               </Space>
            </Form.Item>
         </Form>
      </>
   )
}

AdminBlogDetailsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminBlogDetailsPage
