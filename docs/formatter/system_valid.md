# 系统可用值

系统可用值定义了可供formatter使用的可选字段，具体字段和表述如下所示：

| 字段名称               | 字段描述                                                     | 备注 |
| ---------------------- | ------------------------------------------------------------ | ---- |
| query                  | 请求中query参数字段，会对键值对里的值进行url_encode编码。    |      |
| query_{name}           | 请求中query参数字段，变量名中的后半部分{name}可以替换成任意query字段，值会进行url_encode编码。 |      |
| uri                    | 请求中的当前URI(不带请求参数，参数位于$args)，可以不同于浏览器传递的$request_uri的值，它可以通过内部重定向，或者使用index指令进行修改，$uri不包含主机名，如"/foo/bar.html" |      |
| content_length         | "Content-Length" 请求头字段                                  |      |
| content_type           | "Content-Type" 请求头字段                                    |      |
| cookie                 | 请求中cookie参数字段                                         |      |
| cookie_{name}          | 请求中cookie参数字段，变量名中的后半部分{name},从cookie里获取值 |      |
| msec                   | 当前的Unix时间戳                                             |      |
| apinto_version         | apinto版本                                                   |      |
| remote_addr            | 客户端地址                                                   |      |
| remote_port            | 客户端端口                                                   |      |
| request_id             | 请求id                                                       |      |
| request_body           | 客户端的请求主体                                             |      |
| request_length         | 请求的长度 (包括请求的地址，http请求头和请求主体)            |      |
| request_method         | HTTP请求方法，通常为"GET"或"POST"                            |      |
| request_time           | 处理客户端请求使用的时间,单位为秒，精度毫秒； 从读入客户端的第一个字节开始，直到把最后一个字符发送给客户端后进行日志写入为止。 |      |
| request_uri            | 这个变量等于包含一些客户端请求参数的原始URI，它无法修改，请查看$uri更改或重写URI，不包含主机名，例如："/cnphp/test.php?arg=freemouse" |      |
| scheme                 | 请求使用的Web协议，"http" 或 "https"                         |      |
| status                 | HTTP响应状态                                                 |      |
| time_iso8601           | 服务器时间的ISO 8601格式                                     |      |
| time_local             | 服务器时间（“2006-01-02 15:04:05”格式）                      |      |
| header                 | 所有请求头字段，按照原格式输出                               |      |
| http_{name}            | 匹配任意请求头字段；变量名中的后半部分name可以替换成任意请求头字段，如在配置文件中需要获取http请求头："Accept-Language"，使用$http_accept_language即可，注意："-"需要转成"_" |      |
| host                   | 请求地址，即浏览器中你输入的地址（IP或域名，不包括端口）     |      |
| proxy_header           | 转发请求的请求头，该值按照原格式输出所有头部信息             |      |
| proxy_header_{name}    | 转发请求头部，变量名中的后半部分{name}可以替换成任意请求头字段 |      |
| proxy_query            | 转发请求的所有query参数，键值对里的值进行url encode编码。    |      |
| proxy_query_{name}     | 转发请求query参数，变量名中的后半部分{name}可以替换成任意query字段，值会进行url_encode编码。 |      |
| proxy_uri              | 转发请求的uri,不包含主机名，例如："/cnphp/test.php?arg=freemouse" |      |
| proxy_method           | 转发请求的http方法                                           |      |
| proxy_scheme           | 转发请求的协议                                               |      |
| proxy_body             | 转发请求的请求体                                             |      |
| proxy_addr             | 上游服务的地址（IP或域名，包括端口）                         |      |
| response               | 响应数据，直接输出原格式                                     |      |
| response_body          | 响应体数据                                                   |      |
| response_header        | 响应头部                                                     |      |
| response_header_{name} | 响应头部，变量名的后半部分{name}可以替换成任意header字段     |      |
| response_status        | 原始的响应状态码                                             |      |
| response_time          | 请求上游的响应时间，单位为毫秒，从发送请求到接收到响应最后一个字节的时间 |      |



**line_formatter注意事项:**

`request_body`、`proxy_body`、`response`、`response_body`这四个参数在line_formatter格式化时会进行Base64加密。

