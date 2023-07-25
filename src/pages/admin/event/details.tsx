import { Button, Form, Input, Typography, Space } from 'antd'
import type { NextPageWithLayout } from 'next'
import dynamic from 'next/dynamic'
import React, { useCallback, useState, useEffect } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
import { useRouter } from 'next/router'
import 'easymde/dist/easymde.min.css'

const { Title } = Typography
const { TextArea } = Input

const AdminEventDetailsPage: NextPageWithLayout = () => {
    const [form] = Form.useForm()
    const router = useRouter()

    const onFinish = (values: any) => {
        httpClient()
            .post(`${ApiRoutes.event.index}/new`, values)
            .then(() => {
                console.log('success:', values)
            })
            .catch((err) => console.error(err))
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }


    const handleChange = (key, value) => {
        form.setFieldValue([key], value)
        console.log(form.getFieldValue('title'))
    }


    return (
        <>
            <Title level={2} style={{ textAlign: 'center' }}>
                インターン・イベント情報照会
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
                    <Input onChange={(e) => handleChange('title', e.target.value)} />
                </Form.Item>
                <Form.Item
                    label='タイプ'
                    name='type'
                    rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                >
                    <Input onChange={(e) => handleChange('title', e.target.value)} />
                </Form.Item>
                <Form.Item
                    label='コンテンツ'
                    name='content'
                    rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                >
                    <TextArea />
                </Form.Item>
                {/* <Form.Item
          label='日付時刻'
          name='dateTime'
          rules={[{ required: true, message: 'このフィールドを入力してください' }]}
        >
          <Input />
        </Form.Item> */}
                <Form.Item
                    label='県'
                    name='prefecture'
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
                    label='アプリケーション開始日時'
                    name='applicationStartDateTime'
                    rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='アプリケーション終了日時'
                    name='applicationEndDateTime'
                    rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='募集条件'
                    name='recruitmentCondition'
                    rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                >
                    <TextArea />
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
