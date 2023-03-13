# gRPC协议转Http协议插件

### 插件信息

| 名称            | 字段           | 属性   |
|---------------|--------------|------|
| gRPC协议转Http协议 | grpc_to_http | 协议转换 |


### 功能描述

将客户端 **gRPC请求** 转换成 **HTTP请求** 转发给上游服务，并将上游服务的 **HTTP响应** 转换成 **gRPC响应** 转发给客户端。该插件仅当路由驱动为`grpc`时生效。

### 使用方法
1. 全局插件创建grpc_to_http插件

![](http://data.eolinker.com/course/KxKiCI1e59e43080547dd110b2d0845c1069af04a1cbe55.png)

2. 创建gRPC路由时添加该插件

![](http://data.eolinker.com/course/2yebGVg0ff08945e1d9f52d11f1f151ab357fc6c25273e4.png)


#### 配置说明

| 参数名      | 值类型 | 是否必填 | 值可能性             | 默认值 | 说明                                                         |
| :---------- | :----- | :------- | :------------------- | :----- | :----------------------------------------------------------- |
| method      | string | 否       | POST、PUT、PATCH     |        | 请求方式                                                     |
| path        | string | 否       |                      |        | 请求路径                                                     |
| protobuf_id | string | 是       | demo@transcode       |        | protobuf编码器ID                                             |
| header      | object | 否       | { "name":"apinto"  } |        | 额外头部，转发请求时，会将其拼接到转发的请求头部中一并转发   |
| query       | object | 否       | { "name":"apinto"  } |        | 额外query参数，转发请求时，会将其拼接到转发的query参数中一并转发 |

* 当path为空值时，使用gRPC客户端调用的服务名称、方法名称进行拼接
* 即，服务名称为`Service.Hello`，方法名称为`Hello`，请求上游服务的路径则为`/Service.Hello/Hello`