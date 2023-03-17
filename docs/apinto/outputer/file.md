# 文件输出器

### 功能描述
文件输出器：将请求信息输出到日志文件中，具备以下特性：
* 自定义文件的存放目录及文件名称

* 按照一定周期分割日志文件，避免单个文件过大不好查看的问题

* 定时删除过期文件，降低硬盘空间开销



### 文件日志生命周期图解

![](http://data.eolinker.com/course/gfE3gYq468410a54454d0d778dc4f3b747f7d96598292d5.png)

### OpenAPI配置日志
#### 配置参数说明

| 参数名     | 值类型  | 是否必填 | 值可能性        | 默认值 | 说明                                      |
| ----------- | -------- | ------ | ----------------------------------------- | --------------- | --------------- |
| name        | string  | 是       |           |        | 实例名                                    |
| driver      | string | 是       | file   |        | 驱动名                                    |
| description | string | 否       |           |        | 描述                                      |
| file        | string  | 是       |           |        | 日志文件的文件名                          |
| dir         | string   | 是       |           |        | 日志文件的目录路径                        |
| period      | string | 是       | ["day","hour"]  |        | 更替日志文件的周期时间，可选day、hour其一 |
| expire      | int   | 否       |              | 3      | 旧日志文件的保存时间，单位为天            |
| type        | string  | 否       | ["line","json"] | line | formatter的类型                           |
| formatter   | object | 是       |           |        | formatter的输出内容                       |

**注意**：

* period字段：表示新建一个日志文件的周期时间，新建日志文件的同时会将旧日志文件的文件名由filename.log修改为filename-文件修改时间.log
* formatter的配置教程[点此](/docs/formatter)进行跳转



#### 返回参数说明

| 参数名      | 类型   | 是否必含 | 说明                                      |
| ----------- | ------ | -------- | ----------------------------------------- |
| id          | string | 是       | 实例id                                    |
| name        | string | 是       | 实例名                                    |
| driver      | string | 是       | 驱动名                                    |
| description | string | 是       | 描述                                      |
| profession  | string | 是       | 模块名                                    |
| create      | string | 是       | 创建时间                                  |
| update      | string | 是       | 更新时间                                  |
| file        | string | 是       | 日志文件的文件名                          |
| dir         | string | 是       | 日志文件的目录路径                        |
| period      | string | 是       | 更替日志文件的周期时间，可选day、hour其一 |
| expire      | int    | 是       | 旧日志文件的保存时间，单位为天            |
| type        | string | 是       | formatter的类型                           |
| formatter   | object | 是       | formatter的输出内容                       |



#### 创建文件输出器示例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/output' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_file",
	"driver": "file",
	"description": "示例文件输出器",

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
}'
```

#### 返回结果示例

```json
{
	"create": "2022-06-14 12:02:31",
	"description": "示例文件输出器",
	"dir": "/var/log",
	"driver": "file",
	"expire": 1,
	"file": "demo",
	"formatter": {
		"fields": ["$request_id", "$request", "$status", "@time", "@proxy", "$response_time"],
		"proxy": ["$proxy_uri", "$proxy_scheme", "$proxy_addr"],
		"time": ["$msec", "$time_iso8601", "$time_local"]
	},
	"id": "demo_file@output",
	"name": "demo_file",
	"period": "day",
	"profession": "output",
	"type": "line",
	"update": "2022-06-14 12:02:31"
}
```

### 文件输出器使用

文件输出器可用于access-log插件的日志输出，[点此](/docs/apinto/plugins/access_log.md)跳转至access-log插件。

