# syslog输出器

### 功能描述

syslog输出器能够将程序运行中产生的日志内容输出远端的syslog服务器。



### OpenAPI配置日志

#### 配置参数说明

| 参数        | 说明                              | 是否必填 | 默认值 | 值可能性                                |
| ----------- | --------------------------------- | -------- | ------ | --------------------------------------- |
| name        | 实例名                            | 是       |        | string                                  |
| driver      | 驱动名                            | 是       |        | "syslog_output"                         |
| description | 描述                              | 否       |        | string                                  |
| network     | 所使用的网络协议, 如:tcp,udp,unix | 是       |        | ["tcp","udp","unix"]                    |
| address     | 远端syslog服务器的地址            | 是       |        | string                                  |
| level       | 日志等级                          | 否       |        | ["error","warn","info","debug","trace"] |
| type        | formatter的类型                   | 否       | "line" | ["line","json"]                         |
| formatter   | formatter的输出内容               | 是       |        | object                                  |

**注意**：

* formatter的配置教程[点此](/docs/formatter)进行跳转



#### 返回参数说明

| 参数名      | 类型   | 是否必含 | 说明                              |
| ----------- | ------ | -------- | --------------------------------- |
| id          | string | 是       | 实例id                            |
| name        | string | 是       | 实例名                            |
| driver      | string | 是       | 驱动名                            |
| description | string | 是       | 描述                              |
| profession  | string | 是       | 模块名                            |
| create      | string | 是       | 创建时间                          |
| update      | string | 是       | 更新时间                          |
| network     | string | 是       | 所使用的网络协议, 如:tcp,udp,unix |
| address     | string | 是       | 远端syslog服务器的地址            |
| level       | string | 是       | 日志等级                          |
| type        | string | 是       | formatter的类型                   |
| formatter   | object | 是       | formatter的输出内容               |



#### 创建syslog输出器示例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/output' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_syslog",
	"driver": "syslog_output",
	"network": "tcp",
	"address": "127.0.0.1:514",
	"level": "info",
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
	"address": "127.0.0.1:514",
	"create": "2022-06-14 14:56:15",
	"description": "",
	"driver": "syslog_output",
	"formatter": {
		"fields": ["$request_id", "$request", "$status", "@time", "@proxy", "$response_time"],
		"proxy": ["$proxy_uri", "$proxy_scheme", "$proxy_addr"],
		"time": ["$msec", "$time_iso8601", "$time_local"]
	},
	"id": "demo_syslog@output",
	"level": "info",
	"name": "demo_syslog",
	"network": "tcp",
	"profession": "output",
	"type": "line",
	"update": "2022-06-14 14:56:15"
}
```



### syslog输出器使用

syslog输出器可用于access-log插件的日志输出，[点此](/docs/apinto/plugins/access_log.md)跳转至access-log插件。

