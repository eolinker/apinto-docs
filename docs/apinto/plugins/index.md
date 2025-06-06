# 插件系统
插件系统的插件能够在**路由**、**全局**中配置。

若在多个模块配置了同一个插件，则**配置优先级**为：路由>全局，且插件只生效一次。
`即路由、全局均配置同一个插件，最终会以路由的配置为准`

插件执行流程见下图：

请求从客户端发出，到达路由进行转发前，会按顺序从上到下进行每个插件的转发前处理。接着从后端服务得到响应，之后从下到上执行每个插件的转发后处理。

![](http://data.eolinker.com/course/sysHI9S4e325d6a480cc304b1c71b43dced042aed023e70.png)

`请求处理即为请求转发前执行的操作，响应处理即为转发获得响应后的操作`

**备注**：

* 具体转发操作视插件而定，有的插件只有转发前处理或转发后处理，有的两者都有。
* 全局插件配置用于启动具体插件，也可为具体插件配置参数，让其在全局范围内生效。
* 插件生效的前提是先在全局插件中开启。
* **插件执行顺序**按全局插件配置中插件的配置顺序。





### 插件列表

| 插件名称                                                         | 字段名                   | 插件类型 | 说明                                                                      |
|--------------------------------------------------------------|-----------------------|------|-------------------------------------------------------------------------|
| [额外参数](/docs/apinto/plugins/extra_params.md)                 | extra_params          | 请求处理 | 转发时在请求中携带自定义参数                                                          |
| [额外参数_v2](/docs/apinto/plugins/extra_params_v2.md)           | extra_params_v2       | 请求处理 | 转发时在请求中携带自定义参数，支持动态处理参数                                                 |
| [参数映射](/docs/apinto/plugins/params_transformer.md)           | params_transformer    | 请求处理 | 转发时将请求中的原参数映射成自定义参数                                                     |
| [格式转换](/docs/apinto/plugins/data_transform.md)               | data_transform        | 请求处理 | 对请求体、响应体内容自动进行JSON和XML格式互转                                              |
| [次数扣减](/docs/apinto/plugins/counter.md)                      | counter               | 流量管控 | 确保API请求的数量保持在可接受的限制范围内，防止过载，并确保资源的公平分配                                  |
| [参数校验](/docs/apinto/plugins/params_check.md)                 | params_check          | 安全防护 | 校验请求体 、请求头部 、Query参数的有效性和合法性，过滤/拦截无效请求。                                 |
| [请求体大小限制](/docs/apinto/plugins/body_check.md)                | body_check            | 安全防护 | 通过限制请求体大小，可以有效地控制网络流量、保护服务器资源和防止潜在的安全威胁                                 |
| [转发重写](/docs/apinto/plugins/proxy_rewrite.md)                | proxy_rewrite         | 请求处理 | 转发时对请求的host、scheme、uri进行重写，同时能在请求头加入自定义参数                               |
| [转发重写_v2](/docs/apinto/plugins/proxy_rewrite_v2.md)          | proxy_rewrite_v2      | 请求处理 | 转发时对请求的host、scheme、uri进行重写，同时能在请求头加入自定义参数，对转发路径path的重写支持静态重写，前缀替换，正则替换  |
| [HTTP-MOCK](/docs/apinto/plugins/http-mocking.md)            | http-mocking          | 请求处理 | 当执行该插件时，它将随机返回指定格式的模拟数据，并且请求不会转发到上游。                                    |
| [Dubbo2协议转发重写](/docs/apinto/plugins/dubbo2-proxy-rewrite.md) | dubbo2-proxy-rewrite  | 请求处理 | 转发时，对dubbo2协议请求的service_name、method_name进行重写，同时能对attachment加入自定义参数      |
| [HTTP协议转Dubbo2协议](/docs/apinto/plugins/http-to-dubbo2.md)    | http-to-dubbo2        | 协议转换 | 将HTTP请求转换成Dubbo2请求                                                      |
| [Dubbo2协议转HTTP协议](/docs/apinto/plugins/dubbo2-to-http.md)    | dubbo2-to-http        | 协议转换 | 将Dubbo2请求转换成HTTP请求                                                      |
| [gRPC协议转发重写](/docs/apinto/plugins/grpc-proxy_rewrite.md)     | proxy_rewrite         | 请求处理 | 对上游代理信息进行重写。包括重写转发的服务名、重写转发的方法名、重写虚拟主机域名（`:authority`）、对转发的请求头部进行新增、修改等 |
| [HTTP协议转gRPC协议](/docs/apinto/plugins/http-to-grpc.md)        | http-to-grpc          | 协议转换 | 将HTTP请求转换成gRPC请求                                                        |
| [gRPC协议转HTTP协议](/docs/apinto/plugins/grpc-to-http.md)        | grpc-to-http          | 协议转换 | 将gRPC请求转换成HTTP请求                                                        |
| [IP黑白名单](/docs/apinto/plugins/ip_restriction.md)             | ip_restriction        | 安全防控 | 对访问的客户端ip进行黑白限制                                                         |
| [流量控制](/docs/apinto/plugins/rate_limiting.md)                | rate_limiting         | 安全防控 | 控制请求在单位时间内的访问次数                                                         |
| [响应重写](/docs/apinto/plugins/response_rewrite.md)             | response_rewrite      | 响应处理 | 用于重写网关返回的状态码、响应体、头部                                                     |
| [响应重写v2](/docs/apinto/plugins/response_rewrite_v2.md)        | response_rewrite_v2   | 响应处理 | 当匹配响应状态码、响应体、响应头部后，重写响应信息，重写内容包括网关返回的状态码、响应体、头部。                        |
| [响应过滤](/docs/apinto/plugins/response_filter.md)              | response_filter       | 响应处理 | 用于过滤响应体字段、响应头部字段，通过隐藏上游服务返回的部分字段，避免敏感信息泄露                               |
| [请求拦截](/docs/apinto/plugins/request_interception.md)         | request_interception  | 安全防护 | 用于拦截请求，防止非法请求转发到上游服务                                                    |
| [API熔断](/docs/apinto/plugins/circuit_breaker.md)             | circuit_breaker       | 安全防护 | 用于停止对不可用API的转发                                                          |
| [跨域CORS](/docs/apinto/plugins/cors.md)                       | cors                  | 安全防控 | 设置跨域的头部字段，实现跨域功能                                                        |
| [GZIP压缩](/docs/apinto/plugins/gzip.md)                       | gzip                  | 响应处理 | 将响应进行gzip压缩，以提高传输效率                                                     |
| [ACCESS访问日志](/docs/apinto/plugins/access_log.md)             | access_log            | 可观测性 | 记录到达网关的HTTP请求的访问日志                                                      |
| [流量镜像](/docs/apinto/plugins/proxy_mirror.md)                 | proxy_mirror          | 可观测性 | 将线上真实流量拷贝到镜像服务中，以便在不影响线上服务的情况下，对线上流量或请求内容进行具体的分析。                       |
| [Prometheus](/docs/apinto/plugins/prometheus.md)             | prometheus            | 可观测性 | 将请求的信息和配置的指标列表发送给指定的prometheus输出器，由各个prometheus输出器内同名的指标处理并采集请求内的信息     |
| [请求文件解析](/docs/apinto/plugins/request-file-parse.md)         | request-file-parse    | 请求处理 | 解析客户端请求上传的文件信息，提取文件请求中的文件后缀、文件大小等信息，将其设置为系统变量，供后续插件使用                   |
| [响应文件解析](/docs/apinto/plugins/response-file-parse.md)        | response-file-parse   | 响应处理 | 析后端服务返回的文件信息，提取文件请求中的文件后缀、文件大小等信息，将其设置为系统变量，供后续插件使用                     |

### 全局插件配置

全局插件配置声明在程序运行过程中加载插件的名称、顺序、插件的启用状态。

#### 配置参数说明


| 参数名               | 说明                                  | 是否必填    | 默认值 | 值可能性          |
|-------------------|:------------------------------------|---------|-----|---------------|
| plugins           | 插件列表                                | 是       |     | array_object  |
| plugins -> id     | 插件id，{group}:{project}:{name}       | 是       |     | string        |
| plugins -> name   | 插件名/插件别名, 在列表中唯一                    | 是       |     | string        |
| plugins -> status | 插件状态                                | 是       |     | string        |
| plugins -> config | 插件的全局配置，当status=global时生效，内容由对应插件决定 | 是       |     | object        |

在配置过程中，`id`为插件的驱动ID，`name`为插件的执行别名，全局唯一，在router、service配置时填写。如额外参数插件ID为`eolinker.com:apinto:extra_params`，配置的`name`为`extra_params1`，在router、service阶段时使用该插件时填写的名称为`extra_params1`，则可进行调用。

全局插件有三个**状态**：

* **disable**

  禁用状态：表示插件处于禁用状态，即便某个路由配置了该插件也不会生效。

* **enable**

  启用状态：表示启用插件。某个路由配置了插件，需要在全局插件配置中将对应插件状态配置为enable才能生效。

  **备注**：该状态下的插件不需要在全局插件配置中填写具体配置。

* **global**

  全局插件状态：表示启用插件，同时作为全局插件。

  例如：配置了一个全局插件，在某个转发流程中的路由中均没有该插件配置，此时这个全局插件配置就会生效。

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



### router引用插件配置

在全局插件中启用了某个插件之后，可以在`router`中引用并配置它。

#### 配置参数说明


| 参数名                   | 说明                         | 是否必填 | 默认值 | 值可能性 |
| ------------------------ | :--------------------------- | -------- | ------ | -------- |
| plugins                  | 插件列表                     | 是       |        | object   |
| plugins -> {plugin_name} | 单个插件配置                 | 是       |        | object   |
| {plugin_name}-> disable  | 关闭插件                     | 是       |        | bool     |
| {plugin_name}-> config   | 具体配置视所使用的插件而不同 | 是       |        | object   |

#### 配置示例

以在路由中配置额外参数插件和`access_log`插件为例

```shell
curl -X POST  'http://127.0.0.1:9400/api/router' \
-H 'Content-Type:application/json' \
-d '{
	"name":"params_router",
	"driver":"http",
	"listen":8099,
    "location":"/plugin/extra_params"
	"rules":[],
	"target":"extra_param_service@service",
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

#### 以使用额外参数插件为例，为路由配置插件。

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
    "nodes": ["demo.apinto.com:8280"],
    "balance": "round-robin"
}' 
```

**配置路由**

路由中配置额外参数插件，plugins参数中每个插件key需要使用全局插件中对应插件的`name`。

比如下面路由插件配置里的`my_extra_params`使用的是上面全局插件配置里的`name`。


```shell
curl -X POST  'http://127.0.0.1:9400/api/router' \
-H 'Content-Type:application/json' \
-d '{
	"name":"params_router",
	"driver":"http",
	"listen":8099,
    "location":"/plugin/extra_params"
	"rules":[],
	"target":"extra_param_service@service",
	"plugins":{
		"my_extra_params":{
			"disable":false,
			"config":{
				"params":[{
					"name":"demo_param",
					"position":"query",
					"value":"1",
					"conflict":"Convert"
				}],
			"error_type":"text"
			}
		}
	}
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
    "nodes": ["demo.apinto.com:8280"],
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
  "location":"/plugin/global/extra_params"
  "rules":[],
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

```

可以看到上面的返回示例里demo_param的值为1
