# HTTP服务


| 类别 | 属性     |
| ---- | -------- |
| 服务 | 网关转发 |



### 功能描述

**服务**是一组可用的api，用于网关转发。可配置服务发现或匿名服务。



### OpenAPI配置服务

#### 请求参数说明


| 参数名              | 值类型           | 是否必填 | 值可能性        | 默认值                                                      | 说明                                                         |
| ------------------- | -------- | ------ | :----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| name                | string          | 是       |           |                                                        | 实例名                                                       |
| driver              | string        | 是       | "http_proxy"    |                                                  | 服务驱动类型                                                 |
| description         | string   | 否       |           |                                                          | 描述                                                         |
| scheme              | string        | 否       | ["http","https"] | http                                         | 请求所使用的协议                                             |
| retry               | int            | 是       |              | 0                                                    | 重试次数                                                     |
| timeout             | int          | 是       |              | 2000                                      | 超时时间，单位:毫秒                                          |
| discovery  | string | 否       |           |                                                    | 服务发现ID                                                   |
| service           | string     | 否       |           |             | 所在注册中心的服务名 或者 静态服务发现配置            |
| nodes | array_string | 否       |     |  | 匿名服务地址，可以填多个。配置格式是是静态接入地址及其权重，格式：addr weight。addr可以填域名或者ip地址。weight可省略，默认为1 |
| balance | string | 是       | ["round-robin","ip-hash"] | round-robin               | 负载均衡算法                          |
| plugins             | object       | 否       |           |                                                      | 插件配置                                                     |

**备注**：

* **service参数配置说明**：具体填写内容根据discovery参数所使用的服务发现driver类型而定。
  - 若使用nacos，consul，eureka注册中心，service字段填注册中心内的服务名。如："redis"。
  - 若使用静态服务发现，则配置填入静态接入地址及其权重，格式为：**addr1 weight=num1;addr2 weight=num2;** 不同地址之间用分号进行分割，addr可以填域名或者ip地址，weight可省略，默认为1。如：`"172.17.0.3:80;172.17.0.4:80" weight=100`
* **nodes参数配置说明**：匿名服务地址，字符串数组。格式为：**addr weight=num**。addr可以填域名或者ip地址。weight可省略，默认为1。如`["172.17.0.3","172.17.0.4:80 weight=10","demoHost.com weight=100"]`
* 若使用服务发现则需要填写`discovery`和`service`；使用匿名服务则填写`nodes`。
* 服务发现和匿名服务必须选填其中一个，若都填了，则最终使用服务发现。
* plugins具体配置[点此](/docs/apinto/plugins)进行跳转。

#### 返回参数说明


| 参数名      | 类型         | 是否必含 | 说明                                                         |
| ----------- | ------------ | -------- | ------------------------------------------------------------ |
| id          | string       | 是       | 实例id                                                       |
| name        | string       | 是       | 实例名                                                       |
| driver      | string       | 是       | 驱动名                                                       |
| description | string       | 是       | 描述                                                         |
| profession  | string       | 是       | 模块名                                                       |
| create      | string       | 是       | 创建时间                                                     |
| update      | string       | 是       | 更新时间                                                     |
| scheme      | string       | 是       | 请求所使用的协议                                             |
| retry       | int          | 是       | 重试次数                                                     |
| timeout     | int          | 是       | 超时时间，单位:毫秒                                          |
| discovery   | string       | 是       | 服务发现ID                                                   |
| service     | string       | 是       | 所在注册中心的服务名 或者 静态服务发现配置                   |
| nodes       | array_string | 是       | 匿名服务地址，可以填多个，配置格式是是静态接入地址及其权重，格式：addr weight。addr可以填域名或者ip地址。weight可省略，默认为1 |
| balance     | string       | 是       | 负载均衡算法                                                 |
| plugins     | object       | 是       | 插件配置                                                     |



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
	"scheme": "HTTPS",
	"nodes": ["demo.apinto.com:8280"],
	"balance": "round-robin"
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
	"scheme": "HTTPS",
	"timeout": 3000,
	"update": "2022-06-16 11:00:45",
	"discovery": "",
    "service": "",
    "nodes": ["demo.apinto.com:8280"],
	"balance": "round-robin",
	"plugins": null
}
```



##### 二、高可用场景，高可用的服务配置示例

discovery字段填上配置了服务发现的负载。

此处已经配置id为`consul_demo@discovery`的服务发现，服务发现配置教程[点此](/docs/apinto/discovery/index.md)进行跳转

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "consul_service",
	"driver": "http",
	"description": "配置了consul服务发现的服务",
	"scheme": "HTTP",
	"timeout": 3000,
	"retry": 3,
	"discovery": "consul_demo@discovery",
	"service": "redis",
	"balance": "round-robin"
}'
```

**返回结果示例**

```json
{
	"create": "2022-06-16 11:05:35",
	"description": "配置了负载的服务",
	"driver": "http",
	"id": "consul_service@service",
	"name": "consul_service",
	"profession": "service",
	"retry": 3,
	"scheme": "http",
	"timeout": 3000,
	"update": "2022-06-16 11:05:35",
	"discovery": "consul_demo@discovery",
    "service": "redis",
	"nodes": null,
    "balance": "round-robin",
	"plugins": null
}
```

