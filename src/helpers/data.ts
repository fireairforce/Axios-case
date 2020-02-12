import { isPlainObject } from './util'

// 对象转换
export const transformRequest = (data: any): any => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
}

// 处理响应结果

export const transformResponse = (data: any): any => {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data 
}
