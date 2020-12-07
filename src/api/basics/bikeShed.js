import request from '@/utils/request'

/**
 * 获取车棚集合
 */
export function queryCarPortPage(data) {
    return request({
        url: '/carPort/queryCarPortPage',
        method: 'get',
        params: data
    })
}