# 插件模版

> 描述：
> * 提取相同的插件配置，构建统一的插件模版
> * 允许多个路由实例引用同一个插件模版
> * 添加了插件模版的实例允许另外新增插件
> * 当新增的插件和插件模版中配置的插件有交集时，有交集的插件配置以路由新增的插件配置为准

## 配置说明
|             |                           |                 |
|-------------|---------------------------|-----------------|
| plugins     | object（map[string]object） | 插件配置，以插件别名作为key |
| description | string                    | 模版描述            |

示例配置如下
```json
{
    "plugins": {
        "extra_params": {
            "disable": false,
            "config": {
                "error_type": "json",
                "params": [
                    {
                        "conflict": "origin",
                        "name": "header1",
                        "position": "header",
                        "value": "header1"
                    },
                    {
                        "conflict": "origin",
                        "name": "query1",
                        "position": "query",
                        "value": "query1"
                    },
                    {
                        "conflict": "origin",
                        "name": "body1",
                        "position": "body",
                        "value": "body1"
                    }
                ]
            }
        },
        "rate_limiting": {
            "disable": false,
            "config": {
                "day": 0,
                "hide_client_header": false,
                "hour": 0,
                "minute": 0,
                "response_type": "json",
                "second": 5
            }
        }
    },
    "description": "示例模版"
}
```


## 配置流程
插件已经提前加入全局插件列表中，并设置了相应的别名。

全局插件列表配置如下
```json
{
    "plugins": [
        {
            "config": {
                "error_type": "json",
                "params": []
            },
            "id": "eolinker.com:apinto:extra_params",
            "init_config": {},
            "name": "extra_params",
            "status": "enable"
        },
        {
            "config": {
                "day": 0,
                "hide_client_header": false,
                "hour": 0,
                "minute": 0,
                "response_type": "text",
                "second": 0
            },
            "id": "eolinker.com:apinto:rate_limiting",
            "init_config": {},
            "name": "rate_limiting",
            "status": "enable"
        },
        {
            "config": {},
            "id": "eolinker.com:apinto:plugin_app",
            "init_config": {},
            "name": "app",
            "status": "enable"
        }
    ]
}
```
1、新增插件模版
```shell
curl -X POST 'http://127.0.0.1:9400/api/template/demo@template' -H 'Content-Type:application/json' \
-d '
{
    "plugins": {
        "extra_params": {
            "disable": false,
            "config": {
                "error_type": "json",
                "params": [
                    {
                        "conflict": "origin",
                        "name": "header1",
                        "position": "header",
                        "value": "header1"
                    },
                    {
                        "conflict": "origin",
                        "name": "query1",
                        "position": "query",
                        "value": "query1"
                    },
                    {
                        "conflict": "origin",
                        "name": "body1",
                        "position": "body",
                        "value": "body1"
                    }
                ]
            }
        },
        "rate_limiting": {
            "disable": false,
            "config": {
                "day": 0,
                "hide_client_header": false,
                "hour": 0,
                "minute": 0,
                "response_type": "json",
                "second": 5
            }
        }
    },
    "description": "示例模版"
}'
```

2、绑定路由
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
    "template": "demo@template",
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

