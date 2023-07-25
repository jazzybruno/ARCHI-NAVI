const _BaseApiPath = 'api'

export const ApiRoutes = {
   auth: {
      signin: `${_BaseApiPath}/auth/signin`,
      signout: `${_BaseApiPath}/auth/signout`,
      signup: `${_BaseApiPath}/auth/signup`,
      user: `${_BaseApiPath}/auth/user`,
   },
   post: {
      index: `${_BaseApiPath}/post`,
   },
   user: {
      index: `${_BaseApiPath}/user`,
   },
   attachment: {
      index: `${_BaseApiPath}/attachment`,
      upload: `/file`
   },
   company: {
      index: `${_BaseApiPath}/company`,
   },
   event: {
      index: `${_BaseApiPath}/event`,
   },
   message: {
      index: `${_BaseApiPath}/message`,
   },
   notification: {
      index: `${_BaseApiPath}/notification`,
   },
   alumnus: {
      index: `${_BaseApiPath}/alumnus`,
   },
}

export type UserRole = 'admin' | 'user' | 'company'
