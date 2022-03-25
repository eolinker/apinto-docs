# JWT

### 功能描述

通过在网关上配置JWT的校验规则，由网关对JWT Token进行校验，校验通过则转发请求，否则拦截请求。

### yaml配置鉴权

```yaml
auth:
  -
    name: jwt_1
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
      -
        iss: TestRS256
        secret:
        rsa_public_key: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv\nvkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHc\naT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIy\ntvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0\ne+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWb\nV6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9\nMwIDAQAB\n-----END PUBLIC KEY-----"
        algorithm: RS256
      -
        iss: TestES256
        secret:
        rsa_public_key: "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEVs/o5+uQbTjL3chynL4wXgUg2R9\nq9UU8I5mEovUf86QZ7kOBIjJwqnzD1omageEHWwHdBO6B+dFabmdT9POxg==\n-----END PUBLIC KEY-----"
        algorithm: ES256
```

**注意**：若yaml文件发生变动，需要重启网关。



#### 配置参数

| 参数名                        | 说明                                                         | 是否必填 | 默认值 | 值可能性                                                     |
| ----------------------------- | ------------------------------------------------------------ | -------- | ------ | ------------------------------------------------------------ |
| name                          | 实例名                                                       | 是       |        | string                                                       |
| driver                        | 所使用的鉴权类别                                             | 是       |        | ["jwt"]                                                      |
| hide_credentials              | 是否隐藏证书字段                                             | 否       | false  | bool                                                         |
| signature_is_base64           | secret 或 rsa_public_key是否使用了base64算法进行加密         | 是       |        | bool                                                         |
| run_on_preflight              | 置为true表示鉴权运行在请求之前，若置为false，且请求的http Method是OPTIONS时则鉴权一定会通过 | 是       |        | bool                                                         |
| claims_to_verify              | jwt需要进行验证的字段，仅支持:exp,nbf                        | 否       |        | string_array                                                 |
| credentials                   | 证书列表                                                     | 是       |        | object_array                                                 |
| credentials -> iss            | 签发人                                                       | 是       |        | string                                                       |
| credentials -> secret         | 密钥  使用HS256,HS384,HS512时必填                            | 否       |        | string                                                       |
| credentials -> rsa_public_key | rsa公钥  使用RS256,RS384,RS512,ES256,ES384,ES512时必填       | 否       |        | string                                                       |
| credentials -> algorithm      | 所使用的加密算法                                             | 是       |        | ["HS256","HS384","HS512","RS256","RS384","RS512","ES256","ES384","ES512"] |

注意事项：

* **exp**: 过期时间   **nbf**: 生效时间
* **payload** 的计算内容为iss、exp与nbf（若claimsToVerify有配置exp与nbf，则加入到payload的计算）

#### jwt_token生成示例

以下面配置为例

```
auth:
  -
    name: jwt_1
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

##### 请求中鉴权参数填写位置说明

| 参数名             | 说明     | 必填 | 值可能性 | 参数位置 |
| ------------------ | -------- | ---- | -------- | -------- |
| Authorization-Type | 鉴权方式 | 是   | Jwt      | Header   |
| Authorization      | Token值  | 是   |          | Header   |
| jwt_token          | Token值  | 是   |          | Body     |
| jwt_token          | Token值  | 是   |          | Query    |

注意：token在Header、Body、Query三处任意一处添加即可。

##### 请求参数说明

![](http://data.eolinker.com/course/s9XsfrCacb313a93bc110de0f1f08de58e3e4e824d84a6f.png)



##### 返回参数说明

![](http://data.eolinker.com/course/Up3FcE56ea9365a8b5b624eb7037a75969e0945194f7dad.png)

#### 全局配置

在使用jwt鉴权插件之前，需要在全局插件配置中将鉴权插件状态设置为enable，具体配置点此[跳转](/docs/plugins)

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
	"plugins":[{
		"id":"eolinker.com:apinto:auth",
		"name":"auth",
		"type":"service",
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
    "name": "jwt_1",
    "driver": "jwt",
    "desc": "jwt鉴权实例,当前配置了三个证书",
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
    "run_on_preflight": true,
    "hide_credentials": true
}'
```

##### 返回结果示例

```json
{
	"id": "jwt_1@auth",
	"name": "jwt_1",
    "driver": "jwt",
	"profession": "auth",
    "create": "2021-10-29 11:54:57",
	"update": "2021-10-29 11:54:57"
}
```

```
返回的鉴权ID为jwt_1@auth
```

#### 创建服务

**鉴权id绑定服务**：将上一步生成的鉴权id添加至服务plugins配置中的auth数组

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{"name":"auth_jwt_service","driver":"http","desc":"使用jwt鉴权的服务","timeout":10000,"anonymous":{"type":"round-robin","config":"demo-apinto.eolink.com:8280"},"retry":3,"plugins":{"auth":{"disable":false,"config":{"auth":["jwt_1@auth"]}}},"scheme":"https"}'
```

##### 返回结果示例

```json
{
	"id": "auth_jwt_service@service",
	"name": "auth_jwt_service",
    "driver": "http",
	"profession": "service",
    "create": "2021-10-29 11:56:37",
	"update": "2021-10-29 11:56:37"
}
```

```
返回的serviceID为auth_jwt_service@service
```



#### 创建路由

**服务id绑定路由**：上一步生成的服务id绑定至路由路由的target字段

```shell
curl -X POST 'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{"name":"auth_jwt_router","driver":"http","desc":"该路由的目标服务使用了jwt鉴权","listen":8080,"rules":[{"location":"/demo"}],"target":"auth_jwt_service@service"}'
```

##### 返回结果示例

```json
{
	"id": "auth_jwt_router@router",
	"name": "auth_jwt_router",
    "driver": "http",
	"profession": "router",
    "create": "2021-10-29 11:59:31",
	"update": "2021-10-29 11:59:31"
}
```

#### 请求示例

```shell
curl -X GET 'http://127.0.0.1:8080/demo' \
-H 'Content-Type:application/x-www-form-urlencoded' \
-H 'Authorization-Type:jwt' \
-H 'Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUZXN0SFMyNTYiLCJleHAiOjIyNjkzMDcyNTMsIm5iZiI6MTYzODE1NTI1M30.UOk3_yd1dghivIaaNumTr_-W5dtn6pN5Ln3EJj6Cy5c'
```

#### 请求返回结果

```json
{
    "body":"",
    "header":{
        "Accept":[
            "*/*"
        ],
        "Authorization-Type":[
            "jwt"
        ],
        "Content-Type":[
            "application/x-www-form-urlencoded"
        ],
        "User-Agent":[
            "curl/7.68.0"
        ],
        "X-Forwarded-For":[
            "127.0.0.1,127.0.0.1"
        ]
    },
    "host":"127.0.0.1:8080",
    "method":"GET",
    "path":"/demo",
    "query":{

    },
    "url":"/demo"
}
```

