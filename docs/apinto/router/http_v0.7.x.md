
# HTTP 协议路由-v0.7及之前版本


| 类别 | 属性     |
| ---- | -------- |
| 路由 | 路由匹配 |



### 功能描述

路由是完成网关转发步骤的第一步，该路由类型能使网关可接收http请求并匹配到目标服务。

### 路由匹配规则
路由可配置五种指标，分别是host、method、location、header、query，除了location外，其它指标均可配置多个。且每个指标的值可配置一种匹配规则。

#### 指标匹配顺序
**优先级递减**
host -> method -> location -> header（key根据单词字母升序进行排序） -> query（key根据单词字母升序进行排序）   

```yaml
host:
  - str
method: 
  - str
rules:
  - location: str
    header: 
      user: str
      token: str
    query:
      id: str
      
此时指标匹配顺序为：host>method>location>header:token>header:user>query:id
共六个指标
```



#### 指标值匹配规则

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

以上所有匹配规则仅支持host、method、location、header、query的字符串值（以下用str来表示）。

如：

```yaml
host:
  - str
method: 
  - str
rules:
  - location: str
    header: 
      user: str
      token: str
    query:
      id: str
      
#示例      
host:
  - www.eolinker.* #前缀匹配
  - *.eolinker.com #后缀匹配
  - *.com* #子串匹配
method: 
  -GET  #全等匹配
rules:
  - location: * #任意匹配,任何情况下都能匹配成功
    header: 
      user: ** #存在匹配，要求值存在且不为空值
      content-type: !=application/json #非等匹配,如不等于application/json都能匹配
    query:
      id: $ #空值匹配，要求值为空值
      name: ! #不存在匹配   

```



#### 匹配优先级

以下优先级递减

* 指标匹配顺序优先级。

* 在同指标下，按指标值的匹配规则优先级。

* 在同指标、同指标值匹配规则下，按指标值长度递增，若长度相同则按字母升序。
* 同时满足多条路由，指标数量多的路由优先匹配。



(1)当一个请求满足多个路由时，指标匹配顺序优先级最高

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



(2)当一个请求满足多个路由且指标匹配顺序相同时，指标值匹配规则优先级更高

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



(3)当一个请求满足多个路由且指标匹配顺序和指标值匹配规则优先级相同时，根据指标值单词字母升序的优先级进行匹配

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



(4)当一个请求满足多个路由且指标匹配顺序相同，同时一个路由为另一个路由的子集时，满足指标数量更多的优先

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



### OpenAPI配置路由

服务配置教程[点此](/docs/apinto/service/http.md)进行跳转

#### 配置参数说明

| 参数              | 说明                                | 是否必填 | 默认值 | 值可能性     |
| ----------------- | ----------------------------------- | -------- | ------ | ------------ |
| name              | 实例名                              | 是       |        | string       |
| driver            | 驱动名                              | 是       |        | "http"       |
| description       | 描述                                | 否       |        | string       |
| disable           | 禁用路由，默认为false，表示开启状态 | 否       | false  | bool         |
| listen            | 监听端口                            | 是       |        | int          |
| method            | 请求方式                            | 否       |        | array_string |
| host              | host列表                            | 否       |        | array_string |
| rules             | 规则列表                            | 否       |        | array_object |
| rules -> location | 路径规则                            | 否       |        | string       |
| rules -> header   | header请求头规则                    | 否       |        | object       |
| rules -> query    | query参数规则                       | 否       |        | object       |
| target            | 目标服务                            | 是       |        | string       |
| plugins           | 插件配置                            | 否       |        | object       |

**备注**：

* `method`、`host`、`rules`均可配置多个，实际请求满足其中一个即可。
* plugins具体配置[点此](/docs/apinto/plugins)进行跳转。

#### 返回参数说明


| 参数名      | 类型         | 是否必含 | 说明     |
| ----------- | ------------ | -------- | -------- |
| id          | string       | 是       | 实例id   |
| name        | string       | 是       | 实例名   |
| driver      | string       | 是       | 驱动名   |
| description | string       | 是       | 描述     |
| profession  | string       | 是       | 模块名   |
| create      | string       | 是       | 创建时间 |
| update      | string       | 是       | 更新时间 |
| disable     | bool         | 是       | 禁用路由 |
| listen      | int          | 是       | 监听端口 |
| method      | array_string | 是       | 请求方式 |
| host        | string       | 是       | host列表 |
| rules       | array_object | 是       | 规则列表 |
| target      | string       | 是       | 目标服务 |
| plugins     | object       | 是       | 插件配置 |

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
	"host": ["*.com"],
	"rules": [{
		"location": "/demo",
		"header": {
			"name": "**"
		},
		"query": {
			"id": "!=123"
		}
	}],
	"target": "anonymous_service@service"
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
	"rules": [{
		"header": {
			"name": "**"
		},
		"location": "/demo",
		"query": {
			"id": "!=123"
		}
	}],
	"target": "anonymous_service@service",
	"update": "2022-06-16 12:06:05"
}
```

#### 创建规则较简单的路由

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
	"rules": [{
	  "location": "/simple_anonymous_one"
	  },
	  {
	  "location": "/simple_anonymous_two"
	  }
	],
	"target": "anonymous_service@service"
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
	"rules": [{
		"header": null,
		"location": "/simple_anonymous_one",
		"query": null
	}, {
		"header": null,
		"location": "/simple_anonymous_two",
		"query": null
	}],
	"target": "anonymous_service@service",
	"update": "2022-06-16 12:13:40"
}
```