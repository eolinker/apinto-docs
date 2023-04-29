# Basic Auth

### 功能描述

鉴权方式的一种，设置Basic Auth的Username与Password，不能通过认证的用户将无权访问接口。

### 配置示例
1、新增全局鉴权插件，若该全局插件已存在，可跳过该步骤

![](http://data.eolinker.com/course/CbYNcwya4077c176b6ef26537e7e6f10607f521143b7e62.gif)

2、新建鉴权，**Driver**选项选择**basic**，界面会自动渲染

![](http://data.eolinker.com/course/ETjNhpLe5861fdfc2291cfd3121ce7d2721f63c8e37dbfa.gif)

3、编辑鉴权信息，可添加多个**basic**信息

![](http://data.eolinker.com/course/4uI3eAye5075a8ec2b1343a80fb4a336d804410ccc87e00.gif)

字段描述说明

| 字段 | 描述                                                        |
|--|-----------------------------------------------------------|
| 是否隐藏证书 | 网关转发时是否将**Authorization**字段删除 |
| 用户名| username的值|
| 密码| password的值|
| 用户标签 | 当**basic**信息被命中时，会将相关标签带入请求的过程中，如：在access日志中打印相关内容 |
| 过期时间| basic信息有效期，不填则为不过期|

4、绑定上游服务/路由，此处示例以绑定上游服务为例，凡匹配到该上游服务的请求都需要进行鉴权

![](http://data.eolinker.com/course/2ztpj3G3bb1d01b0e659f3efdcae1928dc0b4389f3f1f37.gif)

5、路由绑定服务，教程[跳转](/docs/dashboard/router/http)

6、请求接口，并带上以下头部信息
|Header|描述|值可能性|
|---|---|---|
|Authorization-Type|声明待校验的鉴权类型|basic、basic_auth、basic-auth、basicauth  |
|Authorization|鉴权值|Basic+空格+Base64(username:password)|

示例中填写的**username**为**admin**，**password**为**123456**

则进行base64加密，则为**YWRtaW46MTIzNDU2**

![](http://data.eolinker.com/course/CLvcEWKe6d0ba9d943e4a5facf5e3135f9c84bc6f83c720.png)

因此此时的**Authorization**填写：**Basic YWRtaW46MTIzNDU2**

成功访问示例：
```shell
curl -H "Authorization-Type: basic" -H "Authorization: Basic YWRtaW46MTIzNDU2" http://127.0.0.1:8099/apinto/demo
```
成功返回结果：

![](http://data.eolinker.com/course/BiqWrqR9d5a34f28d46d67c9fc9cdadbc5c6b99b0d6f18e.png)

失败访问示例：
```shell
curl -H "Authorization-Type: basic" -H "Authorization: Basic YWRtaW46MTI" http://127.0.0.1:8099/apinto/demo
```

失败返回示例：

![](http://data.eolinker.com/course/AHgdyWv80a4050beb58e346ee4b86a61b49026c9a3ecdfc.png)
