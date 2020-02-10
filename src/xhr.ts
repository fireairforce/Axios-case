import { AxiosRequestConfig, AxiosPromise, AxiosReponse } from './types/index'

export const xhr = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise(resolve => {
    const { data, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    //   第三个参数为true表示为异步(false为同步),method规定大写
    request.open(method.toUpperCase(), url, true)

    // 实现onreadystateChange逻辑
    request.onreadystatechange = () => {
      // 请求码为4的情况下才能拿到结果
      // ajax的几个请求状态
      if (request.readyState !== 4) {
        return
      }

      const responseHeader = request.getAllResponseHeaders()
      // 根据responseType属性根据返回结果的值
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosReponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeader,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach(name => {
      if (!data && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
