import axios from '@/common/request'

export function add (data) {
    return axios({
      url: '/detail/add',
      method: 'POST',
      data
    })
  }
  
  export function deletes (id) {
    return axios({
      url: '/detail/delete/'+id,
      method: 'GET'
    })
  }
  
  export function update (data) {
    return axios({
      url: '/detail/update',
      method: 'POST',
      data
    })
  }
  
  export function getPageList (data) {
    return axios({
      url: '/detail/getPageList',
      method: 'POST',
      data
    })
  }
  
  export function getDetailInfoById (id) {
    return axios({
      url: '/detail/getDetailInfoById/'+id,
      method: 'GET',
    })
  }