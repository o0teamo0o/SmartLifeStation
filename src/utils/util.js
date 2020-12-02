/**
 * 工具类
 * @param {*} Vue 
 * @param {*} options 
 */
exports.install = function(Vue, options) {

    /**
     * 是否为空
     */
    Vue.prototype.isEmpty = function(val) {
        // null or undefined
        if (val == null) return true;
        if (val == "null") return true;
        if (typeof val === 'boolean') return false;
        if (typeof val === 'number') {
            //数字为空不认为是空
            if (val === 0) {
                return false;
            }
            return !val;
        }
        if (val instanceof Error) return val.message === '';
        switch (Object.prototype.toString.call(val)) {
            // String or Array
            case '[object String]':
            case '[object Array]':
                return !val.length;
                // Map or Set or File
            case '[object File]':
            case '[object Map]':
            case '[object Set]':
                {
                    return !val.size;
                }
                // Plain Object
            case '[object Object]':
                {
                    return !Object.keys(val).length;
                }
        }
        return false;
    }
}