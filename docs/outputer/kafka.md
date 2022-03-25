# kafka输出器

### 功能描述

Kafka输出器能够将特定的日志信息输出到指定Kafka集群队列中。



#### 配置参数说明

| 参数                   | 说明                                                         | 是否必填 | 默认值 | 值可能性                          |
| ---------------------- | ------------------------------------------------------------ | -------- | ------ | --------------------------------- |
| name                   | 必填，实例名                                                 | 是       |        |                                   |
| driver                 | 必填，驱动名，填kafka_output                                 | 是       |        | kafka_output                      |
| config                 | 必填，输出器配置                                             | 是       |        |                                   |
| config->topic          | 必填，消息topic                                              | 是       |        |                                   |
| config->address        | 必填，kafka地址,多个地址用,分割                              | 是       |        | 127.0.0.1:9092,127.0.0.2:9092     |
| config->timeout        | 选填，超时时间，单位为second,默认为10秒                      | 否       | 10     |                                   |
| config->version        | 选填，使用的kafka版本，格式如：0.11.0.0，默认为最新稳定版    | 否       |        | 0.11.0.0                          |
| config->partition_type | 选填，partition的选择方式，默认采用hash，选择hash时，若partition_key为空，则采用随机选择random | 否       | hash   | [random,robin,hash,manual]        |
| config->partition      | 选填，partitionType为manual时，该项指定分区号，默认为0       | 否       | 0      | 0                                 |
| config->partition_key  | 选填，partitionType为hash时，该项指定hash值                  | 否       |        | 形如$read_ip，具体可参考formatter |
| config->type           | 选填，formatter的类型                                        | 否       | "line" | ["line","json"]                   |
| config->formatter      | 必填，formatter的输出内容                                    | 是       |        |                                   |

**注意**：

* formatter的配置教程[点此](/docs/formatter)进行跳转

### OpenAPI配置日志

#### 请求参数说明

![](http://data.eolinker.com/course/xFqhCTX0014962c9a5c249dd8b36003ac53949cde9e3229.png)

#### 返回参数说明

![](http://data.eolinker.com/course/vWNnCRf260e277847d34be26d24ade8a5539c569bb44d3c.png)

#### 创建文件输出器示例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/output' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_kafka",
	"driver": "kafka_output",
	"config": {
		"topic":"test",
		"address":"127.0.0.1:9092,127.0.0.2:9092,127.0.0.3:9092",
		"partition_type":"manual",
		"partition":0,
		"type": "line",
		"formatter": {
			"fields": ["$request_id", "$request", "$status", "@time", "@proxy", "$response_time"],
			"time": ["$msec", "$time_iso8601", "$time_local"],
			"proxy": ["$proxy_uri", "$proxy_scheme", "$proxy_addr"]
		}
	}
}
```

#### 返回结果示例

```json
{
	"create": "2021-12-24 18:27:58",
	"driver": "kafka_output",
	"id": "demo_kafka@output",
	"name": "demo_kafka",
	"profession": "output",
	"update": "2021-12-24 18:27:58"
}
```

### Kafka输出器使用

Kafka输出器可用于access-log插件的日志输出，[点此](/docs/plugins/access_log.md)跳转至access-log插件。

