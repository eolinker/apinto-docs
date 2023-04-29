# prometheus
### 插件信息

| 名称           | 字段       | 属性     |
| -------------- | ---------- | -------- |
| prometheus插件 | prometheus | 可观测性 |

### 功能描述

通过给路由配置该插件，当请求到达网关时，能够将请求的信息和配置的指标列表发送给指定的prometheus输出器，由各个prometheus输出器内同名的指标处理并采集请求内的信息。

![](http://data.eolinker.com/course/eUCrM7n00732bf46a30d528853f7da77273d513639e8fe5.png)

**备注**：输出器的教程[点此](/docs/apinto/outputer/prometheus)进行跳转。

#### 配置参数说明

| 参数名  | 值类型       | 是否必填 | 值可能性 | 默认值 | 说明                   |
| ------- | ------------ | -------- | -------- | ------ | ---------------------- |
| metrics | string_array | 是       |          |        | 指标列表               |
| output  | string_array | 否       |          |        | prometheus输出器id数组 |

当output为空，将会使用作用域包含`prometheus`的prometheus输出器作为ouput。



#### Open API 请求示例

##### 配置prometheus输出器

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

返回的输出器id为`test_prometheus@output`

**示例说明**：prometheus实际拉取的metrics路径为`/apinto/test`(默认在配置的路径前加上/apinto/)，配置指标名为`apinto_request_total`，采集request_total请求总数。
指标配置的标签分别为:

| 标签名         | 标签值                               |
| -------------- | ------------------------------------ |
| request_status | $status 表示取变量请求状态码         |
| program        | 常量apinto                           |
| api            | $api表示取变量  `该请求的路由名`     |
| service        | $service表示取变量  `该请求的服务名` |


##### 全局配置

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:prometheus",
        "name":"prometheus_plugin",
        "status":"enable"
    }]
}'
```

全局插件具体配置点此进行[跳转](/docs/apinto/plugins/)。



##### 配置带有prometheus插件的路由

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST 'http://127.0.0.1:9400/api/router' -H 'Content-Type:application/json' \
-d '{
"name": "prometheus_router",
"driver": "http",
"description": "",
"listen": 8099,
"method": ["GET", "POST", "PUT"],
"host": [],
"location": "/test",
"rules": [],
"service": "test_prometheus@service",
"template": "",
"websocket": false,
"disable": false,
"plugins": {
  "prometheus_plugin": {
    "disable": false,
    "config": {
      "metrics": ["apinto_request_total"],
      "output": ["test_prometheus@output"]
     }
    }
  },
"retry": 0,
"time_out": 200000
}'
```



##### 路由请求示例

```shell
curl -i -X GET 'http://127.0.0.1:8099/test'
```



##### 查看test_prometheus输出器的指标信息

```bash
curl -i -X GET 'http://127.0.0.1:9400/apinto/test'
```

```
# HELP apinto_request_total request_total description
# TYPE apinto_request_total counter
apinto_request_total{api="prometheus_router",program="apinto",request_status="504",service="test_prometheus"} 1
# HELP promhttp_metric_handler_requests_in_flight Current number of scrapes being served.
# TYPE promhttp_metric_handler_requests_in_flight gauge
promhttp_metric_handler_requests_in_flight 1
# HELP promhttp_metric_handler_requests_total Total number of scrapes by HTTP status code.
# TYPE promhttp_metric_handler_requests_total counter
promhttp_metric_handler_requests_total{code="200"} 1
promhttp_metric_handler_requests_total{code="500"} 0
promhttp_metric_handler_requests_total{code="503"} 0
```

