import Router from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import SocialPage from 'components/Social'
import { useSignin } from 'hooks/auth'
import { UserRole } from 'utils/constant'

type Props = {
   role: UserRole
}

type Inputs = {
   email: string
   password: string
   companyId: string
}

const SigninForm = ({ role }: Props) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>({
      mode: 'onChange',
   })
   const { signin, isLoading, error } = useSignin()

   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         const res = await signin({ ...data, role: role })
         if (res) {
            if (res.role === 'admin') {
               Router.push('/admin')
            } else {
               Router.push('/mypage')
            }
         }
      } catch (error) {
         console.log('error: ', error)
      }
   }

   return (
      <>
         <div>
            <div className='border px-[80px] py-[20px]'>
               <div className='py-6'>
                  <h1 className='text-center text-3xl font-bold'>
                     {role === 'user'
                        ? '会員ログイン'
                        : role === 'admin'
                        ? '管理者ログイン'
                        : '企業ログイン'}
                  </h1>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  {role === 'user' && (
                     <>
                        <div className='py-3'>
                           <label htmlFor='email'>メールアドレス</label>
                           <div>
                              <input
                                 type='email'
                                 name='email'
                                 placeholder='example@example.com'
                                 className='ipt'
                                 {...register('email', { required: true })}
                              />
                           </div>
                           {errors.email && <span>メールアドレスは必須です</span>}
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
                           {errors.password && <span>パスワードは必須です</span>}
                           {error && (
                              <p className='text-danger text-[12px]'>
                                 メールやパスワードが正しくありません。
                              </p>
                           )}
                        </div>
                     </>
                  )}
                  {role === 'company' && (
                     <>
                        <div className='py-3'>
                           <label htmlFor='companyId'>企業ID</label>
                           <div>
                              <input
                                 type='text'
                                 name='companyId'
                                 placeholder='企業ID'
                                 className='ipt'
                                 {...register('companyId', { required: true })}
                              />
                           </div>
                           {errors.companyId && <span>企業IDは必須です</span>}
                        </div>
                        <div className='py-3'>
                           <label htmlFor='password'>パスワード</label>
                           <div>
                              <input
                                 type='password'
                                 name='password'
                                 className='ipt'
                                 {...register('password', { required: true })}
                              />
                           </div>
                           {errors.password && <span>パスワードは必須です</span>}
                        </div>
                     </>
                  )}
                  {role === 'admin' && (
                     <>
                        <div className='py-3'>
                           <label htmlFor='email'>メールアドレス</label>
                           <div>
                              <input
                                 type='email'
                                 name='email'
                                 placeholder='example@example.com'
                                 className='ipt'
                                 {...register('email', { required: true })}
                              />
                           </div>
                           {errors.email && <span>メールアドレスは必須です</span>}
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
                           {errors.password && <span>パスワードは必須です</span>}
                        </div>
                     </>
                  )}
                  <div className='py-3'>
                     <input type='submit' className='btn' value='ログイン' />
                  </div>
               </form>
               {role !== 'company' ? <SocialPage></SocialPage> : ''}
            </div>
         </div>
      </>
   )
}

export default SigninForm
