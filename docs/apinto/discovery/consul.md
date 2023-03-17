# Consul

### 功能描述

Consul服务发现为网关动态地提供了服务的接入地址，网关可以基于这些地址进行负载均衡处理。

Consul注册中心自带健康检查，从该注册中心获取节点时可以获取到稳定健康的节点。



### OpenAPI配置服务发现

#### 请求参数说明


| 参数名                                | 值类型       | 是否必填 | 值可能性        | 默认值 | 说明                                                         |
| ------------------------------------- | ------------ | -------- | --------------- | ------ | :----------------------------------------------------------- |
| name                                  | string       | 是       |                 |        | 实例名                                                       |
| driver                                | string       | 是       | consul          |        | 所使用的服务发现驱动                                         |
| description                           | string       | 否       |                 |        | 描述                                                         |
| scheme(**已废弃，apinto版本0.7.0起**) | string       | 否       | ["http","https] | http   | 请求服务发现地址时使用的协议                                 |
| config                                | object       | 是       |                 |        | 服务发现配置                                                 |
| config-> address                      | array_string | 是       |                 |        | nacos地址列表                                                |
| config-> params                       | object       | 是       |                 |        | 参数信息,如{"token":"XXX","namespace":"default","username":"XXX","password":"xxx"} |



#### 返回参数说明


| 参数名                                | 类型   | 是否必含 | 说明                         |
| ------------------------------------- | ------ | -------- | ---------------------------- |
| id                                    | string | 是       | 实例id                       |
| name                                  | string | 是       | 实例名                       |
| driver                                | string | 是       | 驱动名                       |
| description                           | string | 是       | 描述                         |
| profession                            | string | 是       | 模块名                       |
| create                                | string | 是       | 创建时间                     |
| update                                | string | 是       | 更新时间                     |
| scheme(**已废弃，apinto版本0.7.0起**) | string | 是       | 请求服务发现地址时使用的协议 |
| config                                | object | 是       | 服务发现配置                 |

**备注**：返回体内的config参考请求配置参数，在此不再赘述。



#### 创建服务发现

若有命名空间字段或鉴权token，则在params里填入。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/discovery' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_consul",
	"driver": "consul",
	"config": {
		"address": ["http://127.0.0.1:8501", "http://127.0.0.1:8500"],
		"params": {
			"token": "a92316d8-5c99-4fa0-b4cd-30b9e66718aa",
			"namespace": "default"
		}
	}
}'
```



#### 结果示例

```json
{
	"config": {
		"address": ["http://127.0.0.1:8501", "http://127.0.0.1:8500"],
		"params": {
			"namespace": "default",
			"token": "a92316d8-5c99-4fa0-b4cd-30b9e66718aa"
		}
	},
	"create": "2022-06-15 11:30:58",
	"description": "",
	"driver": "consul",
	"id": "demo_consul@discovery",
	"name": "demo_consul",
	"profession": "discovery",
	"update": "2022-06-15 11:30:58"
}
```

```
返回的discoveryID为demo_consul@discovery
```




#### 创建服务

**服务发现id绑定服务**：上一步生成的服务发现id绑定至服务的discovery字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "consul_service",
	"driver": "http",
	"description": "配置了consul服务发现的服务",
	"scheme": "http",
	"timeout": 3000,
	"retry": 3,
	"discovery": "demo_consul@discovery",
	"service": "redis",
	"balance": "round-robin"
}'
```



