# http输出器

### 功能描述

HTTP输出器能够将程序运行中产生的日志内容会被封装成http请求发送至外部提供的网络接口。



### OpenAPI配置日志

#### 配置参数说明

| 参数        | 说明                                                         | 是否必填 | 默认值 | 值可能性                                                     |
| ----------- | ------------------------------------------------------------ | -------- | ------ | ------------------------------------------------------------ |
| name        | 实例名                                                       | 是       |        | string                                                       |
| driver      | 驱动名                                        | 是       |        | "http_output"                                                |
| description | 描述                                                         | 否       |        | string                                                       |
| method      | 请求外部网络接口所使用的http方法                             | 是       |        | ["GET", "POST", "HEAD", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE"] |
| url         | 外部提供的网络接口的地址                                     | 是       |        | string                                                       |
| headers     | 请求的头部信息，可以填请求外部网络接口时需要提供的参数,如鉴权等信息 | 否       |        | object                                                       |
| type        | formatter的类型                                              | 否       | "line" | ["line","json"]                                              |
| formatter   | formatter的输出内容                                          | 是       |        | object                                                       |

**注意**：

* formatter的配置教程[点此](/docs/apinto/formatter)进行跳转



#### 返回参数说明

| 参数名      | 类型   | 是否必含 | 说明                                                         |
| ----------- | ------ | -------- | ------------------------------------------------------------ |
| id          | string | 是       | 实例id                                                       |
| name        | string | 是       | 实例名                                                       |
| driver      | string | 是       | 驱动名                                                       |
| description | string | 是       | 描述                                                         |
| profession  | string | 是       | 模块名                                                       |
| create      | string | 是       | 创建时间                                                     |
| update      | string | 是       | 更新时间                                                     |
| method      | string | 是       | 请求外部网络接口所使用的http方法                             |
| url         | string | 是       | 外部提供的网络接口的地址                                     |
| headers     | object | 是       | 请求的头部信息，可以填请求外部网络接口时需要提供的参数,如鉴权等信息 |
| type        | string | 是       | formatter的类型                                              |
| formatter   | object | 是       | formatter的输出内容                                          |



#### 创建HTTP输出器示例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/output' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_httplog",
	"driver": "http_output",

	"method": "POST",
	"url": "http://127.0.0.1:9090/log",
	"headers": {
		"token": "test"
	},
	"type": "line",
	"formatter": {
		"fields": ["$request_id", "$request", "$status", "@time", "@proxy", "$response_time"],
		"time": ["$msec", "$time_iso8601", "$time_local"],
		"proxy": ["$proxy_uri", "$proxy_scheme", "$proxy_addr"]
	}
}'
```



#### 返回结果示例

```json
{
	"create": "2022-06-14 15:40:42",
	"description": "",
	"driver": "http_output",
	"formatter": {
		"fields": ["$request_id", "$request", "$status", "@time", "@proxy", "$response_time"],
		"proxy": ["$proxy_uri", "$proxy_scheme", "$proxy_addr"],
		"time": ["$msec", "$time_iso8601", "$time_local"]
	},
	"headers": {
		"token": "test"
	},
	"id": "demo_httplog@output",
	"method": "POST",
	"name": "demo_httplog",
	"profession": "output",
	"type": "line",
	"update": "2022-06-14 15:40:42",
	"url": "http://127.0.0.1:9090/log"
}
```



### HTTP输出器使用

HTTP输出器可用于access-log插件的日志输出，[点此](/docs/apinto/plugins/access_log.md)跳转至access-log插件。
