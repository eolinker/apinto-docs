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
```
{
“alg”: “HS256”,
“typ”: “JWT”
}
```
（2）jwt的playload：
```
{
“iss”: “TestHS256”,
“exp”:1533112042,
“nbf”:1533111044
}
```

（3）jwt的verify signature：
```
HMACSHA256(
base64UrlEncode(header) + “.” +
base64UrlEncode(payload),"eolinker"
)
```
（4）jwt的jwt_token：
header.playload.signature

