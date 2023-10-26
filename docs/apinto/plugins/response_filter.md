# 响应过滤

### 插件信息

| 名称    | 字段               | 属性     |
|-------|------------------|--------|
| 响应过滤  | response_filter  | 请求处理   |

### 描述
对上游服务返回的响应进行过滤，可对响应头部、响应体进行过滤，支持多个过滤规则，过滤字段/响应头将会被删除，不会被返回给客户端。
该插件可以隐藏上游服务返回的部分字段，避免敏感信息泄露。

注意：该插件仅支持对JSON格式的响应体内容进行字段过滤。

### 配置描述


| 字段               | 类型            | 描述                                                 |
|------------------|---------------|----------------------------------------------------|
| body_filter      | []string      | 响应体过滤字段列表，字段名称按照`Json Path`规则填写，如：$.data.requestId |
| header_filter    | []string      | 响应头部过滤字段                                           |                                                                   
### 示例配置

```json
{
  "body_filter": [
    "$.data.requestId",
  ],
  "header_filter": []
}
```

若此时上游服务返回的响应体为
```json
{
    "code": 0,
    "data": {
        "valid": true,
        "scoreMsg": "系统判断为同一人",
        "score": 0.81,
        "score2": 0.81,
        "incorrect": 100,
        "message":"比对成功",
        "requestId": "d022123ca86945fbb6562a8c90a416f1"
        },
    "message": "success"
}
```

使用响应过滤插件后，返回客户端的响应体为
```json
{
    "code": 0,
    "data": {
        "valid": true,
        "scoreMsg": "系统判断为同一人",
        "score": 0.81,
        "score2": 0.81,
        "incorrect": 100,
        "message":"比对成功"
        },
    "message": "success"
}
```