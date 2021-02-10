import axios from '@/common/request'

export function add (data) {
  return axios({
    url: '/wages/add',
    method: 'POST',
    data
  })
}

export function deletes (id) {
  return axios({
    url: '/wages/delete/'+id,
    method: 'GET'
  })
}

export function update (data) {
  return axios({
    url: '/wages/update',
    method: 'POST',
    data
  })
}

export function getPageList (data) {
  return axios({
    url: '/wages/getPageList',
    method: 'POST',
    data
  })
}

export function getWagesInfoById (id) {
  return axios({
    url: '/wages/getWagesInfoById/'+id,
    method: 'get'
  })
}
