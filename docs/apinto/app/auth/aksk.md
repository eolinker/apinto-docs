# AK/SK

> 描述
> * 动态token校验
> * 可设置待校验的参数名称、参数位置、参数值
> * 对请求进行防篡改验证
>
> 如果需要了解其他鉴权，可点击对应文档链接：
> * [Apikey](/docs/apinto/app/auth/apikey)
> * [Basic](/docs/apinto/app/auth/basic)
> * [JWT](/docs/apinto/app/auth/jwt)

## 配置说明
| 参数名                   | 值类型                     | 是否必填 | 值可能性 | 默认值 | 说明                                                         |
| ------------------------ | -------------------------- | -------- | -------- | ------ | ------------------------------------------------------------ |
| token_name               | string                     | 是       |          |        | 参数名                                                       |
| position                 | string                     | 是       | header   |        | 参数位置。由于该鉴权会对query、body进行校验，因此只能放在header里 |
| type                     | string                     | 是       | aksk     |        | 驱动类型                                                     |
| users                    | array_object               | 是       |          |        | 用户列表                                                     |
| users -> expire          | int64                      | 是       |          |        | 用户过期时间，时间戳格式，当值为0表示不过期                  |
| users -> pattern         | object                     | 是       |          |        | 用户信息                                                     |
| users -> pattern -> ak   | string                     | 是       |          |        | access key                                                   |
| users -> pattern -> sk   | string                     | 是       |          |        | secret key                                                   |
| users -> hide_credential | bool                       | 否       |          | false  | 转发时是否将鉴权信息隐藏，默认不隐藏。                       |
| users -> labels          | object (map[string]string) | 否       |          |        | 用户标签，当aksk匹配成功后，该标签会加入请求上下文中         |

### 配置示例
```shell
{
    "position": "query",
    "token_name": "apikey",
    "type": "apikey",
    "users": [
        {
            "expire": 0,
            "hide_credential": true,
            "labels": {},
            "pattern": {
                "ak": "ak1",
                "sk": "sk1"
            }
        },
        {
            "expire": 0,
            "hide_credential": true,
            "labels": {},
            "pattern": {
                "ak": "ak2",
                "sk": "sk2"
            }
        },
        {
            "expire": 0,
            "hide_credential": true,
            "labels": {},
            "pattern": {
                "ak": "ak3",
                "sk": "sk3"
            }
        },
    ]
}
```



AK/SK鉴权需要搭配应用使用，详情请点击[应用](/docs/apinto/app/)


## AK/SK流程概述

客户端涉及的AK/SK签名以及请求发送的流程概述如下：

1. 构造规范请求。将待发送的请求内容按照与API网关后台约定的规则组装，确保客户端签名、API网关后台认证时使用的请求内容一致。
2. 使用规范请求和其他信息创建待签字符串。
3. 使用AK/SK和待签字符串计算签名。
4. 将生成的签名信息作为请求消息头添加到HTTP请求中，或者作为查询字符串参数添加到HTTP请求中。

### 使用说明

#### 一、构造规范请求

使用AK/SK方式进行签名与认证，首先需要规范请求内容，然后再进行签名。客户端与API网关使用相同的请求规范，可以确保同一个HTTP请求的前后端得到相同的签名结果，从而完成身份校验。

HTTP请求规范伪代码如下：

```
CanonicalRequest =
      HTTPRequestMethod + '\n' +
      CanonicalURI + '\n' +
      CanonicalQueryString + '\n' +
      CanonicalHeaders + '\n' +
      SignedHeaders + '\n' +
      HexEncode(Hash(RequestPayload))
```

假设 **原始请求** 如下：

```
GET http://www.demo.com/demo/login?parm1=value1&parm2= HTTP/1.1
Host: www.demo.com
X-Gateway-Date: 20200605T104456Z
```



##### 1、HTTPRequestMethod：构造HTTP请求方法，以换行符结束。

HTTP请求方法，如GET、PUT、POST等。

构造示例：

```
GET
```



##### 2、CanonicalURI：添加规范URI参数，以换行符结束。

1. 规范URI，即请求资源路径，是URI的绝对路径部分的URI编码。
2. 根据RFC 3986标准化URI路径，移除冗余和相对路径部分，路径中每个部分必须为URI编码。如果URI路径不以“/”结尾，则在尾部添加“/”。

注意：

> 计算签名时，URI必须以“/”结尾。发送请求时，可以不以“/”结尾。

构造示例：

```
GET
/demo/login/
```



##### 3、CanonicalQueryString：添加规范查询字符串，以换行符结束。

1. 查询字符串，即查询参数。如果没有查询参数，则为空字符串，即规范后的请求为空行。

2. 规范查询字符串需要满足以下要求：

   1. 根据以下规则对每个参数名和值进行URI编码：请勿对RFC 3986定义的任何非预留字符进行URI编码，这些字符包括：A-Z、a-z、0-9、-、_、.和~。
   2. 使用%XY对所有非预留字符进行百分比编码，其中X和Y为十六进制字符（0-9和A-F）。例如，空格字符必须编码为%20，扩展UTF-8字符必须采用“%XY%ZA%BC”格式。

3. 对于每个参数，追加“URI编码的参数名称=URI编码的参数值”。如果没有参数值，则以空字符串代替，但不能省略“=”。
   例如以下含有两个参数，其中第二个参数parm2的值为空。

   ```
    parm1=value1&parm2=
   ```

4. 按照字符代码以升序顺序对参数名进行排序。
   例如，以大写字母F开头的参数名排在以小写字母b开头的参数名之前。

5. 以排序后的第一个参数名开始，构造规范查询字符串。

构造示例：

```
GET
/demo/login/
parm1=value1&parm2=
```



##### 4、CanonicalHeaders：添加规范消息头，以换行符结束。

1. 规范消息头，即请求消息头列表。包括签名请求中的所有HTTP消息头列表。消息头必须包含X-Gateway-Date，用于校验签名时间，格式为ISO8601标准的UTC时间格式：YYYYMMDDTHHMMSSZ。
2. CanonicalHeaders由多个请求消息头共同组成，CanonicalHeadersEntry0 + CanonicalHeadersEntry1 + …，其中每个请求消息头（CanonicalHeadersEntry ）的格式为Lowercase(HeaderName) + ‘:’ + Trimall(HeaderValue) + ‘\n’
3. 将消息头名称转换为小写形式，并删除前导空格和尾随空格。
4. 按照字符代码对消息头名称进行升序排序。

注意： 

- Lowercase表示将所有字符转换为小写字母的函数。
- Trimall表示删除值前后的多余空格的函数。
- 最后一个请求消息头也会携带一个换行符。叠加规范中CanonicalHeaders自身携带的换行符，因此会出现一个空行。

> 例如原始消息头为：
>
> ```
> Host: www.demo.com\n
> Content-Type: application/json;charset=utf8\n
> My-header1:    a   b   c  \n
> X-Gateway-Date:20200605T104456Z\n
> My-Header2:    "x   y   \n
> ```
>
> 对消息头名称转小写，按消息头名称字符代码对消息头排序，将消息头的值去掉前导空格与尾随空格。最终得到规范消息头：
>
> ```
> content-type:application/json;charset=utf8\n
> host:www.demo.com\n
> my-header1:a   b   c\n
> my-header2:"x   y\n
> x-gateway-date:20200605T104456Z\n
> ```

构造示例：

```
GET
/demo/login/
parm1=value1&parm2=
content-type:application/json
host:www.demo.com
x-gateway-date:20200605T104456Z
```



##### 5、SignedHeaders：添加用于签名的消息头声明，以换行符结束。

1. 用于签名的请求消息头列表。通过添加此消息头，向API网关告知请求中哪些消息头是签名过程的一部分，以及在验证请求时API网关可以忽略哪些消息头。X-Gateway-Date必须作为已签名的消息头。
2. 已签名的消息头需要满足以下要求：将已签名的消息头名称转换为小写形式，按照字符代码对消息头进行排序，并使用“;”来分隔多个消息头。
   SignedHeaders = Lowercase(HeaderName0) + ‘;’ + Lowercase(HeaderName1) + “;” + …

假设有三个消息头参与签名：Content-Type、Host、X-Gateway-Date，签名后消息头将为：

```
SignedHeaders=content-type;host;x-gateway-date
```

构造示例：

```
GET
/demo/login/
parm1=value1&parm2=
content-type:application/json
host:www.demo.com
x-gateway-date:20200605T104456Z

content-type;host;x-gateway-date
```

消息头添加到请求的具体示例请参考 **第四步：添加签名信息到请求头**



##### 6、RequestPayload：使用SHA 256哈希函数以基于HTTP或HTTPS请求正文中的body体，创建哈希值。

1. 请求消息体。消息体需要做两层转换：HexEncode(Hash(RequestPayload))，其中Hash表示生成消息摘要的函数，当前支持SHA-256算法。HexEncode表示以小写字母形式返回摘要的Base-16编码的函数。例如，HexEncode(“m”) 返回值为“6d”而不是“6D”。输入的每一个字节都表示为两个十六进制字符。
   a. 计算RequestPayload的哈希值时，对于“RequestPayload==null”的场景，直接使用空字符串””来计算。

本示例为GET方法，body体为空。经过哈希处理的body（空字符串）如下：

```
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

构造示例：

```
GET
/demo/login/
parm1=value1&parm2=
content-type:application/json
host:www.demo.com
x-gateway-date:20200605T104456Z

content-type;host;x-gateway-date
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

至此，规范请求构造完成。



##### 7、对构造好的规范请求进行哈希处理，算法使用SHA 256，与对RequestPayload哈希处理的算法相同。

经过哈希处理的规范请求必须以小写十六进制字符串形式表示。

算法伪代码：

```
Lowercase(HexEncode(Hash.SHA256(CanonicalRequest)))
```

经过哈希处理的规范请求示例：

```
1ace9c4e12e4e322a506e3866a6e81e62c8f9ae674aca7966a55b9c6deb6ea00
```



#### 二、创建待签字符串

对HTTP请求进行规范并取得请求的哈希值后，将其与签名算法、签名时间一起组成待签名字符串。

```
StringToSign =
    Algorithm + \n +
    RequestDateTime + \n +
    HashedCanonicalRequest
```

1. Algorithm:签名算法，对于SHA 256，算法为HMAC-SHA256。
2. RequestDateTime：请求时间戳，与请求消息头X-Gateway-Date的值相同，格式为YYYYMMDDTHHMMSSZ。
3. HashedCanonicalRequest：经过哈希处理的规范请求。

上述例子得到的待签字符串为：

```
HMAC-SHA256
20200605T104456Z
1ace9c4e12e4e322a506e3866a6e81e62c8f9ae674aca7966a55b9c6deb6ea00
```



#### 三、计算签名

将SK（Access Secret Key）和创建的待签字符串作为加密哈希函数的输入，计算签名，将二进制值转换为十六进制表示形式。

伪代码如下：

```
signature = HexEncode(HMAC(Access Secret Key, string to sign))
```

1. 其中HMAC指密钥相关的哈希运算，HexEncode 指转十六进制。
2. Access Secret Key：签名密钥。
3. string to sign：创建的待签字符串。

假设Access Secret Key为 8f8154ff07f7153eea59a2ba44b5fcfe443dba1e4c45f87c549e6a05f699145d，则计算得到的 signature 为：

```
3909cd0042fed21287e64b2436adb10ad12894c9beeb69f932efee872fd589ab
```



#### 四、添加签名信息到请求头

在计算签名后，将它添加到Authorization的HTTP消息头。Authorization消息头未包含在已签名消息头中，主要用于身份验证。

Authorization Header的伪代码如下：

```
Authorization: algorithm Access=Access key, SignedHeaders=SignedHeaders, Signature=signature
```

需要注意的是算法与Access之前 **有空格** 但没有逗号，但是SignedHeaders与Signature之前需要 **使用逗号** 隔开。

得到的签名消息头为：

```
HMAC-SHA256 Access=19823ef8f417b489515570c83e3d397f, SignedHeaders=content-type;host;x-gateway-date, Signature=3909cd0042fed21287e64b2436adb10ad12894c9beeb69f932efee872fd589ab
```

得到签名消息头后，将其增加到原始HTTP请求内容中，请求将被发送给API网关，由API网关完成身份认证。

包含签名信息的完整请求如下：

```
GET /demo/login?parm1=value1&parm2= HTTP/1.1
Host: www.demo.com
Content-Type: application/json
x-gateway-date: 20200605T104456Z
Authorization: HMAC-SHA256 Access=19823ef8f417b489515570c83e3d397f, SignedHeaders=content-type;host;x-gateway-date, Signature=3909cd0042fed21287e64b2436adb10ad12894c9beeb69f932efee872fd589ab
```

Curl方式样例如下：

```shell
curl -X GET "http://www.demo.com:6689/demo/login?parm1=value1&parm2=" -H "content-type: application/json" -H "x-gateway-date: 20200605T104456Z" -H "host: www.demo.com"  -H "Authorization-Type: AK/SK" -H "Authorization: HMAC-SHA256 Access=19823ef8f417b489515570c83e3d397f, SignedHeaders=content-type;host;x-gateway-date, Signature=3909cd0042fed21287e64b2436adb10ad12894c9beeb69f932efee872fd589ab" 
```

**上述请求样例仅作示范**



