import { isPlainObject } from './util'

// 对header规范化
const normalizeHeaderName = (headers: any, normalizedName: string): any => {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export const processHeaders = (headers: any, data: any): any => {
  // 先对content-type做个格式化
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export const parseHeaders = (headers: string): any => {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split(`\r\n`).forEach(line => {
    let [key, val] = line.split(':')
    // trim作用是去除掉字符串头尾空格
    key = key.trim().toLowerCase()
    if (!key) {
      // 如果是空串就进下一次循环
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
