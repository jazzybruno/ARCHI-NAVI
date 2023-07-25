import type { NextPageWithLayout } from 'next'
import { useForm, SubmitHandler } from 'react-hook-form'
import { MainLayout } from 'layouts/main'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'

type Inputs = {
   name: string
   nameKana: string
   gender: number
   birthday: string
   postalCode: string
   address: string
   department: string
   expectedGraduationDate: string
   tel: string
   email: string
   password: string
   receiveInformation: number
}

const SignupPage: NextPageWithLayout = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      // watch,
   } = useForm<Inputs>({
      mode: 'onChange',
   })

   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         await httpClient().post(ApiRoutes.auth.signup, data)
      } catch (error) {
         console.log(error)
      }
   }

   // console.log(watch('email'))

   return (
      <>
         <div className='flex items-center justify-center'>
            <div className='mx-auto w-full max-w-xs'>
               <div className='py-6'>
                  <h1 className='text-3xl font-bold'>新規登録</h1>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='py-3'>
                     <label htmlFor='name'>氏名</label>
                     <div>
                        <input
                           type='text'
                           name='name'
                           placeholder='山田 太郎'
                           className='ipt'
                           {...register('name', { required: true })}
                        />
                     </div>
                     {errors.name && <span className='text-red-500'>氏名は必須です</span>}
                  </div>
                  <div className='py-3'>
                     <label htmlFor='nameKana'>氏名（カナ）</label>
                     <div>
                        <input
                           type='text'
                           name='nameKana'
                           placeholder='ヤマダ タロウ'
                           className='ipt'
                           {...register('nameKana', { required: true })}
                        />
                     </div>
                     {errors.nameKana && (
                        <span className='text-red-500'>氏名（カナ）は必須です</span>
                     )}
                  </div>
                  <div className='py-3'>
                     <label htmlFor='gender'>性別</label>
                     <div>
                        <label>
                           <input
                              type='radio'
                              name='gender'
                              value={0}
                              {...register('gender', { required: true })}
                           />{' '}
                           未設定
                        </label>
                        <label>
                           <input
                              className='ml-2'
                              type='radio'
                              name='gender'
                              value={1}
                              {...register('gender', { required: true })}
                           />{' '}
                           男性
                        </label>
                        <label>
                           <input
                              className='ml-2'
                              type='radio'
                              name='gender'
                              value={2}
                              {...register('gender', { required: true })}
                           />{' '}
                           女性
                        </label>
                     </div>
                     {errors.gender && <span className='text-red-500'>性別は必須です</span>}
                  </div>
                  <div className='py-3'>
                     <label htmlFor='birthday'>誕生日</label>
                     <div>
                        <input
                           type='date'
                           name='birthday'
                           className='ipt'
                           {...register('birthday', { required: true })}
                        />
                     </div>
                     {errors.birthday && <span className='text-red-500'>誕生日は必須です</span>}
                  </div>
                  <div className='py-3'>
                     <label htmlFor='postalCode'>郵便番号</label>
                     <div>
                        <input
                           type='text'
                           name='postalCode'
                           className='ipt'
                           {...register('postalCode', { required: true })}
                        />
                     </div>
                     {errors.postalCode && <span className='text-red-500'>郵便番号は必須です</span>}
                  </div>
                  <div className='py-3'>
                     <label htmlFor='department'>学部・学科</label>
                     <div>
                        <input
                           type='text'
                           name='department'
                           className='ipt'
                           {...register('department', { required: true })}
                        />
                     </div>
                     {errors.department && (
                        <span className='text-red-500'>学部・学科は必須です</span>
                     )}
                  </div>
                  <div className='py-3'>
                     <label htmlFor='expectedGraduationDate'>卒業予定時期</label>
                     <div>
                        <input
                           type='date'
                           name='expectedGraduationDate'
                           className='ipt'
                           {...register('expectedGraduationDate', { required: true })}
                        />
                     </div>
                     {errors.expectedGraduationDate && (
                        <span className='text-red-500'>卒業予定時期は必須です</span>
                     )}
                  </div>
                  <div className='py-3'>
                     <label htmlFor='tel'>電話番号</label>
                     <div>
                        <input
                           type='tel'
                           name='tel'
                           className='ipt'
                           {...register('tel', { required: true })}
                        />
                     </div>
                     {errors.tel && <span className='text-red-500'>電話番号は必須です</span>}
                  </div>
                  <div className='py-3'>
                     <label htmlFor='address'>住所</label>
                     <div>
                        <input
                           type='text'
                           name='address'
                           className='ipt'
                           {...register('address', { required: true })}
                        />
                     </div>
                     {errors.address && <span className='text-red-500'>住所は必須です</span>}
                  </div>
                  <div className='py-3'>
                     <label htmlFor='email'>メールアドレス</label>
                     <div>
                        <input
                           type='text'
                           name='email'
                           placeholder='example@example.com'
                           className='ipt'
                           {...register('email', { required: true })}
                        />
                     </div>
                     {errors.email && (
                        <span className='text-red-500'>メールアドレスは必須です</span>
                     )}
                  </div>
                  <div className='py-3'>
                     <label htmlFor='email'>パスワード</label>
                     <div>
                        <input
                           type='password'
                           name='password'
                           className='ipt'
                           {...register('password', { required: true })}
                        />
                     </div>
                     {errors.password && <span className='text-red-500'>パスワードは必須です</span>}
                  </div>
                  <div className='py-3'>
                     <label htmlFor='receiveInformation'>企業情報を受け取りますか？</label>
                     <div>
                        <label>
                           <input
                              type='radio'
                              name='receiveInformation'
                              value={0}
                              {...register('receiveInformation', { required: true })}
                           />{' '}
                           受け取らない
                        </label>
                        <label>
                           <input
                              className='ml-2'
                              type='radio'
                              name='receiveInformation'
                              value={1}
                              {...register('receiveInformation', { required: true })}
                           />{' '}
                           メール
                        </label>
                        <label>
                           <input
                              className='ml-2'
                              type='radio'
                              name='receiveInformation'
                              value={2}
                              {...register('receiveInformation', { required: true })}
                           />{' '}
                           LINE
                        </label>
                     </div>
                  </div>
                  <div className='py-3'>
                     <input type='submit' className='btn' />
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}

SignupPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default SignupPage
