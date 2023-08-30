
# HTTP 协议路由

| 类别 | 属性     |
| ---- | -------- |
| 路由 | 路由匹配 |



## 功能描述

路由是完成网关转发步骤的第一步，该路由类型能使网关可接收http请求并匹配到目标服务。

## 路由匹配规则
路由可配置五种指标，分别是host、method、location、header、query。

### 指标匹配顺序
**优先级递减**
host -> method -> location -> header（key根据单词字母升序进行排序） -> query（key根据单词字母升序进行排序）


### 指标值匹配规则

| 匹配类型               | 规则      | 说明                              |
|--------------------|---------|---------------------------------|
| 全等匹配               | str     | 值存在，且与str完全相等                   |
| 前缀匹配               | str*    | 值存在，且str是值的前缀                   |
| 后缀匹配               | *str    | 值存在，且str是值的后缀                   |
| 子串匹配               | \*str\* | 值存在，且str是值的子串                   |
| 非等匹配               | !=str   | 值存在，且值不等于str时匹配成功               |
| 空值匹配               | $       | 要求key存在且值为空值，多用于header、query指标  |
| 存在匹配               | **      | 要求key存在但不能为空值，多用于header、query指标 |
| 不存在匹配              | !       | 要求key不存在，多用于header、query指标      |
| 区分大小写的正则匹配         | ~=str   | 值符合正则匹配                         |
| 不区分大小写的正则匹配        | ~*=str  | 值符合正则匹配                         |
| 任意匹配               | *       | 任何情况都匹配成功                       |

**优先级**：全等匹配 > 前缀匹配 > 后缀匹配 > 子串匹配 > 非等匹配 > 空值匹配 > 存在匹配 > 不存在匹配 > 区分大小写的正则匹配 > 不区分大小写的正则匹配 > 任意匹配

以上所有匹配规则仅支持host、method、location、header、query的字符串值。



### 匹配优先级

以下优先级递减

* 指标匹配顺序优先级。

* 在同指标下，按指标值的匹配规则优先级。

* 在同指标、同指标值匹配规则下，按指标值长度递增，若长度相同则按字母升序。

* 同时满足多条路由，指标数量多的路由优先匹配。



(1) 当一个请求满足多个路由时，指标匹配顺序优先级最高

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host:www.apinto.com
method: GET
location: /user/login
query_classID: 1
```

路由B(转发到serviceB):

```
method: GET
location: /user/login
query_sex: 男
```

```
请求（GET http://www.apinto.com/user/login?classID=1&sex=男 ）：该请求匹配路由A，转发到serviceA
```



(2) 当一个请求满足多个路由且指标匹配顺序相同时，指标值匹配规则优先级更高

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host:www.apinto.com
method: GET
location: /user/login  #全等匹配
query_classID: 1
```

路由B(转发到serviceB):

```
host:www.apinto.com
method: GET
location: /user*  #前缀匹配
query_classID: 1
```

```
请求（GET http://www.apinto.com/user/login?classID=1 ）：该请求匹配路由A，转发到serviceA
```



(3) 当一个请求满足多个路由且指标匹配顺序和指标值匹配规则优先级相同时，根据指标值单词字母升序的优先级进行匹配

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host: www.apinto.com
method: GET
location: /user/login
query_name：chen*
```

路由B(转发到serviceB):

```
host: www.apinto.com
method: GET
location: /user/login
query_name：zhang*
```

```
请求A（GET http://www.apinto.com/user/login?name=chenwu ）：该请求优先匹配完路由A所有规则，转发到serviceA
```



(4) 当一个请求满足多个路由且指标匹配顺序相同，同时一个路由为另一个路由的子集时，满足指标数量更多的优先

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host: www.apinto.com
method: GET
location: /user/login
query_classID：1
```

路由B(转发到serviceB):

```
host: www.apinto.com
method: GET
location: /user/login
query_classID：1
query_sex：男
```

```
请求A（GET http://www.apinto.com/user/login?classID=1 ）：该请求匹配路由A，转发到serviceA

请求B（GET http://www.apinto.com/user/login?classID=1&sex=男 ）：该请求匹配路由B，转发到serviceB
```



## 配置说明

路由需要绑定服务，因此在创建路由前，需要确保上游服务已经存在，上游服务的配置教程[点此](/docs/apinto/service/http.md)进行跳转

#### 配置参数说明

| 参数名         | 值类型     | 是否必填 | 值可能性                                     | 默认值 | 说明                                                         |
| -------------- | ---------- | -------- | -------------------------------------------- | ------ | ------------------------------------------------------------ |
| name           | string     | 是       |                                              |        | 路由名称，格式：支持英文、数字、下划线                       |
| driver         | string     | 是       | http                                         |        |                                                              |
| listen         | int        | 是       |                                              | 80     | 路由监听端口，需要和启动时配置的config.yml文件配合使用，当定义该文件未监听的端口时，该监听无效 |
| method         | []string   | 是       | GET、POST、PUT、PATCH、DELETE、HEAD、OPTIONS |        | 请求方式                                                     |
| host           | []string   | 否       |                                              |        | 客户                                                         |
| location       | string     | 是       |                                              |        | 客户端请求路径                                               |
| rules          | object数组 | 否       |                                              |        | 匹配参数规则，支持header、query                              |
| rules -> type  | string     | 否       | header、query、cookie                        |        | 参数类型                                                     |
| rules -> name  | string     | 否       |                                              |        | 参数名                                                       |
| rules -> value | string     | 否       |                                              |        | 参数值                                                       |
| service        | string     | 是       |                                              |        | 服务id                                                       |
| template       | string     | 否       |                                              |        | 插件模版id                                                   |
| disable        | bool       | 否       |                                              | false  | 是否禁用路由                                                 |
| plugins        | object数组 | 否       |                                              |        | 插件列表                                                     |
| retry          | int        | 否       |                                              | 0      | 超时重试次数                                                 |
| time_out       | int        | 否       |                                              | 0      | 超时时间，当为0时不设置超时，单位：ms                        |
| description    | string     | 否       |                                              |        | 路由描述                                                     |





**备注**：

* `method`、`host`均可配置多个，实际请求满足其中一个即可。
* plugins具体配置[点此](/docs/apinto/plugins)进行跳转。

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

#### 创建规则较复杂的路由

**备注**：已经存在id为`anonymous_service@service`的服务。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "complex_router",
	"driver": "http",
	"description": "一个匹配规则较复杂的路由",
	"listen": 8099,
	"method": [
		"GET",
		"POST"
	],
	"location": "/demo",
	"host": ["*.com"],
	"rules": [
	  {
	    "type":"header",
	    "name":"user",
	    "value":"apinto"
	  }
	],
	"service": "anonymous_service@service",
	"template": ""
}'

#当http请求同时满足以下条件时才能匹配这个路由
#method为GET或者POST
#请求头内host的值后缀为.com
#请求路径uri为/demo
#头部存在name这个key，且对应值不为空值
#请求参数里包含key为id，且值不为123
```

**注意**：该路由内配置的监听端口`listen`必须在config.yml配置文件里的监听端口列表中存在。

#### 返回结果示例

```json
{
	"create": "2022-06-16 12:06:05",
	"description": "一个匹配规则较复杂的路由",
	"disable": false,
	"driver": "http",
	"host": ["*.com"],
	"id": "complex_router@router",
	"listen": 8099,
	"method": ["GET", "POST"],
	"name": "complex_router",
	"plugins": null,
	"profession": "router",
    "location": "/demo",
	"rules": [
      {
        "type":"header",
        "name":"user",
        "value":"apinto"
      }
	],
	"service": "anonymous_service@service",
	"template": "",
	"update": "2022-06-16 12:06:05"
}
```

### 配置http路由路由

**备注**：已经存在id为`anonymous_service@service`的服务。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "simple_router",
	"driver": "http",
	"description": "一个匹配规则较简单的路由",
	"listen": 8099,
	"location": "/simple_anonymous_one",
	"rules": [],
	"service": "anonymous_service@service",
	"template":""
}'

#请求http://127.0.0.1:8099/simple_anonymous_one和http://127.0.0.1:8099/simple_anonymous_two均可命中此路由
```

**注意**：该路由内配置的监听端口`listen`必须在config.yml配置文件里的监听端口列表中存在。

#### 返回结果示例

```json
{
	"create": "2022-06-16 12:13:40",
	"description": "一个匹配规则较简单的路由",
	"disable": false,
	"driver": "http",
	"host": null,
	"id": "simple_router@router",
	"listen": 8099,
	"method": null,
	"name": "simple_router",
	"plugins": null,
	"profession": "router",
    "location": "/simple_anonymous_one",
	"rules": [],
	"service": "anonymous_service@service",
    "template":"",
	"update": "2022-06-16 12:13:40"
}
```
### 配置Websocket路由
在http路由的基础上带上`websocket`参数即可
```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "websocket_router",
	"driver": "http",
	"websocket": true,
	"description": "websocket路由",
	"listen": 8099,
	"location": "/simple_anonymous_one",
	"rules": [],
	"service": "anonymous_service@service",
	"template":""
}'
```