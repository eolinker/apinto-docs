# HTTP 负载



| 类别 | 属性     |
| ---- | -------- |
| 负载 | 负载均衡 |



### 功能描述

负责将请求转发到支持http/https的上游服务器。



### 配置流程

![](http://data.eolinker.com/course/AiX447s253dce90bc147b241e103d8d72360a69ccbce563.png)

### 负载均衡算法

暂只支持轮询调度算法



### 支持的服务发现

支持consul、nacos、eureka及静态服务发现。

服务发现配置教程[点此](/docs/apinto/discovery)进行跳转

### OpenAPI配置负载

#### 请求参数说明


| 参数名      | 说明                                      | 是否必填 | 默认值 | 值可能性        |
| ----------- | :---------------------------------------- | -------- | ------ | --------------- |
| name        | 实例名                                    | 是       |        | string          |
| driver      | 负载类别                                  | 是       |        | "http_proxy"    |
| description | 描述                                      | 否       |        | string          |
| scheme      | 请求服务发现所使用的协议                  | 是       |        | ["http","https"] |
| type        | 负载均衡算法,暂只支持round-robin          | 是       |        | ["round-robin"] |
| discovery   | 服务发现ID                                | 是       |        | string          |
| config      | 负载配置，所填内容依据discovery字段而定。 | 是       |        | string          |

**config参数配置说明**：负载配置，具体格式根据所使用的服务发现类型而定。

- 若使用nacos，consul，eureka配置中心，discovery字段填配置中心内的服务名。
- 若使用静态服务发现，则配置填入静态接入地址及其权重，格式为：**addr1 weight1;addr2 weight2;**  不同地址之间用分号进行分割。



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
| scheme      | string | 是       | 请求服务发现所使用的协议                  |
| type        | string | 是       | 服务发现配置                              |
| discovery   | string | 是       | 服务发现ID                                |
| config      | string | 是       | 负载配置，所填内容依据discovery字段而定。 |





#### 配置静态服务发现的负载

##### 配置不带健康检查的静态服务发现

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/discovery' \
  -H 'Content-Type:application/json' \
  -d '{
  	"name": "static_no_health",
	"driver": "static",
	"scheme": "http",
	"health_on": false
}'
```

```
返回的discoveryID为static_no_health@discovery
```



##### 新增负载，上一步返回的服务发现id作为配置负载的discovery字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/upstream' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "static_upstream",
	"driver": "http_proxy",
	"discovery": "static_no_health@discovery",
	"config": "127.0.0.1:8580 weight=1000;10.1.1.2 weight=10",
	"scheme": "http",
	"type": "round-robin"
}'
```

##### 结果示例

```json
{
	"config": "127.0.0.1:8580 weight=1000;10.1.1.2 weight=10",
	"create": "2022-06-15 10:24:35",
	"description": "",
	"discovery": "static_no_health@discovery",
	"driver": "http_proxy",
	"id": "static_upstream@upstream",
	"name": "static_upstream",
	"profession": "upstream",
	"scheme": "http",
	"type": "round-robin",
	"update": "2022-06-15 10:24:35"
}
```

返回的upstreamID为`static_upstream@upstream`，填写入服务配置中的`upstream`配置。



#### 配置动态服务发现的负载

##### 以配置consul为例配置动态服务发现

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/discovery' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_consul",
	"driver": "consul",
	"scheme": "http",
	"config": {
		"address": ["127.0.0.1:8501", "127.0.0.1:8500"],
		"params": {
			"token": "a92316d8-5c99-4fa0-b4cd-30b9e66718aa",
			"namespace": "default"
		}
	}
}'
```

```shell
返回的discoveryID为demo_consul@discovery
```

##### 新增负载，上一步返回的服务发现id作为配置负载的discovery字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/upstream' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "consul_upstream",
	"driver": "http_proxy",
	"discovery": "demo_consul@discovery",
	"config": "consulService",
	"scheme": "http",
	"type": "round-robin"
}'
```



##### 结果示例

```json
{
	"config": "consulService",
	"create": "2022-06-15 14:39:23",
	"description": "",
	"discovery": "demo_consul@discovery",
	"driver": "http_proxy",
	"id": "consul_upstream@upstream",
	"name": "consul_upstream",
	"profession": "upstream",
	"scheme": "http",
	"type": "round-robin",
	"update": "2022-06-15 14:39:23"
}
```

返回的upstreamID为`consul_upstream@upstream`，填写入服务配置中的`upstream`配置。

