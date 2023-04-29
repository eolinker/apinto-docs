# dubbo2 协议路由

| 类别 | 属性     |
| ---- | -------- |
| 路由 | 路由匹配 |

## 功能描述

路由是完成网关转发步骤的第一步，该路由类型能使网关可接收dubbo2请求并匹配到目标服务。

## 路由匹配规则

路由可配置两种指标，分别是service_name + method_name、header。

### 指标匹配顺序

**优先级递减**
分别是service_name + method_name -> header（key根据单词字母升序进行排序）

### 指标值匹配规则

| 匹配类型               | 规则    | 说明                                             |
| ---------------------- | ------- | ------------------------------------------------ |
| 全等匹配               | str     | 值存在，且与str完全相等                          |
| 前缀匹配               | str*    | 值存在，且str是值的前缀                          |
| 后缀匹配               | *str    | 值存在，且str是值的后缀                          |
| 子串匹配               | \*str\* | 值存在，且str是值的子串                          |
| 非等匹配               | !=str   | 值存在，且值不等于str时匹配成功                  |
| 空值匹配               | $       | 要求key存在且值为空值，多用于header、query指标   |
| 存在匹配               | **      | 要求key存在但不能为空值，多用于header、query指标 |
| 不存在匹配             | !       | 要求key不存在，多用于header、query指标           |
| 区分大小写的正则匹配   | ~=str   | 值符合正则匹配                                   |
| 不区分大小写的正则匹配 | ~*=str  | 值符合正则匹配                                   |
| 任意匹配               | *       | 任何情况都匹配成功                               |

**优先级**：全等匹配 > 前缀匹配 > 后缀匹配 > 子串匹配 > 非等匹配 > 空值匹配 > 存在匹配 > 不存在匹配 > 区分大小写的正则匹配 > 不区分大小写的正则匹配 > 任意匹配

以上所有匹配规则仅支持service_name+method_name、header的字符串值。


## 配置说明

路由需要绑定服务，因此在创建路由前，需要确保上游服务已经存在，上游服务的配置教程[点此](/docs/apinto/service/http)进行跳转

#### 配置参数说明

| 参数名         | 值类型       | 是否必填 | 值可能性        | 默认值 | 说明                                                         |
| -------------- | ------------ | -------- | --------------- | ------ | ------------------------------------------------------------ |
| name           | string       | 是       |                 |        | 路由名称，格式：支持英文、数字、下划线                       |
| driver         | string       | 是       | dubbo2          |        |                                                              |
| listen         | int          | 是       |                 |        | 路由监听端口，需要和启动时配置的config.yml文件配合使用，当定义该文件未监听的端口时，该监听无效 |
| method_name    | string       | 否       | GetUser         |        | 服务的方法名，不填只匹配服务名                               |
| service_name   | string       | 是       | api.UserService |        | 服务名                                                       |
| rules          | array_object | 否       |                 |        | 匹配参数规则，支持header                                     |
| rules -> type  | string       | 否       | header          |        | 参数类型                                                     |
| rules -> name  | string       | 否       |                 |        | 参数名                                                       |
| rules -> value | string       | 否       |                 |        | 参数值                                                       |
| service        | string       | 是       |                 |        | 服务id                                                       |
| template       | string       | 否       |                 |        | 插件模版id                                                   |
| disable        | bool         | 否       |                 | false  | 是否禁用路由                                                 |
| plugins        | array_object | 否       |                 |        | 插件列表                                                     |
| retry          | int          | 否       |                 | 0      | 超时重试次数                                                 |
| time_out       | int          | 否       |                 | 0      | 超时时间，当为0时不设置超时，单位：ms                        |
| description    | string       | 否       |                 |        | 路由描述                                                     |

**备注**：

* plugins具体配置[点此](/docs/apinto/plugins/)进行跳转。

#### 返回参数说明

| 参数名          | 类型           | 是否必含 | 说明     |
|--------------|--------------|------|--------|
| id           | string       | 是    | 实例id   |
| name         | string       | 是    | 实例名    |
| driver       | string       | 是    | 驱动名    |
| description  | string       | 是    | 描述     |
| profession   | string       | 是    | 模块名    |
| create       | string       | 是    | 创建时间   |
| update       | string       | 是    | 更新时间   |
| disable      | bool         | 是    | 禁用路由   |
| listen       | int          | 是    | 监听端口   |
| method_name  | string       | 否    | 服务的方法名 |
| service_name | string       | 是    | 服务名    |
| rules        | array_object | 是    | 规则列表   |
| target       | string       | 是    | 目标服务   |
| plugins      | object       | 是    | 插件配置   |

备注：返回体内的rules参考请求配置参数，在此不再赘述。

#### 创建规则较复杂的路由

**备注**：已经存在id为`anonymous_service@service`的服务。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "complex_router",
	"driver": "dubbo2",
	"description": "一个匹配规则较复杂的路由",
	"listen": 8099,
	"method_name": "GetUser",
	"service_name": "api.UserService",
	"rules": [
	  {
	    "type":"header",
	    "name":"group",
	    "value":"apinto"
	  }
	],
	"service": "anonymous_service@service",
	"template": ""
}'

#当dubbo2请求同时满足以下条件时才能匹配这个路由
#service_name为api.UserService
#method_name为GetUser
#dubbo2协议中的Attachment中包含group且值为apinto
```

**注意**：该路由内配置的监听端口`listen`必须在config.yml配置文件里的监听端口列表中存在。

#### 返回结果示例

```json
{
  "create": "2022-06-16 12:06:05",
  "description": "一个匹配规则较复杂的路由",
  "disable": false,
  "driver": "dubbo2",
  "id": "complex_router@router",
  "listen": 8099,
  "service_name": "api.UserService",
  "method_name": "GetUser",
  "name": "complex_router",
  "plugins": null,
  "profession": "router",
  "rules": [
    {
      "type": "header",
      "name": "group",
      "value": "apinto"
    }
  ],
  "service": "anonymous_service@service",
  "template": "",
  "update": "2022-06-16 12:06:05"
}
```

### 配置dubbo2路由

**备注**：已经存在id为`anonymous_service@service`的服务。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "simple_router",
	"driver": "dubbo2",
	"description": "一个匹配规则较简单的路由",
	"listen": 8099,
	"service_name": "api.UserService",
    "method_name": "GetUser",
	"rules": [],
	"service": "anonymous_service@service",
	"template":""
}'

#当dubbo2请求同时满足以下条件时才能匹配这个路由
#service_name为api.UserService
#method_name为GetUser
```

**注意**：该路由内配置的监听端口`listen`必须在config.yml配置文件里的监听端口列表中存在。
```yaml
gateway: # 网关服务配置
  listen_urls: # 监听地址
    - tcp://0.0.0.0:8099
```

#### 返回结果示例

```json
{
  "create": "2022-06-16 12:13:40",
  "description": "一个匹配规则较简单的路由",
  "disable": false,
  "driver": "dubbo2",
  "id": "simple_router@router",
  "listen": 8099,
  "service_name": "api.UserService",
  "method_name": "GetUser",
  "name": "simple_router",
  "plugins": null,
  "profession": "router",
  "rules": [],
  "service": "anonymous_service@service",
  "template": "",
  "update": "2022-06-16 12:13:40"
}
```
