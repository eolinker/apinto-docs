# API KEY

### 功能描述

鉴权方式的一种，多用于OpenAPI，设置Apikey参数，不能通过认证的用户将无权访问接口。

### 配置示例
1、新增全局鉴权插件，若该全局插件已存在，可跳过该步骤

![](http://data.eolinker.com/course/CbYNcwya4077c176b6ef26537e7e6f10607f521143b7e62.gif)

2、新建鉴权，**Driver**选项选择**apikey**，界面会自动渲染

![](http://data.eolinker.com/course/tmP45AW70192162503de4fa4fabf96625bf991adfdaa608.gif)

3、编辑鉴权信息，可添加多个**apikey**

![](http://data.eolinker.com/course/5SstJ5hcdfa1be91dcc092f2a84c769e4efbd21a9d03874.gif)

字段描述说明

| 字段 | 描述                                                        |
|--|-----------------------------------------------------------|
| 是否隐藏证书 | 网关转发时是否将**Authorization**字段删除 |
| 密钥| apikey的值|
| 用户标签 | 当**apikey**被命中时，会将相关标签带入请求的过程中，如：在access日志中打印相关内容 | 
| 过期时间| apikey有效期，不填则为不过期|

4、绑定上游服务/路由，此处示例以绑定上游服务为例，凡匹配到该上游服务的请求都需要进行鉴权
![](http://data.eolinker.com/course/fawZtkQf82eb91db07f420052fd626707aeaa8e5851505f.gif)

5、路由绑定服务，教程[跳转](/docs/dashboard/router/http)

6、请求接口，并带上以下头部信息
|Header|描述|值可能性|
|---|---|---|
|Authorization-Type|声明待校验的鉴权类型|apikey、apikeyauth、apikey-auth、apikey_auth|
|Authorization|配置的apikey的值|| 

成功访问示例：
```shell
curl -H "Authorization-Type: apikey" -H "Authorization: apinto" http://127.0.0.1:8099/apinto/demo
```
成功返回结果：

![](http://data.eolinker.com/course/XMdDjuR9d312532674f03872a557ffd07f44c2c73952186.png)

失败访问示例：
```shell
curl -H "Authorization-Type: apikey" -H "Authorization: test" http://127.0.0.1:8099/apinto/demo
```

失败返回示例：

![](http://data.eolinker.com/course/2NxKjnL68cdd633e8bfa09b1ffbaf71d4781a92468bc90e.png)
