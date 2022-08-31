# 转发重写

### 插件信息

| 名称     | 字段          | 属性     |
| -------- | ------------- | -------- |
| 转发重写 | proxy_rewrite | 参数处理 |

### 功能描述

该插件用于对上游代理信息进行重写，支持对 `uri`、`host` 的重写，同时支持对转发请求头部header的值进行新增,修改或者删除。

注意事项：

* 对uri的重写支持静态重写，正则替换

### Open Api

#### 配置示例

**示例说明**：将转发请求的路径`uri`进行正则替换，如：/path/a/b替换成/path/b/a ,`host`设置为 `www.eolink.com`，同时请求头部中删掉`a` 和新增`b:1`。

```json
{
    "regex_uri":["/path/([a-z]+)/([a-z]+)","/path/$2/$1"],
    "host":"www.eolink.com",
    "headers":{
        "a":"",
        "b":"1"
    }
}
```

#### 配置参数说明

| 参数名                                | 说明                                                         | 是否必填 | 默认值 | 值可能性         |
| ------------------------------------- | ------------------------------------------------------------ | -------- | ------ | ---------------- |
| scheme(**已废弃，apinto版本0.7.0起**) | 设置转发请求的scheme                                         | 否       | http   | ["http","https"] |
| uri                                   | 设置转发请求的新uri地址                                      | 否       |        | string           |
| regex_uri                             | 对原uri进行正则替换并将其设置到转发请求的新uri地址。该字符串数组有两个值，第一个表示匹配请求的uri所需要的正则表达式，第二个表示匹配成功后所需要的uri替换正则表达式。 | 否       |        | array_string     |
| host                                  | 设置转发请求的新host地址                                     | 否       |        | string           |
| headers                               | 能对转发请求的头部值进行新增或删除                           | 否       |        | object           |

**注意事项**：

* uri和regex_uri均用于修改uri，若都配置了，则uri的值优先。
* **headers配置字段**：能对转发请求的头部值进行新增,修改或删除
  * **新增，修改**：直接设置键值对即可。需要注意的是对以下特殊头部的修改只会在原有值的末尾添加上新值，除此之外的头部值会直接进行覆盖。
    * Content-Type
    * Content-Length
    * Connection
    * Cookie
    * Transfer-Encoding
    * Host
    * User-Agent

  * **删除**：配置的键值对里的值为空字符串时，即为删除指定头部

#### Open API 请求示例

##### 全局配置

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:proxy_rewrite",
        "name":"my_proxy_rewrite",
        "status":"enable"
    }]
}'
```

##### 配置带有转发重写插件的服务

**配置说明**：将转发请求的路径`uri`进行正则替换，如：/path/a/b替换成/path/b/a ,`host`设置为 `www.eolink.com`，同时请求头部中删掉`a` 和新增`b:1`。

全局插件具体配置点此进行[跳转](/docs/apinto/plugins)。

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' -d '{
    "name": "proxy_rewrite_service",
    "driver": "http",
    "timeout": 3000,
    "retry": 3,
    "scheme": "http",
    "nodes": ["demo.apinto.com:8280"],
    "balance": "round-robin",
    "plugins": {
        "my_proxy_rewrite":{
            "disable": false,
            "config":{
             "regex_uri": ["/path/([a-z]+)/([a-z]+)","/path/$2/$1"],
             "host": "www.eolink.com",
             "headers":{
               "a": "",
               "b": "1"
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
    "name":"proxy_rewrite_router",
    "driver":"http",
    "listen":8099,
    "rules":[{
        "location":"/path/one/two"
    }],
    "target":"proxy_rewrite_service@service"
}'
```

##### 接口请求示例

```shell
curl -X GET 'http://127.0.0.1:8099/path/one/two' -H 'Content-Type:application/json' -H 'a:1'
```

##### 接口访问返回示例

```json
{
    "body": "", 
    "header": {
        "Accept": [
            "*/*"
        ], 
        "B": [
            "1"
        ], 
        "Content-Type": [
            "application/json"
        ], 
        "User-Agent": [
            "curl/7.68.0"
        ], 
        "X-Forwarded-For": [
            "127.0.0.1,127.0.0.1"
        ]
    }, 
    "host": "www.eolink.com", 
    "method": "GET", 
    "path": "/path/two/one", 
    "query": { }, 
    "remote_addr": "172.17.0.3:24836", 
    "url": "/path/two/one"
}
```