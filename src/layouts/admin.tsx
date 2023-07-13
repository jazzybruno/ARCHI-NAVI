import {
  SoundOutlined,
  CalendarOutlined,
  MailOutlined,
  FileOutlined,
  UserOutlined,
  BankOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import type { MenuProps } from 'antd'
import Link from 'next/link'
import React, { ReactElement, useState } from 'react'

const { Header, Sider, Content } = Layout

type LayoutProps = {
  readonly children: ReactElement
}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem(<Link href='/admin'>ダッシュボード</Link>, '0', <DashboardOutlined />),
  getItem('ユーザー情報照会', '1', <UserOutlined />, [
    getItem(<Link href='/admin/user/list'>ユーザー情報照会</Link>, '1-0'),
    getItem(<Link href='/admin/user/details'>ユーザー情報詳細</Link>, '1-1'),
    getItem(<Link href='/admin/user/edit'>ユーザー情報変更</Link>, '1-2'),
  ]),
  getItem('企業情報照会', '2', <BankOutlined />, [
    getItem(<Link href='/admin/company/list'>企業情報照会</Link>, '2-0'),
    getItem(<Link href='/admin/company/details'>企業情報詳細</Link>, '2-1'),
    getItem(<Link href='/admin/company/edit'>企業情報変更</Link>, '2-2'),
  ]),
  getItem('インターン・イベント情報照会', '3', <CalendarOutlined />, [
    getItem(<Link href='/admin/event/list'>インターン・イベント情報照会</Link>, '3-0'),
    getItem(<Link href='/admin/event/details'>インターン・イベント情報詳細</Link>, '3-1'),
    getItem(<Link href='/admin/event/edit'>インターン・イベント情報変更</Link>, '3-2'),
  ]),
  getItem('コラム・Blog情報照会', '4', <FileOutlined />, [
    getItem(<Link href='/admin/blog/list'>コラム・Blog情報照会</Link>, '4-0'),
    getItem(<Link href='/admin/blog/create'>コラム・Blog作成</Link>, '4-1'),
    getItem(<Link href='/admin/blog/edit'>コラム・Blog情報変更</Link>, '4-2'),
  ]),
  getItem('お知らせ情報照会', '5', <SoundOutlined />, [
    getItem(<Link href='/admin/announce/list'>お知らせ照会</Link>, '5-0'),
    getItem(<Link href='/admin/announce/create'>お知らせ作成</Link>, '5-1'),
  ]),
  getItem('一斉メール・LINE配信情報照会', '6', <MailOutlined />, [
    getItem(<Link href='/admin/mail/list'>一斉メール・LINE配信</Link>, '6-0'),
    getItem(<Link href='/admin/mail/create'>一斉メール・LINE作成</Link>, '6-1'),
    getItem(<Link href='/admin/mail/confirm'>一斉メール・LINE作成内容確認</Link>, '6-2'),
  ]),
]

export const AdminLayout: React.FC = ({ children }: LayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const [openKeys, setOpenKeys] = useState([])
  const rootSubmenuKeys = ['1', '2', '3', '4', '5', '6']
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header></Header>
      <Layout>
        <Sider trigger={null} breakpoint='md' theme='light' width={320} collapsedWidth={64}>
          <Menu mode='inline' items={items} openKeys={openKeys} onOpenChange={onOpenChange} />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
