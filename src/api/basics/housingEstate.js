import request from '@/utils/request'

/**
 * 获取小区集合
 */
export function queryRegionHousePage(data) {
    return request({
        url: '/regionHouse/queryRegionHousePage',
        method: 'get',
        params: data
    })
}

/**
 * 获取省份
 */
export function queryAllProvince(data) {
    return request({
        url: '/sysRegion/queryAllProvince',
        method: 'get',
        params: data
    })
}

/**
 * 获取省份下的城市
 */
export function queryCityByProvince(data) {
    return request({
        url: '/sysRegion/queryCityByProvince',
        method: 'get',
        params: data
    })
}

/**
 * 获取省份下的城市下的区域
 */
export function queryRegionByCity(data) {
    return request({
        url: '/sysRegion/queryRegionByCity',
        method: 'get',
        params: data
    })
}

/**
 * 新增小区
 */
export function saveRegionHouse(data) {
    return request({
        url: '/regionHouse/saveRegionHouse',
        method: 'post',
        data
    })
}

/**
 * 删除小区
 */
export function delRegionHouse(data) {
    return request({
        url: '/regionHouse/delRegionHouse',
        method: 'get',
        params: data
    })
}

/**
 * 更新小区
 */
export function updateRegionHouse(data, token) {
    return request({
        url: '/regionHouse/updateRegionHouse',
        method: 'post',
        data,
        headers: { 'Authorization': token }
    })
}