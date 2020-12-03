import request from '@/utils/request'

/**
 * 获取小区集合
 */
export function queryRegionHousePage(query) {
    return request({
        url: '/regionHouse/queryRegionHousePage',
        method: 'get',
        params: query
    })
}

/**
 * 获取省份
 */
export function queryAllProvince(query) {
    return request({
        url: '/sysRegion/queryAllProvince',
        method: 'get',
        params: query
    })
}

/**
 * 获取省份下的城市
 */
export function queryCityByProvince(query) {
    return request({
        url: '/sysRegion/queryCityByProvince',
        method: 'get',
        params: query
    })
}

/**
 * 获取省份下的城市下的区域
 */
export function queryRegionByCity(query) {
    return request({
        url: '/sysRegion/queryRegionByCity',
        method: 'get',
        params: query
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