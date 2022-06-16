# HTTP服务


| 类别 | 属性     |
| ---- | -------- |
| 服务 | 网关转发 |



### 功能描述

**服务**是一组可用的api，用于网关转发。可配置负载或匿名服务。



### OpenAPI配置服务

#### 请求参数说明


| 参数名              | 说明                                                         | 是否必填 | 默认值 | 值可能性        |
| ------------------- | :----------------------------------------------------------- | -------- | ------ | --------------- |
| name                | 实例名                                                       | 是       |        | string          |
| driver              | 服务驱动类型                                                 | 是       |        | "http_proxy"    |
| description         | 描述                                                         | 否       |        | string          |
| scheme              | 请求所使用的协议                                             | 否       | http   | ["http","https] |
| retry               | 重试次数                                                     | 是       |        | int             |
| timeout             | 超时时间，单位:毫秒                                          | 是       |        | int             |
| upstream            | 负载ID                                                       | 否       |        | string          |
| anonymous           | 匿名服务                                                     | 否       |        | object          |
| anonymous -> type   | 负载均衡算法，暂时只支持round-robin                          | 是       |        | string          |
| anonymous -> config | 匿名服务地址，可以填多个，配置格式是是静态接入地址及其权重，格式：addr1 weight1;addr2 weight2;...用分号进行分割。addr可以填域名或者ip地址。weight可省略，默认为1 | 是       |        | string          |
| plugins             | 插件配置                                                     | 否       |        | object          |

**备注**：

* scheme: 若服务配置了负载，则负载的scheme是优先于服务的scheme的。
* plugins具体配置[点此](/docs/plugins)进行跳转。

#### 返回参数说明


| 参数名      | 类型   | 是否必含 | 说明                |
| ----------- | ------ | -------- | ------------------- |
| id          | string | 是       | 实例id              |
| name        | string | 是       | 实例名              |
| driver      | string | 是       | 驱动名              |
| description | string | 是       | 描述                |
| profession  | string | 是       | 模块名              |
| create      | string | 是       | 创建时间            |
| update      | string | 是       | 更新时间            |
| scheme      | string | 是       | 请求所使用的协议    |
| retry       | int    | 是       | 重试次数            |
| timeout     | int    | 是       | 超时时间，单位:毫秒 |
| upstream    | string | 是       | 负载ID              |
| anonymous   | object | 是       | 匿名服务地址        |
| plugins     | object | 是       | 插件配置            |

**备注**：返回体内的anonymous参考请求配置参数，在此不再赘述。

#### 不同场景下的配置示例

* 普通场景
* 高可用场景



##### 一、普通场景，不需高可用的服务配置示例

通过anonymous字段直接配置上游地址

**备注**：匿名服务配置的是apinto官方示例接口, 并且该示例不配置插件。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "annoymous_service",
	"driver": "http",
	"description": "配置匿名服务",
	"timeout": 3000,
	"retry": 3,
	"scheme": "https",
	"anonymous": {
		"type": "round-robin",
		"config": "demo-apinto.eolink.com:8280"
	}
}'
```

**返回结果示例**

```json
{
	"create": "2022-06-16 11:00:45",
	"description": "配置匿名服务",
	"driver": "http",
	"id": "annoymous_service@service",
	"name": "annoymous_service",
	"profession": "service",
	"retry": 3,
	"scheme": "https",
	"timeout": 3000,
	"update": "2022-06-16 11:00:45",
	"upstream": "",
	"anonymous": {
		"config": "demo-apinto.eolink.com:8280",
		"type": "round-robin"
	},
	"plugins": null
}
```



##### 二、高可用场景，高可用的服务配置示例

upstream字段填上配置了服务发现的负载。

此处已经配置id为`consul_upstream@upstream`的负载，负载配置教程[点此](/docs/upstream/http.md)进行跳转

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "consul_upstream_service",
	"driver": "http",
	"description": "配置了负载的服务",
	"scheme": "http",
	"timeout": 3000,
	"retry": 3,
	"upstream": "consul_upstream@upstream"
}'
```

**返回结果示例**

```json
{
	"create": "2022-06-16 11:05:35",
	"description": "配置了负载的服务",
	"driver": "http",
	"id": "consul_upstream_service@service",
	"name": "consul_upstream_service",
	"profession": "service",
	"retry": 3,
	"scheme": "http",
	"timeout": 3000,
	"update": "2022-06-16 11:05:35",
	"upstream": "consul_upstream@upstream"
	"anonymous": null,
	"plugins": null
}
```

