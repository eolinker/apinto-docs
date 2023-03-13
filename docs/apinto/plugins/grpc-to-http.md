# gRPC协议转Http协议插件

### 插件信息

| 名称            | 字段           | 属性   |
|---------------|--------------|------|
| gRPC协议转Http协议 | grpc_to_http | 协议转换 |


### 功能描述

将客户端 **gRPC请求** 转换成 **HTTP请求** 转发给上游服务，并将上游服务的 **HTTP响应** 转换成 **gRPC响应** 转发给客户端。该插件仅当路由驱动为`grpc`时生效。

### Open Api

#### 插件配置参数

| 参数名      | 值类型 | 是否必填 | 值可能性             | 默认值 | 说明                                                         |
| :---------- | :----- | :------- | :------------------- | :----- | :----------------------------------------------------------- |
| method      | string | 否       | POST、PUT、PATCH     |        | 请求方式                                                     |
| path        | string | 否       |                      |        | 请求路径                                                     |
| protobuf_id | string | 是       | demo@transcode       |        | protobuf编码器ID                                             |
| header      | object | 否       | { "name":"apinto"  } |        | 额外头部，转发请求时，会将其拼接到转发的请求头部中一并转发   |
| query       | object | 否       | { "name":"apinto"  } |        | 额外query参数，转发请求时，会将其拼接到转发的query参数中一并转发 |

* 当path为空值时，使用gRPC客户端调用的服务名称、方法名称进行拼接
* 即，服务名称为`Service.Hello`，方法名称为`Hello`，请求上游服务的路径则为`/Service.Hello/Hello`

#### 配置示例
```json
{
  "headers":{
    "name":"apinto"
  },
  "method":"POST",
  "path":"",
  "protobuf_id":"demo@transcode",
  "query":{
    "name":"apinto"
  }
}
```

##### 全局配置

在使用`grpc_to_http`插件之前，需要在全局插件配置中将name为`grpc_to_http`的插件状态设置为`enable`，具体配置点此[跳转](/docs/apinto/plugins)

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:grpc_to_http",
        "name":"grpc_to_http",
        "status":"enable"
    }]
}'
```


##### 配置gRPC上游服务
```shell
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' -d '{
    "balance":"round-robin",
    "create":"2022-12-09 15:29:07",
    "description":"",
    "discovery":"",
    "driver":"http",
    "id":"demo@service",
    "name":"demo",
    "nodes":[
        "demo.apinto.com:8280"
    ],
    "pass_host":"pass",
    "profession":"service",
    "retry":0,
    "scheme":"HTTP",
    "timeout":2000,
    "update":"2023-02-27 20:05:27"
}' 
```


##### 配置带有gRPC转http协议插件的路由

```shell
curl -X POST  'http://127.0.0.1:9400/api/router' -H 'Content-Type:application/json' -d '{
    "create":"2023-02-24 14:24:52",
    "description":"",
    "disable":false,
    "driver":"grpc",
    "host":[

    ],
    "id":"grpc_to_http@router",
    "listen":8099,
    "method_name":"",
    "name":"grpc_to_http",
    "plugins":{
        "grpc_to_http":{
            "config":{
                "headers":{
                    "name":"apinto"
                },
                "method":"POST",
                "path":"",
                "protobuf_id":"demo@transcode",
                "query":{
                    "name":"apinto"
                }
            },
            "disable":false
        }
    },
    "profession":"router",
    "retry":0,
    "rules":[

    ],
    "service":"demo@service",
    "service_name":"Service.Hello",
    "template":"",
    "time_out":0,
    "update":"2023-02-27 20:03:51"
}' 
```

##### 使用grpc客户端访问网关
官方提供gRPC客户端示例，可点击[获取gRPC示例代码](https://github.com/eolinker/apinto/tree/main/example/grpc)获取。

将代码编译后启动客户端
```shell
./grpcClient -addr 127.0.0.1:8099
```

由于上游服务`demo.apinto.com:8280`返回的是请求的全部信息，和文件中设置的消息类型不一致，本次示例将不赘述访问结果。

