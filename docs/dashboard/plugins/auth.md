# 鉴权
### 插件名称

| 名称 | 字段 | 属性     |
| ---- | ---- | -------- |
| 鉴权 | auth | 安全防御 |

### 功能描述

鉴权是指验证用户是否拥有访问系统或服务的权利。目前主要提供了以下的鉴权功能：

| 功能   | 属性                  |
| ------ | --------------------- |
| AK/SK  | 用户鉴权              |
| APIKey | 用户鉴权（静态token） |
| Basic  | 用户鉴权（静态token） |
| JWT    | 用户鉴权（动态token） |

### Open Api

#### 插件配置参数


| 参数名 | 说明                | 是否必填 | 默认值 | 取值范围     |
| ------ | ------------------- | -------- | ------ | ------------ |
| auth   | 所使用的auth ID列表 | 是       |        | array_string |

以apiKey鉴权为例，可以通过下述open api对鉴权插件进行配置，关于鉴权插件的详细配置说明，可以[点此](/docs/apinto/auth)跳转查阅

#### 全局插件加入鉴权插件配置

设置状态为**enable**

```sh
curl -X POST 'http://127.0.0.1:9400/api/setting/plugin' -H 'Content-Type:application/json' \
-d '{
  "plugins": [{
    "id": "eolinker.com:apinto:auth",
    "name": "myAuth",
    "status": "enable"
  }]
}'
```

#### 创建鉴权，获取鉴权id

```sh
curl -X POST 'http://127.0.0.1:9400/api/auth' -H 'Content-Type:application/json' \
-d '{
  "name": "demo_apikey",
  "driver": "apikey",
  "description": "apikey鉴权",
  "user": [{
	"apikey": "apinto",
	"expire": 0
	}, 
	{
	"apikey": "eolinker",
	"expire": 1659776375
  }]
}'
```

```
返回的鉴权ID为demo_apikey@auth
```

#### 鉴权id绑定服务，获取服务id

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```sh
curl -X POST 'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' \
-d '{
  "name": "auth_apikey_service",
  "driver": "http",
  "description": "使用apikey鉴权的服务",
  "scheme": "https",
  "timeout": 3000,
  "anonymous": {
	"type": "round-robin",
	"config": "demo-apinto.eolink.com:8280"
  },
  "retry": 3,
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

```sh
返回的serviceID为auth_apikey_service@service
```

#### 服务id绑定路由

将上一步生成的服务id绑定至路由路由的target字段

```sh
curl -X POST 'http://127.0.0.1:9400/api/router' -H 'Content-Type:application/json' \
-d '{
  "name": "auth_apikey_router",
  "driver": "http",
  "description": "该路由的目标服务使用了apikey鉴权",
  "listen": 8099,
  "rules": [{
	"location": "/demo/auth"
  }],
  "target": "auth_apikey_service@service"
}'
```

#### 接口请求

基于鉴权设置，设置合法请求头发起请求

```sh
curl -X GET 'http://127.0.0.1:8099/demo/auth' \
  -H 'Content-Type:application/x-www-form-urlencoded' \
  -H 'Authorization-Type:apikey' \
  -H 'Authorization:apinto'
```

返回状态码200及demo接口反馈内容
