# kafka输出器

### 功能描述

Kafka输出器能够将特定的日志信息输出到指定Kafka集群队列中。


### OpenAPI配置日志

#### 配置参数说明

| 参数名         | 值类型 | 是否必填 | 值可能性                           | 默认值 | 说明                                                         |
| -------------- | ------ | -------- | ---------------------------------- | ------ | ------------------------------------------------------------ |
| name           | string | 是       |                                    |        | 实例名                                                       |
| driver         | string | 是       | kafka_output                       |        | 驱动名                                                       |
| description    | string | 是       |                                    |        | 描述                                                         |
| topic          | string | 是       |                                    |        | 消息topic                                                    |
| address        | string | 是       | "127.0.0.1:9092,127.0.0.2:9092"    |        | kafka地址,多个地址用,分割                                    |
| timeout        | int    | 否       |                                    | 10     | 超时时间，单位为second                                       |
| version        | string | 否       | "0.11.0.0"                         |        | 使用的kafka版本，格式如：0.11.0.0，默认为最新稳定版          |
| partition_type | string | 否       | ["random","robin","hash","manual"] | hash   | partition的选择方式，默认采用hash，选择hash时，若partition_key为空，则采用随机选择random |
| partition      | int    | 否       |                                    | 0      | partitionType为manual时，该项指定分区号                      |
| partition_key  | string | 否       | 形如$read_ip，具体可参考formatter  |        | partitionType为hash时，该项指定hash值                        |
| type           | string | 否       | ["line","json"]                    | line   | formatter的类型                                              |
| formatter      | object | 是       |                                    |        | formatter的输出内容                                          |

**注意**：

* formatter的配置教程[点此](/docs/formatter)进行跳转



#### 返回参数说明

| 参数名         | 类型   | 是否必含 | 说明                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------ |
| id             | string | 是       | 实例id                                                       |
| name           | string | 是       | 实例名                                                       |
| driver         | string | 是       | 驱动名                                                       |
| description    | string | 是       | 描述                                                         |
| profession     | string | 是       | 模块名                                                       |
| create         | string | 是       | 创建时间                                                     |
| update         | string | 是       | 更新时间                                                     |
| topic          | string | 是       | 消息topic                                                    |
| address        | string | 是       | kafka地址,多个地址用,分割                                    |
| timeout        | int    | 是       | 超时时间，单位为second                                       |
| version        | string | 是       | 使用的kafka版本，格式如：0.11.0.0，为空则默认为最新稳定版    |
| partition_type | string | 是       | partition的选择方式，默认采用hash，选择hash时，若partition_key为空，则采用随机选择random |
| partition      | int    | 是       | partitionType为manual时，该项指定分区号                      |
| partition_key  | string | 是       | partitionType为hash时，该项指定hash值                        |
| type           | string | 是       | formatter的类型                                              |
| formatter      | object | 是       | formatter的输出内容                                          |



#### 创建文件输出器示例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/output' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_kafka",
	"driver": "kafka_output",
	"topic": "test",
	"address": "127.0.0.1:9092,127.0.0.2:9092,127.0.0.3:9092",
	"partition_type": "manual",
	"partition": 0,
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
	"create": "2022-06-14 17:11:00",
	"driver": "kafka_output",
	"id": "demo_kafka@output",
	"name": "demo_kafka",
	"description": "",
	"profession": "output",
	"update": "2022-06-14 17:11:00",
	"topic": "test",
	"address": "127.0.0.1:9092,127.0.0.2:9092,127.0.0.3:9092",
	"partition_type": "manual",
	"partition": 0,
	"timeout": 0,
	"version": "",
	"partition_key": "",
	"type": "line",
	"formatter": {
		"fields": ["$request_id", "$request", "$status", "@time", "@proxy", "$response_time"],
		"proxy": ["$proxy_uri", "$proxy_scheme", "$proxy_addr"],
		"time": ["$msec", "$time_iso8601", "$time_local"]
	}
}
```

### Kafka输出器使用

Kafka输出器可用于access-log插件的日志输出，[点此](/docs/apinto/plugins/access_log.md)跳转至access-log插件。

