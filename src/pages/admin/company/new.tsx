import { Button, Form, Input, Typography, Space } from 'antd'
import type { NextPageWithLayout } from 'next'
import dynamic from 'next/dynamic'
import React, { useCallback, useState, ChangeEvent } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient, httpFormDataClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import 'easymde/dist/easymde.min.css'

const { Title } = Typography

const AdminCompanyNewPage: NextPageWithLayout = () => {
    const [value, setValue] = useState('Initial value')
    const [form] = Form.useForm()
    const [previewImage, setPreviewImage] = useState('')

    const [file, setFile] = useState<File>()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const onChange = useCallback((value: string) => {
        setValue(value)
    }, [])

    const onFinish = (values: any) => {
        httpFormDataClient()
            .post(`${ApiRoutes.attachment.upload}`, previewImage)
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
                    attachmentId: res.data.id,
                }
                httpClient()
                    .post(`${ApiRoutes.company.index}`, data)
                    .then(() => {
                        alert('新しいユーザーが追加されました。')
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
                企業作成
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
                    label='企業名'
                    name='name'
                    rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='会社HPリンク'
                    name='link'
                    rules={[
                        { required: true, message: 'このフィールドを入力してください' },
                        { type: 'url', message: 'URL形式が正しくありません' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='担当者'
                    name='managerName'
                    rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='部門'
                    name='department'
                    rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='募集職種'
                    name='recruitmentOccupation'
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
                <Form.Item label='プロフィール画像' name='avatar'>
                    <input type='file' onChange={handleFileChange} />
                    <img src={previewImage} className='max-w-[150px]' />
                </Form.Item>
                <Form.Item
                    label='特徴'
                    name='feature'
                    rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='個性'
                    name='personality'
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
                    label='アピールポイント'
                    name='appealPoint'
                    rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='他の'
                    name='other'
                    rules={[{ required: false, message: 'このフィールドを入力してください' }]}
                >
                    <Input />
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
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}

AdminCompanyNewPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminCompanyNewPage
