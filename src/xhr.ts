import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig): void {
  const { data, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  //   第三个参数为true表示为异步(false为同步),method规定大写
  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
