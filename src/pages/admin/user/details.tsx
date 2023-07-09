import type { NextPageWithLayout } from 'next'
import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Typography,
  Space,
} from 'antd'
import React from 'react'
import { AdminLayout } from 'layouts/admin'

const { Title } = Typography

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const AdminUserDetailsPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        ユーザー情報詳細
      </Title>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        layout='horizontal'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label='プロフィール画像'>
          <Upload listType='picture-card' className='avatar-uploader' maxCount={1}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>アップロード</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          label='氏名'
          name='username'
          rules={[{ required: true, message: 'このフィールドを入力してください' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='氏名（カナ）'
          name='furigana'
          rules={[{ required: true, message: 'このフィールドを入力してください' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='性別'
          name='sex'
          rules={[{ required: true, message: 'このフィールドを入力してください' }]}
        >
          <Select>
            <Select.Option value='male'>男性</Select.Option>
            <Select.Option value='female'>女性</Select.Option>
            <Select.Option value='private'>非公開</Select.Option>
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
          label='住所'
          name='address'
          rules={[{ required: true, message: 'このフィールドを入力してください' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='住所2'
          name='address2'
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
            <Select.Option value='male'>メール</Select.Option>
            <Select.Option value='female'>LINE</Select.Option>
            <Select.Option value='private'>受け取らない</Select.Option>
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
