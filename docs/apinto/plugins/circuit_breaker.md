# API熔断
### 插件信息

| 名称    | 字段            | 属性     |
| ------- | --------------- | -------- |
| API熔断 | circuit_breaker | 响应机制 |

### 功能描述

1. 设定熔断（判断API为不可用状态）的状态码（match_codes），达到熔断条件后网关停止对该API的转发。
2. 设定熔断开启时的返回值。

熔断的条件为：

- 监控期（monitor_period）内的请求错误率（failure_percent）达到预设的值，并且该监控期内的请求总数超过最低熔断阀值（minimum_requests），则进入熔断期（break_period）；
- 熔断期网关会停止转发该API，此时网关返回熔断开启时的返回值；
- 熔断期过后，接口进入半开放状态，网关重新对该API进行转发，此时会根据连续请求成功次数（success_counts）来判断下一个状态：
  （1）若连续请求成功次数达到预设值，则熔断关闭，网关完全开放转发，重新进入到下一个监控期；
  （2）若连续请求成功次数没有达到预设值，则进入到下一个熔断期。

注：熔断机制中的连续请求成功次数（success_counts）指的是 **熔断状态码** 除外的请求数。

### Open Api

#### 配置示例

**示例说明**：当响应状态码为404或504时，判断为失败的请求。若300秒内总请求数 >= 5次，且请求失败率（失败请求数/总次数）>= 50%， 则api进入熔断状态30秒，期间接受到的请求直接返回，并且响应状态码重写201，响应头部新增`"demo": "1"`, 响应体body重写为`{已熔断}`。30秒后进入半开放状态，连续3次成功请求才进入健康状态，否则请求失败一次也会重新进入熔断状态。

```json
{
	"match_codes": "404,504",
	"monitor_period": 300,
	"minimum_requests": 5,
	"failure_percent": 0.5,
	"break_period": 30,
	"success_counts": 3,
	"breaker_code": 201,
	"headers": {
		"demo": "1"
	},
	"body": "{已熔断}"
}
```

#### 配置参数说明

| 参数名           | 说明                                                         | 是否必填 | 默认值 | 值可能性       |
| ---------------- | ------------------------------------------------------------ | -------- | ------ | -------------- |
| match_codes      | 熔断匹配状态码                                               | 是       |        | string         |
| monitor_period   | 监控期，单位为秒                                             | 否       | 30     | int            |
| minimum_requests | 最低熔断阀值，达到熔断状态的最少请求次数                     | 是       |        | int            |
| failure_percent  | 监控期内的请求错误率                                         | 是       |        | float64，(0,1] |
| break_period     | 熔断期，单位为秒                                             | 否       | 30     | int            |
| success_counts   | 连续请求成功次数，半开放状态下请求成功次数达到后会转变成健康状态 | 是       |        | int            |
| breaker_code     | 熔断状态下返回的响应状态码, 闭区间范围为[200,599]            | 是       |        | int            |
| headers          | 熔断状态下新增的返回头部值                                   | 否       |        | object         |
| body             | 熔断状态下的返回响应体                                       | 否       |        | string         |

**注意事项**：

* headers配置参数是对响应头部信息的新增或修改。



**响应信息**

插件开启，每次均会在响应信息中新增三个头部：

* Fail-Counts ：失败请求次数
* Success-Counts ： 成功请求次数
* Monitor-Info： 监控信息
  * circuit_breaker_state： 熔断状态  0熔断关闭 1熔断开启 2半开放状态
  * recovering_success_counts：  半开放状态下连续请求成功次数
  * start_time：监控期开始时间
  * trip_time： 跳闸开始时间，即熔断开始时间
  * success_counts： 成功请求次数
  * fail_counts：失败请求次数



#### Open API 请求示例

##### 全局配置

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:circuit_breaker",
        "name":"my_circuit_breaker",
        "status":"enable"
    }]
}'
```

##### 配置带有API熔断插件的service服务

**配置说明**：见上面的配置示例。

全局插件具体配置点此进行[跳转](/docs/apinto/plugins)。

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' -d '{
    "name": "circuit_breaker_service",
    "driver": "http",
    "timeout": 3000,
    "retry": 3,
    "scheme": "http",
    "nodes": ["demo-apinto.eolink.com:8280"],
    "balance": "round-robin",
    "plugins": {
        "my_circuit_breaker":{
            "disable": false,
            "config":{
                "match_codes": "404,504",
                "monitor_period": 300,
                "minimum_requests": 5,
                "failure_percent": 0.5,
                "break_period": 30,
                "success_counts": 3,
                "breaker_code": 201,
                "headers": {
                    "demo": "1"
                },
                "body": "{已熔断}"
            }
        }
    }
}' 
```

##### 绑定路由

```shell
curl -X POST  'http://127.0.0.1:9400/api/router' \
-H 'Content-Type:application/json' \
-d '{
    "name":"circuit_breaker_router",
    "driver":"http",
    "listen":8099,
    "rules":[{
        "location":"/demo/circuit_breaker"
    }],
    "target":"circuit_breaker_service@service"
}'
```

##### 接口请求示例

```shell
curl -i -X GET 'http://127.0.0.1:8099/demo/circuit_breaker' -H 'Content-Type:application/json'
```

##### 接口访问返回示例

```text
HTTP/1.1 200 OK
Server: fasthttp
Date: Mon, 13 Dec 2021 04:08:01 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 262
Fail-Counts: 0
Success-Counts: 1
Monitor-Info: {"circuit_breaker_state":0,"fail_counts":0,"success_counts":1,"trip_time":1639368480,"start_time":1639368480,"recovering_success_counts":0}

....
```