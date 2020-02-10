import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): void {
  // 处理配置文件
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  // 处理url
  config.url = transformURL(config)
  // 处理headers(先处理headers再处理data)
  config.headers = transformHeaders(config)
  // 处理数据
  config.data = transformReqData(config)
}

// 处理配置文件里面的url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// 把req里面的body数据转换成obj
function transformReqData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 对headers进行处理
const transformHeaders = (config: AxiosRequestConfig): any => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
