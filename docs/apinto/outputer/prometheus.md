# prometheus输出器

### 功能描述
能够配置多个自定义的prometheus指标来收集请求的相关信息，向外部的Prometheus应用提供指标的收集接口。

具备以下特性：

* 包含请求总数,请求耗时等九种收集类型
* 可自定义指标的收集数据的类型
* 可自定义指标的标签

![](http://data.eolinker.com/course/SzH5uvD5d1ff324a3bbc709314036e59b89bb6dad3cd17b.png)

### OpenAPI配置日志
#### 配置参数说明

| 参数名     | 值类型 | 是否必填 | 值可能性        | 默认值 | 说明                                      |
| ----------- | ----------------------------------------- | ------ | :------- | --------------- | --------------- |
| name        | string  | 是       |           |        | 实例名                                    |
| driver      | string | 是       | prometheus |        | 驱动名                                    |
| description | string | 否       |           |        | 描述                                      |
| scopes   | array_string | 否       |  |        | 作用域                                    |
| path     | string | 是       |           |        | Metrics请求路径            |
| metrics | array_object | 是       |  |        | 指标列表                                  |
| metrics->metric | string | 是     |                                                        |     | 指标名       |
| metrics->description | string | 是      | ["line","json"] |  | 指标描述                         |
| metrics->collector | string | 是       | 可选其一：["request_total","request_timing","request_retry","request_req","request_resp","proxy_total","proxy_timing","proxy_req","proxy_resp"] |        | 收集类型     |
| metrics->objectives | string | 否 |  | "0.5:0.05,0.9:0.01,0.99:0.001" | quantiles分位数值配置,每个quantile用,分隔 |
| metrics->labels | array_string | 是 |  | | 标签列表 |

**备注**：

* 同一输出器下，指标名`metric`不可重复

* 不同输出器下，Metrics请求路径`path`不可重复

* 多个指标可以配置相同的收集类型`collector`

* quantiles分位数值配置`objectives`: 当收集类型所对应prometheus指标类型为Summary时生效

  

##### 收集类型配置说明

| 收集类型       | 类型说明                | 对应的prometheus指标类型 |
| -------------- | ----------------------- | ------------------------ |
| request_total  | 请求总数                | Counter                  |
| request_timing | 请求耗时                | Summary                  |
| request_retry  | 请求重试次数            | Summary                  |
| request_req    | 请求的request_body大小  | Summary                  |
| request_resp   | 请求的response_body大小 | Summary                  |
| proxy_total    | 转发总数                | Counter                  |
| proxy_timing   | 转发耗时                | Summary                  |
| proxy_req      | 转发的request_body大小  | Summary                  |
| proxy_resp     | 转发的response_body大小 | Summary                  |



##### 标签列表配置说明

标签列表用于配置指标的标签信息，单个标签的配置可指定标签名和标签值所指定的值。标签名可用`as`进行指定，标签值可以用常量和变量，变量用$表示。

示例如下：

| 标签配置              | 配置说明                                      | 标签名     | 标签值  |
| --------------------- | --------------------------------------------- | ---------- | ------- |
| $status               | 取变量 请求状态码                             | status     | $status |
| $status as req_status | 取变量 请求状态码，并且标签名取别名req_status | req_status | $status |
| apinto                | 使用常量apinto                                | apinto     | apinto  |
| apinto as program     | 使用常量apinto，并且标签名取别名program       | program    | apinto  |

##### 标签变量取值范围

变量可取范围如下:

* **应用的标签**：比如某个应用配置了key为`app_label`，value为`test`的标签，当请求通过了这个应用，使用$app_label作为标签配置就能获取test作为指标的标签值。
* **系统可用值**:  系统可用值的字段前加$即可取系统可用值。**注意**：由于一次请求可能会有多次转发，`proxy_`开头的收集类型，若要获取当次转发的相关信息则使用`proxy_`开头的系统可用值。而`request_`开头的收集类型,使用`proxy_`开头的系统可用值会获取最后一次转发的信息。
* **内置标签**：
  * $**api**: 该请求命中的路由名
  * $**service**: 该请求命中的服务名
  * $**application**: 该请求命中的应用名
  * $**handler**:内容处理器，标示响应内容由什么模块处理的，如正常转发为 proxy，如果是熔断是 fuse，如果是缓存，则是 cache



**系统可用值的教程**[点此](/docs/formatter/#系统可用值)进行跳转



#### 返回参数说明

| 参数名               | 类型         | 是否必含 | 说明                                      |
| -------------------- | ------------ | -------- | ----------------------------------------- |
| id                   | string       | 是       | 实例id                                    |
| name                 | string       | 是       | 实例名                                    |
| driver               | string       | 是       | 驱动名                                    |
| description          | string       | 是       | 描述                                      |
| profession           | string       | 是       | 模块名                                    |
| create               | string       | 是       | 创建时间                                  |
| update               | string       | 是       | 更新时间                                  |
| scopes               | array_string | 是       | 作用域                                    |
| path                 | string       | 是       | Metrics请求路径                           |
| metrics              | array_object | 是       | 指标列表                                  |
| metrics->metric      | string       | 是       | 指标名                                    |
| metrics->description | string       | 是       | 指标描述                                  |
| metrics->collector   | string       | 是       | 收集类型                                  |
| metrics->objectives  | string       | 是       | quantiles分位数值配置,每个quantile用,分隔 |
| metrics->labels      | array_string | 是       | 标签列表                                  |



#### 创建prometheus输出器示例

```shell
curl -X POST 'http://127.0.0.1:9400/api/output' -H 'Content-Type:application/json' \
-d '{
	"name": "test_prometheus",
	"driver": "prometheus",
	"description": "test_prometheus",
	"scopes": ["prometheus"],
	"path": "/test",
	"metrics": [{
		"metric": "apinto_request_total",
		"collector": "request_total",
		"description": "request_total description",
		"labels": ["$status as request_status", "apinto as program", "$api", "$service"],
		"objectives": ""
	}]
}'
```

**示例说明**：prometheus实际拉取的metrics请求路径为`/apinto/test`(默认在配置的路径前加上/apinto/)，配置指标名为`apinto_request_total`，采集request_total请求总数。

指标配置的标签分别为:

| 标签名         | 标签值                               |
| -------------- | ------------------------------------ |
| request_status | $status 表示取变量请求状态码         |
| program        | 常量apinto                           |
| api            | $api表示取变量  `该请求的路由名`     |
| service        | $service表示取变量  `该请求的服务名` |



#### 返回结果示例

```json
{
    "id": "test_prometheus@output",
    "name": "test_prometheus",
    "description": "test_prometheus",
    "profession": "output",
    "driver": "prometheus",
    "scopes": [
        "prometheus"
    ],
    "path": "/test",
    "metrics": [
        {
            "collector": "request_total",
            "description": "request_total description",
            "labels": [
                "$status as request_status",
                "apinto as program",
                "$api",
                "$service"
            ],
            "metric": "apinto_request_total",
            "objectives": ""
        }
    ],
    "create": "2023-02-24 10:26:14",
    "update": "2023-02-24 10:26:14"
}
```

### prometheus输出器使用

![](http://data.eolinker.com/course/eUCrM7n00732bf46a30d528853f7da77273d513639e8fe5.png)

通过prometheus插件绑定prometheus输出器，输出器能够接收并处理来自prometheus插件的相关指标信息。外部的Prometheus应用调用输出器配置的metrics路径即可获取收集的指标信息。

[点此](/docs/apinto/plugins/prometheus.md)跳转至prometheus插件。

