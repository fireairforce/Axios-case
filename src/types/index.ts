// 字符串字面量表示method只能传一些指定的变量
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'head'
  | 'HEAD'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  // typescript内部dom自带的一个类型，可以点进去康康
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

// 这里设置一个泛型参数T为any
export interface AxiosResponse<T=any> {
  data: any
  status: number
  statusText: string
  headers: any
  // 请求配置
  config: AxiosRequestConfig
  request: any
}

// axios函数返回的对象类型(promise对象),继承自Promise的泛型接口
export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  request<T=any>(config?: AxiosRequestConfig): AxiosPromise<T>
  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
