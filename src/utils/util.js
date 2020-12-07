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
    };


    /**
     * 时间毫秒值转换成时间字符串
     * @param {时间戳} timestamp 
     * @param {日期格式化符} formatStr 
     */
    Vue.prototype.timeStampToStr = function(timestamp, formatStr) {
        var time = new Date(timestamp) //先将时间戳转为Date对象，然后才能使用Date的方法
        var year = time.getFullYear(),
            month = time.getMonth() + 1, //月份是从0开始的
            day = time.getDate(),
            hour = time.getHours(),
            minute = time.getMinutes(),
            second = time.getSeconds()
            //add0()方法在后面定义
        return year + formatStr + add0(month) + formatStr + add0(day) + " " + add0(hour) + ":" + add0(minute) + ":" + add0(second);
    };

    /**
     * 补领方法
     */
    function add0(m) {
        return m < 10 ? '0' + m : m
    };

}