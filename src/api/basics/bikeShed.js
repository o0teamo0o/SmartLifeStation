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

/**
 * 删除车棚
 */
export function delCarPort(data) {
    return request({
        url: '/carPort/delCarPort',
        method: 'get',
        params: data
    })
}