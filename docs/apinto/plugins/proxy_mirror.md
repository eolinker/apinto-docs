# prometheus
## 插件信息

| 名称         | 字段         | 属性     |
| ------------ | ------------ | -------- |
| 流量镜像插件 | proxy_mirror | 可观测性 |

## 功能描述

流量镜像插件能够将线上真实流量拷贝到镜像服务中，以便在不影响线上服务的情况下，对线上流量或请求内容进行具体的分析。



## 配置参数说明

| 参数名                    | 值类型 | 是否必填 | 默认值 | 值可能性              | 说明                                                         |
| ------------------------- | ------ | -------- | ------ | --------------------- | ------------------------------------------------------------ |
| addr                      | string | 是       |        | http://127.0.0.1:7777 | 指定镜像服务的地址，地址中需要包含 `schema`（`http` 或 `https`），但不能包含 `path` 部分。例如 `http://127.0.0.1:7777`。 |
| timeout                   | int    | 否       | 3000   | 3000                  | 镜像请求的超时时间，单位为毫秒                               |
| pass_host                 | string | 否       | "pass" | pass                  | 请求发给上游时的 host 设置选型，可选["pass","node","rewrite"]其一 |
| host                      | string | 否       |        | 127.0.0.1             | 指定镜像请求的host，只有在 `pass_host` 配置为 rewrite 时有效 |
| sample_conf               | object | 是       |        | object                | 采样配置                                                     |
| sample_conf->random_range | int    | 是       |        | 1                     | 随机数的生成范围                                             |
| sample_conf->random_pivot | int    | 是       |        | 1                     | 随机数锚点，当生成的随机数小于或等于该值，则进行请求转发     |

**备注**：

* `pass_host`配置说明:
  * pass:将客户端的 host 透传给上游
  * node:使用addr中配置的host
  * rewrite:使用下面指定的host值
* 采样配置，`random_pivot`必须小于等于`random_range`，当相等时，则为全采样。



## Open API 请求示例


### 全局启用proxy_mirror插件

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:proxy_mirror",
        "name":"demo_proxy_mirror",
        "status":"enable"
    }]
}'
```

全局插件具体配置点此进行[跳转](/docs/dashboard/plugins/)。



### 配置示例服务

上游使用的是官方示例接口地址。

```shell
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' -d '{
    "name": "demo_service", 
    "driver": "http", 
    "timeout": 2000, 
    "retry": 0, 
    "scheme": "HTTP", 
    "nodes": [
        "demo.apinto.com:8280"
    ], 
    "pass_host":"pass",
    "balance": "round-robin"
}'
```



### 配置带有流量镜像插件的路由

这在一步中，路由请求路径设置为`/test`, 监听端口为8099，绑定了上一步的示例服务，并在插件配置中设置了流量镜像插件。

流量镜像插件配置为全采样，请求超时时间为3000毫秒，host透传。镜像服务地址设置为我本地的一个服务，该服务会回显镜像请求的请求体。

```shell
curl -X POST  'http://127.0.0.1:9400/api/router' \
-H 'Content-Type:application/json' -d '{
	"name": "demo_router",
	"description": "",
	"driver": "http",
	"listen": 8099,
	"location": "/test",
	"method": ["GET", "POST", "PUT"],
	"service": "demo_service@service",
	"retry": 0,
	"time_out": 3000,
  	"plugins": {
		"demo_proxy_mirror": {
			"config": {
				"Addr": "http://127.0.0.1:9999",
				"pass_host": "pass",
				"sample_conf": {
					"random_pivot": 10,
					"random_range": 10
				},
				"timeout": 3000
			},
			"disable": false
		}
	}
}'
```





#### 调用示例路由

```shell
curl -X POST http://127.0.0.1:8099/test -d '
Hello

World!'
```

查看镜像服务的打印内容，即为请求的body。

![](http://data.eolinker.com/course/ca9ZJ5Gf6f85a6ff71227ea815daeb2ada4fa0d6f39f662.png)

