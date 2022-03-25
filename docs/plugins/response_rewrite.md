# 响应重写

### 插件信息

| 名称     | 字段             | 属性     |
| -------- | ---------------- | -------- |
| 响应重写 | response_rewrite | 参数处理 |

### 功能描述

该插件用于重写网关返回的状态码、响应体、头部。当从上游返回的响应状态码满足对应状态码时，网关对响应内容进行重写。

**注意事项**：对状态码和响应体body是重写覆盖，但对头部信息是新增或修改。

### Open Api

#### 配置示例

**示例说明**：当响应状态码为200或者404时，响应状态码将被重写为201，响应头部设置`demo_header: "1"`，body被覆盖为`{"重写响应体Body"}`(以下配置的body已经过base64加密)。

```json
{
	"status_code": 201,
	"body": "eyLph43lhpnlk43lupTkvZNCb2R5In0=",
	"body_base64": true,
	"headers": {
		"demo_header": "1"
	},
	"match": {
		"code": [404,200]
	}
}
```

#### 配置参数说明

| 参数名      | 说明                                   | 是否必填 | 默认值 | 值可能性     |
| ----------- | -------------------------------------- | -------- | ------ | ------------ |
| status_code | 新响应状态码                           | 是       |        | [200,598]    |
| body        | 新响应体                               | 否       |        | string       |
| body_base64 | 新响应体的配置内容是否已经过base64加密 | 否       | false  | [true,false] |
| headers     | 新增的响应头部信息                     | 否       |        | object       |
| match       | 匹配条件                               | 是       |        | object       |
| match->code | 匹配状态码                             | 是       |        | int_array    |

**注意事项**：

* match->code参数是int数组，同时每个值得范围是[200,598]。

#### Open API 请求示例

##### 全局配置

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
	"plugins": [{
		"id": "eolinker.com:apinto:response_rewrite",
		"name": "response_rewrite",
		"type": "service",
		"status": "enable"
	}]
}'
```

##### 配置带有响应重写插件的service服务

**配置说明**：当响应状态码为200或者404时，响应状态码将被重写为201，响应头部设置`demo_header: "1"`，body被覆盖为`{"重写响应体Body"}`(以下配置的body已经过base64加密)。

全局插件具体配置点此进行[跳转](/docs/plugins)。


```shell
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' -d '{
	"name": "response_rewrite_service",
	"driver": "http",
	"timeout": 3000,
	"retry": 3,
	"scheme": "http",
	"anonymous": {
		"type": "round-robin",
		"config": "demo-apinto.eolink.com:8280"
	},
	"plugins": {
		"response_rewrite": {
			"disable": false,
			"config": {
				"status_code": 201,
				"body": "eyLph43lhpnlk43lupTkvZNCb2R5In0=",
				"body_base64": true,
				"headers": {
					"demo_header": "1"
				},
				"match": {
					"code": [404,200]
				}
			}
		}
	}
}' 
```

##### 绑定路由

```shell
curl -X POST  'http://127.0.0.1:9400/api/router' \
-H 'Content-Type:application/json' \
-d '{
    "name":"response_rewrite_router",
    "driver":"http",
    "listen":8080,
    "rules":[{
        "location":"/demo"
    }],
    "target":"response_rewrite_service@service"
}'
```

##### 接口请求示例

```shell
curl -i -X GET 'http://127.0.0.1:8080/demo' -H 'Content-Type:application/json'
```

##### 接口访问返回示例

```text
HTTP/1.1 201 Created
Server: fasthttp
Date: Mon, 13 Dec 2021 03:36:50 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 23
Demo_header: 1

{"重写响应体Body"}
```

