import Router from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSignin } from 'hooks/auth'
import { UserRole } from 'utils/constant'

type Props = {
   role: UserRole
}

type Inputs = {
   email: string
   password: string
}

const SigninForm = ({ role }: Props) => {
   const {
      register,
      handleSubmit,
      // watch,
      formState: { errors },
   } = useForm<Inputs>({
      mode: 'onChange',
   })
   const { signin } = useSignin()

   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         const res = await signin({ ...data, role: role })
         if (res) {
            Router.push('/')
         }
      } catch (error) {
         console.log(error)
      }
   }

   // console.log(watch('email'))

   return (
      <>
         <div className='mx-auto w-full max-w-xs'>
            <div className='py-6'>
               <h1 className='text-3xl font-bold'>
                  {role === 'user'
                     ? '会員ログイン'
                     : role === 'admin'
                     ? '管理画面ログイン'
                     : '企業ログイン'}
               </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
               <div className='py-3'>
                  <input type='submit' className='btn' />
               </div>
            </form>
         </div>
      </>
   )
}

export default SigninForm
