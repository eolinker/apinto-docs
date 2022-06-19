# syslog输出器

### 功能描述

syslog输出器能够将程序运行中产生的日志内容输出远端的syslog服务器。



#### 配置参数说明

| 参数              | 说明                              | 是否必填 | 默认值 | 值可能性                                          |
| ----------------- | --------------------------------- | -------- | ------ | ------------------------------------------------- |
| name              | 实例名                            | 是       |        |                                                   |
| driver            | 驱动名，填syslog_output           | 是       |        | syslog_output                                     |
| config            | 输出器配置                        | 是       |        |                                                   |
| config->network   | 所使用的网络协议, 如:tcp,udp,unix | 是       |        | tcp,udp,unix                                      |
| config->address   | 远端syslog服务器的地址            | 是       |        | string                                            |
| config->level     | 日志等级                          | 否       |        | ["error","warn","warning","info","debug","trace"] |
| config->type      | formatter的类型                   | 否       | "line" | ["line","json"]                                   |
| config->formatter | formatter的输出内容               | 是       |        | object                                            |

**注意**：

* formatter的配置教程[点此](/docs/formatter)进行跳转

### OpenAPI配置日志

#### 请求参数说明

![](http://data.eolinker.com/course/SJ3rbmhbc753a96cb1d1064aef75f82f0882e8cb4ccf95c.png)

#### 返回参数说明

![](http://data.eolinker.com/course/vWNnCRf260e277847d34be26d24ade8a5539c569bb44d3c.png)

#### 创建syslog输出器示例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/output' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_syslog",
	"driver": "syslog_output",
	"config": {
		"network":"tcp",
		"address":"127.0.0.1:514",
		"level":"info",
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
	"create": "2022-01-25 15:35:36",
	"driver": "syslog_output",
	"id": "demo_syslog@output",
	"name": "demo_syslog",
	"profession": "output",
	"update": "2022-01-25 15:35:36"
}
```

### syslog输出器使用

syslog输出器可用于access-log插件的日志输出，[点此](/docs/plugins/access_log.md)跳转至access-log插件。

