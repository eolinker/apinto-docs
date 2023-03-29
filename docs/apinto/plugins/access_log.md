# access-log
### 插件信息

| 名称       | 字段       | 属性     |
| ---------- | ---------- | -------- |
| access-log | access_log | 可观测性 |

### 功能描述

能够记录到达网关的http请求的访问日志，通过配置的输出器将筛选后的信息输出到特定的地方。

**备注**：输出器的教程[点此](/docs/apinto/outputer/file.md)进行跳转。

#### 配置参数说明

| 参数名 | 说明         | 是否必填 | 默认值 | 值可能性     |
| ------ | ------------ | -------- | ------ | ------------ |
| output | 输出器id数组 | 是       |        | string_array |

#### Open API 请求示例

##### 配置输出器（以文件输出器为例）

```shell
curl -X POST 'http://127.0.0.1:9400/api/output' -H 'Content-Type:application/json' \
-d '{
  "name": "demo_file",
  "driver": "file",
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

返回的输出器id为`demo_file@output`

**output示例说明**：访问日志将输出到`/var/log`目录下的`demo.log`文件，每天生成一个新的日志文件，旧日志文件保留一天后删除。日志格式为line，输出的变量如配置所示。

##### 全局配置

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:access_log",
        "name":"my_access_log",
        "status":"enable"
    }]
}'
```



##### 配置带有access-log插件的服务

全局插件具体配置点此进行[跳转](/docs/apinto/plugins)。

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  'http://127.0.0.1:9400/api/service' \
-H 'Content-Type:application/json' \
-d '{
  "name": "access_log_service",
  "driver": "http",
  "timeout": 3000,
  "retry": 3,
  "scheme": "http",
  "nodes": ["demo.apinto.com:8280"],
  "balance": "round-robin",
  "plugins": {
    "my_access_log": {
    "disable": false,
    "config": {
      "output": ["demo_file@output"]
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
    "name":"access_log_router",
    "driver":"http",
    "listen":8099,
    "location":"/demo/access_log",
    "target":"access_log_service@service"
}'
```



##### 接口请求示例

```shell
curl -i -X GET 'http://127.0.0.1:8099/demo/access_log'
```



##### 访问日志示例

```text
a72e12f9-e33a-4425-b7c2-7e48b0b598bf    GET /demo HTTP/1.1      200     "1640601794 2021-12-27T18:43:14.294+08:00 2021-12-27 18:43:14"  "http://demo.apinto.com:8280/demo http demo.apinto.com:8280"  1389
```
