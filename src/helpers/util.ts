// 判断日期

const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// val is Object这里是起到的是类型保护功能
// 目的实在调用该函数的时候放心使用这个类型
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
