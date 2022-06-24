# 快速入门教程🚀🚀

本教程将阐述从零开始配置**Apinto**，使其可以反向代理请求到后端服务。如需了解更多场景，可点击：
* [负载均衡](/docs/dashboard/upstream/http.md)

* [鉴权校验](/docs/dashboard/auth/auth.md)

* [请求重写](/docs/dashboard/plugins/request_rewrite.md)

以下操作默认使用者已经部署好**Apinto**和**Apinto Dashboard**产品，若未部署，请点击[部署教程](/docs/dashboard/quick/arrange.md)

## 网关调用流程

在使用前，需要了解一下以下概念：
* 路由：流量请求的入口，其可以根据配置的路由规则将流量引流到对应服务中，从而执行不同的服务策略。

* 上游服务：具有相同策略（如流量策略、鉴权策略、负载策略）的一组API或后端微服务，如订单服务、人脸识别服务、天气服务等。

调用流程如下：

<img src="http://data.eolinker.com/course/Afkuxavbc02485039e6655921bda94ab908a30c5ae84d3b.jpeg" alt="网关调用流程" style="zoom:50%;" />

## 配置步骤

### 创建服务

（1）进入上游服务列表界面，点击"创建"按钮

![](http://data.eolinker.com/course/qTd4By5be2b56753239d88af929fdf38db2fcd512dba856.png)

（2）填写服务信息

![](http://data.eolinker.com/course/xA1MCEw6fe484a4f77e1d1c27d17848cc3f3af77ec5a5f8.png)

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
![](http://data.eolinker.com/course/M4T9yvl9fbd2e774ff9525e8581395f70c5b91a06550f6b.png)

（2）配置路由
![](http://data.eolinker.com/course/lJ5gGdud7e51acaf1e1fc0df8dc3c406cf69cd69d0429ff.png)

绑定上一步创建的服务
![](http://data.eolinker.com/course/qYA5SrQ3e250e35ca1ddc66c36d0169bec9a9a7f17261eb.png)

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


