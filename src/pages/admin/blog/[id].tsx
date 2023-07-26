import { Button, Form, Input, Typography, Space } from 'antd'
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
import 'easymde/dist/easymde.min.css'

const { Title } = Typography
const { TextArea } = Input

const AdminBlogDetailsPage: NextPageWithLayout = () => {
   const [form] = Form.useForm()
   const router = useRouter()
   const { id } = router.query

   const onFinish = (values: any) => {
      httpClient()
         .put(`${ApiRoutes.post.index}/${id}`, values)
         .then(() => {
            console.log('success:', values)
         })
         .catch((err) => console.error(err))
   }

   useEffect(() => {
      if (id) {
         httpClient()
            .get(`${ApiRoutes.post.index}/${id}`)
            .then((res) => {
               form.setFieldsValue({
                  title: res.data.title,
                  content: res.data.content,
                  meta_title: res.data.meta_title,
                  // dateTime: res.data.dateTime.format('YYYY-MM-DD-hh-mm-ss'),
                  meta_keyword: res.data.meta_keyword,
                  meta_description: res.data.meta_description,
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
            <Form.Item
               label='コンテンツ'
               name='content'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <TextArea />
            </Form.Item>
            {/* <Form.Item
          label='日付時刻'
          name='dateTime'
          rules={[{ required: true, message: 'このフィールドを入力してください' }]}
        >
          <Input />
        </Form.Item> */}
            <Form.Item
               label='メタタイトル'
               name='meta_title'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='メタキーワード'
               name='meta_keyword'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='メタ記述'
               name='meta_description'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
         </Form>
      </>
   )
}

AdminBlogDetailsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminBlogDetailsPage
