import request from '@/utils/request'

// 获取素有的department 的数据
export function list() {
  return request({
    url: '/api/department/tree',
    method: 'get',
  })
}


export function crateDepartment(data) {
  return request({
    url: '/api/department/add',
    method: 'post',
    data
  })
}
