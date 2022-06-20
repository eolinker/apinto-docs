# Basic Auth

### 功能描述

鉴权方式的一种，设置Basic Auth的Username与Password，不能通过认证的用户将无权访问接口。



### OpenAPI配置鉴权及进行请求的示例

#### 配置参数说明

| 参数名           | 说明                                                         | 是否必填 | 默认值 | 值可能性     |
| ---------------- | ------------------------------------------------------------ | -------- | ------ | ------------ |
| name             | 实例名                                                       | 是       |        | string       |
| driver           | 所使用的鉴权类别                                             | 是       |        | "basic"      |
| description      | 描述                                                         | 否       |        | string       |
| hide_credentials | 是否隐藏证书字段                                             | 否       | false  | bool         |
| user             | 用户列表                                                     | 是       |        | object_array |
| user -> username | 用户名                                                       | 是       |        | string       |
| user -> password | 用户密码                                                     | 是       |        | string       |
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
| user             | object_array | 是       | 用户列表         |

**备注**：返回体内的user参考请求配置参数，在此不再赘述。



#### 请求中鉴权参数填写位置说明

| 参数名             | 说明     | 必填 | 值可能性                                             | 参数位置 |
| ------------------ | -------- | ---- | ---------------------------------------------------- | -------- |
| Authorization-Type | 鉴权方式 | 是   | basic、basic_auth、basic-auth、basicauth             | Header   |
| Authorization      | 鉴权值   | 是   | Basic+空格+(username:password用base64加密后的字符串) | Header   |



#### 全局配置

在使用basic鉴权插件之前，需要在全局插件配置中将鉴权插件状态设置为enable，具体配置点此[跳转](/docs/apinto/plugins)

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
	"name": "demo_basic",
	"driver": "basic",
	"description": "basic鉴权，当前仅配置了一组user",
	"user": [{
		"username": "apinto",
		"password": "123456",
		"expire": 0
	}]
}'
```

##### 返回结果示例

```json
{
	"create": "2022-06-13 18:06:34",
	"description": "basic鉴权，当前仅配置了一组user",
	"driver": "basic",
	"hide_credentials": false,
	"id": "demo_basic@auth",
	"name": "demo_basic",
	"profession": "auth",
	"update": "2022-06-13 18:06:34",
	"user": [{
		"expire": 0,
		"labels": null,
		"password": "123456",
		"username": "apinto"
	}]
}
```

```
返回的鉴权id为demo_basic@auth
```



#### 创建服务

**鉴权id绑定服务**：将上一步生成的鉴权id添加至服务plugins配置中的auth数组

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "basic_service",
	"driver": "http",
	"description": "该服务使用了basic鉴权",
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
				"auth": ["demo_basic@auth"]
			}
		}
	}
}'
```

##### 返回结果示例

```
返回的serviceID为basic_service@service
```



#### 创建路由

**服务id绑定路由**：上一步生成的服务id绑定至路由路由的target字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "basic_router",
	"driver": "http",
	"description": "创建使用鉴权basic服务的路由",
	"listen": 8099,
	"rules": [{
		"location": "/demo/basic"
	}],
	"target": "basic_service@service"
}'
```

##### 

#### 请求示例

```shell
curl -X GET  \
  'http://127.0.0.1:8099/demo/basic' \
  -H 'Content-Type:application/x-www-form-urlencoded' \
  -H 'Authorization-Type:basic' \
  -H 'Authorization: Basic YXBpbnRvOjEyMzQ1Ng=='
```



#### 请求返回示例

```json
{
	"body": "",
	"header": {
		"Accept": ["*/*"],
		"Authorization": ["Basic Z29rdToxMjM0NTY="],
		"Authorization-Type": ["basic"],
		"Content-Type": ["application/x-www-form-urlencoded"],
		"User-Agent": ["curl/7.68.0"],
		"X-Forwarded-For": ["127.0.0.1,127.0.0.1"]
	},
	"host": "127.0.0.1:8099",
	"method": "GET",
	"path": "/demo/basic",
	"query": {},
	"remote_addr": "127.0.0.1:1791",
	"url": "/demo/basic"
}
```

