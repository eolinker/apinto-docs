# 跨域CORS
### 插件名称

| 名称     | 字段 | 属性     |
| -------- | ---- | -------- |
| 跨域插件 | cors | 安全防御 |

### 功能描述

设置跨域的头部字段，实现跨域功能。

### Open Api

#### 配置参数说明


| 参数名            | 值类型       | 是否必填 | 值可能性               | 默认值 | 说明                                                         |
| ----------------- | :----------- | :------- | :--------------------- | :----- | :----------------------------------------------------------- |
| allow_origins     | string       | 否       | https://www.eolink.com | *      | 选填，允许跨域访问的 Origin，格式如： `scheme://host:port` ，多个值之间用英文逗号间隔，允许全部源用 \* |
| allow_methods     | string       | 否       | "POST,GET,OPTION"      | *      | 选填，允许通过的请求方式，比如: `GET` ， `POST` 等，多个值之间用英文逗号间隔，允许全部方法方法用  \* |
| allow_headers     | string       | 否       | *                      | *      | 选填，允许跨域访问时请求方携带哪些非 **CORS 规范**以外的 Header，多个值之间用英文逗号间隔，允许全部请求头部用 \* |
| allow_credentials | bool         | 否       | false                  |        | 选填，请求中是否携带cookie，若allow_credentials为true，那么将不能在其他选项中使用 \*，（也可以在启用了 allow_credentials后使用 ** 强制允许所有 Header 都通过，但请注意这样存在安全隐患） |
| expose_headers    | string       | 否       | *                      | *      | 选填，允许跨域访问时响应方携带哪些非 **CORS 规范** 以外的 Header，多个值之间用英文逗号间隔，允许获取全部返回头部用* |
| max_age           | int          | 否       | 5                      | 5      | 选填，浏览器缓存 CORS 结果的最大时间，单位为秒，在这个时间范围内浏览器会复用上一次的检查结果 |
| response_type     | string_array | 否       | ["text","json"]        | text   | 插件返回报错的类型                                           |



#### CORS规范

| 头部字段            | 示例                                                    | 状态       | 说明                                                         |
| :------------------ | :------------------------------------------------------ | :--------- | :----------------------------------------------------------- |
| Accept              | Accept: text/plain                                      | 固定       | 可接受的响应内容类型（Content-Types）。                      |
| Accept-Charset      | Accept-Charset: utf-8                                   | 固定       | 可接受的字符集                                               |
| Accept-Encoding     | Accept-Encoding: gzip, deflate                          | 固定       | 可接受的响应内容的编码方式。                                 |
| Accept-Language     | Accept-Language: en-US                                  | 固定       | 可接受的响应内容语言列表。                                   |
| Accept-Datetime     | Accept-Datetime: Sat, 26 Dec 2015 GMT                   | 临时       | 可接受的按照时间来表示的响应内容版本                         |
| Authorization       | Authorization: Basic OSdjJGRpbjpvcGVuIANlc2SdDE==       | 固定       | 用于表示HTTP协议中需要认证资源的认证信息                     |
| Cache-Control       | Cache-Control: no-cache                                 | 固定       | 用来指定当前的请求/回复中的，是否使用缓存机制。              |
| Connection          | Connection: keep-alive Connection: Upgrade              | 固定       | 客户端（浏览器）想要优先使用的连接类型                       |
| Cookie              | Cookie: $Version=1; Skin=new;                           | 固定：标准 | 由之前服务器通过Set-Cookie（见下文）设置的一个HTTP协议Cookie |
| Content-Length      | Content-Length: 348                                     | 固定       | 以8进制表示的请求体的长度                                    |
| Content-Type        | Content-Type: application/x-www-form-urlencoded         | 固定       | 请求体的MIME类型 （用于POST和PUT请求中）                     |
| Date                | Date: Dec, 26 Dec 2015 GMT                              | 固定       | 发送该消息的日期和时间（以RFC 7231中定义的”HTTP日期”格式来发送） |
| Expect              | Expect: 100-continue                                    | 固定       | 表示客户端要求服务器做出特定的行为                           |
| From                | From: [user@itbilu.com](mailto:user@itbilu.com)         | 固定       | 发起此请求的用户的邮件地址                                   |
| Host                | Host: www.itbilu.com:80 Host: www.itbilu.com            | 固定       | 表示服务器的域名以及服务器所监听的端口号。如果所请求的端口是对应的服务的标准端口（80），则端口号可以省略。 |
| If-Match            | If-Match: “9jd00cdj34pss9ejqiw39d82f20d0ikd”            | 固定       | 仅当客户端提供的实体与服务器上对应的实体相匹配时，才进行对应的操作。主要用于像 PUT 这样的方法中，仅当从用户上次更新某个资源后，该资源未被修改的情况下，才更新该资源。 |
| If-Modified-Since   | If-Modified-Since: Dec, 26 Dec 2015 GMT                 | 固定       | 允许在对应的资源未被修改的情况下返回304未修改                |
| If-None-Match       | If-None-Match: “9jd00cdj34pss9ejqiw39d82f20d0ikd”       | 固定       | 允许在对应的内容未被修改的情况下返回304未修改（ 304 Not Modified ），参考 超文本传输协议 的实体标记 |
| If-Range            | If-Range: “9jd00cdj34pss9ejqiw39d82f20d0ikd”            | 固定       | 如果该实体未被修改过，则向返回所缺少的那一个或多个部分。否则，返回整个新的实体 |
| If-Unmodified-Since | If-Unmodified-Since: Dec, 26 Dec 2015 GMT               | 固定       | 仅当该实体自某个特定时间以来未被修改的情况下，才发送回应。   |
| Max-Forwards        | Max-Forwards: 10                                        | 固定       | 限制该消息可被代理及网关转发的次数。                         |
| Origin              | Origin: [http://www.itbilu.com](http://www.itbilu.com/) | 固定: 标准 | 发起一个针对跨域资源共享的请求（该请求要求服务器在响应中加入一个Access-Control-Allow-Origin的消息头，表示访问控制所允许的来源）。 |
| Pragma              | Pragma: no-cache                                        | 固定       | 与具体的实现相关，这些字段可能在请求/回应链中的任何时候产生。 |
| Proxy-Authorization | Proxy-Authorization: Basic IOoDZRgDOi0vcGVuIHNlNidJi2== | 固定       | 用于向代理进行认证的认证信息。                               |
| Range               | Range: bytes=500-999                                    | 固定       | 表示请求某个实体的一部分，字节偏移以0开始。                  |
| Referer             | Referer: http://itbilu.com/nodejs                       | 固定       | 表示浏览器所访问的前一个页面，可以认为是之前访问页面的链接将浏览器带到了当前页面。Referer其实是Referrer这个单词，但RFC制作标准时给拼错了，后来也就将错就错使用Referer了。 |
| TE                  | TE: trailers,deflate                                    | 固定       | 浏览器预期接受的传输时的编码方式：可使用回应协议头Transfer-Encoding中的值（还可以使用”trailers”表示数据传输时的分块方式）用来表示浏览器希望在最后一个大小为0的块之后还接收到一些额外的字段。 |
| User-Agent          | User-Agent: Mozilla/……                                  | 固定       | 浏览器的身份标识字符串                                       |
| Upgrade             | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11          | 固定       | 要求服务器升级到一个高版本协议。                             |
| Via                 | Via: 1.0 fred, 1.1 itbilu.com.com (Apache/1.1)          | 固定       | 告诉服务器，这个请求是由哪些代理发出的。                     |
| Warning             | Warning: 199 Miscellaneous warning                      | 固定       | 一个一般性的警告，表示在实体内容体中可能存在错误。           |

#### 配置示例

```sh
{
    "allow_origin": "*",
    "allow_methods": "POST,GET",
    "allow_headers": "*",
    "allow_credentials": "true",
    "expose_headers": "*",
    "max_age":5
    "response_type":"json"
}
```

#### Open API请求配置示例

##### 全局配置

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:cors",
        "name":"my_cors",
        "status":"enable"
    }]
}'
```

在使用跨域插件之前，需要在全局插件配置中将name为**cors**的插件状态设置为enable，具体配置点此[跳转](/docs/apinto/plugins/)

##### 配置带有跨域插件的服务

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```sh
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' \
-d '{
  "name": "cors_service",
  "driver": "http",
  "timeout": 3000,
  "retry": 3,
  "description": "使用跨域插件",
  "scheme": "https",
  "nodes": ["demo.apinto.com:8280"],
  "balance": "round-robin",
  "plugins": {
    "my_cors": {
	 "disable": false,
	 "config": {
	  "allow_origins": "*",
	  "allow_methods": "POST"
	 }
    }
  }
}' 
```

```
成功创建id为cors_service@service的服务
```

##### 绑定路由

将上一步生成的服务id绑定至路由的target字段

```sh
curl -X POST 'http://127.0.0.1:9400/api/router' -H 'Content-Type:application/json' \
-d '{
  "name": "cors_router",
  "driver": "http",
  "description": "该路由的目标服务使用了跨域插件",
  "listen": 8099,
  "rules": [{
    "location": "/demo/cors"
  }],
  "target": "cors_service@service"
}'
```

##### 接口请求示例

```sh
curl -i -X POST 'http://127.0.0.1:8099/demo/cors' -H 'Content-Type:application/json'
```

##### 接口访问返回示例

当使用GET方法请求上述服务时，会受跨域插件的限制（因为只允许POST请求），获得如下反馈：

```sh
HTTP/1.1 403 Forbidden
Content-Type: text/plain; charset=utf-8
Content-Length: 42
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: *
Access-Control-Allow-Methods: POST
Access-Control-Expose-Headers: *
Access-Control-Allow-Credentials: false

[CORS] Request method 'GET' is not allowed
```
