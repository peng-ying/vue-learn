import service from '../http/service'

interface userParams {
  username?: string,
  password?: string
}

export const userLogin = (params: userParams) => {
  return service({
    url: '/login/demo',
    method: 'post',
    data: params
  })
}

export const getMenus = (params: any) => {
  return service({
    url: '/login/menu',
    method: 'post',
    data: params
  })
}