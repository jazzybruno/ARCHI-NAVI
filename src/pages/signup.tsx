import { Button, Input, Form, Select, DatePicker, Space, Radio, Typography } from 'antd'
import type { NextPageWithLayout } from 'next'
import dynamic from 'next/dynamic'
import React, { useCallback, useState, ChangeEvent } from 'react'
import { MainLayout } from 'layouts/main'
import { httpClient, httpFormDataClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import 'easymde/dist/easymde.min.css'

const { Title } = Typography

const SignupPage: NextPageWithLayout = () => {
   const [value, setValue] = useState('Initial value')
   const [form] = Form.useForm()
   const [previewImage, setPreviewImage] = useState('')
   const [role, setRole] = useState<string>('user')
   const [file, setFile] = useState<File>()

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFile(e.target.files[0])
         setPreviewImage(URL.createObjectURL(e.target.files[0]))
      }
   }

   const handleRoleChange = (e) => {
      setRole(e.target.value)
   }
   const onChange = useCallback((value: string) => {
      setValue(value)
   }, [])

   const onFinishB = (values: any) => {
      const formData = new FormData()
      formData.append('upload_file', file)

      httpFormDataClient()
         .post(`${ApiRoutes.attachment.index}`, formData)
         .then((res) => {
            const data = {
               name: values.name,
               link: values.link,
               tel: values.tel.toString(),
               managerName: values.managerName,
               department: values.department,
               recruitmentOccupation: values.recruitmentOccupation,
               overview: values.overview,
               feature: values.feature,
               personality: values.personality,
               numberOfEmployees: values.numberOfEmployees,
               appealPoint: values.appealPoint,
               other: values.other,
               email: values.email,
               attachmentId: res.data.id,
            }
            httpClient()
               .post(`${ApiRoutes.company.index}`, data)
               .then(() => {
                  alert('新しいユーザーが追加されました。')
                  form.setFieldsValue({
                     name: null,
                     link: null,
                     tel: null,
                     managerName: null,
                     department: null,
                     recruitmentOccupation: null,
                     overview: null,
                     feature: null,
                     personality: null,
                     numberOfEmployees: null,
                     appealPoint: null,
                     other: null,
                     attachmentId: null,
                     email: null,
                  })
                  setPreviewImage(form.getFieldValue('attachmentId'))
               })
               .catch((err) => console.error(err))
         })
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
               .post(`${ApiRoutes.user.index}`, data)
               .then(() => {
                  alert('新しいユーザーが追加されました。')
                  form.setFieldsValue({
                     name: null,
                     nameKana: null,
                     gender: null,
                     birthday: null,
                     email: null,
                     address: null,
                     school: null,
                     faculty: null,
                     department: null,
                     notification: null,
                     tel: null,
                     postalCode: null,
                     password: null,
                     attachmentId: null,
                  })
                  setPreviewImage(form.getFieldValue('attachmentId'))
               })
               .catch((err) => console.error(err))
         })
   }

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            {role === 'user' ? 'ユーザー登録' : '企業登録'}
         </Title>
         <Form className='mx-auto w-[500px]' labelCol={{ span: 7 }} onChange={handleRoleChange}>
            <Form.Item label='役割'>
               <Radio.Group defaultValue={'user'}>
                  <Radio value='user'>ユーザー</Radio>
                  <Radio value='company'>企業</Radio>
               </Radio.Group>
            </Form.Item>
         </Form>
         <div className='flex justify-center'>
            {role === 'user' ? (
               <Form
                  className='w=[500px] mx-auto'
                  form={form}
                  labelCol={{ span: 7 }}
                  // wrapperCol={{ span: 12 }}
                  layout='horizontal'
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
               >
                  <Form.Item
                     className='w-[500px]'
                     label='氏名'
                     name='name'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item className='w-[500px]' label='プロフィール画像' name='avatar'>
                     <div className='h-[150px] w-[150px]'>
                        <input
                           className='avatar-upload'
                           type='file'
                           onChange={handleFileChange}
                           required
                        />
                     </div>
                     <img src={previewImage} className='avatar-image w-[150px]' />
                  </Form.Item>
                  <Form.Item
                     className='w-[500px]'
                     label='氏名（カナ）'
                     name='nameKana'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[500px]'
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
                     className='w-[500px]'
                     label='生年月日'
                     name='birthday'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <DatePicker className='w-full' />
                  </Form.Item>
                  <Form.Item
                     className='w-[500px]'
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
                     className='w-[500px]'
                     label='郵便番号'
                     name='postalCode'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[500px]'
                     label='住所'
                     name='address'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[500px]'
                     label='電話番号'
                     name='tel'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[500px]'
                     label='学校名'
                     name='school'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[500px]'
                     label='学部'
                     name='faculty'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[500px]'
                     label='学科'
                     name='department'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[500px]'
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
                  <Form.Item
                     className='w-[500px]'
                     label='パスワード'
                     name='password'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item className='flex w-[500px] justify-center'>
                     <Space>
                        <Button className='mx-auto w-[300px]' type='primary' htmlType='submit'>
                           登録
                        </Button>
                     </Space>
                  </Form.Item>
               </Form>
            ) : (
               <Form
                  form={form}
                  labelCol={{ span: 8 }}
                  // wrapperCol={{ span: 12 }}
                  layout='horizontal'
                  onFinish={onFinishB}
                  onFinishFailed={onFinishFailed}
               >
                  <Form.Item
                     className='w-[600px]'
                     label='企業名'
                     name='name'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item className='w-[600px]' label='ロゴ' name='avatar'>
                     <input className='avatar-upload' type='file' onChange={handleFileChange} />
                     <img src={previewImage} className='avatar-image w-[150px]' />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='会社HP'
                     name='link'
                     rules={[
                        { required: true, message: 'このフィールドを入力してください' },
                        { type: 'url', message: 'URL形式が正しくありません' },
                     ]}
                  >
                     <Input placeholder='URL' />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='電話番号'
                     name='tel'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='部門'
                     name='department'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='募集職種'
                     name='recruitmentOccupation'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='特徴'
                     name='feature'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='個性'
                     name='personality'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='従業員数'
                     name='numberOfEmployees'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='アピールポイント'
                     name='appealPoint'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='他の'
                     name='other'
                     rules={[{ required: false, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='担当者'
                     name='managerName'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='担当者メールアドレス：'
                     name='email'
                     rules={[
                        { required: true, message: 'このフィールドを入力してください' },
                        { type: 'email', message: 'メール形式が正しくありません' },
                     ]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     className='w-[600px]'
                     label='会社概要'
                     name='overview'
                     rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                  >
                     <SimpleMDE value={value} onChange={onChange} />
                  </Form.Item>
                  <Form.Item className='flex w-[600px] justify-center'>
                     <Space>
                        <Button className='mx-auto w-[300px]' type='primary' htmlType='submit'>
                           登録
                        </Button>
                     </Space>
                  </Form.Item>
               </Form>
            )}
         </div>
      </>
   )
}

SignupPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default SignupPage
