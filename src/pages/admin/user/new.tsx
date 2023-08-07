import { FolderAddOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, Typography, Space } from 'antd'
import type { NextPageWithLayout } from 'next'
import React, { useState, ChangeEvent } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient, httpFormDataClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'

const { Title } = Typography

const AdminUserNewPage: NextPageWithLayout = () => {
    const [form] = Form.useForm()
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
                    expectedGraduationDate: values.expectedGraduationDate.format('YYYY-MM-DD'),
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
                            expectedGraduationDate: null,
                            confirm: null,
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
                ユーザー作成
            </Title>
            <Form
                form={form}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 12 }}
                layout='horizontal'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label='プロフィール画像' name='avatar'>
                    <div className='avatar-upload w-[150px] h-[150px] border' >
                        <div className='opacity-0 absolute z-10 left-[75px] translate-x-[-50%] translate-y-[-50%] top-[50%]'>
                            <FolderAddOutlined style={{ fontSize: '30px' }} ></FolderAddOutlined>
                        </div>
                        <input className='w-[150px] h-[150px] opacity-0 avatar-input' type='file' onChange={handleFileChange} />
                        <img src={previewImage} className='w-[150px] mt-[-150px] avatar-image' />
                    </div>
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
                    <DatePicker className='w-full' />
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
                    label='卒業予定日'
                    name='expectedGraduationDate'
                    rules={[{ required: true, message: 'このフィールドを入力してください' }]}
                >
                    <DatePicker className='w-full' allowClear={false} />
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
                <Form.Item
                    name="password"
                    label="パスワード"
                    rules={[
                        {
                            required: true,
                            message: 'このフィールドを入力してください',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="パスワードの確認"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'このフィールドを入力してください',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('入力した新しいパスワードが一致しません。'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 11 }}>
                    <Space>
                        <Button type='primary' htmlType='submit'>
                            変更する
                        </Button>
                        <Button type='primary' className='!bg-red-500' htmlType='submit'>
                            キャンセル
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}

AdminUserNewPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminUserNewPage
