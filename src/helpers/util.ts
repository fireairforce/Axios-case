// 判断日期

const toString = Object.prototype.toString

export const isDate = (val: any): val is Date => {
  return toString.call(val) === '[object Date]'
}

// 判断普通对象的方法
export const isPlainObject = (val: any): val is Object => {
  return toString.call(val) === '[object Object]'
}

// val is Object这里是起到的是类型保护功能
// 目的实在调用该函数的时候放心使用这个类型
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 使用交叉类型来实现，这里使用了泛型的概念其中to为T,from为U,拷贝出来的类型为T和U类型的并集
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
