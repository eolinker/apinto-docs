# JWT

> 描述
> * 动态token校验
> * 可设置待校验的参数名称、参数位置、参数值
> * jwt生成的token一般包括用户信息
>
> 如果需要了解其他鉴权，可点击对应文档链接：
> * [Apikey](/docs/apinto/app/auth/apikey.md)
> * [AK/SK](/docs/apinto/app/auth/aksk.md)
> * [Basic](/docs/apinto/app/auth/basic.md)

## 配置说明
| 字段名                            | 类型                         | 说明                                                                   |
|--------------------------------|----------------------------|----------------------------------------------------------------------|
| token_name                     | string                     | 参数名                                                                  |
| position                       | string                     | 参数位置，参数值可能性：`header`、`query`、`body`                                  |
| type                           | string                     | 驱动类型，参数值可能性：`jwt`                                                    |
| config                         | object                     | jwt配置                                                                |
| config -> algorithm            | string                     | jwt签名算法，参数值可能性：HS256、HS384、HS512、ES256、ES384、ES512、RS256、RS384、RS512 |
| config -> claims_to_verify     | []string                   | jwt需要进行验证的字段，仅支持:exp,nbf                                             |
| config -> iss                  | string                     | 签发者                                                                  |
| config -> path                 | string                     | 用户字段在payload中的路径，格式参考json path                                       |
| config -> secret               | string                     | 密钥，仅在签名算法为HS256、HS384、HS512有效                                        |
| config -> signature_is_base_64 | bool                       | 是否base64编码签名，仅在HS256、HS384、HS512有效                                   |
| config -> rsa_public_key       | string                     | RSA公钥，仅在算法为ES256、ES384、ES512、RS256、RS384、RS512有效                     |
| users                          | object数组                   | 用户列表                                                                 |
| users -> expire                | int64                      | 用户过期时间，时间戳格式，当值为0表示不过期                                               |
| users -> pattern               | object                     | 用户信息                                                                 |
| users -> pattern -> username   | string                     | 用户名                                                                  |
| users -> hide_credential       | bool                       | 转发时是否将鉴权信息隐藏，默认不隐藏。                                                  |
| users -> labels                | object (map[string]string) | 用户标签，当basic校验成功后，该标签会加入请求上下文中                                        |

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

Jwt鉴权需要搭配应用使用，详情请点击[应用](/docs/apinto/app/index.md)

Jwt快速构造可参考 [jwt生成工具](https://jwt.io)


