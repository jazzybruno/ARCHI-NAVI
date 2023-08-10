import { FolderAddOutlined } from '@ant-design/icons'
import {
   Button,
   Form,
   Input,
   Typography,
   Space,
   DatePicker,
   Select,
   Checkbox,
   Row,
   Col,
} from 'antd'
import dayjs from 'dayjs'
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient, httpFormDataClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
import 'easymde/dist/easymde.min.css'

const { TextArea } = Input
const { Title } = Typography

const AdminCompanyDetailsPage: NextPageWithLayout = () => {
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

   const onCancel = () => {
      router.push('/admin/company/list')
   }

   const onFinish = (values: any) => {
      const formData = new FormData()
      formData.append('upload_file', file)

      httpFormDataClient()
         .post(`${ApiRoutes.attachment.index}`, formData)
         .then((res) => {
            const data = {
               name: values.name,
               link: values.link,
               tel: values.tel.toString(),
               postalCode: values.postalCode,
               prefecture: values.prefecture?.toString(),
               address: values.address,
               officeLocation: values.officeLocation,
               dateOfEstablishment: values.dateOfEstablishment.format('YYYY-MM-DD'),
               capitalStock: values.capitalStock,
               netSales: values.netSales,
               nameOfPersonInCharge: values.nameOfPersonInCharge,
               emailOfPersonInCharge: values.emailOfPersonInCharge,
               classification: values.classification,
               personality: values.personality,
               numberOfEmployees: values.numberOfEmployees,
               other: values.other,
               attachmentId: res.data.id,
            }
            httpClient()
               .put(`${ApiRoutes.company.index}/${id}`, data)
               .then(() => {
                  router.push('/admin/company/list')
                  alert('ユーザー情報が変更されました')
               })
               .catch((err) => console.error(err))
         })
   }

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   useEffect(() => {
      let attachmentId = null
      if (id) {
         httpClient()
            .get(`${ApiRoutes.company.index}/${id}`)
            .then((res) => {
               attachmentId = res.data.attachmentId
               form.setFieldsValue({
                  name: res.data.name,
                  link: res.data.link,
                  tel: res.data.tel.toString(),
                  postalCode: res.data.postalCode,
                  prefecture: res.data.prefecture.toString(),
                  address: res.data.address,
                  officeLocation: res.data.officeLocation,
                  dateOfEstablishment: dayjs(res.data.dateOfEstablishment),
                  capitalStock: res.data.capitalStock,
                  netSales: res.data.netSales,
                  nameOfPersonInCharge: res.data.nameOfPersonInCharge,
                  emailOfPersonInCharge: res.data.emailOfPersonInCharge,
                  classification: res.data.classification,
                  personality: res.data.personality,
                  numberOfEmployees: res.data.numberOfEmployees,
                  other: res.data.other,
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
            企業ページ編集
         </Title>

         <Form
            form={form}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 12 }}
            layout='horizontal'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
         >
            <Form.Item
               label='企業名'
               name='name'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input bordered={false} />
            </Form.Item>
            <Form.Item label='プロフィール画像' name='avatar'>
               <div className='avatar-upload h-[150px] w-[150px] border'>
                  <div className='absolute left-[75px] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%] opacity-0'>
                     <FolderAddOutlined style={{ fontSize: '30px' }}></FolderAddOutlined>
                  </div>
                  <input
                     className='avatar-input h-[150px] w-[150px] opacity-0'
                     type='file'
                     onChange={handleFileChange}
                  />
                  <img src={previewImage} className='avatar-image mt-[-150px] w-[150px]' />
               </div>
            </Form.Item>
            <Form.Item
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
               label='電話番号'
               name='tel'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
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
               label='本書所在都道府県'
               name='prefecture'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Select>
                  <Select.Option value='1'>愛知県</Select.Option>
                  <Select.Option value='2'>秋田県</Select.Option>
                  <Select.Option value='3'>青森県</Select.Option>
                  <Select.Option value='4'>千葉県</Select.Option>
                  <Select.Option value='5'>愛媛県</Select.Option>
                  <Select.Option value='6'>福井県</Select.Option>
                  <Select.Option value='7'>福岡県</Select.Option>
                  <Select.Option value='8'>福島県</Select.Option>
                  <Select.Option value='9'>岐阜県</Select.Option>
                  <Select.Option value='10'>群馬県</Select.Option>
                  <Select.Option value='11'>広島県</Select.Option>
                  <Select.Option value='12'>北海道</Select.Option>
                  <Select.Option value='13'>兵庫県</Select.Option>
                  <Select.Option value='14'>茨城県</Select.Option>
                  <Select.Option value='15'>石川県</Select.Option>
                  <Select.Option value='16'>岩手県</Select.Option>
                  <Select.Option value='17'>香川県</Select.Option>
                  <Select.Option value='18'>鹿児島県</Select.Option>
                  <Select.Option value='19'>神奈川県</Select.Option>
                  <Select.Option value='20'>高知県</Select.Option>
                  <Select.Option value='21'>熊本県</Select.Option>
                  <Select.Option value='22'>三重県</Select.Option>
                  <Select.Option value='23'>宮城県</Select.Option>
                  <Select.Option value='24'>宮崎県</Select.Option>
                  <Select.Option value='25'>長野県</Select.Option>
                  <Select.Option value='26'>長崎県</Select.Option>
                  <Select.Option value='27'>奈良県</Select.Option>
                  <Select.Option value='28'>新潟県</Select.Option>
                  <Select.Option value='30'>大分県</Select.Option>
                  <Select.Option value='31'>岡山県</Select.Option>
                  <Select.Option value='32'>沖縄県</Select.Option>
                  <Select.Option value='33'>大阪府</Select.Option>
                  <Select.Option value='34'>佐賀県</Select.Option>
                  <Select.Option value='35'>埼玉県</Select.Option>
                  <Select.Option value='36'>滋賀県</Select.Option>
                  <Select.Option value='37'>島根県</Select.Option>
                  <Select.Option value='38'>静岡県</Select.Option>
                  <Select.Option value='39'>栃木県</Select.Option>
                  <Select.Option value='40'>徳島県</Select.Option>
                  <Select.Option value='41'>東京都</Select.Option>
                  <Select.Option value='42'>鳥取県</Select.Option>
                  <Select.Option value='43'>富山県</Select.Option>
                  <Select.Option value='44'>和歌山県</Select.Option>
                  <Select.Option value='45'>山形県</Select.Option>
                  <Select.Option value='46'>山口県</Select.Option>
                  <Select.Option value='47'>山梨県</Select.Option>
                  <Select.Option value='48'>オンライン</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item
               label='本書所在地'
               name='address'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='事務所所在地'
               name='officeLocation'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='設立'
               name='dateOfEstablishment'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <DatePicker className='w-full' />
            </Form.Item>
            <Form.Item
               label='資本金'
               name='capitalStock'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='従業員数'
               name='numberOfEmployees'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='売上高'
               name='netSales'
               rules={[{ required: false, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='担当者名'
               name='nameOfPersonInCharge'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='担当者メールアドレス'
               name='emailOfPersonInCharge'
               rules={[
                  { required: true, message: 'このフィールドを入力してください' },
                  { type: 'email', message: 'メール形式が正しくありません' },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='業種（複数選択可）'
               name='classification'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Checkbox.Group style={{ width: '100%' }}>
                  <Row>
                     <Col span={8}>
                        <Checkbox value='1'>環境</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='2'>ゼネコン</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='3'>サブコン</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='4'>地場ゼネコン</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='5'>設計事務所</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='6'>デベロッパー</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='7'>ハウスメーカー</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='8'>建設コンサルタント</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='9'>公務員</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='10'>素材,建材メーカー</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='11'>不動産</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='12'>インテリア</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='13'>マリコン</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='14'>アトリエ</Checkbox>
                     </Col>
                     <Col span={8}>
                        <Checkbox value='15'>その他</Checkbox>
                     </Col>
                  </Row>
               </Checkbox.Group>
            </Form.Item>
            <Form.Item
               label='事業内容'
               name='personality'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <TextArea rows={6} />
            </Form.Item>
            <Form.Item
               label='求める人材'
               name=''
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <TextArea rows={6} />
            </Form.Item>
            <Form.Item
               label='その他'
               name='other'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <TextArea rows={6} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 11 }} style={{ paddingTop: '24px' }}>
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

AdminCompanyDetailsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminCompanyDetailsPage
