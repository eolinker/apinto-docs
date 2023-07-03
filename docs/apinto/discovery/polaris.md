# Polaris

### 功能描述

Polaris服务发现为网关动态地提供了服务的接入地址，网关可以基于这些地址进行负载均衡处理。

Polaris注册中心自带健康检查，从该注册中心获取节点时可以获取到稳定健康的节点。



### OpenAPI配置服务发现

#### 请求参数说明


| 参数名                                | 值类型       | 是否必填 | 值可能性        | 默认值 | 说明                         |
| ------------------------------------- | ------------ | -------- | --------------- | ------ | :--------------------------- |
| name                                  | string       | 是       |                 |        | 实例名                       |
| driver                                | string       | 是       | polaris         |        | 所使用的服务发现驱动         |
| description                           | string       | 否       |                 |        | 描述                         |
| config                                | object       | 是       |                 |        | 服务发现配置                 |
| config-> address                      | array_string | 是       |                 |        | polaris地址列表              |
| config-> namespace                    | string       | 是       | default         |        | polaris命名空间              |



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
| config                                | object | 是       | 服务发现配置                 |

**备注**：返回体内的config参考请求配置参数，在此不再赘述。



#### 创建服务发现

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/discovery' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_polaris",
	"driver": "polaris",
	"config": {
		"address": ["127.0.0.1:8091"],
		"namespace": "default",
		"params": {}
	}
}'
```



#### 结果示例

```json
{
    "config": {
        "address": [
            "127.0.0.1:8091"
        ],
        "namespace": "default",
        "params": {}
    },
    "create": "2023-06-29 22:08:24",
    "description": "",
    "driver": "polaris",
    "id": "demo_polaris@discovery",
    "name": "demo_polaris",
    "profession": "discovery",
    "update": "2023-06-29 22:08:24"
}
```

```
返回的discoveryID为demo_polaris@discovery
```




#### 创建服务

**服务发现id绑定服务**：上一步生成的服务发现id绑定至服务的discovery字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "polaris_service",
	"driver": "http",
	"description": "配置了北极星服务发现的服务",
	"scheme": "http",
	"timeout": 3000,
	"retry": 3,
	"discovery": "demo_polaris@discovery",
	"service": "polaris_service",
	"balance": "round-robin"
}'
```

结果示例

```json
{
    "balance": "round-robin",
    "create": "2023-06-29 22:08:54",
    "description": "配置了北极星服务发现的服务",
    "discovery": "demo_polaris@discovery",
    "driver": "http",
    "id": "polaris_service@service",
    "name": "polaris_service",
    "profession": "service",
    "retry": 3,
    "scheme": "http",
    "service": "polaris_service",
    "timeout": 3000,
    "update": "2023-06-29 22:08:54"
}
```



