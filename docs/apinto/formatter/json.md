# Json

### **Json Formatter概述**

Json Formatter主要应用于将日志内容格式化成json格式

### 配置规则

```yaml
fields:
    - $request_id
    - @proxy as proxy
    - @proxy# as proxylist
proxy:
    - $proxy_uri
    - $proxy_scheme
```

#### key

1. fields配置项为默认的格式化字段列表，其他为额外的自定义引用项（如上述proxy项）
2. 在配置内容中可以用@{key}来引用其他字段作为复合内容，引用效果由具体实现定义

#### 值

1. 值为字符串列表，每一项元素表示一个字段取值
2. 元素格式为: ($|@){pattern}[#] AS {name}（注：[]表示可选内容）
   - $ 表示取出字符串
   - @{pattern}表示引用名为{pattern}的配置，当目标字段实际类型为数组时，取最后一个元素
   - @{pattern}#表示引用名为{pattern}的配置，值类型为数组类型
   - 当数据不带$或@前缀时，其为常量

### 配置示例

##### 配置

```yaml
fields:
    - $request_id as id
    - @http
    - @service as t
    - @tmp
    - @proxy#
http:
    - $request_method
    - $request_uri
    - @service
    - @proxy
    - @proxy# as proxylist
service:
    - abc as service_name
proxy:
    - $proxy_username
    - $proxy_password
tmp:
    - 123
    - 456 as test
```

> 更多可配置字段详见：[系统可用值](/docs/formatter/system_valid.md)

##### 输出

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



### 配置规则详解

**fields**配置项中指定了待记录的日志字段，fields中每个元素为输出为json格式的根字段。其余配置项则为**自定义引用项**。具体配置规则如下：

#### ${pattern}

对于形如”${pattern}“的字段格式，表示直接取出指定pattern字段的值进行记录，且字段键值规定为pattern。如：

```json
”$request_id“表示记录请求过程中的请求id，则最终日志记录格式为{"request_id":"123456"}；
”$status“表示记录HTTP的响应状态等，则最终日志记录格式为{"status":"200"}；
```

#### ${pattern} as {name}

对于形如”${pattern} as {name}“的字段格式，表示直接取出字段pattern指定的值进行记录，且字段键值规定为name。如：

```json
如”$request_id as id“表示记录请求过程中的请求id，且记录的键值名为‘id’，则最终日志记录格式为{"id":"123456"}；
```

#### @{pattern}

对于形如”@{pattern}“的字段格式，表示引用**名为pattern的数据对象**，当目标字段实际类型为数组时，取最后一个对象元素，字段键值规定为pattern，具体的值类型为对象类型，且所引用的名为pattern的数据对象应事先定义在与fields配置项同级的**自定义引用项**中，具体例子如下所示：

##### 配置

```yaml
"fields":
	- "@proxy"
"proxy":
	- "$proxy_uri"
	- "$proxy_scheme"
	- "$proxy_addr"
```

##### 输出

```json
{
    "proxy":{
    	"proxy_uri":"http://127.0.0.1/api/demo",
        "proxy_scheme":"http",
        "proxy_addr":"127.0.0.1",
    }
}
```

#### @{pattern}#

对于形如”@{pattern}#“的字段格式，表示引用名为pattern的配置项，字段键值规定为pattern，具体的值类型为数组类型。具体例子如下所示：

##### 配置

```yaml
"fields":
	- "@proxy#"
"proxy":
	- "$proxy_uri"
	- "$proxy_scheme"
	- "$proxy_addr"
```

##### 输出

```json
{
    "proxy":[
        {
    		"proxy_uri":"http://127.0.0.1/api/demo",
        	"proxy_scheme":"http",
        	"proxy_addr":"127.0.0.1",
    	},
        {
    		"proxy_uri":"http://127.0.0.2/api2/demo2",
        	"proxy_scheme":"http",
        	"proxy_addr":"127.0.0.2",
    	},
    ]
}
```

#### 元素前缀不为$或@

当元素前缀不为$或@时，表明该元素为常量，直接取值，具体例子如下所示：

##### 配置

```yaml
"fields":
	- "123"
	- "abc as service_name"
```

##### 输出

```json
{
    "123":"123",
    "service_name":"abc"
}
```
