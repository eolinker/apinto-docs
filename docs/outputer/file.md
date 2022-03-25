# 文件输出器

### 功能描述

文件输出器能够将特定的日志信息输出到指定目录下的文件。



#### 配置参数说明

| 参数              | 说明                                            | 是否必填 | 默认值 | 值可能性        |
| ----------------- | ----------------------------------------------- | -------- | ------ | --------------- |
| name              | 必填，实例名                                    | 是       |        | string          |
| driver            | 必填，驱动名，填file_output                     | 是       |        | string          |
| config            | 必填，输出器配置                                | 是       |        | object          |
| config->file      | 必填，日志文件的文件名                          | 是       |        | string          |
| config->dir       | 必填，日志文件的目录路径                        | 是       |        | string          |
| config->period    | 必填，更替日志文件的周期时间，可选day、hour其一 | 是       |        | ["day","hour"]  |
| config->expire    | 选填，旧日志文件的保存时间，单位为天            | 否       | 3      | int             |
| config->type      | 选填，formatter的类型                           | 否       | "line" | ["line","json"] |
| config->formatter | 必填，formatter的输出内容                       | 是       |        | object          |

**注意**：

* period字段：表示新建一个日志文件的周期时间，新建日志文件的同时会将旧日志文件的文件名由filename.log修改为filename-文件修改时间.log
* formatter的配置教程[点此](/docs/formatter)进行跳转



### 文件日志过程图解

![](http://data.eolinker.com/course/gfE3gYq468410a54454d0d778dc4f3b747f7d96598292d5.png)

### OpenAPI配置日志

#### 请求参数说明

![](http://data.eolinker.com/course/DaCvQiM5d2fd9d5b89302c1e8066219b013596ff81d8cf6.png)

#### 返回参数说明

![](http://data.eolinker.com/course/vWNnCRf260e277847d34be26d24ade8a5539c569bb44d3c.png)

#### 创建文件输出器示例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/output' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_file",
	"driver": "file_output",
	"config": {
		"dir": "/var/log",
		"file": "demo",
		"period": "day",
		"expire": 1,
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
	"create": "2021-12-24 18:27:58",
	"driver": "file_output",
	"id": "demo_file@output",
	"name": "demo_file",
	"profession": "output",
	"update": "2021-12-24 18:27:58"
}
```

### 文件输出器使用

文件输出器可用于access-log插件的日志输出，[点此](/docs/plugins/access_log.md)跳转至access-log插件。

