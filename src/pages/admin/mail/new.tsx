import { Button, Form, DatePicker, TimePicker, Input, Typography, Space, Select } from 'antd'
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
import 'easymde/dist/easymde.min.css'

const { Title } = Typography
const { TextArea } = Input

const AdminMailNewPage: NextPageWithLayout = () => {
   const [form] = Form.useForm()
   const router = useRouter()
   let file: File
   const onFinish = (values: any) => {
      // const formData = new FormData;
      // formData.append('upload_file', file)
      // httpFormDataClient()
      //    .post(`${ApiRoutes.attachment.index}`, formData)
      //    .then((res) => {

      //    })
      const data = {
         title: values.title,
         content: values.content,
         dateTime: values.dateTime.format('YYYY-MM-DD'),
         method: values.method?.toString(),
         attachments: [1]
      }
      httpClient()
         .post(`${ApiRoutes.message.index}`, data)
         .then(() => {
            alert('正常に変更されました。')
            router.push('/admin/mail/list')
         })
         .catch((err) => console.error(err))
   }

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   const onCancel = () => {
      router.push('/admin/mail/list')
   }

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            一斉メール・LINE作成
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
            <Form.Item
               label='コンテンツ'
               name='content'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <TextArea rows={15} />
            </Form.Item>
            <Form.Item label='ファイル' name='fileUpload'>
               <input type="file" name='file' />
            </Form.Item>
            <div className='flex ps-[19.8%]'>
               <Form.Item labelCol={{ span: 4 }} className='w-[40%]' label='送信日' name='dateTime'>
                  <DatePicker />
               </Form.Item>
               <Form.Item labelCol={{ span: 4 }} className='w-[40%]' label='送信媒体' name='method'>
                  <Select>
                     <Select.Option value='line'>LINE</Select.Option>
                     <Select.Option value='email'>会員メール</Select.Option>
                  </Select>
               </Form.Item>
            </div>
            <Form.Item wrapperCol={{ span: 12, offset: 11 }} style={{ paddingTop: '24px' }}>
               <Space>
                  <Button type='primary' htmlType='submit'>
                     送信
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

AdminMailNewPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminMailNewPage
