
# gRPC 协议路由

| 类别 | 属性     |
| ---- | -------- |
| 路由 | 路由匹配 |



## 功能描述

路由是完成网关转发步骤的第一步，该路由类型能使网关可接收gRPC请求并匹配到目标服务。

## 路由匹配规则
路由可配置以下指标：
* **host：**gRPC请求的主机名称，可为域名/ip，改值从gRPC请求的头部信息中的`:authority`中获取。
* **service_name：**gRPC请求的服务名称，不填则匹配所有服务
* **method_name：**gRPC请求的方法名称，不填则匹配所有方法
* **header：**gRPC请求头部信息匹配，header匹配适用于下方的[指标值匹配规则](/docs/apinto/router/grpc.html#指标值匹配规则)

### 指标匹配顺序
**优先级递减**
host -> service_name -> method_name -> header（key根据单词字母升序进行排序）

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

以上所有匹配规则仅支持header的字符串值。

### 匹配优先级

以下优先级递减

* 指标匹配顺序优先级。

* 在同指标下，按指标值的匹配规则优先级。

* 在同指标、同指标值匹配规则下，按指标值长度递增，若长度相同则按字母升序。

* 同时满足多条路由，指标数量多的路由优先匹配。



(1) 当一个请求满足多个路由时，指标匹配顺序优先级最高

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段）：

路由A（转发到serviceA):

```
host：www.apinto.com
service_name：Service.Hello
method_name：Hello
```

路由B(转发到serviceB):

```
service_name：Service.Hello
method_name：Hello
```
请求A
```
路径：`www.apinto.com/Service.Hello/Hello`
该请求匹配路由A，转发到serviceA
```
请求B
```
路径：`demo.apinto.com/Service.Hello/StreamRequest`
该请求匹配路由B，转发到serviceB
```



(2) 当一个请求满足多个路由且指标匹配顺序相同时，指标值匹配规则优先级更高

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段）：

路由A（转发到serviceA):

```
host：www.apinto.com
service_name：Service.Hello
method_name：Hello
header_version：v1.0
```

路由B(转发到serviceB):

```
host：www.apinto.com
service_name：Service.Hello
method_name：Hello
header_version：v*
```

请求A
```
路径：`www.apinto.com/Service.Hello/Hello`
header：
* version：v1.0
该请求匹配路由A，转发到serviceA
```
请求B
```
路径：`www.apinto.com/Service.Hello/Hello`
header：
* version：v2.0
该请求匹配路由B，转发到serviceB
```

(3) 当一个请求满足多个路由且指标匹配顺序相同，同时一个路由为另一个路由的子集时，满足指标数量更多的优先

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段）：

路由A（转发到serviceA):

```
host：www.apinto.com
service_name：Service.Hello
method_name：Hello
header_version：v1.0
```

路由B(转发到serviceB):

```
host：www.apinto.com
service_name：Service.Hello
method_name：Hello
header_version：v1.0
header_name：apinto
```

请求A
```
路径：`www.apinto.com/Service.Hello/Hello`
header：
* version：v1.0
* name：apinto
该请求匹配路由A，转发到serviceA
```
请求B
```
路径：`www.apinto.com/Service.Hello/Hello`
header：
* version：v1.0
该请求匹配路由B，转发到serviceB
```


## 配置说明
路由需要绑定服务，因此在创建路由前，需要确保上游服务已经存在，上游服务的配置教程[点此](/docs/apinto/service/grpc)进行跳转

#### 配置参数说明

| 参数名          | 值类型      | 是否必填 | 值可能性                                   | 默认值                                                | 说明                                                   |
|----------------|----------|------|----------------------------------------|------------------------------------------------------|------------------------------------------------------|
| name           | string   | 是    |                                        |                                   | 路由名称，格式：支持英文、数字、下划线                                  |
| driver         | string   | 是    | grpc                                   |                                                      |                                                      |
| listen         | int      | 是    |                                        |  | 路由监听端口，需要和启动时配置的config.yml文件配合使用，当定义该文件未监听的端口时，该监听无效 |
| host           | []string | 否    |                                        |                                                   |  gRPC请求的主机名称，可为域名/ip，改值从gRPC请求的头部信息中的`:authority`中获取。                                                 |
| service_name       | string   | 否   |                                        |                                            |   gRPC请求的服务名称，不填则匹配所有服务                                         |
| method_name | string | 否 | gRPC请求的方法名称，不填则匹配所有方法|||
| rules          | array_object | 否    |                                        |                                | 匹配参数规则，支持header                               |
| rules -> type  | string   | 否    | header                           |                                                  | 参数类型                                                 |
| rules -> name  | string   | 否    |                                        |                                                   | 参数名                                                  |
| rules -> value | string   | 否    |                                        |                                                   | 参数值                                                  |
| service        | string   | 是    |                                        |                                                  | 服务id                                                 |
| template       | string   | 否    |                                        |                                                | 插件模版id                                               |
| disable        | bool     | 否    | false                                  |                                                | 是否禁用路由                                               |
| plugins        | array_object | 否    |                                        |                                                  | 插件列表                                                 |
| retry          | int      | 否    |                                       | 0                                              | 超时重试次数                                               |
| time_out       | int      | 否    |                                        | 0                        | 超时时间，当为0时不设置超时，单位：ms                         |
| description    | string   | 否    |                                        |                                                  | 路由描述                                                 |


**备注**：

`host`均可配置多个，实际请求满足其中一个即可。
* plugins具体配置[点此](/docs/apinto/plugins/)进行跳转。

#### 返回参数说明


| 参数名         | 类型           | 是否必含 | 说明               |
|-------------|--------------|------|------------------|
| id          | string       | 是    | 实例id             |
| name        | string       | 是    | 实例名              |
| driver      | string       | 是    | 驱动名              |
| description | string       | 是    | 描述               |
| profession  | string       | 是    | 模块名              |
| create      | string       | 是    | 创建时间             |
| update      | string       | 是    | 更新时间             |
|  websocket  | bool         | 否    | 是否开启websocket通信  |
| disable     | bool         | 是    | 禁用路由             |
| listen      | int          | 是    | 监听端口             |
| method      | array_string | 是    | 请求方式             |
| host        | string       | 是    | host列表           |
| rules       | array_object | 是    | 规则列表             |
| target      | string       | 是    | 目标服务             |
| plugins     | object       | 是    | 插件配置             |

备注：返回体内的rules参考请求配置参数，在此不再赘述。

#### 创建gRPC路由

**备注**：该示例在`apinto`已经存在id为`grpc_demo@service`的服务的基础上操作，若无此服务，请先新建服务，上游服务的配置教程[点此](/docs/apinto/service/grpc)进行跳转。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "grpc_demo",
	"driver": "grpc",
	"description": "grpc示例路由",
	"listen": 8099,
	"service_name":"Service.Hello",
	"method_name":"Hello",
	"rules": [
	  {
	    "type":"header",
	    "name":"app",
	    "value":"apinto"
	  }
	],
	"service": "grpc_demo@service",
	"template": ""
}'
```

#### 返回结果示例

```json
{
    "create":"2023-02-17 12:33:58",
    "description":"grpc示例路由",
    "driver":"grpc",
    "id":"grpc_demo@router",
    "listen":8099,
    "method_name":"Hello",
    "name":"grpc_demo",
    "profession":"router",
    "rules":[
        {
            "name":"app",
            "type":"header",
            "value":"apinto"
        }
    ],
    "service":"grpc_demo@service",
    "service_name":"Service.Hello",
    "template":"",
    "update":"2023-02-17 12:35:38"
}
```


**注意**：该路由内配置的监听端口`listen`必须在`config.yml`配置文件里的`gateway`配置项中存在。
如下配置：
```
version: 2
...
gateway:
  listen_urls: # 转发服务的监听地址
  - http://0.0.0.0:8099
...
```
若gRPC请求需要使用TLS传输，则需要在`gateway`配置项中加上`https`监听即可，相同地址可支持多种协议。
如下配置：
```
version: 2
...
gateway:
  listen_urls: # 转发服务的监听地址
  - http://0.0.0.0:8099
  - https://0.0.0.0:8099
...
```
