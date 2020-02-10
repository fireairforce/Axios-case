import { isPlainObject } from './util'

// 对象转换
export const transformRequest = (data: any): any => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
}
