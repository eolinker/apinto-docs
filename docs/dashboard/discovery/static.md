# 静态负载



### 功能描述

静态服务发现提供了服务的接入地址，方便网关在转发时进行负载均衡处理。

静态服务可选择是否进行健康检查。



**健康检查**：节点转发时若发现后端服务地址异常，节点就会在转发列表中剔除该IP，并把该IP加入到健康检查的列表中；当IP的检查结果为成功时，则会重新加入到转发列表。

### OpenAPI配置服务发现

#### 配置参数


| 参数名                 | 说明                         | 是否必填 | 默认值 | 值可能性                     |
| ---------------------- | :--------------------------- | -------- | ------ | ---------------------------- |
| name                   | 实例名                       | 是       |        | string                       |
| driver                 | 所使用的服务发现类别         | 是       |        | "static"                     |
| description            | 描述                         | 否       |        | string                       |
| scheme                 | 请求服务发现地址时使用的协议 | 否       | "http" | ["http","https]              |
| health_on              | 是否开启健康检查             | 否       | false  | bool                         |
| health                 | 健康检查配置                 | 否       |        | object                       |
| health -> scheme       | 请求协议                     | 是       |        | ["http","https","tcp","udp"] |
| health -> method       | 请求方法                     | 是       |        | string                       |
| health -> url          | 节点的健康检查接口url        | 是       |        | string                       |
| health -> success_code | 成功状态码                   | 是       |        | int                          |
| health -> period       | 健康检查周期，单位: s        | 是       |        | int                          |
| health -> timeout      | 超时时间，单位: ms           | 是       |        | int                          |



#### 返回参数说明


| 参数名      | 类型   | 是否必含 | 说明                         |
| ----------- | ------ | -------- | ---------------------------- |
| id          | string | 是       | 实例id                       |
| name        | string | 是       | 实例名                       |
| driver      | string | 是       | 驱动名                       |
| description | string | 是       | 描述                         |
| profession  | string | 是       | 模块名                       |
| create      | string | 是       | 创建时间                     |
| update      | string | 是       | 更新时间                     |
| scheme      | string | 是       | 请求服务发现地址时使用的协议 |
| health_on   | bool   | 是       | 是否开启健康检查             |
| health      | object | 是       | 健康检查配置                 |

**备注**：返回体内的health参考请求配置参数，在此不再赘述。



#### 配置带健康检查的静态服务发现

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/discovery' \
  -H 'Content-Type:application/json' \
  -d '{
  	"name": "demo_static",
	"driver": "static",
	"description": "开启健康检查的static服务发现",
	"scheme": "http",
	"health_on": true,
	"health": {
		"scheme": "http",
		"method": "GET",
		"url": "/health/check",
		"success_code": 200,
		"timeout": 3000,
		"period": 30
	}
}'
```



#### 结果示例

```json
{
	"id": "demo_static@discovery",
	"name": "demo_static",
	"driver": "static",
	"description": "开启健康检查的static服务发现",
	"profession": "discovery",
	"create": "2022-06-15 10:18:36",
	"update": "2022-06-15 10:18:36",
	"scheme": "http",  
	"health_on": true,
	"health": {
		"method": "GET",
		"period": 30,
		"scheme": "http",
		"success_code": 200,
		"timeout": 3000,
		"url": "/health/check"
	}
}
```

```
返回的discoveryID为demo_static@discovery
```



#### 创建负载

**服务发现id绑定负载**：上一步生成的服务发现id绑定至下面的discovery字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/upstream' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "static_upstream",
	"driver": "http_proxy",
	"discovery": "demo_static@discovery",
	"config": "127.0.0.1:8580 weight=1000;10.1.1.2 weight=10",
	"scheme": "http",
	"type": "round-robin"
}'
```

