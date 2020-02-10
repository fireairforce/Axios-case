import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig): void {
  const { data, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  //   第三个参数为true表示为异步(false为同步),method规定大写
  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    if (!data && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
