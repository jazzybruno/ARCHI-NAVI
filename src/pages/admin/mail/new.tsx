import { Button, Form, DatePicker, TimePicker, Input, Typography, Space, Select } from 'antd'
import type { NextPageWithLayout } from 'next'
import React, { useState } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
import 'easymde/dist/easymde.min.css'

const { Title } = Typography
const { TextArea } = Input

const AdminMailNewPage: NextPageWithLayout = () => {
   const [form] = Form.useForm()

   const onFinish = (values: any) => {
      const dateTime = values.dateTime.date.format('YYYY-MM-DD') + " " + values.dateTime.time.format('HH-mm-ss');
      const data = {
         title: values.title,
         content: values.content,
         dateTime: dateTime,
         targetId: values.targetId?.toString(),
         method: values.method,
      }
      httpClient()
         .post(`${ApiRoutes.message.index}`, data)
         .then(() => {
            form.setFieldsValue({
               title: null,
               content: null,
               targetId: null,
               method: null,
               dateTime: {
                  date: null,
                  time: null
               }
            })
            alert('正常に変更されました。');
         })
         .catch((err) => console.error(err))
   }

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            一斉メール・LINE作成
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
               label='ターゲット'
               name='targetId'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Select>
                  <Select.Option value='1'>all</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item
               label='方法'
               name='method'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item label='送信日' name={'dateTime'}>
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

AdminMailNewPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminMailNewPage
