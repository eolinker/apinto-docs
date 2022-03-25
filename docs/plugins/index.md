# 插件系统
插件系统的插件能够在**路由**、**服务**、**负载**、**全局**中配置。

若同一个插件在多个模块进行了配置，则配置优先级为：路由>服务>负载>全局，且插件只生效一次。
`即路由和服务均配置同一个插件，最终会以路由的配置为准`

插件执行流程见下图：

请求从上到下依次执行各阶段的filter方法，待请求转发后（即context -> send执行完后），再从下到上依次返回，在每个filter阶段均可做插件的相关操作。

**fileter**：拦截器，即插件的执行过程，每个插件均需要实现DoFilter接口，该接口作为插件执行的入口，在内可定义该插件的前置或者后置操作。

`前置操作即为请求转发前执行的操作，后置操作即为转发获得响应后的操作`

![](http://data.eolinker.com/course/mZ1VnxG018c7fa398b81feb0c7c32d75049bd9113c99cb4.png)

此外，每个插件均有类型`type`，这决定了其**执行阶段**。可选类型有[`router`、`service`、`upstream`]。比如某个插件的类型为router，那它将会在router阶段执行。

### 插件列表

| 插件名称                                       | 字段名             | 说明                                                         |
| ---------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| [额外参数](/docs/plugins/extra_params.md)       | extra_params       | 转发时在请求中携带自定义参数                                 |
| [参数映射](/docs/plugins/params_transformer.md) | params_transformer | 转发时将请求中的原参数映射成自定义参数                       |
| [转发重写](/docs/plugins/proxy_rewrite.md)      | proxy_rewrite      | 转发时对请求的host、scheme、uri进行重写，同时能在请求头加入自定义参数 |
| [IP黑白名单](/docs/plugins/ip_restriction.md)   | ip_restriction     | 对访问的客户端ip进行黑白限制                                 |
| [流量控制](/docs/plugins/rate_limiting.md)      | rate_limiting      | 控制请求在单位时间内的访问次数                               |
| [鉴权](/docs/plugins/auth.md)                   | auth               | 对请求进行权限校验                                           |
| [响应重写](/docs/plugins/response_rewrite.md)   | response_rewrite   | 用于重写网关返回的状态码、响应体、头部                       |
| [API熔断](/docs/plugins/circuit_breaker.md)     | circuit_breaker    | 用于停止对不可用API的转发                                    |
| [跨域CORS](/docs/plugins/cors.md)               | cors               | 设置跨域的头部字段，实现跨域功能                             |
| [gzip压缩](/docs/plugins/gzip.md)               | gzip               | 将响应进行gzip压缩，以提高传输效率                           |
| [access_log](/docs/plugins/access_log.md)       | access_log         | 记录到达网关的http请求的访问日志                             |

### 全局插件配置

全局插件配置声明在程序运行过程中加载插件的名称、顺序、插件的启用状态以及插件的作用范围。

#### 配置参数说明

![](http://data.eolinker.com/course/FqMCEIi0975ec1b9abd17a91ce4540eaf718a2d5e302ea3.png)

在配置过程中，`id`为插件的驱动ID，可重复使用，`name`为插件的执行别名，全局唯一，在router、service、upstream配置时填写。如额外参数插件ID为`eolinker.com:apinto:extra_params`，配置的`name`为`extra_params1`，在router、service、upstream阶段时使用该插件时填写的名称为`extra_params1`，则可进行调用.

全局插件有三个**状态**：

* **disable**

  禁用状态：表示插件处于禁用状态，即便某个路由|服务|负载配置了该插件也不会生效。

* **enable**

  启用状态：表示启用插件。某个路由|服务|负载配置了插件，需要在全局插件配置中将对应插件状态配置为enable才能生效。

  **备注**：该状态下的插件不需要在全局插件配置中填写具体配置。

* **global**

  全局插件状态：表示启用插件，同时作为全局插件。

  例如：配置了一个全局插件，在某个转发流程中的路由|服务|负载中均没有该插件配置，此时这个全局插件配置就会生效。

  **备注**：该状态下的插件需要在全局插件配置填写具体配置。

#### 配置示例

以额外参数插件为例

```json
{
    "plugins":[
        {
            "id":"eolinker.com:apinto:extra_params",
            "name":"extra_params_one",
            "type":"upstream",
            "status":"global",
            "config":{
                "params":[
                    {
                        "name":"a",
                        "position":"query",
                        "value":"1",
                        "conflict":"Convert"
                    }
                ],
                "error_type":"text"
            }
        },
        {
            "id":"eolinker.com:apinto:extra_params",
            "name":"extra_params_two",
            "type":"service",
            "status":"enable"
        }
    ]
}
```

**配置说明**：全局配置了两个插件，这两个插件均为额外参数插件。

第一个插件别名为`extra_params_one`, 是个全局插件，当转发路径上的router|service|upstream均没有配置该插件时才生效。插件类型`type`为upstream，表示该插件在upstream阶段执行。

第二个插件别名为`extra_params_two`，全局启用了，想要使用这个插件，需要在转发路径上的router|service|upstream配置具体参数。插件类型`type`为service，表示该插件在service阶段执行。

#### 插件执行顺序

### Open API配置插件示例

**获取全局插件配置接口**：GET /api/setting/plugin

**设置全局插件配置接口**：POST /api/setting/plugin   每次设置均为**全量更新**

#### 以使用额外参数插件为例，为服务配置插件。

**全局插件配置**

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
	"plugins":[{
		"id":"eolinker.com:apinto:extra_params",
		"name":"my_extra_params",
		"type":"service",
		"status":"enable"
	}]
}'
```

**配置服务**

服务中配置额外参数插件，plugins参数中每个插件key需要使用全局插件中对应插件的name。

比如下面服务插件配置里的`my_extra_params`使用的是上面全局插件配置里的name。

**备注**：匿名服务配置的是能够返回转发请求信息接口所在的后端地址。

```shell
curl -X POST  'http://127.0.0.1:9400/api/service' \
-H 'Content-Type:application/json' \
-d '{
    "name": "param",
    "driver": "http",
    "timeout": 3000,
    "retry": 3,
    "scheme": "http",
    "anonymous": {
        "type": "round-robin",
        "config": "demo-apinto.eolink.com:8280"
    },
    "plugins": {
        "my_extra_params":{
            "disable": false,
            "config":{
                "params": [{
                "name": "demo_param",
                "position": "query",
                "value": "1",
                "conflict": "Convert"
                }],
            "error_type": "text"
            }
        }
    }
}' 
```

**配置路由**

```shell
curl -X POST  'http://127.0.0.1:9400/api/router' \
-H 'Content-Type:application/json' \
-d '{
	"name":"params",
	"driver":"http",
	"desc":"http",
	"listen":8080,
	"rules":[{
		"location":"/"
	}],
	"target":"param@service"
}'
```

**请求示例**

```shell
curl -X GET 'http://127.0.0.1:8080'
```

**返回结果**

```json
{
	"body": "",
	"header": {
		"Accept": ["*/*"],
		"Content-Length": ["0"],
		"Content-Type": ["application/octet-stream"],
		"User-Agent": ["curl/7.61.1"],
		"X-Forwarded-For": ["127.0.0.1,127.0.0.1"]
	},
	"host": "127.0.0.1:8080",
	"method": "POST",
	"path": "/",
	"query": {
		"demo_param": ["1"]
	},
	"url": "/?demo_param=1"
}

//可以看到上面的返回示例里demo_param的值为1
```



#### 以使用额外参数插件为例，配置全局插件。

**全局插件配置**

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
	"plugins":[{
		"id":"eolinker.com:apinto:extra_params",
		"name":"my_extra_params",
		"type":"service",
		"status":"global"
		"config":{
            "params": [{
            "name": "demo_param",
            "position": "query",
            "value": "1",
            "conflict": "Convert"
            }],
            "error_type": "text"
        }
	}]
}'
```

**配置服务**

**备注**：匿名服务配置的是能够返回转发请求信息接口所在的后端地址。

```shell
curl -X POST  'http://127.0.0.1:9400/api/service' \
-H 'Content-Type:application/json' \
-d '{
    "name": "param",
    "driver": "http",
    "timeout": 3000,
    "retry": 3,
    "scheme": "http",
    "anonymous": {
        "type": "round-robin",
        "config": "demo-apinto.eolink.com:8280"
    }
}' 
```

**配置路由**

```shell
curl -X POST  'http://127.0.0.1:9400/api/router' \
-H 'Content-Type:application/json' \
-d '{
	"name":"params",
	"driver":"http",
	"desc":"http",
	"listen":8080,
	"rules":[{
		"location":"/"
	}],
	"target":"param@service"
}'
```

**请求示例**

```shell
curl -X GET 'http://127.0.0.1:8080'
```

**返回结果**

```json
{
	"body": "",
	"header": {
		"Accept": ["*/*"],
		"Content-Length": ["0"],
		"Content-Type": ["application/octet-stream"],
		"User-Agent": ["curl/7.61.1"],
		"X-Forwarded-For": ["127.0.0.1,127.0.0.1"]
	},
	"host": "127.0.0.1:8080",
	"method": "POST",
	"path": "/",
	"query": {
		"demo_param": ["1"]
	},
	"url": "/?demo_param=1"
}

//可以看到上面的返回示例里demo_param的值为1
```
