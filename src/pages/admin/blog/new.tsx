import { Button, Form, Input, Typography, Space } from 'antd'
import type { NextPageWithLayout } from 'next'
import React from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
import 'easymde/dist/easymde.min.css'

const { Title } = Typography
const { TextArea } = Input

const AdminEventDetailsPage: NextPageWithLayout = () => {
   const [form] = Form.useForm()

   const onFinish = (values: any) => {
      console.log(values)
      httpClient()
         .post(`${ApiRoutes.post.index}`, values)
         .then(() => {
            alert('新しいユーザーが追加されました。')
         })
         .catch((err) => console.error(err))
   }

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            コラム・ブログ情報照会
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
            <Form.Item
               label='日付時刻'
               name='dateTime'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input placeholder='2023-06-11 07:38:56' />
            </Form.Item>
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
            <Form.Item wrapperCol={{ span: 12, offset: 8 }} style={{ paddingTop: '24px' }}>
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

AdminEventDetailsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminEventDetailsPage
