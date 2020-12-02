import request from '@/utils/request'

export function queryRegionHousePage(query) {
    return request({
        url: '/regionHouse/queryRegionHousePage',
        method: 'get',
        params: query
    })
}