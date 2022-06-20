# API KEY

### 功能描述

鉴权方式的一种，多用于OpenAPI，设置Apikey参数，不能通过认证的用户将无权访问接口。




### OpenAPI配置鉴权及进行请求的示例

#### 配置参数说明

| 参数名           | 说明                                                         | 是否必填 | 默认值 | 值可能性     |
| ---------------- | ------------------------------------------------------------ | -------- | ------ | ------------ |
| name             | 实例名                                                       | 是       |        | string       |
| driver           | 所使用的鉴权类别                                             | 是       |        | "apikey"     |
| description      | 描述                                                         | 否       |        | string       |
| hide_credentials | 是否隐藏证书字段                                | 否       | false  | bool         |
| user             | 密钥列表                                                     | 是       |        | object_array |
| user -> apikey   | api密钥                                                      | 是       |        | string       |
| user -> expire   | 过期时间 类型是unix时间戳 范围>=0 值为0表示永久有效          | 是       |        | int          |
| user -> labels   | 标签，object中的键值对会被均赋值到通过该密钥鉴权后的请求的上下文中，可被插件使用，例如access-log。 | 否       |        | object       |



#### 返回参数说明

| 参数名           | 类型         | 是否必含 | 说明             |
| ---------------- | ------------ | -------- | ---------------- |
| id               | string       | 是       | 实例id           |
| name             | string       | 是       | 实例名           |
| driver           | string       | 是       | 驱动名           |
| description      | string       | 是       | 描述             |
| profession       | string       | 是       | 模块名           |
| create           | string       | 是       | 创建时间         |
| update           | string       | 是       | 更新时间         |
| hide_credentials | bool         | 是       | 是否隐藏证书字段 |
| user             | object_array | 是       | 密钥列表         |

**备注**：返回体内的user参考请求配置参数，在此不再赘述。



#### 请求中鉴权参数填写位置说明

| 参数名             | 说明     | 必填 | 值可能性                                     | 参数位置 |
| ------------------ | -------- | ---- | -------------------------------------------- | -------- |
| Authorization-Type | 鉴权方式 | 是   | apikey、apikeyauth、apikey-auth、apikey_auth | Header   |
| Authorization      | Apikey值 | 是   |                                              | Header   |
| Apikey             | Apikey值 | 是   |                                              | Body     |
| Apikey             | Apikey值 | 是   |                                              | Query    |

**注意**：Apikey在Header、Body、Query三处任意一处添加即可。



#### 全局配置

在使用apikey鉴权插件之前，需要在全局插件配置中将鉴权插件状态设置为enable，具体配置点此[跳转](/docs/plugins)

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' -H 'Content-Type:application/json' -d '{
   "plugins":[{
      "id":"eolinker.com:apinto:auth",
      "name":"myAuth",
      "status":"enable"
   }]
}'
```



#### 创建鉴权

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/auth' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_apikey",
	"driver": "apikey",
	"description": "apikey鉴权",
	"user": [{
		"apikey": "apinto",
		"expire": 0
	}, {
		"apikey": "eolinker",
		"expire": 1659776375
	}]
}'
```



##### 返回结果示例

```json
{
	"create": "2022-06-13 17:46:26",
	"description": "apikey鉴权",
	"driver": "apikey",
	"hide_credentials": false,
	"id": "demo_apikey@auth",
	"name": "demo_apikey",
	"profession": "auth",
	"update": "2022-06-13 17:46:26",
	"user": [{
		"apikey": "apinto",
		"expire": 0,
		"labels": null
	}, {
		"apikey": "eolinker",
		"expire": 1659776375,
		"labels": null
	}]
}
```

```
返回的鉴权ID为demo_apikey@auth
```



#### 创建服务

**鉴权id绑定服务**：将上一步生成的鉴权id添加至服务plugins配置中的auth数组

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "apikey_service",
	"driver": "http",
	"description": "使用apikey鉴权的服务",
	"timeout": 10000,
	"anonymous": {
		"type": "round-robin",
		"config": "demo-apinto.eolink.com:8280"
	},
	"retry": 3,
	"scheme": "https",
	"plugins": {
	  "myAuth": {
		"disable": false,
		  "config": {
			"auth": ["demo_apikey@auth"]
		  }
		}
	  }
    }'
```

```
返回的serviceID为apikey_service@service
```



#### 创建路由

**服务id绑定路由**：上一步生成的服务id绑定至路由路由的target字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "apikey_router",
	"driver": "http",
	"description": "该路由的目标服务使用了apikey鉴权",
	"listen": 8099,
	"rules": [{
		"location": "/demo/apikey"
	}],
	"target": "apikey_service@service"
}'
```



#### 请求示例

```shell
curl -X GET  \
  'http://127.0.0.1:8099/demo/apikey' \
  -H 'Content-Type:application/x-www-form-urlencoded' \
  -H 'Authorization-Type:apikey' \
  -H 'Authorization:apinto'
```



#### 请求返回示例

```json
{
  "body": "",
  "header": {
    "Accept": ["*/*"],
    "Authorization": ["apinto"],
    "Authorization-Type": ["apikey"],
    "Content-Type": ["application/x-www-form-urlencoded"],
    "User-Agent": ["curl/7.68.0"],
    "X-Forwarded-For": ["127.0.0.1,127.0.0.1"]
  },
  "host": "127.0.0.1:8099",
  "method": "GET",
  "path": "/demo/apikey",
  "query": {},
  "remote_addr": "127.0.0.1:1089",
  "url": "/demo/apikey"
}
```



