# 转发重写

### 插件信息

| 名称     | 字段          | 属性     |
| -------- | ------------- | -------- |
| 转发重写 | proxy_rewrite | 参数处理 |

### 功能描述

该插件用于对上游代理信息进行重写，支持对 `scheme`、`uri`、`host` 的重写，同时支持对转发请求的请求头部header的值进行新增或者删除。

注意事项：

* 对uri的重写支持正则替换

### Open Api

#### 配置示例

**示例说明**：将转发请求的`scheme`设置为http，`uri`设置为test ,`host`设置为 `1.1.1.1`，同时请求头部中删掉`a` 和新增`b:1`。

```json
{
    "scheme":"http",
    "uri":"/test",
    "regex_uri":["demo","test"],
    "host":"1.1.1.1",
    "headers":{
        "a":"",
        "b":"1"
    }
}
```

#### 配置参数说明

| 参数名    | 说明                                                         | 是否必填 | 默认值 | 值可能性         |
| --------- | ------------------------------------------------------------ | -------- | ------ | ---------------- |
| scheme    | 设置转发请求的scheme                                         | 否       | http   | ["http","https"] |
| uri       | 设置转发请求的新uri地址                                      | 否       |        | string           |
| regex_uri | 对原uri进行正则替换并将其设置到转发请求的新uri地址。该字符串数组有两个值，第一个表示匹配请求的uri所需要的正则表达式，第二个表示匹配成功后所需要的uri替换正则表达式。 | 否       |        | string_array     |
| host      | 设置转发请求的新host地址                                     | 否       |        | string           |
| headers   | 能对转发请求的头部值进行新增或删除                           | 否       |        | object           |

**注意事项**：

* uri和regex_uri均用于修改uri，uri和regex_uri不能同时为空，至少一项有值。若同时有值，则uri的值优先。
* 想要删除转发请求头部里的值，只需要将对应的值设置为空字符串即可。

#### Open API 请求示例

##### 全局配置

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:proxy_rewrite",
        "name":"my_proxy_rewrite",
        "type":"service",
        "status":"enable"
    }]
}'
```

##### 配置带有转发重写插件的service服务

**配置说明**：将转发请求的`scheme`设置为http，`uri`设置为test ,`host`设置为 `1.1.1.1`，同时请求头部中删掉`a` 和新增`b:2`。

全局插件具体配置点此进行[跳转](/docs/plugins)。

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' -d '{
    "name": "param",
    "driver": "http",
    "timeout": 3000,
    "retry": 3,
    "scheme": "http",
    "anonymous": {
        "type": "round-robin",
        "config": "demo-apinto.eolink.com:8280"
    },
    "plugins": {
        "my_proxy_rewrite":{
            "disable": false,
            "config":{
             "scheme": "http",
             "uri": "/test",
             "regex_uri": ["demo","test"],
             "host": "1.1.1.1",
             "headers":{
               "a": "",
               "b": "2"
              }
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
    "name":"params",
    "driver":"http",
    "listen":8080,
    "rules":[{
        "location":"/demo"
    }],
    "target":"param@service"
}'
```

##### 接口请求示例

```shell
curl -X GET 'http://127.0.0.1:8080/demo' \
-H 'Content-Type:application/json'\
-H 'a:1'
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
            "2"
        ],
        "Content-Type":[
            "application/json-H"
        ],
        "User-Agent":[
            "curl/7.75.0"
        ],
        "X-Forwarded-For":[
            "127.0.0.1,127.0.0.1"
        ]
    },
    "host":"1.1.1.1",
    "method":"GET",
    "path":"/test",
    "query":{

    },
    "url":"/test"
}
```