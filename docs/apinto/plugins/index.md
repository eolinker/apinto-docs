# 插件系统
插件系统的插件能够在**路由**、**服务**、**全局**中配置。

若在多个模块配置了同一个插件，则**配置优先级**为：路由>服务>全局，且插件只生效一次。
`即路由和服务均配置同一个插件，最终会以路由的配置为准`

插件执行流程见下图：

请求从客户端发出，到达路由进行转发前，会按顺序从上到下进行每个插件的转发前处理。接着从后端服务得到响应，之后从下到上执行每个插件的转发后处理。

`请求处理即为请求转发前执行的操作，响应处理即为转发获得响应后的操作`

**备注**：

* 具体转发操作视插件而定，有的插件只有转发前处理或转发后处理，有的两者都有。
* 全局插件配置用于启动具体插件，也可为具体插件配置参数，让其在全局范围内生效。
* 插件生效的前提是先在全局插件中开启。
* **插件执行顺序**按全局插件配置中插件的配置顺序。

![](http://data.eolinker.com/course/sysHI9S4e325d6a480cc304b1c71b43dced042aed023e70.png)



### 插件列表

| 插件名称                                       | 字段名             | 说明                                                         |
| ---------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| [额外参数](/docs/apinto/plugins/extra_params.md)       | extra_params       | 转发时在请求中携带自定义参数                                 |
| [参数映射](/docs/apinto/plugins/params_transformer.md) | params_transformer | 转发时将请求中的原参数映射成自定义参数                       |
| [转发重写](/docs/apinto/plugins/proxy_rewrite.md)      | proxy_rewrite      | 转发时对请求的host、scheme、uri进行重写，同时能在请求头加入自定义参数 |
| [IP黑白名单](/docs/apinto/plugins/ip_restriction.md)   | ip_restriction     | 对访问的客户端ip进行黑白限制                                 |
| [流量控制](/docs/apinto/plugins/rate_limiting.md)      | rate_limiting      | 控制请求在单位时间内的访问次数                               |
| [鉴权](/docs/apinto/plugins/auth.md)                   | auth               | 对请求进行权限校验                                           |
| [响应重写](/docs/apinto/plugins/response_rewrite.md)   | response_rewrite   | 用于重写网关返回的状态码、响应体、头部                       |
| [API熔断](/docs/apinto/plugins/circuit_breaker.md)     | circuit_breaker    | 用于停止对不可用API的转发                                    |
| [跨域CORS](/docs/apinto/plugins/cors.md)               | cors               | 设置跨域的头部字段，实现跨域功能                             |
| [gzip压缩](/docs/apinto/plugins/gzip.md)               | gzip               | 将响应进行gzip压缩，以提高传输效率                           |
| [access_log](/docs/apinto/plugins/access_log.md)       | access_log         | 记录到达网关的http请求的访问日志                             |

### 全局插件配置

全局插件配置声明在程序运行过程中加载插件的名称、顺序、插件的启用状态。

#### 配置参数说明


| 参数名            | 说明                                                      | 是否必填 | 默认值 | 值可能性     |
| ----------------- | :-------------------------------------------------------- | -------- | ------ | ------------ |
| plugins           | 插件列表                                                  | 是       |        | array_object |
| plugins -> id     | 插件id，{group}:{project}:{name}                          | 是       |        | string       |
| plugins -> name   | 插件名/插件别名, 在列表中唯一                             | 是       |        | string       |
| plugins -> status | 插件状态                                                  | 是       |        | string       |
| plugins -> config | 插件的全局配置，当status=global时生效，内容由对应插件决定 | 是       |        | object       |

在配置过程中，`id`为插件的驱动ID，`name`为插件的执行别名，全局唯一，在router、service配置时填写。如额外参数插件ID为`eolinker.com:apinto:extra_params`，配置的`name`为`extra_params1`，在router、service阶段时使用该插件时填写的名称为`extra_params1`，则可进行调用。

全局插件有三个**状态**：

* **disable**

  禁用状态：表示插件处于禁用状态，即便某个路由|服务配置了该插件也不会生效。

* **enable**

  启用状态：表示启用插件。某个路由|服务配置了插件，需要在全局插件配置中将对应插件状态配置为enable才能生效。

  **备注**：该状态下的插件不需要在全局插件配置中填写具体配置。

* **global**

  全局插件状态：表示启用插件，同时作为全局插件。

  例如：配置了一个全局插件，在某个转发流程中的路由|服务中均没有该插件配置，此时这个全局插件配置就会生效。

  **备注**：该状态下的插件需要在全局插件配置填写具体配置。

#### 配置示例

以额外参数插件为例

```json
{
    "plugins":[
        {
            "id":"eolinker.com:apinto:extra_params",
            "name":"my_extra_params",
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
            "id":"eolinker.com:apinto:access_log",
            "name":"my_access_log",
            "status":"enable"
        }
    ]
}
```

**配置说明**：全局配置了两个插件，这两个插件分别为额外参数插件和access_log插件。

第一个插件别名为`my_extra_params`，是个全局插件，当转发路径上的router|service均没有配置该插件时才生效。

第二个插件别名为`my_access_log`，全局启用了，想要使用这个插件，需要在转发路径上的router|service配置具体参数。

**插件执行顺序**: 以上述配置为例，`my_extra_params`的执行顺序高于`my_access_log`。



### router、service引用插件配置

在全局插件中启用了某个插件之后，可以在`router`或`service`中引用并配置它。

#### 配置参数说明


| 参数名                   | 说明                         | 是否必填 | 默认值 | 值可能性 |
| ------------------------ | :--------------------------- | -------- | ------ | -------- |
| plugins                  | 插件列表                     | 是       |        | object   |
| plugins -> {plugin_name} | 单个插件配置                 | 是       |        | object   |
| {plugin_name}-> disable  | 关闭插件                     | 是       |        | bool     |
| {plugin_name}-> config   | 具体配置视所使用的插件而不同 | 是       |        | object   |

#### 配置示例

以在服务中配置额外参数插件和access_log插件为例

```shell
curl - X POST 'http://127.0.0.1:9400/api/service'\ 
-H 'Content-Type:application/json'\ 
-d '{
  "name": "extra_param_service",
  "driver": "http",
  "timeout": 3000,
  "retry": 3,
  "scheme": "http",
  "nodes": ["demo-apinto.eolink.com:8280"],
  "balance": "round-robin",
  "plugins": {
	  "my_access_log": {
		  "disable": false,
		  "config": {
			  "output": ["demo_file@output"]
		  }
	  },
	  "my_extra_params": {
		  "disable": false,
		  "config": {
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



### Open API配置插件示例

**获取全局插件配置接口**：GET /api/setting/plugin

**设置全局插件配置接口**：POST /api/setting/plugin   每次设置均为**全量更新**

#### 以使用额外参数插件为例，为服务配置插件。

**全局插件配置**

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
	"plugins": [{
	"id": "eolinker.com:apinto:extra_params",
	"name": "my_extra_params",
	"status": "enable"
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
    "name": "extra_param_service",
    "driver": "http",
    "timeout": 3000,
    "retry": 3,
    "scheme": "http",
    "nodes": ["demo-apinto.eolink.com:8280"],
    "balance": "round-robin",
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
	"name":"params_router",
	"driver":"http",
	"listen":8099,
	"rules":[{
	"location":"/plugin/extra_params"
	}],
	"target":"extra_param_service@service"
}'
```

**请求示例**

```shell
curl -X GET 'http://127.0.0.1:8099/plugin/extra_params'
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
	"host": "127.0.0.1:8099",
	"method": "POST",
	"path": "/plugin/extra_params",
	"query": {
		"demo_param": ["1"]
	},
	"url": "/plugin/extra_params?demo_param=1"
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
	  "status":"global",
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
    "name": "extra_param_service",
    "driver": "http",
    "timeout": 3000,
    "retry": 3,
    "scheme": "http",
    "nodes": ["demo-apinto.eolink.com:8280"],
    "balance": "round-robin"
}' 
```

**配置路由**

```shell
curl -X POST  'http://127.0.0.1:9400/api/router' \
-H 'Content-Type:application/json' \
-d '{
  "name":"params_router",
  "driver":"http",
  "listen":8099,
  "rules":[{
	"location":"/plugin/global/extra_params"
  }],
  "target":"extra_param_service@service"
}'
```

**请求示例**

```shell
curl -X GET 'http://127.0.0.1:8099/plugin/global/extra_params'
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
	"host": "127.0.0.1:8099",
	"method": "POST",
	"path": "/plugin/global/extra_params",
	"query": {
		"demo_param": ["1"]
	},
	"url": "/plugin/global/extra_params?demo_param=1"
}

//可以看到上面的返回示例里demo_param的值为1
```
