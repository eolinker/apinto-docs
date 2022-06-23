# Nacos

### 功能描述

Nacos服务发现为网关动态地提供了服务的接入地址，网关可以基于这些地址进行负载均衡处理。

Nacos注册中心自带健康检查，从该注册中心获取节点时可以获取到稳定健康的节点。




### OpenAPI配置服务发现

#### 请求参数说明


| 参数名           | 说明                                                         | 是否必填 | 默认值 | 值可能性        |
| ---------------- | :----------------------------------------------------------- | -------- | ------ | --------------- |
| name             | 实例名                                                       | 是       |        | string          |
| driver           | 所使用的服务发现类别                                         | 是       |        | "nacos"         |
| description      | 描述                                                         | 否       |        | string          |
| scheme           | 请求服务发现地址时使用的协议                                 | 否       | "http" | ["http","https] |
| config           | 服务发现配置                                                 | 是       |        | object          |
| config-> address | nacos地址列表                                                | 是       |        | array_string    |
| config-> params  | 参数信息,如{"token":"XXX","namespace":"default","username":"XXX","password":"xxx"} | 是       |        | object          |



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
| config      | object | 是       | 服务发现配置                 |

**备注**：返回体内的config参考请求配置参数，在此不再赘述。



#### 创建nacos服务发现

若有命名空间字段，则在params里填入。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/discovery' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_nacos",
	"driver": "nacos",
	"description": "nacos服务发现示例",
	"scheme": "http",
	"config": {
		"address": ["127.0.0.1:8848"],
		"params": {
			"username": "test",
			"password": "test"
		}
	}
}'
```



#### 结果示例

```json
{
	"id": "demo_nacos@discovery",
	"name": "demo_nacos",
	"profession": "discovery",
	"driver": "nacos",
	"description": "nacos服务发现示例",
	"create": "2022-06-15 10:47:33",
	"update": "2022-06-15 10:47:33",
	"scheme": "http",
	"config": {
		"address": ["127.0.0.1:8848"],
		"params": {
			"password": "test",
			"username": "test"
		}
	}
}
```

```
返回的discoveryID为demo_nacos@discovery
```



#### 创建负载

**服务发现id绑定服务**：上一步生成的服务发现id绑定至服务的discovery字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "nacos_service",
	"driver": "http",
	"description": "配置了nacos服务发现的服务",
	"scheme": "http",
	"timeout": 3000,
	"retry": 3,
	"discovery": "demo_nacos@discovery",
	"service": "redis",
	"balance": "round-robin"
}'
```



