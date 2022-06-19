# http输出器

### 功能描述

HTTP输出器能够将程序运行中产生的日志内容会被封装成http请求发送至外部提供的网络接口。



#### 配置参数说明

| 参数              | 说明                                                         | 是否必填 | 默认值 | 值可能性                                                     |
| ----------------- | ------------------------------------------------------------ | -------- | ------ | ------------------------------------------------------------ |
| name              | 实例名                                                       | 是       |        | string                                                       |
| driver            | 驱动名，填http_output                                        | 是       |        | string                                                       |
| config            | 输出器配置                                                   | 是       |        | object                                                       |
| config->method    | 请求外部网络接口所使用的http方法                             | 是       |        | ["GET", "POST", "HEAD", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE"] |
| config->url       | 外部提供的网络接口的地址                                     | 是       |        | string                                                       |
| config->headers   | 请求的头部信息，可以填请求外部网络接口时需要提供的参数,如鉴权等信息 | 否       |        | object                                                       |
| config->type      | formatter的类型                                              | 否       | "line" | ["line","json"]                                              |
| config->formatter | formatter的输出内容                                          | 是       |        | object                                                       |

**注意**：

* formatter的配置教程[点此](/docs/formatter)进行跳转



### OpenAPI配置日志

#### 请求参数说明

![](http://data.eolinker.com/course/Kt7HwLn4e8383c7891c2efcd747c79919b5d8ddc85f7e11.png)

#### 返回参数说明

![](http://data.eolinker.com/course/SzT1bw405b41a501a71803cbb5a12b72fb37ecbe49bf95b.png)

#### 创建HTTP输出器示例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/output' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_httplog",
	"driver": "http_output",
	"config": {
		"method": "POST",
		"url": "http://127.0.0.1:9090/log",
		"headers":{
			"token":"test"
		 },
		"type": "line",
		"formatter": {
			"fields": ["$request_id", "$request", "$status", "@time", "@proxy", "$response_time"],
			"time": ["$msec", "$time_iso8601", "$time_local"],
			"proxy": ["$proxy_uri", "$proxy_scheme", "$proxy_addr"]
		}
	}
}'
```

#### 返回结果示例

```json
{
	"id": "demo_httplog@output",
	"name": "demo_httplog",
  "driver": "http_output",
	"profession": "output",
  "create": "2021-12-29 12:13:32",
	"update": "2021-12-29 12:13:32"
}
```



### HTTP输出器使用

HTTP输出器可用于access-log插件的日志输出，[点此](/docs/plugins/access_log.md)跳转至access-log插件。
