# 流量控制

### 插件名称

| 名称     | 字段          | 属性     |
| -------- | ------------- | -------- |
| 流量控制 | rate_limiting | 流量管控 |

### 功能描述

设置单位时间内的最大访问次数（每秒、每分钟、每小时、每天）

### Open Api

#### 配置参数说明


| 参数名        | 值类型 | 是否必填 | 值可能性        | 默认值 | 说明                              |
| ------------- | ------ | -------- | --------------- | ------ | --------------------------------- |
| second        | int    | 是       | 10              |        | 每秒请求次数限制，为0代表不限制   |
| minute        | int    | 是       | 10              |        | 每分钟请求次数限制，为0代表不限制 |
| hour          | int    | 是       | 10              |        | 每小时请求次数限制，为0代表不限制 |
| day           | int    | 是       | 10              |        | 每天请求次数限制，为0代表不限制   |
| hide_header   | bool   | 否       | false           | false  | 请求结果是否隐藏流控信息          |
| response_type | string | 是       | ["text","json"] |        | 插件返回报错的类型                |


#### 配置示例

```json
{
    "second": 10, 
    "minute": 50, 
    "hour": 100, 
    "day": 1000,
    "hide_header": false,
    "response_type":"text"
}
```

注：”second”:0，参数值传 0 视为不配置该单位的访问量；相应参数值缺省同样视为不配置该单位的访问量。

#### Open API请求配置示例

##### 全局配置

在使用流量控制插件之前，需要在全局插件配置中将name为rate_limiting的插件状态设置为enable，具体配置点此[跳转](/docs/apinto/plugins/)

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:rate_limiting",
        "name":"my_rate_limiting",
        "status":"enable"
    }]
}'
```

##### 配置带有流量控制插件的服务

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```sh
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' \
-d '{
  "name": "rate_limiting_service",
  "driver": "http",
  "timeout": 3000,
  "retry": 3,
  "description": "使用流控插件",
  "scheme": "https",
  "nodes": ["demo.apinto.com:8280"],
  "balance": "round-robin",
  "plugins": {
	"my_rate_limiting": {
	  "disable": false,
	  "config": {
	   "second": 5,
       "minute": 10
	  }
	}
  }
}' 
```

```
成功创建id为rate_limiting_service@service的服务
```

##### 绑定路由

将上一步生成的服务id绑定至路由的target字段

```sh
curl -X POST 'http://127.0.0.1:9400/api/router' -H 'Content-Type:application/json' \
-d '{
  "name": "rate_limiting_service_router",
  "driver": "http",
  "description": "该路由的目标服务使用了流控插件",
  "listen": 8099,
  "rules": [{
	"location": "/demo/rate_limiting_service"
  }],
  "target": "rate_limiting_service@service"
}'
```

##### 接口请求示例

```sh
curl -X POST 'http://127.0.0.1:8099/demo/rate_limiting_service' -H 'Content-Type:application/json'
```

##### 接口访问返回示例

当hide_header设为false时会在返回结果头部信息中添加流控相关信息，如：

```
X-RateLimit-Limit-Second: 5
X-RateLimit-Remaining-Second: 4
X-RateLimit-Limit-Minute: 10
X-RateLimit-Remaining-Minute: 9
```

