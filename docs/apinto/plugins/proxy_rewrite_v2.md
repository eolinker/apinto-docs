# 转发重写V2

### 插件信息

| 名称       | 字段             | 属性     |
| ---------- | ---------------- | -------- |
| 转发重写V2 | proxy_rewrite_v2 | 参数处理 |

### 功能描述

该插件是转发重写插件v2版，用于对上游代理信息进行重写，支持对`path`、`host` 的重写，同时支持对转发请求的请求头部header的键值进行新增,修改或者删除。

注意事项：

* 对转发路径path的重写支持静态重写，前缀替换，正则替换

### Open Api

#### 配置示例

**示例说明**：将转发请求的路径`path`前缀`/old-prefix`替换成`/new-prefix`,若替换失败则转发失败返回报错。并且将host重写为`www.eolink.com`同时请求头部新增`a:1`。

```json
{
  "path_type": "prefix",
  "prefix_path": [
    {
      "prefix_path_match": "/old-prefix",
      "prefix_path_replace": "/new-prefix"
    }
  ],
  "not_match_err": true,
  "host_rewrite": true,
  "host": "www.eolink.com",
  "headers": {
    "a": "1"
  }
}
```

#### 配置参数说明

| 参数名                             | 说明                                                         | 是否必填 | 默认值 | 值可能性                           |
| ---------------------------------- | ------------------------------------------------------------ | -------- | ------ | ---------------------------------- |
| path_type                          | 转发路径重写类型，static是静态替换，prefix是前缀替换，regex是正则替换 | 否       | "none" | [“none”,“static”,“prefix”,“regex”] |
| static_path                        | 重写转发时的请求路径，path_type为static时需要填写            | 否       |        | string                             |
| prefix_path                        | 对转发请求的路径进行前缀替换，path_type为prefix时需要填写    | 否       |        | array_object                       |
| prefix_path -> prefix_path_match   | path前缀匹配字符串，如：/prefix                              | 否       |        | string                             |
| prefix_path -> prefix_path_replace | path前缀替换字符串，如：/new-prefix                          | 否       |        | string                             |
| regex_path                         | 对转发请求的路径进行正则替换，path_type为regex时需要填写     | 否       |        | array_object                       |
| regex_path -> regex_path_match     | path正则匹配表达式，如：/path/([a-z]+)/([a-z]+)              | 否       |        | string                             |
| regex_path -> regex_path_replace   | path正则替换表达式，如：/path/$2/$1 ，对路径上第二个参数和第三个参数进行替换 | 否       |        | string                             |
| not_match_err                      | path替换失败不进行转发，返回报错信息及状态码400              | 否       | false  | bool                               |
| host_rewrite                       | 是否重写host                                                 | 否       | false  | bool                               |
| host                               | 设置转发请求的新host地址                                     | 否       |        | string                             |
| headers                            | 能对转发请求的头部值进行新增,修改或删除                      | 否       |        | object                             |

**注意事项**：

* **prefix_path**，**regex_path**两个配置字段为object数组，有顺序。若数组里配置多个object，替换顺序是从第一个依次到最后一个，仅会匹配替换一次。若**not_match_err**配置为true，当均替换失败时则会转发失败，返回报错信息以及400。若**not_match_err**配置为false,则会继续进行转发，转发路径不变。
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
        "id":"eolinker.com:apinto:proxy_rewrite_v2",
        "name":"my_proxy_rewrite_v2",
        "status":"enable"
    }]
}'
```

##### 配置带有转发重写插件的服务

**配置说明**：将转发请求的路径`path`前缀`/old-prefix`替换成`/new-prefix`,若替换失败则转发失败返回报错。并且将host重写为`www.eolink.com`同时请求头部新增`a:1`。

全局插件具体配置点此进行[跳转](/docs/apinto/plugins)。

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' -d '{
    "name": "proxy_rewrite_v2_service", 
    "driver": "http", 
    "timeout": 3000, 
    "retry": 3, 
    "scheme": "http", 
    "nodes": [
        "demo.apinto.com:8280"
    ], 
    "balance": "round-robin", 
    "plugins": {
        "my_proxy_rewrite_v2": {
            "disable": false, 
            "config": {
                "path_type": "prefix", 
                "prefix_path": [
                    {
                        "prefix_path_match": "/old-prefix", 
                        "prefix_path_replace": "/new-prefix"
                    }
                ], 
                "not_match_err": true, 
                "host_rewrite": true, 
                "host": "www.eolink.com", 
                "headers": {
                    "a": "1"
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
    "name":"proxy_rewrite_v2_router",
    "driver":"http",
    "listen":8099,
    "rules":[{
        "location":"/old-prefix/demo"
    }],
    "target":"proxy_rewrite_v2_service@service"
}'
```

##### 接口请求示例

```shell
curl -X GET 'http://127.0.0.1:8099/old-prefix/demo' -H 'Content-Type:application/json'
```

##### 接口访问返回示例

```json
{
    "body": "", 
    "header": {
        "A": [
            "1"
        ], 
        "Accept": [
            "*/*"
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
    "path": "/new-prefix/demo", 
    "query": { }, 
    "remote_addr": "59.41.163.34:12764", 
    "url": "/new-prefix/demo"
}
```