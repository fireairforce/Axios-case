## 基本说明

代码提交:

```bash
npm run commit
```

运行对应的`demo`

```bash
npm run dev
```

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
