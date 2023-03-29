# 额外参数
### 插件信息

| 插件名称 | 字段插件     | 属性     |
| -------- | ------------ | -------- |
| 额外参数 | extra_params | 参数处理 |

### 功能描述

> * 将参数添加到转发请求的请求头、query、body中
> * 目前仅支持静态额外参数
> * 可用于上游服务的静态token校验
> * body额外参数仅支持表单和json格式，即`content-type`仅支持`application/x-www-form-urlencoded`、`multipart/form-data`、`application/json`


### Open Api

#### 配置示例

**示例说明**：在转发请求的头部header里加上`test:test_value`, 若转发header里本身已存在test，且冲突处理方式为conflict，则采用插件内配置的值。

```json
{
    "params":[
        {
            "name":"test",
            "position":"header",
            "value":"test_value",
            "conflict": "convert",
        }
    ],
    "error_type":"text"
}
```



#### 配置参数说明

| 参数名             | 说明                 | 是否必填 | 默认值  | 取值范围                     |
| ------------------ | -------------------- | -------- | ------- | ---------------------------- |
| params             | 额外参数列表         | 是       |         | array                        |
| params -> name     | 参数名               | 是       |         | string                       |
| params -> position | 参数位置             | 是       |         | ["header","body","query"]    |
| params -> value    | 参数值               | 是       |         | string                       |
| params -> conflict | 参数冲突时的处理方式 | 否       | convert | ["origin","convert","error"] |
| error_type         | 插件返回报错的类型   | 否       | text    | ["text","json"]              |

**参数冲突说明**：
额外参数插件配置了参数A的值，但是直接请求时也传了参数A，此时为参数出现冲突，参数A实际上会接收两个参数值。

- convert：参数出现冲突时，取映射后的参数，即配置的值
- origin：参数出现冲突时，取映射前的参数，即实际传的值
- error：请求时报错，”param_name” has a conflict.

#### 请求参数

| 参数名       | 说明     | 必填 | 值可能性                                  | 参数位置 |
| :----------- | :------- | :--- | :---------------------------------------- | :------- |
| Content-Type | 数据类型 | 是   | x-www-form-urlencoded 或 application/json | header   |

若配置示例里的 test 参数为表单参数，则请求头部填写 Conent-Type:x-www-form-urlencoded。
若配置示例里的 test 参数为Json参数，则请求头部需加 Conent-Type:application/json。



#### Open API 请求示例

##### 全局配置

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:extra_params",
        "name":"my_extra_params",
        "status":"enable"
    }]
}'
```

##### 配置带有额外参数插件的服务

以在请求头部加参数为例，全局插件具体配置点此进行[跳转](/docs/apinto/plugins)。

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  'http://127.0.0.1:9400/api/service' \
-H 'Content-Type:application/json' \
-d '{
    "name": "extra_param_service",
    "driver": "http",
    "timeout": 3000,
    "retry": 3,
    "scheme": "http",
    "nodes": ["demo.apinto.com:8280"],
    "balance": "round-robin",
    "plugins": {
        "my_extra_params":{
            "disable": false,
            "config":{
                "params": [{
                "name": "demo_param",
                "position": "header",
                "value": "1",
                "conflict": "Convert"
                }],
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
    "name":"extra_params_router",
    "driver":"http",
    "listen":8099,
    "location":"/demo/extra_params",
    "target":"extra_param_service@service"
}'
```

##### 接口请求示例

```shell
curl -X GET 'http://127.0.0.1:8099/demo/extra_params'
```

##### 接口访问返回示例

```json
{
    "body":"",
    "header":{
        "Accept":[
            "*/*"
        ],
        "Demo_param":[
            "1"
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
    "path":"/demo/extra_params",
    "query":{

    },
    "url":"/demo/extra_params"
}
```

