
# HTTP 协议路由


| 类别 | 属性     |
| ---- | -------- |
| 路由 | 路由匹配 |



### 功能描述

路由：完成网关转发步骤的第一步，流量请求的入口，其可以根据配置的路由规则将流量引流到对应服务中，从而执行不同的服务策略。

### 路由匹配规则
路由可配置五种指标，分别是域名、请求方式、location、header、query，除了location外，其它指标均可配置多个。且每个指标的值可配置一种匹配规则。

#### 指标匹配顺序
**优先级递减**
域名 -> 请求方式 -> location -> header（key根据单词字母升序进行排序） -> query（key根据单词字母升序进行排序）   


#### 指标值匹配规则

| 匹配类型               | 规则    | 说明                                             |
| ---------------------- | ------- | ------------------------------------------------ |
| 全等匹配               | str     | 值存在，且与str完全相等                          |
| 前缀匹配               | str*    | 值存在，且str是值的前缀                          |
| 后缀匹配               | *str    | 值存在，且str是值的后缀                          |
| 子串匹配               | \*str\* | 值存在，且str是值的子串                          |
| 非等匹配               | !=str   | 值存在，且值不等于str时匹配成功                  |
| 空值匹配               | $       | 要求key存在且值为空值，多用于header、query指标   |
| 存在匹配               | **      | 要求key存在但不能为空值，多用于header、query指标 |
| 不存在匹配             | !       | 要求key不存在，多用于header、query指标           |
| 区分大小写的正则匹配   | ~=str   | 值符合正则匹配                                   |
| 不区分大小写的正则匹配 | ~*=str  | 值符合正则匹配                                   |
| 任意匹配               | *       | 任何情况都匹配成功                               |

**优先级**：全等匹配 > 前缀匹配 > 后缀匹配 > 子串匹配 > 非等匹配 > 空值匹配 > 存在匹配 > 不存在匹配 > 区分大小写的正则匹配 > 不区分大小写的正则匹配 > 任意匹配

以上所有匹配规则仅支持域名、请求方式、location、header、query的字符串值（以下用str来表示）。


#### 匹配优先级

以下优先级递减

* 指标匹配顺序优先级。

* 在同指标下，按指标值的匹配规则优先级。

* 在同指标、同指标值匹配规则下，按指标值长度递增，若长度相同则按字母升序。
* 同时满足多条路由，指标数量多的路由优先匹配。



(1)当一个请求满足多个路由时，指标匹配顺序优先级最高

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host:www.apinto.com
method: GET
location: /user/login
query_classID: 1
```

路由B(转发到serviceB):

```
method: GET
location: /user/login
query_sex: 男
```

```
请求（GET http://www.apinto.com/user/login?classID=1&sex=男 ）：该请求匹配路由A，转发到serviceA
```



(2)当一个请求满足多个路由且指标匹配顺序相同时，指标值匹配规则优先级更高

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host:www.apinto.com
method: GET
location: /user/login  #全等匹配
query_classID: 1
```

路由B(转发到serviceB):

```
host:www.apinto.com
method: GET
location: /user*  #前缀匹配
query_classID: 1
```

```
请求（GET http://www.apinto.com/user/login?classID=1 ）：该请求匹配路由A，转发到serviceA
```



(3)当一个请求满足多个路由且指标匹配顺序和指标值匹配规则优先级相同时，根据指标值单词字母升序的优先级进行匹配

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host: www.apinto.com
method: GET
location: /user/login
query_name：chen*
```

路由B(转发到serviceB):

```
host: www.apinto.com
method: GET
location: /user/login
query_name：zhang*
```

```
请求A（GET http://www.apinto.com/user/login?name=chenwu ）：该请求优先匹配完路由A所有规则，转发到serviceA
```



(4)当一个请求满足多个路由且指标匹配顺序相同，同时一个路由为另一个路由的子集时，满足指标数量更多的优先

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host: www.apinto.com
method: GET
location: /user/login
query_classID：1
```

路由B(转发到serviceB):

```
host: www.apinto.com
method: GET
location: /user/login
query_classID：1
query_sex：男
```

```
请求A（GET http://www.apinto.com/user/login?classID=1 ）：该请求匹配路由A，转发到serviceA

请求B（GET http://www.apinto.com/user/login?classID=1&sex=男 ）：该请求匹配路由B，转发到serviceB
```

### 路由操作
1、创建路由

![](http://data.eolinker.com/course/BfIkiMXf712ad3343567e0a90c8f77b55b5f744aaec037a.gif)

2、配置路由

![](http://data.eolinker.com/course/v2HUXH3c1d45481518c2bee7da7e8ba03e1d0b850f3c837.gif)

绑定服务

![](http://data.eolinker.com/course/MHVylzp0606eb76442714f7655b9cf535f151f615400cda.gif)

字段描述说明

| 字段 |说明|
|--|---|
| 端口号 |路由监听端口号，该端口必须是**apinto**程序的config.yml中已经存在的端口号，详情请点击[程序配置说明](/docs/apinto/quick/quick_course.md#程序配置说明)|
|请求方式|客户端访问网关的请求方式，路由匹配规则之一|
|域名|客户端访问网关时请求的域名地址，路由匹配规则之一|
|路由规则 | 可规定客户端请求的请求URL，请求头部参数、query参数的条件，路由规则说明请参考[路由规则](#路由匹配规则)|

3、填写完后提交即可

### 调用
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

