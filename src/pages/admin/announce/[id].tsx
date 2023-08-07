import { Button, DatePicker, Form, Input, Typography, Space, TimePicker } from 'antd'
import dayjs from 'dayjs';
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'

const { Title } = Typography
const { TextArea } = Input

const AdminUserDetailsPage: NextPageWithLayout = () => {
   const [form] = Form.useForm()
   const router = useRouter()
   const { id } = router.query

   const onFinish = (values: any) => {
      const dateTime = values.dateTime.date.format('YYYY-MM-DD') + " " + values.dateTime.time.format('HH-mm-ss');
      const data = {
         title: values.title,
         content: values.content,
         dateTime: dateTime,
         target: 'all',
         method: 'email',
         targetId: 1,
         attachments: []
      }
      httpClient()
         .put(`${ApiRoutes.notification.index}/${id}`, data)
         .then(() => {
            alert('正常に変更されました。');
            router.push('/admin/announce/list')
         })
         .catch((err) => console.error(err))
   }

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   const onCancel = () => {
      router.push('/admin/announce/list')
   }

   useEffect(() => {
      if (id) {
         httpClient()
            .get(`${ApiRoutes.notification.index}/${id}`)
            .then((res) => {
               form.setFieldsValue({
                  title: res.data.title,
                  content: res.data.content,
                  target: res.data.target,
                  method: res.data.method,
                  dateTime: {
                     date: dayjs(res.data.dateTime),
                     time: dayjs(res.data.dateTime)
                  }
               })
            })
            .catch((err) => console.error(err))
      }
   }, [id])

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            お知らせ情報詳細
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
            <Form.Item className='mt-[100px]' label='送信日' name={'dateTime'}>
               <Space.Compact>
                  <Form.Item
                     name={['dateTime', 'date']}
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <DatePicker />
                  </Form.Item>
                  <Form.Item
                     name={['dateTime', 'time']}
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <TimePicker className='ms-2' />
                  </Form.Item>
               </Space.Compact>
            </Form.Item>
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

AdminUserDetailsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminUserDetailsPage
