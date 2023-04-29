
# gRPC 协议路由


| 类别 | 属性     |
| ---- | -------- |
| 路由 | 路由匹配 |



### 功能描述

路由：完成网关转发步骤的第一步，流量请求的入口，其可以根据配置的路由规则将流量引流到对应服务中，从而执行不同的服务策略。该路由接收gRPC协议请求，并将请求转发到对应到上游服务中。


### 路由操作
1、进入路由列表页面，点击 "**创建**"，**Driver**选择**grpc**。

![](http://data.eolinker.com/course/LddTTCD05fe49aaaa055cc6ec2513d13792090de0a4bbeb.gif)

2、填写grpc配置，为了方便验证gRPC的不同传输模式的调用情况，方法名在此示例中不填。

![](http://data.eolinker.com/course/nlDNFTR5d94e958c9ad3c02ff628ddb992a67a3cb4cb4ac.gif)

| 字段     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| 端口号   | 路由监听端口号，该端口必须是**apinto**程序的config.yml中已经存在的端口号，详情请点击[程序配置说明](/docs/apinto/quick/quick_course#程序配置说明) |
| 域名     | 客户端访问网关时请求的域名地址，从gRPC头部 `:authority` 中获取，路由匹配规则之一 |
| 服务名   | gRPC服务名                                                   |
| 方法名   | gRPC方法名，不填则默认匹配该服务下的所有方法                 |
| 路由规则 | 可规定客户端请求的头部参数，路由规则说明请参考[路由规则](/docs/apinto/router/grpc#路由匹配规则) |
| 目标服务 | 路由匹配成功后，将转发到指定上游服务                         |
| 插件模版 | 插件模版引用                                                 |
| 重试次数 | 当上游服务连接失败、连接超时时，重新转发的次数               |
| 超时时间 | 请求上游服务的总时间                                         |

至此，路由配置完成

### 快速验证gRPC透传
**[Apinto](https://github.com/eolinker/apinto)**仓库已经包含可测试使用的gRPC服务端和gRPC客户端，使用教程如下：
### 一、启动gRPC服务端

1、进入到**server**目录，编译gRPC服务端程序。

```shell
cd server/ && go build -o -o grpcServer
```

2、启动gRPC服务端程序

```shell
./grpcServer
```

当需要绑定证书，启动命令如下：

```shell
./grpcServer -key 密钥文件路径 -cert 证书文件路径
```

**启动参数说明**

| 参数名 | 参数说明                                             |
| ------ | ---------------------------------------------------- |
| key    | 密钥文件路径，文件名称一般以**.key**为后缀           |
| cert   | 证书文件路径，文件名称一般以**.crt**、**.pem**为后缀 |
| p      | 监听端口号，默认9001                                 |
| Ip     | 监听IP，默认：0.0.0.0                                |

### 二、启动gRPC客户端

1、进入到**client**目录，编译gRPC客户端程序

```shell
cd client/ && go build -o grpcClient
```

2、启动gRPC客户端程序

```shell
./grpcClient -addr grpc服务端地址
```

**启动参数说明**

| 参数名     | 参数说明                                             |
| ---------- | ---------------------------------------------------- |
| key        | 密钥文件路径，文件名称一般以**.key**为后缀           |
| cert       | 证书文件路径，文件名称一般以**.crt**、**.pem**为后缀 |
| addr       | grpc服务端地址，默认：127.0.0.1:8099                 |
| insecure   | 当连接地址使用tls传输时，是否跳过证书检查            |
| serverName | 当进行TLS证书校验时，使用该值替换域名信息            |
| authority  | 服务端主机地址，将会被设置到头部 `:authority` 中     |

示例命令

```
./grpcClient -addr 127.0.0.1:8099
```

输出消息如下：

```
2023/02/16 19:00:08 start current request client,please wait...
2023/02/16 19:00:08 err: <nil>
2023/02/16 19:00:08 header: map[content-type:[application/grpc]]
2023/02/16 19:00:08 trailing: map[app:[apinto]]
2023/02/16 19:00:08 msg: hello
2023/02/16 19:00:08 err: <nil>
2023/02/16 19:00:08 header: map[content-type:[application/grpc]]
2023/02/16 19:00:08 trailing: map[app:[apinto]]
2023/02/16 19:00:08 msg: hello
2023/02/16 19:00:08 end current request
2023/02/16 19:00:08 start stream request client,please wait...
2023/02/16 19:00:08 err: <nil>
2023/02/16 19:00:08 header: map[content-type:[application/grpc]]
2023/02/16 19:00:08 trailing: map[app:[apinto]]
2023/02/16 19:00:08 reply apinto
eolink
2023/02/16 19:00:08 end stream request
2023/02/16 19:00:08 start stream response client,please wait...
2023/02/16 19:00:09 header: map[content-type:[application/grpc]]
2023/02/16 19:00:09 trailing: map[app:[apinto]]
2023/02/16 19:00:09 reply map[2023-02-16 19:00:09.127:now is 2023-02-16 19:00:09,name is apinto,eolink]
2023/02/16 19:00:09 end stream response
2023/02/16 19:00:09 start all stream client,please wait...
2023/02/16 19:00:12 header: map[content-type:[application/grpc]]
2023/02/16 19:00:12 trailing: map[app:[apinto]]
2023/02/16 19:00:12 reply map[2023-02-16 19:00:09.136:eolink 2023-02-16 19:00:10.130:eolink 2023-02-16 19:00:11.136:eolink 2023-02-16 19:00:12.132:eolink 2023-02-16 19:00:12.137:close stream]
2023/02/16 19:00:12 end all stream
```
