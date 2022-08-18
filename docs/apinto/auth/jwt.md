# JWT

### 功能描述

通过在网关上配置JWT的校验规则，由网关对JWT Token进行校验，校验通过则转发请求，否则拦截请求。



#### jwt_token生成示例

以下面配置为例

```
auth:
  -
    name: demo_jwt
    driver: jwt
    hide_credentials: true 
    signature_is_base64: false  
    run_on_preflight: true 
    claims_to_verify: 
      - exp 
      - nbf  
    credentials: 
      -
        iss: TestHS256  
        secret: eolinker  
        rsa_public_key:   
        algorithm: HS256 
```

（1）jwt的header：
{
“alg”: “HS256”,
“typ”: “JWT”
}

（2）jwt的playload：
{
“iss”: “TestHS256”,
“exp”:1533112042,
“nbf”:1533111044
}

（3）jwt的verify signature：
HMACSHA256(
base64UrlEncode(header) + “.” +
base64UrlEncode(payload),"eolinker"
)

（4）jwt的jwt_token：
header.playload.signature

### Open API配置鉴权及进行请求的示例

#### 配置参数说明

| 参数名                        | 说明                                                         | 是否必填 | 默认值 | 值可能性                                                     |
| ----------------------------- | ------------------------------------------------------------ | -------- | ------ | ------------------------------------------------------------ |
| name                          | 实例名                                                       | 是       |        | string                                                       |
| driver                        | 所使用的鉴权类别                                             | 是       |        | "jwt"                                                        |
| description                   | 描述                                                         | 否       |        | string                                                       |
| hide_credentials              | 是否隐藏请求中鉴权密钥的字段                                 | 否       | false  | bool                                                         |
| signature_is_base64           | 使用HS256,HS384,HS512加密时,secret 是否使用了base64算法进行加密 | 否       | false  | bool                                                         |
| claims_to_verify              | jwt需要进行验证的字段，仅支持:exp,nbf                        | 否       |        | string_array                                                 |
| credentials                   | 密钥列表                                                     | 是       |        | object_array                                                 |
| credentials -> iss            | 签发人                                                       | 是       |        | string                                                       |
| credentials -> secret         | 密钥  使用HS256,HS384,HS512时必填                            | 否       |        | string                                                       |
| credentials -> rsa_public_key | rsa公钥  使用RS256,RS384,RS512,ES256,ES384,ES512时必填       | 否       |        | string                                                       |
| credentials -> algorithm      | 所使用的加密算法                                             | 是       |        | ["HS256","HS384","HS512","RS256","RS384","RS512","ES256","ES384","ES512"] |
| credentials -> labels         | 标签，object中的键值对会被均赋值到通过该密钥鉴权后的请求的上下文中，可被插件使用，例如access-log。 | 否       |        | object                                                       |

**注意事项**：

* **exp**: 过期时间   **nbf**: 生效时间
* **payload** 的计算内容为iss、exp与nbf（若claimsToVerify有配置exp与nbf，则加入到payload的计算）



#### 返回参数说明

| 参数名              | 类型         | 是否必含 | 说明                                                 |
| ------------------- | ------------ | -------- | ---------------------------------------------------- |
| id                  | string       | 是       | 实例id                                               |
| name                | string       | 是       | 实例名                                               |
| driver              | string       | 是       | 驱动名                                               |
| description         | string       | 是       | 描述                                                 |
| profession          | string       | 是       | 模块名                                               |
| create              | string       | 是       | 创建时间                                             |
| update              | string       | 是       | 更新时间                                             |
| hide_credentials    | bool         | 是       | 是否隐藏请求中鉴权密钥的字段                                     |
| signature_is_base64 | bool         | 是       | secret 或 rsa_public_key是否使用了base64算法进行加密 |
| claims_to_verify    | string_array | 是       | jwt需要进行验证的字段，仅支持:exp,nbf                |
| credentials         | object_array | 是       | 密钥列表                                             |

**备注**：返回体内的credentials参考请求配置参数，在此不再赘述。



#### 请求中鉴权参数填写位置说明

| 参数名             | 说明     | 必填 | 值可能性 | 参数位置 |
| ------------------ | -------- | ---- | -------- | -------- |
| Authorization-Type | 鉴权方式 | 是   | Jwt      | Header   |
| Authorization      | Token值  | 是   |          | Header   |
| jwt_token          | Token值  | 是   |          | Body     |
| jwt_token          | Token值  | 是   |          | Query    |

注意：token在Header、Body、Query三处任意一处添加即可。



#### 全局配置

在使用jwt鉴权插件之前，需要在全局插件配置中将鉴权插件状态设置为enable，具体配置点此[跳转](/docs/apinto/plugins)

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
	"plugins":[{
		"id":"eolinker.com:apinto:auth",
		"name":"myAuth",
		"status":"enable"
	}]
}'
```

#### 创建鉴权

例子里证书包含HS256,RS256,ES256

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/auth' \
  -H 'Content-Type:application/json' \
  -d '{
    "name": "demo_jwt",
    "driver": "jwt",
    "description": "jwt鉴权实例,当前配置了三个证书",
    "credentials": [{
        "iss": "TestHS256",
        "secret": "eolinker",
        "rsa_public_key": "",
        "algorithm": "HS256"
    }, {
        "iss": "TestRS256",
        "rsa_public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv\nvkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHc\naT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIy\ntvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0\ne+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWb\nV6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9\nMwIDAQAB\n-----END PUBLIC KEY-----",
        "algorithm": "RS256"
    }, {
        "iss": "TestES256",
        "rsa_public_key": "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEVs/o5+uQbTjL3chynL4wXgUg2R9\nq9UU8I5mEovUf86QZ7kOBIjJwqnzD1omageEHWwHdBO6B+dFabmdT9POxg==\n-----END PUBLIC KEY-----",
        "algorithm": "ES256"
    }],
    "signature_is_base64": false,
    "claims_to_verify": ["exp", "nbf"],
    "hide_credentials": true
}'
```

##### 返回结果示例

```json
{
	"claims_to_verify": ["exp", "nbf"],
	"create": "2022-06-14 11:02:48",
	"credentials": [{
		"algorithm": "HS256",
		"iss": "TestHS256",
		"labels": null,
		"rsa_public_key": "",
		"secret": "eolinker"
	}, {
		"algorithm": "RS256",
		"iss": "TestRS256",
		"labels": null,
		"rsa_public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv\nvkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHc\naT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIy\ntvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0\ne+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWb\nV6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9\nMwIDAQAB\n-----END PUBLIC KEY-----",
		"secret": ""
	}, {
		"algorithm": "ES256",
		"iss": "TestES256",
		"labels": null,
		"rsa_public_key": "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEVs/o5+uQbTjL3chynL4wXgUg2R9\nq9UU8I5mEovUf86QZ7kOBIjJwqnzD1omageEHWwHdBO6B+dFabmdT9POxg==\n-----END PUBLIC KEY-----",
		"secret": ""
	}],
	"description": "jwt鉴权实例,当前配置了三个证书",
	"driver": "jwt",
	"hide_credentials": true,
	"id": "demo_jwt@auth",
	"name": "demo_jwt",
	"profession": "auth",
	"signature_is_base64": false,
	"update": "2022-06-14 11:02:48"
}
```

```
返回的鉴权ID为demo_jwt@auth
```



#### 创建服务

**鉴权id绑定服务**：将上一步生成的鉴权id添加至服务plugins配置中的auth数组

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "jwt_service",
	"driver": "http",
	"description": "使用jwt鉴权的服务",
	"timeout": 10000,
	"retry": 3,
	"scheme": "https",
	"nodes": ["demo-apinto.eolink.com:8280"],
	"balance": "round-robin",
	"plugins": {
		"myAuth": {
			"disable": false,
			"config": {
				"auth": ["demo_jwt@auth"]
			}
		}
	}
}'
```

```
返回的serviceID为jwt_service@service
```



#### 创建路由

**服务id绑定路由**：上一步生成的服务id绑定至路由路由的target字段

```shell
curl -X POST 'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "jwt_router",
	"driver": "http",
	"description": "该路由的目标服务使用了jwt鉴权",
	"listen": 8099,
	"rules": [{
		"location": "/demo/jwt"
	}],
	"target": "jwt_service@service"
}'
```



#### 请求示例

```shell
curl -X GET 'http://127.0.0.1:8099/demo/jwt' \
-H 'Content-Type:application/x-www-form-urlencoded' \
-H 'Authorization-Type:jwt' \
-H 'Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUZXN0SFMyNTYiLCJleHAiOjIyNjkzMDcyNTMsIm5iZiI6MTYzODE1NTI1M30.UOk3_yd1dghivIaaNumTr_-W5dtn6pN5Ln3EJj6Cy5c'
```



#### 请求返回结果

```json
{
	"body": "",
	"header": {
		"Accept": ["*/*"],
		"Authorization-Type": ["jwt"],
		"Content-Type": ["application/x-www-form-urlencoded"],
		"User-Agent": ["curl/7.68.0"],
		"X-Forwarded-For": ["127.0.0.1,127.0.0.1"]
	},
	"host": "127.0.0.1:8099",
	"method": "GET",
	"path": "/demo/jwt",
	"query": {},
	"remote_addr": "127.0.0.1:58800",
	"url": "/demo/jwt"
}
```

