import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { parseHeaders } from './helpers/headers'

export const xhr = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const { data, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
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

      if (request.status === 0) {
        return
      }

      //  这个方法取到的值会是字符串,因此需要格式化一下
      const responseHeader = parseHeaders(request.getAllResponseHeaders())
      // 根据responseType属性根据返回结果的值
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeader,
        config,
        request
      }
      // resolve(response)
      handleResponse(response)
    }

    // 处理网络错误
    request.onerror = () => {
      reject(new Error('Network Error'))
    }
    // 处理请求超时
    request.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout} ms exceed`))
    }

    Object.keys(headers).forEach(name => {
      if (!data && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    const handleResponse = (response: AxiosResponse): void => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }
  })
}
