import request from '@/utils/request'

export function goLogin(query) {
    return request({
        url: '/validateToken/selectToken',
        method: 'post',
        params: query
    })
}