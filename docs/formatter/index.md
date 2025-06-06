# formatter

## 功能描述

Formatter主要应用于规定待记录的日志字段，在实际调用时获取指定字段的具体值以生成详细的日志内容，并将日志内容格式化成规定的格式给到[output输出器](/docs/apinto/outputer/file.md)进行记录

## 类型支持

| 类型 | 说明                               |
| ---- | ---------------------------------- |
| json | 将日志内容格式化为json格式进行输出 |
| line | 将日志内容格式化为line格式进行输出 |

**备注**： 不同类型仅为输出不同，配置规则基本一致。

## 输出流程

![](http://data.eolinker.com/course/2UJr1mbd493864877b08887aa92d3c32f1ab8aa5fb959ea.png)

## 配置规则

```json
{
  "fields": [
    "$request_id",
    "@proxy as proxy",
    "@proxy# as proxylist"
  ],
  "proxy": [
    "$proxy_uri",
    "$proxy_scheme"
  ]
}
```

### key

key指的是上述yaml配置中的键，如fields和proxy

**说明**：

1. **fields**配置项为默认的格式化字段列表，其他为额外的**自定义引用项**（如上述proxy项）
2. 在配置内容中可以用@{key}来引用自定义引用项作为复合内容，引用效果由value元素具体定义决定
2. 自定义引用项可以嵌套引用其它自定义引用项

### value

value指的是上述yaml配置中键所对应的值，如proxy所对应的["$proxy_uri","$proxy_scheme"]

**说明**:

1. value为字符串列表，每一项元素表示一个字段取值
2. 元素格式为: ($|@){pattern}[#] as {name}（注：[]表示可选内容）
   - $ 表示取出**系统可用值**(系统可用值说明在本页底层)
   - @{pattern}表示引用key名为{pattern}的配置，当{pattern}在上下文中的值类型为数组时，取最后一个元素
   - @{pattern}#表示引用key名为{pattern}的配置，输出值类型为数组类型
   - 当元素不带$或@前缀时，其为常量
   - as 表示给{pattern}起别名，仅对json formatter有效，因为line输出日志不包含{pattern}，仅输出{pattern}对应的系统可用值

## 输出规则

### ${pattern}

对于形如”${pattern}“或""${pattern} as {name}"的字段格式，表示直接取出指定pattern字段的系统可用值进行记录。

#### 配置

```json
{
  "fields": [
    "$proxy_uri",
    "$proxy_scheme as scheme",
    "$proxy_addr as addr"
  ]
}
```

#### json输出

```json
{
    "proxy_uri":"http://127.0.0.1/api/demo",
    "scheme":"http",
    "addr":"127.0.0.1",
}
```

#### line输出

as取别名对line无效，line只会输出值。

```
http://127.0.0.1/api/demo	http	127.0.0.1
```

### @{pattern}

对于形如”@{pattern}“的字段格式，表示引用**名为pattern的自定义引用项**，当{pattern}在上下文中的值类型为数组时，取最后一个对象元素，{pattern}的值类型为对象类型，且{pattern}应事先定义在与fields配置项同级的**自定义引用项**中，具体例子如下所示：

#### 配置

```yaml
{
  "fields": [
    "@proxy"
  ],
  "proxy": [
    "$proxy_uri",
    "$proxy_scheme",
    "$proxy_addr"
  ]
}
```

#### json输出

```json
{
    "proxy":{
    	"proxy_uri":"http://127.0.0.1/api/demo",
        "proxy_scheme":"http",
        "proxy_addr":"127.0.0.1",
    }
}
```

#### line输出

```
"http://127.0.0.1/api/demo http 127.0.0.1"
```

### @{pattern}#

对于形如”@{pattern}#“的字段格式，表示引用名为pattern的自定义引用项，输出为数组类型。具体例子如下所示：

#### 配置

```json
{
  "fields": [
    "@proxy#"
  ],
  "proxy": [
    "$proxy_uri",
    "$proxy_scheme",
    "$proxy_addr"
  ]
}
```

#### json输出

```json
{
    "proxy":[
        {
    		"proxy_uri":"http://127.0.0.2/api/demo2",
        	"proxy_scheme":"http",
        	"proxy_addr":"127.0.0.2",
    	},
        {
    		"proxy_uri":"http://127.0.0.1/api2/demo",
        	"proxy_scheme":"http",
        	"proxy_addr":"127.0.0.1",
    	},
    ]
}
```

#### line输出

```
"[http://127.0.0.1/api/demo,http,127.0.0.1] [http://127.0.0.2/api2/demo2,http,127.0.0.2]"
```



### 常量pattern

当元素前缀不为$或@时，表明该元素为常量，直接取值，具体例子如下所示：

#### 配置

```json
{
  "fields": [
    "123",
    "abc as service_name"
  ]
}
```

#### json输出

```json
{
    "123":"123",
    "service_name":"abc"
}
```

#### line输出

```
123    abc
```



### 输出示例

#### json

类型为json的formatter输出json格式的日志信息，自定义引用项嵌套层数没有限制。

##### 配置示例

```json
{
  "fields": [
    "$request_id as id",
    "@http",
    "@service as t",
    "@tmp",
    "@proxy#"
  ],
  "http": [
    "$request_method",
    "$request_uri",
    "@service",
    "@proxy",
    "@proxy# as proxylist"
  ],
  "service": [
    "abc as service_name"
  ],
  "proxy": [
    "$proxy_username",
    "$proxy_password"
  ],
  "tmp": [
    123,
    "456 as test"
  ]
}
```

##### 输出示例

```json
{
    "id":"123",
    "http":{
        "request_uri":"/path",
        "request_method":"POST",
        "service":{
            "service_name":"abc"
        },
        "proxy":{
            "proxy_username":"username2",
            "proxy_password":"password2"
        },
        "proxylist":[
            {
                "proxy_username":"username1",
                "proxy_password":"password1"
            },{
                "proxy_username":"username2",
                "proxy_password":"password2"
            }
        ]
    },
    "t":{
        "service_name":"abc"
    },
    "tmp":{
        "123":"123",
        "test":"456"
    },
    "proxy":[
        {
            "proxy_username":"username2",
            "proxy_password":"password2"
        },{
            "proxy_username":"username2",
            "proxy_password":"password2"
        }
    ]
}
```

#### line

类型为line的formatter输出line格式的日志信息，信息嵌套层数**不超过**三层。

line日志内容仅包含系统可用值或常量，不像json那样有明确分层和以键值对形式出现的数据，故line日志会按照下面的规则来间隔变量和分层。

1. 每个值之间用间隔符分割

2. 使用@时，按层次替换分隔符，且按层次使用包含符号

     * 分隔符依次为: 

       i. `\t` 

       ii. `空格`

       iii.  `,`

       iv. `|`

       v. `剩下的不显示`


     * 包含符号依次为
    
       i. `""`
    
       ii. `[]`
    
       iii. `<>`


3. 空值或者超过层级部分显示为`-`减号。

##### 配置示例

```json
{
  "fields": [
    "$request_id",
    "$time_local",
    "$null_value",
    "@proxy",
    "@proxy#",
    "@tmp1"
  ],
  "tmp1": [
    "@tmp2"
  ],
  "tmp2": [
    "@proxy",
    "@proxy#"
  ],
  "proxy": [
    "$proxy_scheme",
    "$proxy_uri"
  ]
}
```

##### 输出示例

```
0ff7692b-3833-464d-9fb9-6d24274756fe    2021-12-28 17:29:32     -       "http /demo?a=1"        "[http,/demo?a=1]"      "[<http|/demo?a=1>,<->]"
```



## 系统可用值

系统可用值定义了可供formatter使用的可选字段，具体字段和表述如下所示：

| 字段名称                   | 字段描述                                                                                                             | 备注  |
|------------------------|------------------------------------------------------------------------------------------------------------------|-----|
| node                   | 节点id                                                                                                             |     |
| cluster                | 集群id                                                                                                             |     |
| application            | 应用ID                                                                                                             |     |
| api | 匹配中的api id                                                                                                       |     |
| service                | 匹配中的服务id                                                                                                       |     |
| token                  | 用户访问鉴权信息                                                                                                         |     |
| block_name | 拦截策略Name                                                                                                         |     |
| src_ip                 | 请求源IP                                                                                                            |     |
| src_port               | 请求源端口                                                                                                            |     |
| dst_ip                 | 目标IP                                                                                                             |     |
| dst_port               | 目标端口                                                                                                             |     |
| query                  | 请求中query参数字段，会对键值对里的值进行url_encode编码。                                                                             |     |
| query_{name}           | 请求中query参数字段，变量名中的后半部分{name}可以替换成任意query字段，值会进行url_encode编码。                                                     |     |
| uri                    | 请求中的当前URI(不带请求参数，参数位于$args)，可以不同于浏览器传递的$request_uri的值，它可以通过内部重定向，或者使用index指令进行修改，$uri不包含主机名，如"/foo/bar.html"     |     |
| content_length         | "Content-Length" 请求头字段                                                                                           |     |
| content_type           | "Content-Type" 请求头字段                                                                                             |     |
| cookie                 | 请求中cookie参数字段                                                                                                    |     |
| cookie_{name}          | 请求中cookie参数字段，变量名中的后半部分{name},从cookie里获取值                                                                        |     |
| msec                   | 当前的Unix时间戳，毫秒级别                                                                                                  |     |
| timestamp              | 当前的Unix时间戳，秒级别                                                                                                   |     |
| apinto_version         | apinto版本                                                                                                         |     |
| remote_addr            | 客户端地址                                                                                                            |     |
| remote_port            | 客户端端口                                                                                                            |     |
| request_id             | 请求id                                                                                                             |     |
| request_body           | 客户端的请求主体                                                                                                         |     |
| request_length         | 请求的长度 (包括请求的地址，http请求头和请求主体)                                                                                     |     |
| request_method         | HTTP请求方法，通常为"GET"或"POST"                                                                                         |     |
| request_time           | 处理客户端请求使用的时间,单位为秒，精度毫秒； 从读入客户端的第一个字节开始，直到把最后一个字符发送给客户端后进行日志写入为止。                                                 |     |
| request_uri            | 这个变量等于包含一些客户端请求参数的原始URI，它无法修改，请查看$uri更改或重写URI，不包含主机名，例如："/cnphp/test.php?arg=freemouse"                          |     |
| scheme                 | 请求使用的Web协议，"http" 或 "https"                                                                                      |     |
| status                 | HTTP响应状态                                                                                                         |     |
| time_iso8601           | 服务器时间的ISO 8601格式                                                                                                 |     |
| time_local             | 服务器时间（“2006-01-02 15:04:05”格式）                                                                                   |     |
| header                 | 所有请求头字段，按照原格式输出                                                                                                  |     |
| headers                | 所有请求头字段，对象类型，针对json格式输出                                                                                          |     |
| http_{name}            | 匹配任意请求头字段；变量名中的后半部分name可以替换成任意请求头字段，如在配置文件中需要获取http请求头："Accept-Language"，使用$http_accept_language即可，注意："-"需要转成"_" |     |
| host                   | 请求地址，即浏览器中你输入的地址（IP或域名，不包括端口）                                                                                    |     |
| proxy_header           | 转发请求的请求头，该值按照原格式输出所有头部信息                                                                                         |     |
| proxy_header_{name}    | 转发请求头部，变量名中的后半部分{name}可以替换成任意请求头字段                                                                               |     |
| proxy_query            | 转发请求的所有query参数，键值对里的值进行url encode编码。                                                                             |     |
| proxy_query_{name}     | 转发请求query参数，变量名中的后半部分{name}可以替换成任意query字段，值会进行url_encode编码。                                                      |     |
| proxy_uri              | 转发请求的uri,不包含主机名，例如："/cnphp/test.php?arg=freemouse"                                                               |     |
| proxy_host             | 转发请求头部中的host                                                                                                     |     |
| proxy_status           | 转发请求的状态码                                                                                                         |     |
| proxy_method           | 转发请求的http方法                                                                                                      |     |
| proxy_scheme           | 转发请求的协议                                                                                                          |     |
| proxy_path             | 转发请求的路径，不包含query参数                                                                                               |     |
| proxy_body             | 转发请求的请求体                                                                                                         |     |
| proxy_addr             | 上游服务的地址（IP或域名，包括端口）                                                                                              |     |
| proxy_dst_ip           | 上游服务的IP                                                                                                          |     |
| proxy_dst_port         | 上游服务的端口                                                                                                          |     |
| response               | 响应数据，直接输出原格式                                                                                                     |     |
| response_body          | 响应体数据                                                                                                            |     |
| response_header        | 响应头部                                                                                                             |     |
| response_headers       | 响应头部，对象类型，针对json格式输出                                                                                             |     |
| response_header_{name} | 响应头部，变量名的后半部分{name}可以替换成任意header字段                                                                               |     |
| response_status        | 原始的响应状态码                                                                                                         |     |
| response_time          | 请求上游的响应时间，单位为毫秒，从发送请求到接收到响应最后一个字节的时间                                                                             |     |



**line_formatter注意事项:**

`request_body`、`proxy_body`、`response`、`response_body`这四个参数在line_formatter格式化时会进行Base64加密。
