# JWT

### 功能描述

通过在网关上配置JWT的校验规则，由网关对JWT Token进行校验，校验通过则转发请求，否则拦截请求。


### 配置示例
1、新增全局鉴权插件，若该全局插件已存在，可跳过该步骤

![](http://data.eolinker.com/course/CbYNcwya4077c176b6ef26537e7e6f10607f521143b7e62.gif)

2、新建鉴权，**Driver**选项选择**jwt**，界面会自动渲染

![](http://data.eolinker.com/course/ZQk8dHZe8df602131d6e50e336b0c039d434e81d1e871b6.gif)

3、编辑鉴权信息，可添加多个**jwt**信息

![](http://data.eolinker.com/course/G5Zl5m4338648537c0949cb2985bd3e6439f7d96534cd3b.gif)

字段描述说明

| 字段 | 描述                                                        |
|--|-----------------------------------------------------------|
| 是否隐藏证书 | 网关转发时是否将**Authorization**字段删除 |
| Base64加密| 使用HS256,HS384,HS512加密时,密钥是否使用了base64算法进行加密 |
| Secret Access Key | 对请求体、请求信息加密的密钥|
| 用户标签 | 当**JWT**信息被命中时，会将相关标签带入请求的过程中，如：在access日志中打印相关内容 |
| 检索字段| 用于校验payload中对应字段是否存在<br>特殊字段: <br>- exp: token过期时间，时间戳格式，若当前时间大于该值，则鉴权失败<br>- nbf: token开始时间，时间戳格式，若当前时间小于该值，则鉴权失败|
| 证书签发者 | 唯一ID，对应payload的iss字段|
| 密钥| 对应**VERIFY SIGNATURE**的secret，当算法为HS256、HS384、HS512时必填|
| RSA公钥|rsa公钥  使用RS256,RS384,RS512,ES256,ES384,ES512时必填 |
| 签名算法|jwt签名的算法，支持"HS256","HS384","HS512","RS256","RS384","RS512","ES256","ES384","ES512"|

需要快速生成token可到[jwt.io](https://jwt.io)中生成

4、绑定上游服务/路由，此处示例以绑定上游服务为例，凡匹配到该上游服务的请求都需要进行鉴权
![](http://data.eolinker.com/course/AB2b1AI055865a7c82fee1a76222c2a595e5fcfca6c79e8.gif)

5、路由绑定服务，教程[跳转](/docs/dashboard/router/http)

6、请求接口，并带上以下头部信息
|Header|描述|值可能性|
|---|---|---|
|Authorization-Type|声明待校验的鉴权类型|Jwt|
|Authorization|token值||

在示例中，我们填写**证书签发者**和**密钥**分别是**apinto**和**dqjkhewr**，且token字段未经过Base64加密，使用**HS256**算法进行加密

综合配置信息，我们使用[jwt.io](https://jwt.io)快速生成一个token，如下图：

![](http://data.eolinker.com/course/3r3high755d606b57dec3d2decd1076ae8d2f790ed8aab4.png)

生成token：

![](http://data.eolinker.com/course/1wB3cM6d206d877bde4837e5647087cc9f2f134cb6e90e7.png)

成功访问示例：
```shell
curl -H "Authorization-Type: jwt" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaXNzIjoiYXBpbnRvIn0.8JgmztZ4fyt7earq_gOD0vNYbwnoRrpw-AibdE0CDJE" http://127.0.0.1:8099/apinto/demo
```
成功返回结果：

![](http://data.eolinker.com/course/KAIBzPE525e05e738c414fb4eaeac0d8ecec38a9aee9d20.png)

失败访问示例：
```shell
curl -H "Authorization-Type: jwt" -H "Authorization: eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaXNzIjoiYXBpbnRvIn0.8JgmztZ4fyt7earq_gOD0vNYbwnoRrpw-AibdE0CDJE" http://127.0.0.1:8099/apinto/demo
```

失败返回示例：

![](http://data.eolinker.com/course/URgmESl4163b1a9e8bc7dee625cac1ffa1ffdc3382b994c.png)
