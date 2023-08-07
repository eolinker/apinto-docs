# http输出器

### 功能描述

HTTP输出器能够将程序运行中产生的日志内容会被封装成http请求发送至外部提供的网络接口。



### OpenAPI配置日志

#### 配置参数说明

| 参数名         | 值类型        | 是否必填   | 值可能性                                                                    | 默认值  | 说明                                 |
|-------------|------------|--------|-------------------------------------------------------------------------|------|------------------------------------|
| name        | string     | 是      |                                                                         |      | 实例名                                |
| driver      | string     | 是      | http_output                                                             |      | 驱动名                                |
| description | string     | 否      |                                                                         |      | 描述                                 |
| scopes      | []string   | 是      |                                                                         |      | 作用域，此处填写access_log                 |
| method      | string     | 是      | ["GET", "POST", "HEAD", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE"] |      | 请求外部网络接口所使用的http方法                 |
| url         | string     | 是      |                                                                         |      | 外部提供的网络接口的地址                       |
| headers     | object     | 否      |                                                                         |      | 请求的头部信息，可以填请求外部网络接口时需要提供的参数,如鉴权等信息 |
| type        | string     | 否      | ["line","json"]                                                         | line | formatter的类型                       |
| formatter   | object     | 是      |                                                                         |      | formatter的输出内容                     |

**注意**：

* formatter的配置教程[点此](/docs/formatter)进行跳转



#### 返回参数说明

| 参数名         | 类型        | 是否必含    | 说明                                 |
|-------------|-----------|---------|------------------------------------|
| id          | string    | 是       | 实例id                               |
| name        | string    | 是       | 实例名                                |
| driver      | string    | 是       | 驱动名                                |
| description | string    | 是       | 描述                                 |
| profession  | string    | 是       | 模块名                                |
| create      | string    | 是       | 创建时间                               |
| update      | string    | 是       | 更新时间                               |
| scopes      | []string  | 是       | 作用域                                |
| method      | string    | 是       | 请求外部网络接口所使用的http方法                 |
| url         | string    | 是       | 外部提供的网络接口的地址                       |
| headers     | object    | 是       | 请求的头部信息，可以填请求外部网络接口时需要提供的参数,如鉴权等信息 |
| type        | string    | 是       | formatter的类型                       |
| formatter   | object    | 是       | formatter的输出内容                     |



#### 创建HTTP输出器示例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/output' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_httplog",
	"driver": "http_output",
    "scopes": ["access_log"],
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
    "scopes": ["access_log"],
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
