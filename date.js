/**
 * @param date
 * @param pattern
 * @returns {*}
 *
 * examples：
 * format(new Date(), 'yyyy-MM-dd hh:mm:ss.S') => 2019-07-17 10:10:40.110
 * format(new Date(), 'yy-M-d h:m:s.S') => 19-7-17 10:10:40.114
 */
function format(date, pattern) {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }

  if (/(y+)/.test(pattern)) {
    pattern = pattern.replace(RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let key in o) {
    if (new RegExp('(' + key + ')').test(pattern)) {
      pattern = pattern.replace(RegExp.$1, (RegExp.$1.length === 1) ?
        (o[key]) : (('00' + o[key]).substr(('' + o[key]).length)))
    }
  }

  return pattern
}

function formatSimpleDate(date) {
  return format(date, 'yyyy-MM-dd')
}

function formatSimpleTime(date) {
  return format(date, 'hh:mm:ss')
}

export default {
  format,
  formatSimpleDate,
  formatSimpleTime
}