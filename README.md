## 基本说明

代码提交:

```bash
npm run commit
```

运行对应的`demo`

```bash
npm run dev
```

## demo 说明

对应的`demo`位于`examples`文件夹下面的各个文件夹里面，`app.ts`为入口文件，`index.html`则为渲染页面(它们都会通过`webpack`的配置打包出来)。具体`webpack`配置参考`webpack.config.js`文件，同时使用`express`来搭建项目运行的服务器端。运行起来之后可以去到对应的`demo`里面查看`axios`请求的结果

## 对 url 参数的处理

- 参数值为数组

```js
axios({
  method: 'get',
  url: `/base/get`,
  params: {
    foo: ['bar', 'baz']
  }
})
```

处理为:`/base/get?foo[]=bar&foo[]=baz`

- 参数值为对象

```js
axios({
  method: 'get',
  url: `/base/get`,
  params: {
    foo: {
      bar: 'baz'
    }
  }
})
```

拼接参数为对象 `foo` encode`{"bar":"baz"}`后的结果。

- 参数值为 Date

```js
const date = new Date()

// ...
params: {
  date
}
```

最终处理的`url`里，`date`后面拼接的是`date.toISOString()`

- 参数值为特殊字符例如空格转换为+
- 空值(例如`null`)会被忽略掉
- 丢弃 url 中的哈希标记
- 保留`url`中已存在的参数

## 对 body 数据处理

## 对请求头 req-headers 处理

## 返回结果 Promise 化

同时`.then`函数返回的对象包括:

- 服务端的数据`data`
- `HTTP`状态码`status`
- 状态消息 Status
- 响应头 headers
- 请求配置对象 config
- 请求 XMLHttpRequest 对象实例 request

## 对 axios 的一系列方法封装

`core`目录下面的`Axios`类里面已经封装好了`Axios`需要的各种方法,例如`get`,`post`,`delete`等等。

## 混合对象的实现

用来将我们的 Axios 对象与原声的 Axios 对象合并起来，利用了交叉类型和类型断言实现了一个`extend`函数(用于将`from`里面的属性都拓展到`to`里面去)。

然后在根目录下面的`axios.ts`中实现即可。

这样可以将我们的`Axios`变成一个混合类型的对象,相关的`demo`可以在`extend`目录中看见。

同时利用重载实现了一个两种方式组合请求的`feature`

### axios函数重载
支持多个参数的传入
```js
axios('xxx/xxx',{
  method:'get'
})
```
这里只对`axios`内部的一个`request`函数进行修改,而不必对它的类型进行一个修改。

## 响应数据支持泛型
把后端返回的数据放在一个泛型接口里面。
