import { isDate, isPlainObject } from './util'

// 对字符串进行转码&处理特殊字符
const encode = (val: string): string => {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export const buildURL = (url: string, params?: any): string => {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      //   return 可以跳到forEach的下一次循环
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        // encode成json字符串
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const marIndex = url.indexOf('#')
    if (marIndex !== -1) {
      // 有hash标记把hash后面的去掉
      url = url.slice(0, marIndex)
    }
    // 如过url后面有?就接?,没有接参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
