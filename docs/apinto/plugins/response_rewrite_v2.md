# 响应重写v2
### 插件信息

| 名称     | 字段                   | 属性     |
|--------|----------------------|--------|
| 响应重写v2 | response_rewrite_v2  | 参数处理   |

### 描述
当匹配响应状态码、响应体、响应头部后，重写响应信息。不仅支持对上游服务返回的响应进行重写，而且支持对插件报错设置的默认响应进行重写。
对上游服务返回的响应流程图如下：

![](http://data.eolinker.com/course/BNeSMpR80eb6fb8a9616f540c3972ec0b6d15720606cb5d.png)

建议将该插件执行顺序尽量靠前，如下图

![](http://data.eolinker.com/course/bAyREEP6dc688440a86f2101cf9bd198c93f73ef8d2b8fb.png)

### 示例配置
```json
{
    "matches": [
        {
            "match_body": {
                "content": "404 not found",
                "match_type": "equal"
            },
            "match_headers": [],
            "match_status_code": 404,
            "response_rewrite": {
                "body": "{     \"code\":\"10007\",     \"msg\":\"Can not find the API\",     \"msg_zh\":\"接口不存在\",     \"status\": \"error\" }",
                "headers": {},
                "status_code": 404
            }
        },
        {
            "match_body": {
                "content": "The request body is too large",
                "match_type": "equal"
            },
            "match_headers": [],
            "match_status_code": 413,
            "response_rewrite": {
                "body": "{     \"code\":\"10013\",     \"msg\":\"The request body is too large\",     \"msg_zh\":\"请求体超出长度限制\",     \"status\": \"error\" }",
                "headers": {},
                "status_code": 413
            }
        },
        {
            "match_body": {
                "content": "#param$ value is missing",
                "match_type": "equal"
            },
            "match_headers": [],
            "match_status_code": 400,
            "response_rewrite": {
                "body": "{     \"code\":\"10016\",     \"msg\":\"#param$ value is missing\",     \"msg_zh\":\"#param$ 缺少内容\",     \"status\": \"error\" }",
                "headers": {},
                "status_code": 400
            }
        },
        {
            "match_body": {
                "content": "#param$ number exceed",
                "match_type": "equal"
            },
            "match_headers": [],
            "match_status_code": 400,
            "response_rewrite": {
                "body": "{     \"code\":\"10014\",     \"msg\":\"#param$ Number exceed\",     \"msg_zh\":\"参数 #param$ 超出单次批量数量的最大限制\",     \"status\": \"error\" }",
                "headers": {},
                "status_code": 400
            }
        }
    ]
}
```
### 配置描述


| 字段                                          | 类型      | 描述                                                                                         |
|---------------------------------------------|---------|--------------------------------------------------------------------------------------------|
| matches                                     | array   | 匹配规则列表                                                                                     |
| matches -> match_body                       | object  | 匹配响应体内容                                                                                    |
| matches -> match_body -> content            | string  | 匹配响应体内容                                                                                    |
| matches -> match_body -> match_type         | string  | 匹配响应体内容的方式，可选值：equal、regex、contain<br />* equal：全等匹配<br />* regex：正则匹配<br />* contain：包含匹配 |
| matches -> match_headers                    | array   | 匹配响应头部列表，对象数组，key-value格式                                                                  |
| matches -> match_status_code                | int     | 匹配响应状态码                                                                                    |
| matches -> response_rewrite                 | object  | 响应重写信息                                                                                     |
| matches -> response_rewrite -> body         | string  | 响应体内容                                                                                      |
| matches -> response_rewrite -> headers      | object  | 响应头部列表，对象数组，key-value格式                                                                    |
| matches ->  response_rewrite -> status_code | int     | 响应状态码                                                                                      |

该插件支持变量提取，支持在重写响应时引用变量，使用变量时，应使用`#参数名$`的格式，如下列配置
```json
{
    "matches": [
        {
            "match_body": {
                "content": "#param$ value is missing",
                "match_type": "equal"
            },
            "match_headers": [],
            "match_status_code": 400,
            "response_rewrite": {
                "body": "{     \"code\":\"10016\",     \"msg\":\"#param$ value is missing\",     \"msg_zh\":\"#param$ 缺少内容\",     \"status\": \"error\" }",
                "headers": {},
                "status_code": 400
            }
        },
        {
            "match_body": {
                "content": "#param$ number exceed",
                "match_type": "equal"
            },
            "match_headers": [],
            "match_status_code": 400,
            "response_rewrite": {
                "body": "{     \"code\":\"10014\",     \"msg\":\"#param$ Number exceed\",     \"msg_zh\":\"参数 #param$ 超出单次批量数量的最大限制\",     \"status\": \"error\" }",
                "headers": {},
                "status_code": 400
            }
        }
    ]
}
```

此时上游服务返回响应状态码为`400`，返回响应体为`phone number exceed`

经过响应重写后，返回给客户端的响应状态码为`400`，响应体为
```json
{
  "code": "10014",
  "msg": "phone number exceed Number exceed",
  "msg_zh": "参数 phone number exceed 超出单次批量数量的最大限制",
  "status": "error"
}
```