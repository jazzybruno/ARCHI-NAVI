import { Button, Form, Input, Typography, DatePicker, Space, Select } from 'antd'
import dayjs from 'dayjs';
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
import 'easymde/dist/easymde.min.css'

const { Title } = Typography
const { TextArea } = Input
const { RangePicker } = DatePicker

const AdminEventDetailsPage: NextPageWithLayout = () => {
   const [form] = Form.useForm()
   const router = useRouter()
   const { id } = router.query

   const onFinish = (values: any) => {
      const [start, end] = values.applicationPeriod;
      const data = {
         title: values.title,
         content: values.content,
         type: values.type,
         prefecture: values.prefecture?.toString(),
         postalCode: values.postalCode,
         address: values.address,
         numberOfRecruitment: values.numberOfRecruitment,
         recruitmentCondition: values.recruitmentCondition,
         applicationStartDateTime: start.format('YYYY-MM-DD'),
         applicationEndDateTime: end.format('YYYY-MM-DD'),
         dateTime: values.dateTime.format('YYYY-MM-DD'),
      }
      httpClient()
         .put(`${ApiRoutes.event.index}/${id}`, data)
         .then(() => {
            alert('正常に変更されました。');
         })
         .catch((err) => console.error(err))
   }

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   useEffect(() => {
      if (id) {
         httpClient()
            .get(`${ApiRoutes.event.index}/${id}`)
            .then((res) => {
               form.setFieldsValue({
                  title: res.data.title,
                  content: res.data.content,
                  type: res.data.type,
                  prefecture: res.data.prefecture?.toString(),
                  postalCode: res.data.postalCode,
                  address: res.data.address,
                  numberOfRecruitment: res.data.numberOfRecruitment,
                  recruitmentCondition: res.data.recruitmentCondition,
                  applicationPeriod: [dayjs(res.data.applicationStartDateTime), dayjs(res.data.applicationEndDateTime)],
                  dateTime: dayjs(res.data.dateTime)
               })
            })
            .catch((err) => console.error(err))
      }
   }, [id])

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            インターン・イベント情報変更
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
               label='タイプ'
               name='type'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='開催期間'
               name='applicationPeriod'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <RangePicker />
            </Form.Item>
            <Form.Item
               label='募集条件'
               name='recruitmentCondition'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <TextArea />
            </Form.Item>
            <Form.Item
               label='県'
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
               label='募集人数'
               name='numberOfRecruitment'
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
               label='掲載日'
               name='dateTime'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <DatePicker />
               <a className='ms-3' href="http://www.google.com/calendar/event?action=TEMPLATE" target="_blank">イベント登録</a>
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
