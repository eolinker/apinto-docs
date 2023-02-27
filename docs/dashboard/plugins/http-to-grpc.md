# Http协议转gRPC协议插件


### 插件信息

| 名称            | 字段           | 属性   |
|---------------|--------------|------|
| http协议转gRPC协议 | http_to_grpc | 协议转换 |


### 功能描述

将客户端 **HTTP请求** 转换成 **gRPC请求** 转发给上游服务，并将上游服务的 **gRPC响应** 转换成 **HTTP响应** 转发给客户端。该插件仅当路由驱动为`http`时生效。


### 使用方法
1. 全局插件创建http_to_grpc插件

![](http://data.eolinker.com/course/qYxTZ3M5f63863964a4b2e89934aff5b7f80b9f9c80983f.png)

2. 创建http路由时添加该插件

![](http://data.eolinker.com/course/n7AP8pIe5cae8a7f9ac93be3815bcc3c1f72c2bb43403ba.png)


#### 配置说明

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