# 应用

## 模块说明

  * 应用是对请求来源的抽象概念，其可以是一个客户端App，也可以是一个后端服务，还可以是Web App......
  * 请求达到网关时，会先进行鉴权检验，鉴权通过后，将匹配唯一应用，并进行应用设置的规定行为，包括但不限于流量限制、数据修饰（额外参数、格式转换等）、访问控制等。
  * 该模块需要配合全局插件 **eolinker.com:apinto:plugin_app** 使用，插件配置请参考[应用插件](/docs/apinto/plugins/app.md)

## 配置说明
| 字段          | 类型                         | 说明                                                      |
|-------------|----------------------------|---------------------------------------------------------|
| auth        | object数组                   | 鉴权配置，详细配置请阅读[鉴权文档](/docs/apinto/app/auth.md)            | 
| additional  | object数组                   | 额外参数配置，详细配置请阅读[额外参数文档](/docs/apinto/app/extra-param.md) | 
| disable     | bool                       | 是否禁用该应用                                                 |
| labels      | object (map[string]string) | 应用标签                                                    |
| description | string                     | 应用描述                                                    |

完整配置示例
```json
{
    "labels": {},
    "disable": false,
    "additional": [
        {
            "conflict": "origin",
            "key": "query_param",
            "labels": {
                "pwd": "123456",
                "user": "apinto"
            },
            "position": "query",
            "value": "query"
        },
        {
            "conflict": "origin",
            "key": "body_param",
            "labels": {},
            "position": "body",
            "value": "body"
        },
        {
            "conflict": "origin",
            "key": "header_param",
            "labels": {},
            "position": "header",
            "value": "header"
        }
    ],
    "auth": [
        {
            "position": "query",
            "token_name": "apikey",
            "type": "apikey",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": true,
                    "labels": {
                        "abcd": "123",
                        "dde": "qw2"
                    },
                    "pattern": {
                        "apikey": "apinto"
                    }
                }
            ]
        },
        {
            "position": "header",
            "token_name": "authorization",
            "type": "basic",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": false,
                    "labels": {
                        "user": "apinto"
                    },
                    "pattern": {
                        "password": "123456",
                        "username": "apinto"
                    }
                }
            ]
        },
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
        },
        {
            "position": "header",
            "token_name": "authorization",
            "type": "aksk",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": false,
                    "labels": {},
                    "pattern": {
                        "ak": "adfhjrghvfrjqwodeuhibch",
                        "sk": "dajshdhjerfvjhwakbdkfjrbv"
                    }
                }
            ]
        }
    ],
    "description": "示例"
}
```

## 配置流程：

### 应用配置全局生效
#### 1、新增全局应用插件（eolinker.com:apinto:plugin_app）
```shell
curl -X POST 'http://127.0.0.1:9400/api/setting/plugin' -H 'Content-Type:application/json' \
-d '{
  "plugins": [{
    "id": "eolinker.com:apinto:plugin_app",
    "name": "my_app",
    "status": "global"
  }]
}'
```
#### 2、创建应用，配置应用鉴权及额外参数信息
```shell
curl -X POST 'http://127.0.0.1:9400/api/app' -H 'Content-Type:application/json' \
-d '{
    "name": "app",
    "driver": "app",
    "labels": {},
    "disable": false,
    "additional": [
        {
            "conflict": "origin",
            "key": "query_param",
            "labels": {
                "pwd": "123456",
                "user": "apinto"
            },
            "position": "query",
            "value": "query"
        },
        {
            "conflict": "origin",
            "key": "body_param",
            "labels": {},
            "position": "body",
            "value": "body"
        },
        {
            "conflict": "origin",
            "key": "header_param",
            "labels": {},
            "position": "header",
            "value": "header"
        }
    ],
    "auth": [
        {
            "position": "query",
            "token_name": "apikey",
            "type": "apikey",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": true,
                    "labels": {
                        "abcd": "123",
                        "dde": "qw2"
                    },
                    "pattern": {
                        "apikey": "apinto"
                    }
                }
            ]
        },
        {
            "position": "header",
            "token_name": "authorization",
            "type": "basic",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": false,
                    "labels": {
                        "user": "apinto"
                    },
                    "pattern": {
                        "password": "123456",
                        "username": "apinto"
                    }
                }
            ]
        },
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
        },
        {
            "position": "header",
            "token_name": "authorization",
            "type": "aksk",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": false,
                    "labels": {},
                    "pattern": {
                        "ak": "adfhjrghvfrjqwodeuhibch",
                        "sk": "dajshdhjerfvjhwakbdkfjrbv"
                    }
                }
            ],
            "name": "3"
        }
    ],
    "description": "示例"
}'
```

### 应用配置仅作用于路由/插件模版实例
#### 1、全局插件加入应用插件（eolinker.com:apinto:plugin_app）
```shell
curl -X POST 'http://127.0.0.1:9400/api/setting/plugin' -H 'Content-Type:application/json' \
-d '{
  "plugins": [{
    "id": "eolinker.com:apinto:plugin_app",
    "name": "app",
    "status": "enable"
  }]
}'
```
#### 2、创建应用
```shell
{
    "name": "app",
    "driver": "app",
    "labels": {},
    "disable": false,
    "additional": [
        {
            "conflict": "origin",
            "key": "query_param",
            "labels": {
                "pwd": "123456",
                "user": "apinto"
            },
            "position": "query",
            "value": "query"
        },
        {
            "conflict": "origin",
            "key": "body_param",
            "labels": {},
            "position": "body",
            "value": "body"
        },
        {
            "conflict": "origin",
            "key": "header_param",
            "labels": {},
            "position": "header",
            "value": "header"
        }
    ],
    "auth": [
        {
            "name": "0",
            "position": "query",
            "token_name": "apikey",
            "type": "apikey",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": true,
                    "labels": {
                        "abcd": "123",
                        "dde": "qw2"
                    },
                    "pattern": {
                        "apikey": "apinto"
                    }
                }
            ]
        },
        {
            "name": "1",
            "position": "header",
            "token_name": "authorization",
            "type": "basic",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": false,
                    "labels": {
                        "user": "apinto"
                    },
                    "pattern": {
                        "password": "123456",
                        "username": "apinto"
                    }
                }
            ]
        },
        {
            "config": {
                "algorithm": "HS256",
                "claims_to_verify": [],
                "iss": "eolink",
                "path": "$.user",
                "secret": "apinto",
                "signature_is_base_64": false
            },
            "name": "2",
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
        },
        {
            "position": "header",
            "token_name": "authorization",
            "type": "aksk",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": false,
                    "labels": {},
                    "pattern": {
                        "ak": "adfhjrghvfrjqwodeuhibch",
                        "sk": "dajshdhjerfvjhwakbdkfjrbv"
                    }
                }
            ],
            "name": "3"
        }
    ],
    "description": "示例"
}
```
响应内容如下：
```json
{
    "additional": [
        {
            "conflict": "origin",
            "key": "query_param",
            "labels": {
                "pwd": "123456",
                "user": "apinto"
            },
            "position": "query",
            "value": "query"
        },
        {
            "conflict": "origin",
            "key": "body_param",
            "labels": {},
            "position": "body",
            "value": "body"
        },
        {
            "conflict": "origin",
            "key": "header_param",
            "labels": {},
            "position": "header",
            "value": "header"
        }
    ],
    "auth": [
        {
            "position": "query",
            "token_name": "apikey",
            "type": "apikey",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": true,
                    "labels": {
                        "abcd": "123",
                        "dde": "qw2"
                    },
                    "pattern": {
                        "apikey": "apinto"
                    }
                }
            ]
        },
        {
            "position": "header",
            "token_name": "authorization",
            "type": "basic",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": false,
                    "labels": {
                        "user": "apinto"
                    },
                    "pattern": {
                        "password": "123456",
                        "username": "apinto"
                    }
                }
            ]
        },
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
        },
        {
            "position": "header",
            "token_name": "authorization",
            "type": "aksk",
            "users": [
                {
                    "expire": 0,
                    "hide_credential": false,
                    "labels": {},
                    "pattern": {
                        "ak": "adfhjrghvfrjqwodeuhibch",
                        "sk": "dajshdhjerfvjhwakbdkfjrbv"
                    }
                }
            ]
        }
    ],
    "create": "2022-09-02 17:16:06",
    "description": "示例",
    "disable": false,
    "driver": "app",
    "id": "app@app",
    "labels": {},
    "name": "app",
    "profession": "app",
    "update": "2022-09-02 17:16:06"
}
```


#### 3、在路由/插件模版实例中绑定应用插件

以路由为例：
```shell
curl -X POST 'http://127.0.0.1:9400/api/router/demo@router' -H 'Content-Type:application/json' \
-d '
{
    "listen": 8099,
    "method": [
        "GET",
        "POST"
    ],
    "host": [],
    "location": "/*",
    "rules": [],
    "service": "apinto@service",
    "template": "",
    "disable": false,
    "plugins": {
        "app": {
            "disable": false,
            "config": {}
        }
    },
    "retry": 0,
    "time_out": 0,
    "description": ""
}'
```

