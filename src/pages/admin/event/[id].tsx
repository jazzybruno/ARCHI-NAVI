import { Button, Form, Input, Typography, DatePicker, Space, Select } from 'antd'
import dayjs from 'dayjs';
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient, httpFormDataClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
import 'easymde/dist/easymde.min.css'
import { FolderAddOutlined } from '@ant-design/icons';

const { Title } = Typography
const { TextArea } = Input
const { RangePicker } = DatePicker

const AdminEventDetailsPage: NextPageWithLayout = () => {
   const [form] = Form.useForm()
   const router = useRouter()
   const { id } = router.query
   const [previewImage, setPreviewImage] = useState('')
   const [previewImage1, setPreviewImage1] = useState('')
   const [previewImage2, setPreviewImage2] = useState('')
   const [previewImage3, setPreviewImage3] = useState('')
   const [file, setFile] = useState<File>()
   const [file1, setFile1] = useState<File>()
   const [file2, setFile2] = useState<File>()
   const [file3, setFile3] = useState<File>()




   useEffect(() => {
      if (id) {
         httpClient()
            .get(`${ApiRoutes.event.index}/${id}`)
            .then((res) => {
               const [category, lineStatus] = res.data.type.split(',');
               form.setFieldsValue({
                  title: res.data.title,
                  content: res.data.content,
                  type: {
                     category: category,
                     lineStatus: lineStatus
                  },
                  applicationPeriod: [dayjs(res.data.startDate), dayjs(res.data.endDate)],
                  prefecture: res.data.prefecture?.toString(),
                  typeOfOccupation: res.data.typeOfOccupation?.toString(),
                  recruitmentCondition: res.data.recruitmentCondition,
                  compensation: res.data.compensation,
                  applicationUrl: res.data.applicationUrl,
                  publicationDate: [dayjs(res.data.publicationStartDate), dayjs(res.data.publicationEndDate)],
                  status: res.data.status?.toString()
               })
               setPreviewImage(res.data.thumbnail.url)
               setPreviewImage1(res.data.attachments[0].url)
               setPreviewImage2(res.data.attachments[1].url)
               setPreviewImage3(res.data.attachments[2].url)
            })
            .catch((err) => console.error(err))
      }
   }, [id])



   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFile(e.target.files[0])
         setPreviewImage(URL.createObjectURL(e.target.files[0]))
      }
   }

   const handleFileChange1 = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFile1(e.target.files[0])
         setPreviewImage1(URL.createObjectURL(e.target.files[0]))
      }
   }

   const handleFileChange2 = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFile2(e.target.files[0])
         setPreviewImage2(URL.createObjectURL(e.target.files[0]))
      }
   }

   const handleFileChange3 = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFile3(e.target.files[0])
         setPreviewImage3(URL.createObjectURL(e.target.files[0]))
      }
   }

   const onFinish = async (values: any) => {
      const [start, end] = values.applicationPeriod;
      const [publicationStart, publicationEnd] = values.publicationDate;
      const formData = new FormData;
      const formData1 = new FormData;
      const formData2 = new FormData;
      const formData3 = new FormData;
      formData.append('upload_file', file)
      formData1.append('upload_file', file1)
      formData2.append('upload_file', file2)
      formData3.append('upload_file', file3)


      let attachmentId, attachmentId1, attachmentId2, attachmentId3 = null;

      if (file) {
         let res = await httpFormDataClient().post(`${ApiRoutes.attachment.index}`, formData)
         if (res.status > 400) {
            return
         } else if (res.status == 201) {
            attachmentId = res.data.id
         }
      }

      if (file1) {
         let res = await httpFormDataClient().post(`${ApiRoutes.attachment.index}`, formData1)
         if (res.status > 400) {
            return
         } else if (res.status == 201) {
            attachmentId1 = res.data.id
         }
      }

      if (file2) {
         let res = await httpFormDataClient().post(`${ApiRoutes.attachment.index}`, formData2)
         if (res.status > 400) {
            return
         } else if (res.status == 201) {
            attachmentId2 = res.data.id
         }
      }


      if (file3) {
         let res = await httpFormDataClient().post(`${ApiRoutes.attachment.index}`, formData3)
         if (res.status > 400) {
            return
         } else if (res.status == 201) {
            attachmentId3 = res.data.id
         }
      }

      const data = {
         title: values.title,
         content: values.content,
         type: values.type.category,
         startDate: start.format('YYYY-MM-DD'),
         endDate: end.format('YYYY-MM-DD'),
         prefecture: values.prefecture?.toString(),
         typeOfOccupation: values.typeOfOccupation?.toString(),
         recruitmentCondition: values.recruitmentCondition,
         compensation: values.compensation,
         attachmentId: attachmentId,
         attachments: [attachmentId1, attachmentId2, attachmentId3],
         applicationUrl: values.applicationUrl,
         publicationStartDate: publicationStart.format('YYYY-MM-DD'),
         publicationEndDate: publicationEnd.format('YYYY-MM-DD'),
         status: values.status?.toString(),
      }
      httpClient()
         .put(`${ApiRoutes.event.index}/${id}`, data)
         .then(() => {
            alert('正常に変更されました。');
            router.push('/admin/event/list');
         })
         .catch((err) => console.error(err))
   }

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   const onCancel = () => {
      router.push('admin/event/list');
   }

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            イベント詳細
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
               label='種別'
               name='type'
            >
               <Form.Item
                  name={['type', 'category']}
                  rules={[{ required: true, message: 'このフィールドを入力してください' }]}
               >
                  <Select>
                     <Select.Option value='intern'>インターン</Select.Option>
                     <Select.Option value='seminar'>説明会</Select.Option>
                     <Select.Option value='other'>その他</Select.Option>
                  </Select>
               </Form.Item>
               <Form.Item
                  name={['type', 'lineStatus']}
                  rules={[{ required: true, message: 'このフィールドを入力してください' }]}
               >
                  <Select>
                     <Select.Option value='オンライン'>オンライン</Select.Option>
                     <Select.Option value='オフライン'>オフライン</Select.Option>
                  </Select>
               </Form.Item>
            </Form.Item>
            <Form.Item
               label='開催期間'
               name='applicationPeriod'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <RangePicker className='w-full' />
            </Form.Item>
            <Form.Item
               label='会場'
               name='prefecture'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Select>
                  <Select.Option value='愛知県'>愛知県</Select.Option>
                  <Select.Option value='秋田県'>秋田県</Select.Option>
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
               label='対象職種'
               name='typeOfOccupation'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Select>
                  <Select.Option value='1'>意匠設計</Select.Option>
                  <Select.Option value='2'>構造設計</Select.Option>
                  <Select.Option value='3'>設備設計</Select.Option>
                  <Select.Option value='4'>環境設計（省エネ計算）</Select.Option>
                  <Select.Option value='5'>施工管理</Select.Option>
                  <Select.Option value='6'>都市計画</Select.Option>
                  <Select.Option value='7'>建設コンサルタント</Select.Option>
                  <Select.Option value='8'>その他</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item
               label='応募条件'
               name='recruitmentCondition'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <TextArea rows={5} />
            </Form.Item>
            <Form.Item
               label='報酬・手当'
               name='compensation'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <TextArea rows={5} />
            </Form.Item>
            <Form.Item
               label='アイキャッチ画像'
               name='logo'
            >
               <div className='avatar-upload w-[150px] h-[150px] border' >
                  <div className='opacity-0 absolute z-10 left-[75px] translate-x-[-50%] translate-y-[-50%] top-[50%]'>
                     <FolderAddOutlined style={{ fontSize: '40px' }} ></FolderAddOutlined>
                  </div>
                  <input className='w-[150px] h-[150px] opacity-0 avatar-input' type='file' onChange={handleFileChange} />
                  <img src={previewImage} className='w-[150px] mt-[-150px] avatar-image' />
               </div>
            </Form.Item>
            <Form.Item
               label='その他画像'
               name='attachments'
            >
               <div className="flex">
                  <div className='avatar-upload w-[150px] h-[150px] border' >
                     <div className='opacity-0 absolute z-10 left-[75px] translate-x-[-50%] translate-y-[-50%] top-[50%]'>
                        <FolderAddOutlined style={{ fontSize: '30px' }} ></FolderAddOutlined>
                     </div>
                     <input className='w-[150px] h-[150px] opacity-0 avatar-input' type='file' onChange={handleFileChange1} />
                     <img src={previewImage1} className='w-[150px] mt-[-150px] avatar-image' />
                  </div>
                  <div className='avatar-upload w-[150px] h-[150px] border mx-[20px]' >
                     <div className='opacity-0 absolute z-10 left-[245px] translate-x-[-50%] translate-y-[-50%] top-[50%]'>
                        <FolderAddOutlined style={{ fontSize: '30px' }} ></FolderAddOutlined>
                     </div>
                     <input className='w-[150px] h-[150px] opacity-0 avatar-input' type='file' onChange={handleFileChange2} />
                     <img src={previewImage2} className='w-[150px] mt-[-150px] avatar-image' />
                  </div>
                  <div className='avatar-upload w-[150px] h-[150px] border' >
                     <div className='opacity-0 absolute z-10 left-[415px] translate-x-[-50%] translate-y-[-50%] top-[50%]'>
                        <FolderAddOutlined style={{ fontSize: '30px' }} ></FolderAddOutlined>
                     </div>
                     <input className='w-[150px] h-[150px] opacity-0 avatar-input' type='file' onChange={handleFileChange3} />
                     <img src={previewImage3} className='w-[150px] mt-[-150px] avatar-image' />
                  </div>
               </div>
            </Form.Item>
            <Form.Item
               label='本文'
               name='content'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <TextArea rows={12} />
            </Form.Item>
            <Form.Item
               label='申し込みURL'
               name='applicationUrl'
            >
               <Input />
            </Form.Item>
            <Form.Item
               label='表示期間'
               name='publicationDate'
               className='pt-[60px]'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <RangePicker className='w-full' />
            </Form.Item>
            <Form.Item
               label='ステータス'
               name='status'
               rules={[{ required: true, message: 'このフィールドを入力してください' }]}
            >
               <Select>
                  <Select.Option value='0'>表示</Select.Option>
                  <Select.Option value='1'>非表示</Select.Option>
                  <Select.Option value='2'>下書き</Select.Option>
               </Select>
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

AdminEventDetailsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminEventDetailsPage
