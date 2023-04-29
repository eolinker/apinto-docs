# JWT

> 描述
> * 动态token校验
> * 可设置待校验的参数名称、参数位置、参数值
> * jwt生成的token一般包括用户信息
>
> 如果需要了解其他鉴权，可点击对应文档链接：
> * [Apikey](/docs/apinto/app/auth/apikey)
> * [AK/SK](/docs/apinto/app/auth/aksk)
> * [Basic](/docs/apinto/app/auth/basic)

## 配置说明
| 参数名                         | 值类型                     | 是否必填 | 值可能性                                                     | 默认值 | 说明                                                         |
| ------------------------------ | -------------------------- | -------- | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| token_name                     | string                     | 是       |                                                              |        | 参数名                                                       |
| position                       | string                     | 是       | header、query、body                                          |        | 参数位置                                                     |
| type                           | string                     | 是       | jwt                                                          |        | 驱动类型                                                     |
| config                         | object                     | 是       |                                                              |        | jwt配置                                                      |
| config -> algorithm            | string                     | 是       | HS256、HS384、HS512、ES256、ES384、ES512、RS256、RS384、RS512 |        | jwt签名算法                                                  |
| config -> claims_to_verify     | []string                   | 是       | exp,nbf                                                      |        | jwt需要进行验证的字段                                        |
| config -> iss                  | string                     | 是       |                                                              |        | 签发者                                                       |
| config -> path                 | string                     | 否       |                                                              |        | 用户字段在payload中的路径，格式参考json path                 |
| config -> secret               | string                     | 否       |                                                              |        | 密钥，仅在签名算法为HS256、HS384、HS512有效                  |
| config -> signature_is_base_64 | bool                       | 否       |                                                              | false  | 是否base64编码签名，仅在HS256、HS384、HS512有效              |
| config -> rsa_public_key       | string                     | 否       |                                                              |        | RSA公钥，仅在算法为ES256、ES384、ES512、RS256、RS384、RS512有效 |
| users                          | object数组                 | 是       |                                                              |        | 用户列表                                                     |
| users -> expire                | int64                      | 是       |                                                              |        | 用户过期时间，时间戳格式，当值为0表示不过期                  |
| users -> pattern               | object                     | 是       |                                                              |        | 用户信息                                                     |
| users -> pattern -> username   | string                     | 是       |                                                              |        | 用户名                                                       |
| users -> hide_credential       | bool                       | 否       |                                                              | false  | 转发时是否将鉴权信息隐藏                                     |
| users -> labels                | object (map[string]string) | 否       |                                                              |        | 用户标签，当jwt校验成功后，该标签会加入请求上下文中          |

### 配置示例
```shell
{
    "config": {
        "algorithm": "HS256",
        "claims_to_verify": [],
        "iss": "eolink",
        "path": "$.user",
        "secret": "apinto",
        "signature_is_base_64": false
    },
    "position": "header",
    "token_name": "authorization",
    "type": "jwt",
    "users": [
        {
            "expire": 0,
            "hide_credential": false,
            "labels": {},
            "pattern": {
                "username": "app1"
            }
        }
    ]
}
```

Jwt鉴权需要搭配应用使用，详情请点击[应用](/docs/apinto/app/)

Jwt快速构造可参考 [jwt生成工具](https://jwt.io)

