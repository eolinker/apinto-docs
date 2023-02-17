
# dubbo2 协议路由


| 类别 | 属性     |
| ---- | -------- |
| 路由 | 路由匹配 |

### 功能描述

路由：完成网关转发步骤的第一步，流量请求的入口，其可以根据配置的路由规则将流量引流到对应服务中，从而执行不同的服务策略。

driver必须选择dubbo2

字段描述说明

| 字段        | 说明                                                                                                      |
|-----------|---------------------------------------------------------------------------------------------------------|
| 端口号       | 路由监听端口号，该端口必须是**apinto**程序的config.yml中已经存在的端口号，详情请点击[程序配置说明](/docs/apinto/quick/quick_course.md#程序配置说明) |
| 服务名       | 客户端访问网关的服务名，路由匹配规则之一                                                                                    |
| 方法名       | 客户端访问网关时方法名，路由匹配规则之一                                                                                    |
| 路由规则      | 可规定客户端请求的请求attachment参数的条件                                                                                   |
| 目标服务      | 路由匹配成功后，将转发到指定上游服务                                                                                      |
| 插件模版      | 插件模版引用                                                                                                  |
| 重试次数      | 当上游服务连接失败、连接超时时，重新转发的次数                                                                                 |
| 超时时间      | 请求上游服务的总时间                                                                                              |

### 路由操作
1、进入路由列表页面，点击 "**创建**"，**Driver**选择**dubbo2**。
![](http://data.eolinker.com/course/i1Leb7N9b979f6b3c3d81e98e1a478aa067df426a131aa8.png)

2、填写dubbo2配置，为了方便验证dubbo2的不同方法的调用情况，方法名在此示例中不填。

![](http://data.eolinker.com/course/dAu7yN6b5ea21afc31bcd880e7968a92e6271d0cb67d87b.png)

### 快速验证dubbo2透传
**[Apinto](https://github.com/eolinker/apinto)**仓库已经包含可测试使用的dubbo2服务端和dubbo2客户端，使用教程如下：


#### 一、启动dubbo2服务端
1. 进入到**example/dubbo2**目录

2. 进入到**server**目录，编译dubbo2服务端程序。

   ```shell
   cd server/ && go build -o  dubbo2Server
   ```
3. 启动dubbo2服务端程序
    ```shell
   ./dubbo2Server
   ```

#### 二、启动dubbo2客户端

1. 进入到**example/dubbo2**目录

2. 进入到**client**目录，编译dubbo2客户端程序

   ```shell
   cd client/ && go build -o dubbo2Client
   ```

3. 启动dubbo2客户端程序
    ```shell
        ./dubbo2Client -addr dubbo2服务端地址
    ```

**启动参数说明**

| 参数名     | 参数说明                          |
| ---------- |-------------------------------|
| addr       | dubbo2服务端地址，默认：127.0.0.1:8099 |

示例命令

```
    ./dubbo2Client -addr 127.0.0.1:8099
```

输出消息如下：

```
    2023-02-17T10:42:30.641+0800    INFO   getty/getty_client.go:75        use default getty client config
    2023-02-17T10:42:30.667+0800    INFO   dubbo/dubbo_protocol.go:98      [DUBBO Protocol] Refer service: dubbo://172.30.244.240:8099/api.Server?interface=api.Server&serialization=hessian2&timeout=3s
    2023-02-17T10:42:30.687+0800    INFO   client/main.go:91       ComplexServer result={"addr":"192.168.0.1","server":{"age":0,"email":"1324204490@qq.com","id":16,"name":"apinto"},"time":"2023-02-17T10:42:30.641+08:00"}
    2023-02-17T10:42:30.687+0800    INFO   dubbo/dubbo_protocol.go:98      [DUBBO Protocol] Refer service: dubbo://172.30.244.240:8099/api.Server?interface=api.Server&serialization=hessian2&timeout=3s
    2023-02-17T10:42:30.709+0800    INFO   client/main.go:153      List result=[{"age":10,"email":"apinto1@qq.com","id":10,"name":"apinto1"},{"age":20,"email":"apinto2@qq.com","id":20,"name":"apinto2"},{"age":0,"email":"1324204
    490@qq.com","id":16,"name":"apinto"}]
    2023-02-17T10:42:30.709+0800    INFO   dubbo/dubbo_protocol.go:98      [DUBBO Protocol] Refer service: dubbo://172.30.244.240:8099/api.Server?interface=api.Server&serialization=hessian2&timeout=3s
    2023-02-17T10:42:30.740+0800    INFO   client/main.go:174      GetById result={"age":20,"email":"apinto@qq.com","id":101,"name":"apinto"}
    2023-02-17T10:42:30.740+0800    INFO   dubbo/dubbo_protocol.go:98      [DUBBO Protocol] Refer service: dubbo://172.30.244.240:8099/api.Server?interface=api.Server&serialization=hessian2&timeout=3s
    2023-02-17T10:42:30.760+0800    INFO   client/main.go:113      UpdateList result=[{"age":0,"email":"1324204490@qq.com","id":16,"name":"hello"},{"age":0,"email":"1324204490@qq.com","id":16,"name":"hello"}]
    2023-02-17T10:42:30.761+0800    INFO   dubbo/dubbo_protocol.go:98      [DUBBO Protocol] Refer service: dubbo://172.30.244.240:8099/api.Server?interface=api.Server&serialization=hessian2&timeout=3s
    2023-02-17T10:42:30.776+0800    INFO   client/main.go:133      Update result=null
```