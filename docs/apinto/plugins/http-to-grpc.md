# Http协议转gRPC协议插件

### 插件信息

| 名称            | 字段           | 属性   |
|---------------|--------------|------|
| http协议转gRPC协议 | http_to_grpc | 协议转换 |


### 功能描述

将客户端 **HTTP请求** 转换成 **gRPC请求** 转发给上游服务，并将上游服务的 **gRPC响应** 转换成 **HTTP响应** 转发给客户端。该插件仅当路由驱动为`http`时生效。

### Open Api

#### 配置参数说明

| 参数名     | 说明                                                         | 是否必填 | 默认值 | 值可能性     |
| ---------- | ------------------------------------------------------------ | -------- | ------ | ------------ |
| types      | 需要压缩的响应content-type类型列表，不填则 匹配任何 MIME 类型， 不填则为所有 | 否       |        | array_string |
| min_length | 待压缩内容的最小长度                                         | 否       | 1      | int          |
| vary       | 是否加上Vary: Accept-Encoding响应头部                        | 否       | false  | bool         |

### Open Api

#### 插件配置参数

| 参数名         | 说明                                 | 是否必填 | 默认值   | 取值范围 |
|-------------|------------------------------------|------|-------|------|
| service     | 服务名称，gRPC调用服务名                     | 否    |       |      |
| method      | 方法名称，gRPC调用方法名                     | 否    |       |      |
| authority   | 虚拟主机域名(Authority)                  | 否    |       |      |
| format      | 请求数据格式                             | 是    | json  | json |
| reflect     | 反射，若gRPC服务器开启了反射，配置时可设置为true       | 是    | false |
| protobuf_id | protobuf编码器ID，若reflect为false时，该值必填 | 否    |       |      |
| header      | 额外头部，转发请求时，会将其拼接到转发的请求头部中一并转发      | 否    |       |      |


* 当服务名称不填时，则默认使用 HTTP请求路径的第一个`/`和第二个`/`之间的值作为服务名
* 当方法名称不填时，则默认使用 HTTP请求路径的第二个`/`和第三个`/`之间的值作为服务名
* 即，若HTTP请求路径上`/Service.Hello/Hello`，则此时服务名称为`Service.Hello`，方法名称为`Hello`

#### 配置示例

```
{
    "authority":"",
    "format":"json",
    "headers":{

    },
    "method":"",
    "protobuf_id":"demo@transcode",
    "reflect":false,
    "service":""
}
```

##### 全局配置

在使用`http_to_grpc`插件之前，需要在全局插件配置中将name为`http_to_grpc`的插件状态设置为`enable`，具体配置点此[跳转](/docs/apinto/plugins)

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:http_to_grpc",
        "name":"http_to_grpc",
        "status":"enable"
    }]
}'
```

##### 配置gRPC上游服务
```shell
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' -d '{
    "balance":"round-robin",
    "create":"2023-02-17 12:33:09",
    "description":"",
    "discovery":"",
    "driver":"http",
    "id":"grpc_demo@service",
    "name":"grpc_demo",
    "nodes":[
        "127.0.0.1:9001"
    ],
    "pass_host":"node",
    "profession":"service",
    "retry":0,
    "scheme":"HTTP",
    "timeout":2000,
    "update":"2023-02-27 19:59:45"
}' 
```


##### 配置带有http转gRPC协议插件的路由

```shell
curl -X POST  'http://127.0.0.1:9400/api/router' -H 'Content-Type:application/json' -d '{
    "listen":8099,
    "method":[
        "GET",
        "POST"
    ],
    "host":[

    ],
    "location":"/Service.Hello/Hello",
    "rules":[

    ],
    "service":"grpc_demo@service",
    "template":"",
    "websocket":false,
    "disable":false,
    "plugins":{
        "http_to_grpc":{
            "disable":false,
            "config":{
                "authority":"",
                "format":"json",
                "headers":{

                },
                "method":"",
                "protobuf_id":"demo@transcode",
                "reflect":false,
                "service":""
            }
        }
    },
    "retry":0,
    "time_out":0,
    "description":""
}' 
```

##### 使用网关访问gRPC服务端
官方提供gRPC服务端示例，可点击[获取gRPC示例代码](https://github.com/eolinker/apinto/tree/main/example/grpc)获取。

1. 启动gRPC服务器

```shell
./grpcServer
```

2、请求**Service.Hello**服务的**Hello**方法

示例中，我们定义了**Hello**方法的功能：

* 将`HelloRequest`中的`name`字段通过`HelloResponse`的`msg`字段封装成`hello,%s`的结果返回
* 将请求的**Header**作为gRPC响应的`Trailer`头部返回

调用结果如下：

![](http://data.eolinker.com/course/DnpaIny4c6d1c9b367e9cce30e59c40aa2720a73ee8a234.png)

![](http://data.eolinker.com/course/eLXj3Dk8d859e579dc0ab99aa8fcdcce60b281d6e8abd54.png)

![](http://data.eolinker.com/course/MfePb57da9e7459fa1eb00e70c5d9491593762bd11a19c8.png)

