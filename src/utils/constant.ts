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
}

export type UserRole = 'admin' | 'user' | 'company'
