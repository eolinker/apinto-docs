# 请求拦截

### 插件信息

| 名称     | 字段                 | 属性     |
| -------- | -------------------- | -------- |
| 请求拦截 | request_interception | 请求处理 |

### 描述
当API绑定该插件，请求将不会发送给上游服务，而是直接返回插件配置的响应内容。
* 自定义响应状态码
* 自定义响应头部
* 自定义响应体内容

### 配置描述


| 字段                      | 类型            | 描述                                                                                                                                      |
|-------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| status                  | int           | 响应状态码                                                                                                                                   |
| body                    | string        | 响应体内容                                                                                                                                   |
| content_type            | string        | 响应体类型                                                                                                                                   |
| headers                 | array(object) | 响应头部列表，对象数组，key-value格式                                                                                                                 |
| headers -> key          | string        | 响应头部key                                                                                                                                 |
| headers -> value        | array(string) | 响应头部value列表，字符串数组格式，多个值会进行拼接，支持系统变量引用，使用变量时，应使用`$变量名`的格式，变量可参考文档[系统可用值](/docs/formatter/#%E7%B3%BB%E7%BB%9F%E5%8F%AF%E7%94%A8%E5%80%BC) |

### 示例配置

```json
{
  "body": "",
  "content_type": "application/json",
  "headers": [
    {
      "key": "location",
      "value": [
        "https://www.baidu.com",
        "$request_uri"
      ]
    }
  ],
  "status": 302
}
```

根据上述配置，请求该插件绑定的路由接口时，请求将会被拦截，返回302状态码，响应头部中的location字段值为`https://www.baidu.com/$request_uri`，响应体内容为空，响应体类型为`application/json`。

如路由接口Location为`/user/info`，请求接口：`http://节点IP:端口号/user/info?name=apinto`，则响应头部中的location字段值为`https://www.baidu.com/user/info?name=apinto`。
