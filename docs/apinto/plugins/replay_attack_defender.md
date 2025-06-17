# 防重放攻击

## 插件名称

| 名称    | 字段            | 属性   |
|-------|---------------|------|
| 防重放攻击 | replay_attack_defender | 安全防控 |

## 功能描述
防重放插件通过timestamp以及nonce参数保证请求的唯一性，其基本原理如下：

客户端发起请求时，需要在Header中加入该请求的发起时间X-Ca-Timestamp以及该请求所对应的随机数X-Ca-Nonce（每个请求的nonce都要求是唯一的，建议客户端使用uuid作为nonce的值），并且请求头部还需要加上“X-Ca-Timestamp+X-Ca-Nonce+防重放token”经过md5加密之后的签名X-Ca-Signature，防重放token在插件内设置，也可由网关自动生成。

网关接收到客户端请求后，会首先将“X-Ca-Timestamp+X-Ca-Nonce+防重放token”进行md5加密，并且与X-Ca-Signature对比，因为防重放token是网关生成的并且在网络传输过程中无法被破解，因此校验X-Ca-Signature的一致性可以防止X-Ca-Timestamp和X-Ca-Nonce被人篡改；随后会校验X-Ca-Timestamp是否已经过期，如果未过期，会检查X-Ca-Nonce是否已经存在，如果X-Ca-Nonce不存在，则说明该请求未被篡改并且第一次到达网关。


## 配置示例
```json
{
    "nonce_header": "x-ca-nonce",
    "replay_attack_token": "apinto",
    "sign_header": "x-ca-signature",
    "timestamp_header": "x-ca-timestamp",
    "ttl": 600
}
```
**字段描述**
| 字段                 | 类型      | 描述                                                                                                                                                                       |
|--------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| nonce_header       | string  | API调用者生成的唯一UUID存放的请求头                                                                |
| replay_attack_token| string  | 与nonce_header、timestamp_header设置的头部值一起参与签名                                                                                                                         |
| sign_header        | string  | 防重放签名存放的请求头                                                                                            |
| timestamp_header   | string  | 10位时间戳存放的请求头                                                                                               |
| ttl                | int     | 防重放攻击有效时间，单位秒                                                                                                 |


# 注意事项

该插件需要配合`Redis`使用，`Redis`配置可参考[Redis配置教程](https://help.eolink.com/tutorial/Apinto/c-1392)

# 请求示例

假设API配置的重定向插件，插件配置如下：
```json
{
    "nonce_header": "x-ca-nonce",
    "replay_attack_token": "93c5a393-3a96-423a-84ad-f8fd4b9f55b9",
    "sign_header": "x-ca-signature",
    "timestamp_header": "x-ca-timestamp",
    "ttl": 600
}
```
此时发送的API请求应包含以下请求头：
* X-Ca-Nonce：API调用者生成的唯一UUID，结合时间戳防重放。
* X-Ca-Timestamp：10位unix时间戳，值为当前时间的秒数，时间戳默认有效时间为600秒（即10分钟）。
* X-Ca-Signature：请求签名，值为32位小写MD5加密：MD5(X-Ca-Timestamp + X-Ca-Nonce + replayAttackToken)，参数顺序不能有误。

令
```
X-Ca-Timestamp = "1750148912"  // 时间戳根据实际情况填写
X-Ca-Nonce = "0ca206d0-aabb-4314-84e7-7b735a0b27c3"
replayAttackToken = "93c5a393-3a96-423a-84ad-f8fd4b9f55b9"
```

此时`X-Ca-Signature`=`MD5("17501489120ca206d0-aabb-4314-84e7-7b735a0b27c393c5a393-3a96-423a-84ad-f8fd4b9f55b9")`


 使用`Curl`发起请求：
 ```
 curl --location '127.0.0.1:8099/api/router' \
--header 'X-Ca-Nonce: 0ca206d0-aabb-4314-84e7-7b735a0b27c3' \
--header 'X-Ca-Timestamp: 1750148912' \
--header 'X-Ca-Signature: 211ec0d061d97cb84b44a5f351ff5bf5' \
--header 'Cookie: uid=1'
 ```
 第一次访问：

![](http://data.eolinker.com/course/wTJKgRre22173fc7fdf2a0d70dbee873b95f820da20afa9.png)

第二次访问：

![](http://data.eolinker.com/course/IKhIyQCc621526f20a79c9f9b04d4d06263a7f051006186.png)