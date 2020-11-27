import request from '@/utils/request'

export function goLogin(query) {
    return request({
        url: '/goLogin',
        method: 'post',
        params: query
    })
}