import axios from '@/common/request'

export function getTotalPageList (data) {
    return axios({
      url: '/analysis-total/getTotalPageList',
      method: 'POST',
      data
    })
}
export function getYearPageList (data) {
    return axios({
      url: '/analysis-total/getYearPageList',
      method: 'POST',
      data
    })
}
export function getOneselfMonthPageList (data) {
    return axios({
      url: '/analysis-total/getOneselfMonthPageList',
      method: 'POST',
      data
    })
}
export function getMonthPageList (data) {
    return axios({
      url: '/analysis-total/getMonthPageList',
      method: 'POST',
      data
    })
}