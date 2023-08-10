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
      getItem(<Link href='/admin/user/new'>ユーザー作成</Link>, '1-1'),
   ]),
   getItem('企業情報照会', '2', <BankOutlined />, [
      getItem(<Link href='/admin/company/list'>企業情報照会</Link>, '2-0'),
      getItem(<Link href='/admin/company/new'>企業作成</Link>, '2-1'),
   ]),
   getItem('インターン・イベント情報照会', '3', <CalendarOutlined />, [
      getItem(<Link href='/admin/event/list'>インターン・イベント情報照会</Link>, '3-0'),
      getItem(<Link href='/admin/event/new'>インターン・イベント作成</Link>, '3-1'),
   ]),
   getItem('コラム・Blog情報照会', '4', <FileOutlined />, [
      getItem(<Link href='/admin/blog/list'>コラム・Blog情報照会</Link>, '4-0'),
      getItem(<Link href='/admin/blog/new'>コラム・記事　新規作成</Link>, '4-1'),
   ]),
   getItem('お知らせ情報照会', '5', <SoundOutlined />, [
      getItem(<Link href='/admin/announce/list'>お知らせ照会</Link>, '5-0'),
      getItem(<Link href='/admin/announce/new'>お知らせ作成</Link>, '5-1'),
   ]),
   getItem('一斉メール・LINE配信情報照会', '6', <MailOutlined />, [
      getItem(<Link href='/admin/mail/list'>一斉メール・LINE配信</Link>, '6-0'),
      getItem(<Link href='/admin/mail/new'>一斉メール・LINE作成</Link>, '6-1'),
   ]),
   getItem('コラムカテゴリ追加編集', '7', <FileOutlined />, [
      getItem(<Link href='/admin/blog/add'>コラムカテゴリ追加編集</Link>, '7-0'),
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
