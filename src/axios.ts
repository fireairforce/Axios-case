import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  // 获取到Axios原型上request方对象
  const instance = Axios.prototype.request.bind(context)

  // 把实例都转移到instance对象上面去
  extend(instance, context)
  // 类型断言一下
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
