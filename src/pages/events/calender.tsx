/* eslint-disable */
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
 import {BiCalendar} from 'react-icons/bi';
 import {MdModeEditOutline} from 'react-icons/md'
 import {AiOutlineRight} from 'react-icons/ai';
 import {AiOutlineSearch} from 'react-icons/ai'
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
                         <div className='flex font-bold text-[#404040]  items-center text-[12px]'>
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
                         <span className='flex  font-bold text-[#404040] items-center text-[12px]'>
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
             <p className='mt-[20px] text-[13px] lg:text-[14px] font-bold'>
                カレンダーをクリックしてインターン情報や就活イベントの内容を確認しよう！カレンダー表示への切り替えも可能です。
                <br />
                さらにアチナビに会員登録すれば、参加するイベントや自分のスケジュールもカレンダーで管理できます！
             </p>
          </div>
          <section className=' px-[5%] lg:px-[10%] xl:px-[100px]'>
             <div className='flex justify-end w-full mb-5 space-x-5'>
                <button className='flex font-light space-x-3 w-[60%] items-center justify-center  text-lg text-green-700 lg:w-[180px] lg:p-[10px]' >
                   <UnorderedListOutlined  />
                   <p>一覧表示</p>
                </button>
                <button className=' ms-auto text-lg font-bold border-b-4 border-[#018443] flex w-[50%]- space-x-4 items-center justify-center  text-green-700 lg:w-[180px] lg:p-[10px]'>
                   <BiCalendar />
                   <p>カレンダー表示</p>
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
                      <Input placeholder='社名や職種などキーワード' size='large' />
                   </Form.Item>
                   <Form.Item className='' name={'searchCondition'}>
                      <div className='flex justify-between'>
                         <Form.Item name={['searchCondition', 'type1']} className='w-[16%]'>
                            <Select placeholder='種別1'>
                               <Select.Option value='intern'>インターン</Select.Option>
                               <Select.Option value='seminar'>説明会</Select.Option>
                               <Select.Option value='other'>その他</Select.Option>
                            </Select>
                         </Form.Item>
                         <Form.Item name={['searchCondition', 'type2']} className='w-[16%]'>
                            <Select placeholder="種別2">
                               <Select.Option value='オンライン'>オンライン</Select.Option>
                               <Select.Option value='オフライン'>オフライン</Select.Option>
                            </Select>
                         </Form.Item>
                         <Form.Item
                            name={['searchCondition', 'typeOfOccupation']}
                            className='w-[16%]'
                         >
                            <Select placeholder='職種'>
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
                            <Select placeholder='会場'>
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
                            <Select placeholder='開催月'>
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
                            <Select placeholder='こだわり条件'>
                               <Select.Option value='0'>最近の応募</Select.Option>
                               <Select.Option value='1'>締め切りが近い応募</Select.Option>
                            </Select>
                         </Form.Item>
                      </div>
                   </Form.Item>
                   <Form.Item>
                      <div className='flex'>
                         <Button
                            className='mx-auto flex space-x-3 text-lg h-[50px] w-[300px] items-center justify-center !bg-green-700'
                            type='primary'
                            htmlType='submit'
                         >  
                           <AiOutlineSearch />
                            この条件で検索
                         </Button>
                         <Button
                            type='primary'
                            className='absolute text-[#404040] font-bold end-0 top-[50%] ms-2 translate-y-[-50%] !bg-white'
                            onClick={resetButtonClick}
                         >
                            条件をリセットする
                         </Button>
                      </div>
                   </Form.Item>
                </Form>
             </div>
             
             {/* the calender part  */}

             <div className='mt-10'> 
               <div className='flex justify-between'>
                  <div className='mb-[10px] hidden lg:block lg:w-[25%]'>
                     {/* <div className='mx-auto mb-[20px] w-full border-t px-[20px] py-[30px]'>
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
                     </div> */}
                     {/* <div className='mx-auto mb-[20px] w-full border-t px-[20px] py-[30px]'>
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
                     </div> */}
                     <div className='bg-[#F2F7FF] flex justify-center font-bold text-[#404040] py-20'>
                        <div className='text-left w-[80%]'>
                        カレンダーをクリックして
-                       詳細を表示
                        </div>
                     </div>
                  </div>
                  <div className='w-full lg:w-[73%]'>
                     <Calendar></Calendar>
                  </div>
               </div>
            </div>

          </section>
 
          <div className='bg-[#F7F9F4] w-[100%] mt-4 flex justify-center items-center px-3 py-8'>
             <div className='bg-white flex flex-col justify-center items-center w-[50%] py-4 space-y-5 rounded-md shadow-md'>
                <div > 
                   <h3 className='text-green-500 font-bold'>建築系専門だから強い</h3>
                </div>
 
                <div>
                   <h3 className='text-[#066435] font-bold text-xl'>アチナビで就活が楽になる</h3>
                </div>
 
                <div className='w-[75%]'>
                   <p className='text-[#404040] font-bold text-center text-md'>
                   アチナビ会員登録でインターンやセミナーなどのイベント情報をゲット！
                   マイページのカレンダーでは自分の予定と一緒にスケジュールが管理できます。
                   </p>
                </div>
 
                <div>
                   <h3 className='text-[#F63C74] font-bold text-lg'>\ 最短1分で登録完了 /</h3>
                </div>
 
                <div className='w-[40%]'>
                   <button className='flex flex-row justify-center items-center w-[100%] bg-[#F63C74] py-2 rounded-3xl text-white'>
                      <div className='w-[90%] flex justify-center items-center'>登録する</div>
                      <div className='w-[10%] flex justify-center items-center'><AiOutlineRight /></div>
                   </button>
                </div>
             </div>
             </div>
       </>
    )
 }
 
 EventPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
 
 export default EventPage
 