import { isPlainObject } from './util'

// 对象转换
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
}
