import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Upload, Typography, Space } from 'antd'
import type { NextPageWithLayout } from 'next'
import dynamic from 'next/dynamic'
import React, { useCallback, useState } from 'react'
import { AdminLayout } from 'layouts/admin'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import 'easymde/dist/easymde.min.css'

const { Title } = Typography

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const AdminCompanyEditPage: NextPageWithLayout = () => {
  const [value, setValue] = useState('Initial value')

  const onChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        企業情報変更
      </Title>

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        layout='horizontal'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='会社HPリンク'
          name='website'
          rules={[{ required: true, message: 'このフィールドを入力してください' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='担当者'
          name='member'
          rules={[{ required: true, message: 'このフィールドを入力してください' }]}
        >
          <Input />
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
          label='電話番号'
          name='tel'
          rules={[{ required: true, message: 'このフィールドを入力してください' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='サムネイル/ロゴ画像'>
          <Upload listType='picture-card' className='avatar-uploader' maxCount={1}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>アップロード</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          label='会社概要'
          name='overview'
          rules={[{ required: true, message: 'このフィールドを入力してください' }]}
        >
          <SimpleMDE value={value} onChange={onChange} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 8 }} style={{ paddingTop: '24px' }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              変更する
            </Button>
            <Button type='default' htmlType='submit'>
              キャンセル
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

AdminCompanyEditPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminCompanyEditPage
