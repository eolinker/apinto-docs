# nsq输出器

### 功能描述

NSQ输出器能够将特定的日志信息输出到指定nsqd的topic中.



### OpenAPI配置日志

#### 配置参数说明

| 参数名      | 值类型       | 是否必填 | 值可能性        | 默认值 | 说明                |
| ----------- | ------------ | -------- | --------------- | ------ | ------------------- |
| name        | string       | 是       |                 |        | 实例名              |
| driver      | string       | 是       | nsqd            |        | 驱动名              |
| description | string       | 否       |                 |        | 描述                |
| topic       | string       | 是       |                 |        | 所指定的topic       |
| address     | array_string | 是       |                 |        | nsqd地址列表        |
| auth_secret | string       | 否       |                 |        | nsqd的鉴权密钥      |
| nsq_conf    | object       | 否       |                 |        | nsq生产者配置       |
| type        | string       | 否       | ["line","json"] | line   | formatter的类型     |
| formatter   | object       | 是       |                 |        | formatter的输出内容 |

**注意**：

* nsq_conf配置在dashboard上不可见，仅能通过openAPI来配置。
* address参数可配置多个nsqd地址，用于负载均衡，所使用算法为轮询调度算法。同一个消息时仅会发送至其中一个nsqd。若某个nsqd连接不上，将会使用其他的nsqd进行发送。
* 若配置了auth_secret，同时nsq_conf内也配置了auth_secret, 则以nsq_conf的为准。
* nsq_conf用于生产者的配置信息，连接至address内的nsqd的所有生产者共用同一个配置。可配置的信息如鉴权`auth_secret`字段。更多配置字段见[这里](https://pkg.go.dev/github.com/nsqio/go-nsq#Config)。
* formatter的配置教程[点此](/docs/apinto/formatter/)进行跳转。



#### 返回参数说明

| 参数名      | 类型         | 是否必含 | 说明                |
| ----------- | ------------ | -------- | ------------------- |
| id          | string       | 是       | 实例id              |
| name        | string       | 是       | 实例名              |
| driver      | string       | 是       | 驱动名              |
| description | string       | 是       | 描述                |
| profession  | string       | 是       | 模块名              |
| create      | string       | 是       | 创建时间            |
| update      | string       | 是       | 更新时间            |
| topic       | string       | 是       | 所指定的topic       |
| address     | array_string | 是       | nsqd地址列表        |
| auth_secret | string       | 是       | nsqd的鉴权密钥      |
| nsq_conf    | object       | 是       | nsq生产者配置       |
| type        | string       | 是       | formatter的类型     |
| formatter   | object       | 是       | formatter的输出内容 |



#### 创建NSQ输出器示例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/output' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_nsqlog",
	"driver": "nsqd",
	"topic": "test",
	"address": ["192.168.1.3:4150", "192.168.1.4:4150", "192.168.1.5:4150"],
	"auth_secret": "auth_token",
	"nsq_conf": {
		"read_timeout": 30
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
	"address": ["192.168.1.3:4150", "192.168.1.4:4150", "192.168.1.5:4150"],
	"auth_secret": "auth_token",
	"create": "2022-06-14 17:11:00",
	"description": "",
	"driver": "nsqd",
	"formatter": {
		"fields": ["$request_id", "$request", "$status", "@time", "@proxy", "$response_time"],
		"proxy": ["$proxy_uri", "$proxy_scheme", "$proxy_addr"],
		"time": ["$msec", "$time_iso8601", "$time_local"]
	},
	"id": "demo_nsqlog@output",
	"name": "demo_nsqlog",
	"profession": "output",
	"topic": "test",
	"type": "line",
	"update": "2022-06-14 17:11:00"
}
```



### NSQ输出器使用

NSQ输出器可用于access-log插件的日志输出，[点此](/docs/apinto/plugins/access_log)跳转至access-log插件。

