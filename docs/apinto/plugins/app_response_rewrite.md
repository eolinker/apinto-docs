# 应用鉴权响应重写
### 插件信息

| 名称     | 字段                   | 属性     |
|--------|----------------------|--------|
| 应用鉴权响应重写 | app_response_rewrite  | 参数处理   |

### 描述
当应用鉴权失败，无法命中任何规则时，重写响应信息。

该插件需要放置在`app`插件之前
![](http://data.eolinker.com/course/2026-06-01_16%3A42%3A02.png)

### 示例配置
```json
{
    "response": {
        "body": "鉴权失败",
        "charset": "utf-8",
        "content_type": "text/html",
        "header": [],
        "status_code": 401
    }
}
```
### 配置描述


| 字段                                          | 类型      | 描述                                                                                         |
|---------------------------------------------|---------|--------------------------------------------------------------------------------------------|
| response | object | 响应信息，包含响应体、响应状态码、响应头部、响应字符集等 |
| response -> body | string | 重写后响应体内容 |
| response -> charset | string | 重写后响应字符集 |
| response -> content_type | string | 重写后响应内容类型 |
| response -> header | []string | 重写后响应头部 |
| response -> status_code | int | 重写后响应状态码 |



该插件支持变量提取，支持在重写响应时引用变量，使用变量时，应使用`#参数名$`的格式，如下列配置
```json
{
    "response": {
        "body": "鉴权失败",
        "charset": "utf-8",
        "content_type": "text/html",
        "header": [
            "X-Auth": "false"
        ],
        "status_code": 401
    }
}
```


经过响应重写后，返回给客户端的响应状态码为`401`，响应头部为：
```
Server: fasthttp
Date: Mon, 01 Jun 2026 08:23:10 GMT
Content-Type: text/html; charset=utf-8
X-Auth: false
Content-Length: 12
```

响应体为
```
鉴权失败
```