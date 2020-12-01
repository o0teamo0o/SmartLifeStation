import request from '@/utils/request'

export function getHousingEstateList(query) {
    return request({
        url: '/getHousingEstateList',
        method: 'post',
        params: query
    })
}