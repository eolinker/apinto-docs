# 快速入门教程🚀🚀

本教程将阐述从零开始配置**Apinto**，使其可以反向代理请求到后端服务。

[//]: # (如需了解更多场景，可点击：)

[//]: # (* [负载均衡]&#40;/docs/dashboard/upstream/http.md&#41;)

[//]: # ()
[//]: # (* [鉴权校验]&#40;/docs/dashboard/auth/auth.md&#41;)

[//]: # ()
[//]: # (* [请求重写]&#40;/docs/dashboard/plugins/request_rewrite.md&#41;)

以下操作默认使用者已经部署好**Apinto**和**Apinto Dashboard**产品，若未部署，请点击[部署教程](/docs/dashboard/quick/arrange.md)

## 网关调用流程

在使用前，需要了解一下以下概念：
* 路由：流量请求的入口，其可以根据配置的路由规则将流量引流到对应服务中，从而执行不同的服务策略。

* 上游服务：具有相同策略（如流量策略、鉴权策略、负载策略）的一组API或后端微服务，如订单服务、人脸识别服务、天气服务等。

调用流程如下：

<img src="http://data.eolinker.com/course/Afkuxavbc02485039e6655921bda94ab908a30c5ae84d3b.jpeg" alt="网关调用流程" style="zoom:50%;" />

## 配置步骤

### 创建上游服务

（1）进入上游服务列表界面，点击"创建"按钮

![](http://data.eolinker.com/course/6TSQnZd8a59f9199df82de617b1553d27fb0d0ec459a057.gif)

（2）填写服务信息

![](http://data.eolinker.com/course/N4jzuJr88a74af678119baca551eaaf806fa3224b091c0f.gif)

字段描述说明

| 字段     | 描述                                                                                                                                                                            |
|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 请求超时时间 | 请求后端服务的最大等待时间，单位：ms，最小值：1                                                                                                                                                     |
| 失败重试次数 | 当请求后端服务超时时，重新发送该请求的次数                                                                                                                                                         |
| 请求协议   | 请求后端服务的协议，目前支持http、https                                                                                                                                                      |
| 服务发现   | 后端服务地址列表，可选择匿名上游或已有动态服务发现，服务发现的具体概念请查看[服务发现说明](/docs/dashboard/discovery.md)                                                                                                  |
| 负载均衡算法 | 分配负载上游的算法<br>round-robin：权重轮询算法                ｜                                                                                                                              |
| 静态配置   | 当服务发现选择匿名上游时弹出<br><br>配置格式：{域名/ip}:{port} {weight} <br> 示例：demo.apinto.com:8280 100 <br><br> 可配置多个上游地址，中间用英文分号**;**隔开<br>示例：demo.apinto.com:8280 100;demo.gokuapi.com:8280 10 |

（3）填写完后提交即可

### 绑定路由 

（1）创建路由
![](http://data.eolinker.com/course/BfIkiMXf712ad3343567e0a90c8f77b55b5f744aaec037a.gif)

（2）配置路由
![](http://data.eolinker.com/course/v2HUXH3c1d45481518c2bee7da7e8ba03e1d0b850f3c837.gif)

绑定上一步创建的服务
![](http://data.eolinker.com/course/MHVylzp0606eb76442714f7655b9cf535f151f615400cda.gif)

字段描述说明

| 字段 |说明|
|--|---|
| 端口号 |路由监听端口号，该端口必须是**apinto**程序的config.yml中已经存在的端口号，详情请点击[程序配置说明](/docs/apinto/quick/quick_course.md#程序配置说明)|
|请求方式|客户端访问网关的请求方式，路由匹配规则之一|
|域名|客户端访问网关时请求的域名地址，路由匹配规则之一|
|路由规则 | 可规定客户端请求的请求URL，请求头部参数、query参数的条件，路由规则说明请参考[路由规则](/docs/dashboard/router/http.md#路由匹配规则)|

（3）填写完后提交即可

### 调用服务
```shell
curl -i 'http://127.0.0.1:8099/demo'
```

返回结果

```json
HTTP/1.1 200 OK
Server: fasthttp
Date: Tue, 21 Jun 2022 08:36:00 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 225
Set-Cookie: uid=1; Path=/; Max-Age=86400000000000

{"body":"","header":{"Accept":["*/*"],"User-Agent":["curl/7.79.1"],"X-Forwarded-For":["127.0.0.1,127.0.0.1"]},"host":"127.0.0.1:8099","method":"GET","path":"/demo","query":{},"remote_addr":"61.144.147.89:56221","url":"/demo"}
```


