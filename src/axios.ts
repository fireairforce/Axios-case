import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { xhr } from './core/xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

const axios = (config: AxiosRequestConfig): AxiosPromise => {
  // 处理配置文件
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

const processConfig = (config: AxiosRequestConfig): void => {
  // 处理url
  config.url = transformURL(config)
  // 处理headers(先处理headers再处理data)
  config.headers = transformHeaders(config)
  // 处理数据
  config.data = transformReqData(config)
}

// 处理配置文件里面的url
const transformURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildURL(url, params)
}

// 把req里面的body数据转换成obj
const transformReqData = (config: AxiosRequestConfig): any => {
  return transformRequest(config.data)
}

// 对headers进行处理
const transformHeaders = (config: AxiosRequestConfig): any => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transformResponse(res.data)
  return res
}

export default axios
