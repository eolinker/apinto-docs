
# HTTP 协议路由


| 类别 | 属性     |
| ---- | -------- |
| 路由 | 路由匹配 |



### 功能描述

路由：完成网关转发步骤的第一步，流量请求的入口，其可以根据配置的路由规则将流量引流到对应服务中，从而执行不同的服务策略。


### 路由操作
1、创建路由

![](http://data.eolinker.com/course/6e6cWCTba27e60e5471eaa0f71e21897bfcd27038dc7ac3.png)

2、绑定服务
![](http://data.eolinker.com/course/DeYjjvUc996b1e42514eb270a148d9e2f6bb33a97297771.png)


字段描述说明

| 字段       | 说明                                                                                                      |
|----------|---------------------------------------------------------------------------------------------------------|
| 端口号      | 路由监听端口号，该端口必须是**apinto**程序的config.yml中已经存在的端口号，详情请点击[程序配置说明](/docs/apinto/quick/quick_course.md#程序配置说明) |
| 请求方式     | 客户端访问网关的请求方式，路由匹配规则之一                                                                                   |
| 域名       | 客户端访问网关时请求的域名地址，路由匹配规则之一                                                                                |
| Location | 客户端请求路径                                                                                                 |
| 路由规则     | 可规定客户端请求的请求URL，请求头部参数、query参数的条件，路由规则说明请参考[路由规则](/docs/apinto/router/http.md#路由匹配规则)                    |
| 目标服务     | 路由匹配成功后，将转发到指定上游服务                                                                                      |
| 插件模版     | 插件模版引用                                                                                                  |
| 重试次数     | 当上游服务连接失败、连接超时时，重新转发的次数                                                                                 |
| 超时时间     | 请求上游服务的总时间                                                                                              |

### 调用
```shell
curl -i 'http://127.0.0.1:8099/demo'
```

返回结果

```shell
HTTP/1.1 200 OK
Server: fasthttp
Date: Tue, 21 Jun 2022 08:36:00 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 225
Set-Cookie: uid=1; Path=/; Max-Age=86400000000000

{"body":"","header":{"Accept":["*/*"],"User-Agent":["curl/7.79.1"],"X-Forwarded-For":["127.0.0.1,127.0.0.1"]},"host":"127.0.0.1:8099","method":"GET","path":"/demo","query":{},"remote_addr":"61.144.147.89:56221","url":"/demo"}
```

