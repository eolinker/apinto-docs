# 参数映射
### 插件信息

| 名称     | 字段               | 属性     |
| -------- | ------------------ | -------- |
| 参数映射 | params_transformer | 参数处理 |

### 功能描述

实现表单或json参数的映射，访问API的 **参数A** 绑定到目标API的 **参数B**，映射位置包括header、body、query。

注意事项：

- 若访问API的参数名是user，目标API的参数名是username，此时需开启参数映射插件；若均为username，则无需开启此插件。
- json仅支持 **一级** 映射。
- 若参数类型为表单时，映射插件支持同名参数的使用。
- 使用该插件时请保证Content-Type为 application/x-www-form-urlencoded、 multipart/form-data 或 application/json。

### Open Api

#### 配置示例

**示例说明**：将转发请求的query参数a映射到头部header中的b，并且删除原参数。

```json
{
    "params":[
        {
            "name":"a",
            "position":"query",
            "proxy_name":"b",
            "proxy_position":"header",
            "required":true
        }
    ],
    "remove":true,
    "error_type":"text"
}
```



#### 配置参数说明

| 参数名                   | 值类型       | 是否必填 | 值可能性                  | 默认值 | 说明                                               |
| ------------------------ | ------------ | -------- | ------------------------- | ------ | -------------------------------------------------- |
| params                   | array_object | 是       |                           |        | 映射参数列表                                       |
| params -> name           | string       | 是       |                           |        | 待映射参数名称                                     |
| params -> position       | string       | 是       | ["body","header","query"] |        | 待映射参数所在位置                                 |
| params -> proxy_name     | string       | 是       |                           |        | 目标参数名称                                       |
| params -> proxy_position | string       | 是       |                           |        | 目标参数所在位置                                   |
| params -> required       | bool         | 否       | false                     | false  | 待映射参数是否必含，如为true，该参数不存在时会报错 |
| remove                   | bool         | 否       | false                     | false  | 映射后删除原参数                                   |
| error_type               | string       | 否       | ["text","json"]           | text   | 插件返回报错的类型                                 |

#### Open API 请求示例

##### 全局配置

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:params_transformer",
        "name":"my_params_transformer",
        "status":"enable"
    }]
}'
```

##### 配置带有参数映射插件的服务

配置插件说明：将转发请求里query参数a映射为header里的b，并且删除query里的原参数a。

全局插件具体配置点此进行[跳转](/docs/apinto/plugins)。

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' -d '{
    "name": "params_trans_service",
    "driver": "http",
    "timeout": 3000,
    "retry": 3,
    "scheme": "http",
    "nodes": ["demo.apinto.com:8280"],
    "balance": "round-robin",
    "plugins": {
        "my_params_transformer":{
            "disable": false,
            "config":{
                "params": [{
                "name": "a",
                "position": "query",
                "proxy_name":"b",
                "proxy_position":"header",
                "required":true,
                "conflict": "Convert"
                }],
            "remove": true,
            "error_type": "text"
            }
        }
    }
}' 
```

##### 绑定路由

```shell
curl -X POST  'http://127.0.0.1:9400/api/router' \
-H 'Content-Type:application/json' \
-d '{
    "name":"params_trans_router",
    "driver":"http",
    "listen":8099,
    "location":"/demo/params_trans",
    "rules":[],
    "target":"params_trans_service@service"
}'
```

##### 接口请求示例

```shell
curl -X GET 'http://127.0.0.1:8099/demo/params_trans?a=test_plugin' -H 'Content-Type:application/json'
```

##### 接口访问返回示例

```json
{
    "body":"",
    "header":{
        "Accept":[
            "*/*"
        ],
        "B":[
            "test_plugin"
        ],
        "User-Agent":[
            "curl/7.75.0"
        ],
        "X-Forwarded-For":[
            "127.0.0.1,127.0.0.1"
        ]
    },
    "host":"127.0.0.1:8099",
    "method":"GET",
    "path":"/demo/params_trans",
    "query":{

    },
    "url":"/demo/params_trans"
}
```

