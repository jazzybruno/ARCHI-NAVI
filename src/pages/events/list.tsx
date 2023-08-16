import {
   HomeOutlined,
   UnorderedListOutlined,
   CalendarOutlined,
   SearchOutlined,
   PlusOutlined,
   EditFilled,
   ClockCircleOutlined,
   EnvironmentOutlined,
   CreditCardOutlined,
   StarOutlined,
   RightOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Form, Input, DatePicker, Button, Select, Space, Calendar } from 'antd'
import { format } from 'date-fns'
import type { GetServerSideProps, NextPageWithLayout } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import MySection from 'components/MySection'
import Posts from 'components/Posts'
import { MainLayout } from 'layouts/main'
import { httpClient } from 'services/httpClient'
import type { PaginationProps } from 'antd'
import { Pagination } from 'antd'

const { RangePicker } = DatePicker

type Props = {
   title?: string
}

const EventPage: NextPageWithLayout<Props> = (props) => {
   const [form] = Form.useForm()

   const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
      if (type === 'prev') {
         return <a>Previous</a>
      }
      if (type === 'next') {
         return <a>Next</a>
      }
      return originalElement
   }

   const onFinish = () => {}
   const onFinishFailed = () => {}

   const resetButtonClick = () => {}

   return (
      <>
         <Breadcrumb
            items={[
               {
                  href: '/',
                  title: (
                     <>
                        <div className='flex items-center text-[12px]'>
                           <HomeOutlined className='me-[5px] text-[12px]' />
                           <span className='text-[12px]'>HOME</span>
                        </div>
                     </>
                  ),
               },
               {
                  href: '/about',
                  title: (
                     <>
                        <span className='flex items-center text-[12px]'>
                           インターン・イベント情報一覧
                        </span>
                     </>
                  ),
               },
            ]}
            className='bg-[#FAFAFA] px-[5%] py-[15px] text-[#404040] lg:px-[10%] lg:py-[30px] xl:px-[100px]'
         />
         <div className='bg-[#FAFAFA] px-[5%] py-[15px] text-[#404040] lg:px-[10%] lg:py-[30px] xl:px-[100px]'>
            <h3 className='text-[12px] font-bold text-green-700 lg:text-[15px]'>EVENT</h3>
            <h3 className='text-[22.5px] font-bold lg:text-[27px]'>インターン・イベント情報一覧</h3>
            <p className='mt-[20px] text-[13px] lg:text-[14px]'>
               カレンダーをクリックしてインターン情報や就活イベントの内容を確認しよう！カレンダー表示への切り替えも可能です。
               <br />
               さらにアチナビに会員登録すれば、参加するイベントや自分のスケジュールもカレンダーで管理できます！
            </p>
         </div>
         <section className=' px-[5%] lg:px-[10%] xl:px-[100px]'>
            <div className='flex w-full'>
               <button className='ms-auto flex w-[50%] items-center justify-center px-[18px] py-[9px] text-[15px] text-green-700 lg:w-[180px] lg:p-[20px]'>
                  <UnorderedListOutlined className='me-[10px] text-[18px]' />
                  一覧表示
               </button>
               <button className='flex w-[50%] items-center justify-center px-[18px] py-[9px] text-[15px] text-green-700 lg:w-[180px] lg:p-[20px]'>
                  <CalendarOutlined className='me-[10px] text-[18px]' />
                  カレンダー表示
               </button>
            </div>
            <div className='hidden bg-[#F8F5EC] px-[40px] py-[24px] lg:block'>
               <Form
                  form={form}
                  name='basic'
                  initialValues={{ remember: true }}
                  autoComplete='off'
                  // layout='vertical'
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
               >
                  <Form.Item name='search'>
                     <Input size='large' />
                  </Form.Item>
                  <Form.Item className='' name={'searchCondition'}>
                     <div className='flex justify-between'>
                        <Form.Item name={['searchCondition', 'type1']} className='w-[16%]'>
                           <Select>
                              <Select.Option value='intern'>インターン</Select.Option>
                              <Select.Option value='seminar'>説明会</Select.Option>
                              <Select.Option value='other'>その他</Select.Option>
                           </Select>
                        </Form.Item>
                        <Form.Item name={['searchCondition', 'type2']} className='w-[16%]'>
                           <Select>
                              <Select.Option value='オンライン'>オンライン</Select.Option>
                              <Select.Option value='オフライン'>オフライン</Select.Option>
                           </Select>
                        </Form.Item>
                        <Form.Item
                           name={['searchCondition', 'typeOfOccupation']}
                           className='w-[16%]'
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
                        <Form.Item name={['searchCondition', 'prefecture']} className='w-[16%]'>
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
                        <Form.Item name={['searchCondition', 'periodMonth']} className='w-[16%]'>
                           <Select>
                              <Select.Option value='1'>1月</Select.Option>
                              <Select.Option value='2'>2月</Select.Option>
                              <Select.Option value='3'>3月</Select.Option>
                              <Select.Option value='4'>4月</Select.Option>
                              <Select.Option value='5'>5月</Select.Option>
                              <Select.Option value='6'>6月</Select.Option>
                              <Select.Option value='7'>7月</Select.Option>
                              <Select.Option value='8'>8月</Select.Option>
                              <Select.Option value='9'>9月</Select.Option>
                              <Select.Option value='10'>10月</Select.Option>
                              <Select.Option value='11'>11月</Select.Option>
                              <Select.Option value='12'>12月</Select.Option>
                           </Select>
                        </Form.Item>
                        <Form.Item name={['searchCondition', 'condition']} className='w-[16%]'>
                           <Select>
                              <Select.Option value='0'>最近の応募</Select.Option>
                              <Select.Option value='1'>締め切りが近い応募</Select.Option>
                           </Select>
                        </Form.Item>
                     </div>
                  </Form.Item>
                  <Form.Item>
                     <div className='flex'>
                        <Button
                           className='mx-auto flex h-[50px] w-[300px] items-center justify-center !bg-green-700'
                           type='primary'
                           htmlType='submit'
                        >
                           この条件で検索
                        </Button>
                        <Button
                           type='primary'
                           className='absolute end-0 top-[50%] ms-2 translate-y-[-50%] !bg-red-500'
                           onClick={resetButtonClick}
                        >
                           検索条件をリセット
                        </Button>
                     </div>
                  </Form.Item>
               </Form>
            </div>
            <div className='block lg:hidden'>
               <button className='flex w-full items-center rounded-[4px] border border-green-700 bg-[#fff] px-[15px] py-[8px] text-left text-green-700'>
                  <SearchOutlined className='me-[5px] flex items-center' />
                  条件で検索
                  <PlusOutlined className='ms-auto flex items-center' />
               </button>
               <div className='mt-[25px] bg-[#F8F5EC] px-[40px] py-[24px]'>
                  <Form
                     form={form}
                     name='basic'
                     initialValues={{ remember: true }}
                     autoComplete='off'
                     layout='vertical'
                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}
                  >
                     <Form.Item name='search'>
                        <Input size='large' />
                     </Form.Item>
                     <Form.Item name={'searchCondition'}>
                        <Form.Item name={['searchCondition', 'type1']} className='w-full'>
                           <Select>
                              <Select.Option value='intern'>インターン</Select.Option>
                              <Select.Option value='seminar'>説明会</Select.Option>
                              <Select.Option value='other'>その他</Select.Option>
                           </Select>
                        </Form.Item>
                        <Form.Item name={['searchCondition', 'type2']} className='w-full'>
                           <Select>
                              <Select.Option value='オンライン'>オンライン</Select.Option>
                              <Select.Option value='オフライン'>オフライン</Select.Option>
                           </Select>
                        </Form.Item>
                        <Form.Item
                           name={['searchCondition', 'typeOfOccupation']}
                           className='w-full'
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
                        <Form.Item name={['searchCondition', 'prefecture']} className='w-full'>
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
                        <Form.Item name={['searchCondition', 'periodMonth']} className='w-full'>
                           <Select>
                              <Select.Option value='1'>1月</Select.Option>
                              <Select.Option value='2'>2月</Select.Option>
                              <Select.Option value='3'>3月</Select.Option>
                              <Select.Option value='4'>4月</Select.Option>
                              <Select.Option value='5'>5月</Select.Option>
                              <Select.Option value='6'>6月</Select.Option>
                              <Select.Option value='7'>7月</Select.Option>
                              <Select.Option value='8'>8月</Select.Option>
                              <Select.Option value='9'>9月</Select.Option>
                              <Select.Option value='10'>10月</Select.Option>
                              <Select.Option value='11'>11月</Select.Option>
                              <Select.Option value='12'>12月</Select.Option>
                           </Select>
                        </Form.Item>
                        <Form.Item name={['searchCondition', 'condition']} className='w-full'>
                           <Select>
                              <Select.Option value='0'>最近の応募</Select.Option>
                              <Select.Option value='1'>締め切りが近い応募</Select.Option>
                           </Select>
                        </Form.Item>
                     </Form.Item>
                     <Form.Item>
                        <Button
                           className='mx-auto flex h-[50px] w-[80%] items-center justify-center !bg-green-700'
                           type='primary'
                           htmlType='submit'
                        >
                           この条件で検索
                        </Button>
                        <Button
                           type='primary'
                           className='mx-auto mt-[10px] flex w-[70%] items-center justify-center !bg-red-500'
                           onClick={resetButtonClick}
                        >
                           検索条件をリセット
                        </Button>
                     </Form.Item>
                  </Form>
               </div>
            </div>
         </section>
         <section className='px-[5%] lg:px-[10%] xl:px-[100px]'>
            <div>
               <div className='w-full'>
                  <Select className='my-[30px] ms-auto flex w-[200px]'>
                     <Select.Option>開催日順</Select.Option>
                     <Select.Option>タイトル順</Select.Option>
                     <Select.Option>会場</Select.Option>
                  </Select>
               </div>
               <div className='flex w-full justify-between'>
                  <div className='mb-[10px] hidden lg:block lg:w-[25%]'>
                     <h4 className='mb-[10px] flex items-center text-[#404040]'>
                        <EditFilled className='me-[8px] rounded-[4px] bg-green-700 p-[4px] text-[20px] text-[#fff]' />
                        現在の検索条件
                     </h4>
                     <p className='bg-[#F8F5EC] p-4'>
                        こだわり条件1/こだわり条件2/こだわり条件3/こだわり条件4
                     </p>
                  </div>
                  <div className='w-full lg:w-[73%]'>
                     <div className='relative mx-auto mb-[20px] w-full rounded-[8px] border border-t-[10px] border-t-green-700 px-[20px] py-[15px] font-bold text-[#404040]'>
                        <div className='w-full'>
                           <p className='text[16px] mb-[20px] mt-[10px] lg:text-[20px]'>
                              地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                           </p>
                           <p className='text-[13px]'>
                              日本で最も進んだ実践型インターンシップ「ホンキ系インターンシップ」を展開する土台作り、新規プログラム企画に共に挑む右腕を募集します。
                           </p>
                        </div>
                        <div className='my-[15px] flex'>
                           <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                           <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                        </div>
                        <div className='flex flex-wrap text-[13px]'>
                           <p className='flex items-center pe-[10px]'>
                              <ClockCircleOutlined className='pe-[5px] text-green-700' />
                              開催日：2023年11月1日（水）～2023年11月20日（月）
                           </p>
                           <p className='flex items-center pe-[10px]'>
                              <EnvironmentOutlined className='pe-[5px] text-green-700' />
                              会場：東京
                           </p>
                           <p className='flex items-center'>
                              <CreditCardOutlined className='pe-[5px] text-green-700' />
                              対象職種：ITインフラ
                           </p>
                        </div>
                        <div className='mt-[40px] flex flex-wrap justify-center sm:justify-end'>
                           <button className='me-[10px] mt-[5px] flex h-[40px] w-[180px] items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                              <StarOutlined className='pe-[5px] !text-[18px]' />
                              お気に入り登録
                           </button>
                           <button className='relative mt-[5px] flex h-[40px] w-[180px] items-center justify-center rounded-[50px] bg-green-700 px-[20px] py-[10px] text-[12.5px] font-bold text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                              <span>詳細を見る </span>
                              <span className='absolute end-[10%] flex items-center text-[10px]'>
                                 <RightOutlined />
                              </span>
                           </button>
                        </div>
                        <p className='absolute start-0 top-[-10px] rounded-tl-[5px] bg-[#F63C74] px-[16px] py-[5px] text-[13px] text-[#fff]'>
                           PICK UP
                        </p>
                     </div>
                     <div className='relative mx-auto mb-[20px] w-full rounded-[8px] border border-t-[10px] border-t-green-700 px-[20px] py-[15px] font-bold text-[#404040]'>
                        <div className='w-full'>
                           <p className='text[16px] mb-[20px] mt-[10px] lg:text-[20px]'>
                              地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                           </p>
                           <div className='flex'>
                              <img src='/images/articles/card.jpg' alt='event' />
                              <p className='ps-[10px] text-[13px]'>
                                 日本で最も進んだ実践型インターンシップ「ホンキ系インターンシップ」を展開する土台作り、新規プログラム企画に共に挑む右腕を募集します。
                              </p>
                           </div>
                        </div>
                        <div className='my-[15px] flex'>
                           <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                           <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                        </div>
                        <div className='flex flex-wrap text-[13px]'>
                           <p className='flex items-center pe-[10px]'>
                              <ClockCircleOutlined className='pe-[5px] text-green-700' />
                              開催日：2023年11月1日（水）～2023年11月20日（月）
                           </p>
                           <p className='flex items-center pe-[10px]'>
                              <EnvironmentOutlined className='pe-[5px] text-green-700' />
                              会場：東京
                           </p>
                           <p className='flex items-center'>
                              <CreditCardOutlined className='pe-[5px] text-green-700' />
                              対象職種：ITインフラ
                           </p>
                        </div>
                        <div className='mt-[40px] flex flex-wrap justify-center sm:justify-end'>
                           <button className='me-[10px] mt-[5px] flex h-[40px] w-[180px] items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                              <StarOutlined className='pe-[5px] !text-[18px]' />
                              お気に入り登録
                           </button>
                           <button className='relative mt-[5px] flex h-[40px] w-[180px] items-center justify-center rounded-[50px] bg-green-700 px-[20px] py-[10px] text-[12.5px] font-bold text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                              <span>詳細を見る </span>
                              <span className='absolute end-[10%] flex items-center text-[10px]'>
                                 <RightOutlined />
                              </span>
                           </button>
                        </div>
                        <p className='absolute start-0 top-[-10px] rounded-tl-[5px] bg-[#F63C74] px-[16px] py-[5px] text-[13px] text-[#fff]'>
                           PICK UP
                        </p>
                     </div>
                     <div className='relative mx-auto mb-[20px] w-full rounded-[8px] border border-t-[10px] border-t-green-700 px-[20px] py-[15px] font-bold text-[#404040]'>
                        <div className='w-full'>
                           <p className='text[16px] mb-[20px] mt-[10px] lg:text-[20px]'>
                              地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                           </p>
                           <p className='text-[13px]'>
                              日本で最も進んだ実践型インターンシップ「ホンキ系インターンシップ」を展開する土台作り、新規プログラム企画に共に挑む右腕を募集します。
                           </p>
                        </div>
                        <div className='my-[15px] flex'>
                           <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                           <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                        </div>
                        <div className='flex flex-wrap text-[13px]'>
                           <p className='flex items-center pe-[10px]'>
                              <ClockCircleOutlined className='pe-[5px] text-green-700' />
                              開催日：2023年11月1日（水）～2023年11月20日（月）
                           </p>
                           <p className='flex items-center pe-[10px]'>
                              <EnvironmentOutlined className='pe-[5px] text-green-700' />
                              会場：東京
                           </p>
                           <p className='flex items-center'>
                              <CreditCardOutlined className='pe-[5px] text-green-700' />
                              対象職種：ITインフラ
                           </p>
                        </div>
                        <div className='mt-[40px] flex flex-wrap justify-center sm:justify-end'>
                           <button className='me-[10px] mt-[5px] flex h-[40px] w-[180px] items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                              <StarOutlined className='pe-[5px] !text-[18px]' />
                              お気に入り登録
                           </button>
                           <button className='relative mt-[5px] flex h-[40px] w-[180px] items-center justify-center rounded-[50px] bg-green-700 px-[20px] py-[10px] text-[12.5px] font-bold text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                              <span>詳細を見る </span>
                              <span className='absolute end-[10%] flex items-center text-[10px]'>
                                 <RightOutlined />
                              </span>
                           </button>
                        </div>
                        <p className='absolute start-0 top-[-10px] rounded-tl-[5px] bg-[#F63C74] px-[16px] py-[5px] text-[13px] text-[#fff]'>
                           PICK UP
                        </p>
                     </div>
                     <div className='relative mx-auto mb-[20px] w-full rounded-[8px] border border-t-[10px] border-t-green-700 px-[20px] py-[15px] font-bold text-[#404040]'>
                        <div className='w-full'>
                           <p className='text[16px] mb-[20px] mt-[10px] lg:text-[20px]'>
                              地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                           </p>
                           <p className='text-[13px]'>
                              日本で最も進んだ実践型インターンシップ「ホンキ系インターンシップ」を展開する土台作り、新規プログラム企画に共に挑む右腕を募集します。
                           </p>
                        </div>
                        <div className='my-[15px] flex'>
                           <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                           <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                        </div>
                        <div className='flex flex-wrap text-[13px]'>
                           <p className='flex items-center pe-[10px]'>
                              <ClockCircleOutlined className='pe-[5px] text-green-700' />
                              開催日：2023年11月1日（水）～2023年11月20日（月）
                           </p>
                           <p className='flex items-center pe-[10px]'>
                              <EnvironmentOutlined className='pe-[5px] text-green-700' />
                              会場：東京
                           </p>
                           <p className='flex items-center'>
                              <CreditCardOutlined className='pe-[5px] text-green-700' />
                              対象職種：ITインフラ
                           </p>
                        </div>
                        <div className='mt-[40px] flex flex-wrap justify-center sm:justify-end'>
                           <button className='me-[10px] mt-[5px] flex h-[40px] w-[180px] items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                              <StarOutlined className='pe-[5px] !text-[18px]' />
                              お気に入り登録
                           </button>
                           <button className='relative mt-[5px] flex h-[40px] w-[180px] items-center justify-center rounded-[50px] bg-green-700 px-[20px] py-[10px] text-[12.5px] font-bold text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                              <span>詳細を見る </span>
                              <span className='absolute end-[10%] flex items-center text-[10px]'>
                                 <RightOutlined />
                              </span>
                           </button>
                        </div>
                        <p className='absolute start-0 top-[-10px] rounded-tl-[5px] bg-[#F63C74] px-[16px] py-[5px] text-[13px] text-[#fff]'>
                           PICK UP
                        </p>
                     </div>
                     <div className='relative mx-auto mb-[20px] w-full rounded-[8px] border border-t-[10px] border-t-green-700 px-[20px] py-[15px] font-bold text-[#404040]'>
                        <div className='w-full'>
                           <p className='text[16px] mb-[20px] mt-[10px] lg:text-[20px]'>
                              地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                           </p>
                           <p className='text-[13px]'>
                              日本で最も進んだ実践型インターンシップ「ホンキ系インターンシップ」を展開する土台作り、新規プログラム企画に共に挑む右腕を募集します。
                           </p>
                        </div>
                        <div className='my-[15px] flex'>
                           <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                           <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                        </div>
                        <div className='flex flex-wrap text-[13px]'>
                           <p className='flex items-center pe-[10px]'>
                              <ClockCircleOutlined className='pe-[5px] text-green-700' />
                              開催日：2023年11月1日（水）～2023年11月20日（月）
                           </p>
                           <p className='flex items-center pe-[10px]'>
                              <EnvironmentOutlined className='pe-[5px] text-green-700' />
                              会場：東京
                           </p>
                           <p className='flex items-center'>
                              <CreditCardOutlined className='pe-[5px] text-green-700' />
                              対象職種：ITインフラ
                           </p>
                        </div>
                        <div className='mt-[40px] flex flex-wrap justify-center sm:justify-end'>
                           <button className='me-[10px] mt-[5px] flex h-[40px] w-[180px] items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                              <StarOutlined className='pe-[5px] !text-[18px]' />
                              お気に入り登録
                           </button>
                           <button className='relative mt-[5px] flex h-[40px] w-[180px] items-center justify-center rounded-[50px] bg-green-700 px-[20px] py-[10px] text-[12.5px] font-bold text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                              <span>詳細を見る </span>
                              <span className='absolute end-[10%] flex items-center text-[10px]'>
                                 <RightOutlined />
                              </span>
                           </button>
                        </div>
                        <p className='absolute start-0 top-[-10px] rounded-tl-[5px] bg-[#F63C74] px-[16px] py-[5px] text-[13px] text-[#fff]'>
                           PICK UP
                        </p>
                     </div>
                  </div>
               </div>
               <Pagination
                  total={50}
                  itemRender={itemRender}
                  defaultCurrent={2}
                  className='my-5 flex justify-center'
                  responsive={true}
               ></Pagination>
            </div>
            <div>
               <div className='flex justify-between'>
                  <div className='mb-[10px] hidden lg:block lg:w-[25%]'>
                     <div className='mx-auto mb-[20px] w-full border-t px-[20px] py-[30px]'>
                        <div>
                           <p className='mb-[20px] text-[15px]'>
                              地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                           </p>
                           <p className='text-[13px] text-[#737373]'>
                              日本で最も進んだ実践型インターンシップ「ホンキ系インターンシップ」を展開する土台作り、新規プログラム企画に共に挑む右腕を募集します。
                           </p>
                        </div>
                        <div className='my-[15px] flex'>
                           <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                           <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                        </div>
                        <div className='flex flex-wrap text-[13px]'>
                           <p className='flex items-center pe-[10px]'>
                              <ClockCircleOutlined className='pe-[5px]' />
                              開催日：2023年11月1日（水）～2023年11月20日（月）
                           </p>
                           <p className='flex items-center'>
                              <EnvironmentOutlined className='pe-[5px]' />
                              会場：東京
                           </p>
                           <p className='flex items-center'>
                              <CreditCardOutlined className='pe-[5px]' />
                              対象職種：ITインフラ
                           </p>
                        </div>
                        <button className='mx-auto mt-[40px] flex items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff]'>
                           <StarOutlined className='pe-[5px] !text-[18px]' />
                           お気に入り登録
                        </button>
                     </div>
                     <div className='mx-auto mb-[20px] w-full border-t px-[20px] py-[30px]'>
                        <div>
                           <p className='mb-[20px] text-[15px]'>
                              地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                           </p>
                           <p className='text-[13px] text-[#737373]'>
                              日本で最も進んだ実践型インターンシップ「ホンキ系インターンシップ」を展開する土台作り、新規プログラム企画に共に挑む右腕を募集します。
                           </p>
                        </div>
                        <div className='my-[15px] flex'>
                           <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                           <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                              インターン
                           </p>
                        </div>
                        <div className='flex flex-wrap text-[13px]'>
                           <p className='flex items-center pe-[10px]'>
                              <ClockCircleOutlined className='pe-[5px]' />
                              開催日：2023年11月1日（水）～2023年11月20日（月）
                           </p>
                           <p className='flex items-center'>
                              <EnvironmentOutlined className='pe-[5px]' />
                              会場：東京
                           </p>
                           <p className='flex items-center'>
                              <CreditCardOutlined className='pe-[5px]' />
                              対象職種：ITインフラ
                           </p>
                        </div>
                        <button className='mx-auto mt-[40px] flex items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff]'>
                           <StarOutlined className='pe-[5px] !text-[18px]' />
                           お気に入り登録
                        </button>
                     </div>
                  </div>
                  <div className='w-full lg:w-[73%]'>
                     <Calendar></Calendar>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

EventPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default EventPage
