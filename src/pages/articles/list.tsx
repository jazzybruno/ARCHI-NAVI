import {
    RightOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    CreditCardOutlined,
    StarOutlined,
    SwapRightOutlined,
    HomeOutlined
} from '@ant-design/icons'
import { Breadcrumb } from 'antd';
import { format } from 'date-fns'
import type { GetServerSideProps, NextPageWithLayout } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import MySection from 'components/MySection'
import Posts from 'components/Posts'
import { MainLayout } from 'layouts/main'
import { httpClient } from 'services/httpClient'
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

type Props = {
    title?: string
}

const ArticlesPage: NextPageWithLayout<Props> = (props) => {
    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    return (
        <>
            <section className='px-[5%] lg:px-[10%] xl:px-[100px] pt-[15px] lg:pt-[30px] text-[#404040] bg-white w-full'>
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
                                    <span className='text-[12px] flex items-center'>コラム・記事</span>
                                </>
                            ),
                        },
                    ]}
                />
                <h3 className='mt-[20px] text-green-700 lg:text-[15px] text-[12px] font-bold'>COLUMN</h3>
                <h3 className='lg:text-[27px] text-[22.5px] font-bold lg:pb-[30px] pb-[15px] border-b'>コラム・記事</h3>
            </section>
            <section className='mt-[40px] px-[5%] lg:px-[10%] xl:px-[100px] py-[15px] lg:py-[30px] text-[#404040] bg-white w-full'>
                <div className='flex justify-between'>
                    <div className='p-[10px] flex flex-col shadow-md shadow-gray-300 rounded-lg max-w-[342px]'>
                        <img className='w-full' src="/images/articles/card.jpg" alt="" />
                        <div>
                            <p className='px-[6px] py-[4px] bg-[#F2F7FF] text-[11px] font-bold w-[70px] text-center mb-1 mt-2'>カテゴリー</p>
                            <h4 className='text-[15px] font-bold text-[#404040] '>コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル</h4>
                            <p className='text-[12px] px-2 block py-1 '>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] rounded-lg'>タグ</button>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] ml-4 rounded-lg'>タグ</button>
                        </div>
                    </div>
                    <div className='p-[10px] flex flex-col shadow-md shadow-gray-300 rounded-lg max-w-[342px]'>
                        <img className='w-full' src="/images/articles/card.jpg" alt="" />
                        <div>
                            <p className='px-[6px] py-[4px] bg-[#F2F7FF] text-[11px] font-bold w-[70px] text-center mb-1 mt-2'>カテゴリー</p>
                            <h4 className='text-[15px] font-bold text-[#404040] '>コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル</h4>
                            <p className='text-[12px] px-2 block py-1 '>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] rounded-lg'>タグ</button>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] ml-4 rounded-lg'>タグ</button>
                        </div>
                    </div>
                    <div className='p-[10px] flex flex-col shadow-md shadow-gray-300 rounded-lg max-w-[342px]'>
                        <img className='w-full' src="/images/articles/card.jpg" alt="" />
                        <div>
                            <p className='px-[6px] py-[4px] bg-[#F2F7FF] text-[11px] font-bold w-[70px] text-center mb-1 mt-2'>カテゴリー</p>
                            <h4 className='text-[15px] font-bold text-[#404040] '>コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル</h4>
                            <p className='text-[12px] px-2 block py-1 '>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] rounded-lg'>タグ</button>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] ml-4 rounded-lg'>タグ</button>
                        </div>
                    </div>
                </div>
                <div className='mt-[24px] grid grid-cols-2 gap-x-[24px] gap-y-[40px] place-items-center'>
                    <div className='p-[10px] flex flex-row shadow-md shadow-gray-300 rounded-lg max-w-[518px]'>
                        <img className='w-[204px] h-[140px]' src="/images/articles/card.jpg" alt="" />
                        <div className='mx-[16px]'>
                            <p className='px-[6px] py-[4px] bg-[#F2F7FF] text-[11px] font-bold w-[70px] text-center mb-1'>カテゴリー</p>
                            <h4 className='text-[15px] font-bold text-[#404040] '>コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル</h4>
                            <p className='text-[12px] block py-1 '>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] rounded-lg'>タグ</button>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] ml-4 rounded-lg'>タグ</button>
                        </div>
                    </div>
                    <div className='p-[10px] flex flex-row shadow-md shadow-gray-300 rounded-lg max-w-[518px]'>
                        <img className='w-[204px] h-[140px]' src="/images/articles/card.jpg" alt="" />
                        <div className='mx-[16px]'>
                            <p className='px-[6px] py-[4px] bg-[#F2F7FF] text-[11px] font-bold w-[70px] text-center mb-1'>カテゴリー</p>
                            <h4 className='text-[15px] font-bold text-[#404040] '>コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル</h4>
                            <p className='text-[12px] block py-1 '>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] rounded-lg'>タグ</button>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] ml-4 rounded-lg'>タグ</button>
                        </div>
                    </div>
                    <div className='p-[10px] flex flex-row shadow-md shadow-gray-300 rounded-lg max-w-[518px]'>
                        <img className='w-[204px] h-[140px]' src="/images/articles/card.jpg" alt="" />
                        <div className='mx-[16px]'>
                            <p className='px-[6px] py-[4px] bg-[#F2F7FF] text-[11px] font-bold w-[70px] text-center mb-1'>カテゴリー</p>
                            <h4 className='text-[15px] font-bold text-[#404040] '>コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル</h4>
                            <p className='text-[12px] block py-1 '>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] rounded-lg'>タグ</button>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] ml-4 rounded-lg'>タグ</button>
                        </div>
                    </div>
                    <div className='p-[10px] flex flex-row shadow-md shadow-gray-300 rounded-lg max-w-[518px]'>
                        <img className='w-[204px] h-[140px]' src="/images/articles/card.jpg" alt="" />
                        <div className='mx-[16px]'>
                            <p className='px-[6px] py-[4px] bg-[#F2F7FF] text-[11px] font-bold w-[70px] text-center mb-1'>カテゴリー</p>
                            <h4 className='text-[15px] font-bold text-[#404040] '>コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル</h4>
                            <p className='text-[12px] block py-1 '>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] rounded-lg'>タグ</button>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] ml-4 rounded-lg'>タグ</button>
                        </div>
                    </div>
                    <div className='p-[10px] flex flex-row shadow-md shadow-gray-300 rounded-lg max-w-[518px]'>
                        <img className='w-[204px] h-[140px]' src="/images/articles/card.jpg" alt="" />
                        <div className='mx-[16px]'>
                            <p className='px-[6px] py-[4px] bg-[#F2F7FF] text-[11px] font-bold w-[70px] text-center mb-1'>カテゴリー</p>
                            <h4 className='text-[15px] font-bold text-[#404040] '>コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル</h4>
                            <p className='text-[12px] block py-1 '>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] rounded-lg'>タグ</button>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] ml-4 rounded-lg'>タグ</button>
                        </div>
                    </div>
                    <div className='p-[10px] flex flex-row shadow-md shadow-gray-300 rounded-lg max-w-[518px]'>
                        <img className='w-[204px] h-[140px]' src="/images/articles/card.jpg" alt="" />
                        <div className='mx-[16px]'>
                            <p className='px-[6px] py-[4px] bg-[#F2F7FF] text-[11px] font-bold w-[70px] text-center mb-1'>カテゴリー</p>
                            <h4 className='text-[15px] font-bold text-[#404040] '>コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル</h4>
                            <p className='text-[12px] block py-1 '>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] rounded-lg'>タグ</button>
                            <button className='px-3 py-1 bg-[#E4ECD3] round-lg w-[78px] h-[23px] text-[11px] ml-4 rounded-lg'>タグ</button>
                        </div>
                    </div>
                </div>
                <Pagination total={50} itemRender={itemRender} defaultCurrent={2} className='mt-5 flex justify-center' responsive={true}></Pagination>
            </section>
        </>
    )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     // const res = await httpClient().get('api /test')
//     const props: Props = {
//         title: 'Hello World',
//     }

//     return {
//         props: props,
//     }
// }

ArticlesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default ArticlesPage
