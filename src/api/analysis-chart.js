import axios from '@/common/request'

export function getMonthTotal (data) {
    return axios({
        url: '/analysis-chart/getMonthTotal',
        method: 'POST',
        data
    })
}
export function getYearTotal (data) {
    return axios({
        url: '/analysis-chart/getYearTotal',
        method: 'POST',
        data
    })
}
export function getMonthPayBar (data) {
    return axios({
        url: '/analysis-chart/getMonthPayBar',
        method: 'POST',
        data
    })
}
export function getYearPayBar (data) {
    return axios({
        url: '/analysis-chart/getYearPayBar',
        method: 'POST',
        data
    })
}
export function getMonthIncomePayBar (data) {
    return axios({
        url: '/analysis-chart/getMonthIncomePayBar',
        method: 'POST',
        data
    })
}
export function getYearIncomePayBar (data) {
    return axios({
        url: '/analysis-chart/getYearIncomePayBar',
        method: 'POST',
        data
    })
}