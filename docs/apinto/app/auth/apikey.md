# Apikey

> 描述
> * 静态token校验
> * 可设置待校验的参数名称、参数位置、参数值
> * 多用于openApi中来源校验
> 
> 如果需要了解其他鉴权，可点击对应文档链接：
> * [AK/SK](/docs/apinto/app/auth/aksk)
> * [Basic](/docs/apinto/app/auth/basic)
> * [JWT](/docs/apinto/app/auth/jwt)

## 配置说明
| 参数名                     | 值类型                     | 是否必填 | 值可能性            | 默认值 | 说明                                                   |
| -------------------------- | -------------------------- | -------- | ------------------- | ------ | ------------------------------------------------------ |
| token_name                 | string                     | 是       |                     |        | 参数名                                                 |
| position                   | string                     | 是       | header、query、body |        | 参数位置                                               |
| type                       | string                     | 是       | apikey              |        | 驱动类型                                               |
| users                      | array_object               | 是       |                     |        | 用户列表                                               |
| users -> expire            | int64                      | 是       |                     |        | 用户过期时间，时间戳格式，当值为0表示不过期            |
| users -> pattern           | object                     | 是       |                     |        | 用户信息                                               |
| users -> pattern -> apikey | string                     | 是       |                     |        | apikey值                                               |
| users -> hide_credential   | bool                       | 否       |                     | false  | 转发时是否将鉴权信息隐藏，默认不隐藏。                 |
| users -> labels            | object (map[string]string) | 否       |                     |        | 用户标签，当apikey匹配成功后，该标签会加入请求上下文中 |

### 配置示例
```shell
{
    "position": "query",
    "token_name": "apikey",
    "type": "apikey",
    "users": [
        {
            "expire": 0,
            "hide_credential": true,
            "labels": {},
            "pattern": {
                "apikey": "apinto1"
            }
        },
        {
            "expire": 0,
            "hide_credential": true,
            "labels": {},
            "pattern": {
                "apikey": "apinto2"
            }
        },
        {
            "expire": 0,
            "hide_credential": true,
            "labels": {},
            "pattern": {
                "apikey": "apinto3"
            }
        }
    ]
}
```

上述配置定义了三个用户，分别是`apinto1`、`apinto2`、`apinto3`

`position`、`token_name`分别定义了apikey鉴权检验的参数名及参数名称，即将校验请求query中的apikey参数，当其值等于`apinto1`、`apinto2`、`apinto3`中的任意一个值时，鉴权检验通过，并会根据匹配到的用户信息，检查该用户是否过期，是否需要设置用户标签信息等。

Apikey鉴权需要搭配应用使用，详情请点击[应用](/docs/apinto/app/)

