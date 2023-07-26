import { Button, DatePicker, Form, Input, Select, Typography, Space } from 'antd'
import dayjs from 'dayjs'
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState, ChangeEvent } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient, httpFormDataClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'

const { Title } = Typography

const AdminUserDetailsPage: NextPageWithLayout = () => {
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

      const formData = new FormData()
      formData.append('upload_file', file)

      httpFormDataClient()
         .post(`${ApiRoutes.attachment.index}`, formData)
         .then((res) => {
            const data = {
               name: values.name,
               nameKana: values.nameKana,
               gender: values.gender?.toString(),
               birthday: values.birthday.format('YYYY-MM-DD'),
               email: values.email,
               address: values.address,
               schoolName: values.school,
               faculty: values.faculty,
               department: values.department,
               receiveInformation: values.notification?.toString(),
               tel: values.tel,
               postalCode: values.postalCode,
               password: values.password,
               attachmentId: res.data.id,
            }
            httpClient()
               .put(`${ApiRoutes.user.index}/${id}`, data)
               .then(() => {
                  alert('正常に変更されました。');
               })
               .catch((err) => console.error(err))
         })
   }

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   useEffect(() => {
      let attachmentId = 0;
      if (id) {
         httpClient()
            .get(`${ApiRoutes.user.index}/${id}`)
            .then((res) => {
               attachmentId = res.data.attachmentId;
               form.setFieldsValue({
                  name: res.data.name,
                  nameKana: res.data.nameKana,
                  gender: res.data.gender?.toString(),
                  birthday: dayjs(res.data.birthday),
                  email: res.data.email,
                  address: res.data.address,
                  school: res.data.schoolName,
                  faculty: res.data.faculty,
                  department: res.data.department,
                  notification: res.data.receiveInformation?.toString(),
                  tel: res.data.tel,
                  postalCode: res.data.postalCode,
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

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            ユーザー情報詳細
         </Title>
         <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
            layout='horizontal'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
         >
            <Form.Item label='プロフィール画像' name='avatar'>
               <input type='file' onChange={handleFileChange} />
               <img src={previewImage} className='max-w-[150px]' />
            </Form.Item>
            <Form.Item
               label='氏名'
               name='name'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='氏名（カナ）'
               name='nameKana'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='性別'
               name='gender'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Select>
                  <Select.Option value='0'>男性</Select.Option>
                  <Select.Option value='1'>女性</Select.Option>
                  <Select.Option value='2'>非公開</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item
               label='生年月日'
               name='birthday'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <DatePicker />
            </Form.Item>
            <Form.Item
               label='メールアドレス'
               name='email'
               rules={[
                  { required: true, message: 'このフィールドを入力してください' },
                  { type: 'email', message: 'メール形式が正しくありません' },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='郵便番号'
               name='postalCode'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='住所'
               name='address'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='電話番号'
               name='tel'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='学校名'
               name='school'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='学部'
               name='faculty'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='学科'
               name='department'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='企業情報の受信設定'
               name='notification'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Select>
                  <Select.Option value='1'>メール</Select.Option>
                  <Select.Option value='2'>LINE</Select.Option>
                  <Select.Option value='0'>受け取らない</Select.Option>
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

AdminUserDetailsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminUserDetailsPage
