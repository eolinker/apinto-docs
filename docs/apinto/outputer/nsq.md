# nsq输出器

### 功能描述

NSQ输出器能够将特定的日志信息输出到指定nsqd的topic中.



#### 配置参数说明

| 参数              | 说明                | 是否必填 | 默认值 | 值可能性        |
| ----------------- | ------------------- | -------- | ------ | --------------- |
| name              | 实例名              | 是       |        | string          |
| driver            | 驱动名，填nsqd      | 是       |        | string          |
| config            | 输出器配置          | 是       |        | object          |
| config->topic     | 所指定的topic       | 是       |        | string          |
| config->address   | nsqd地址列表        | 是       |        | []string        |
| config->nsq_conf  | nsq生产者配置       | 否       |        | object          |
| config->type      | formatter的类型     | 否       | "line" | ["line","json"] |
| config->formatter | formatter的输出内容 | 是       |        | object          |

**注意**：

* address参数可配置多个nsqd地址，用于负载均衡，所使用算法为轮询调度算法。同一个消息时仅会发送至其中一个nsqd。若某个nsqd连接不上，将会使用其他的nsqd进行发送。
* nsq_conf用于生产者的配置信息，连接至address内的nsqd的所有生产者共用同一个配置。可配置的信息如鉴权`auth_secret`字段。更多配置字段见[这里](https://pkg.go.dev/github.com/nsqio/go-nsq#Config)。

* formatter的配置教程[点此](/docs/formatter)进行跳转。



### OpenAPI配置日志

#### 请求参数说明

![](http://data.eolinker.com/course/n7KwItm88836440a2caf46feea1f6db55324ed57198a007.png)

#### 返回参数说明

![](http://data.eolinker.com/course/SzT1bw405b41a501a71803cbb5a12b72fb37ecbe49bf95b.png)

#### 创建NSQ输出器示例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/output' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_nsqlog",
	"driver": "nsqd",
	"config": {
		"topic": "test",
		"address": ["192.168.1.3:4150","192.168.1.4:4150","192.168.1.5:4150"],
		"nsq_conf":{
			"auth_secret":"token"
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
	"id": "demo_nsqlog@output",
	"name": "demo_nsqlog",
  "driver": "nsqd",
	"profession": "output",
  "create": "2021-12-29 12:14:22",
	"update": "2021-12-29 12:14:22"
}
```



### NSQ输出器使用

NSQ输出器可用于access-log插件的日志输出，[点此](/docs/plugins/access_log.md)跳转至access-log插件。

