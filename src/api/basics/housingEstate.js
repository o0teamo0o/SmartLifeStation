import request from '@/utils/request'

export function getHousingEstateList(query) {
    return request({
        url: '/api/getHousingEstateList',
        method: 'post',
        params: query
    })
}