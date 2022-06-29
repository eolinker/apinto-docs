# API KEY

### 功能描述

鉴权方式的一种，多用于OpenAPI，设置Apikey参数，不能通过认证的用户将无权访问接口。

### 配置示例
1、新增全局鉴权插件，若该全局插件已存在，可跳过该步骤

![](http://data.eolinker.com/course/CbYNcwya4077c176b6ef26537e7e6f10607f521143b7e62.gif)

2、新建鉴权，**Driver**选项选择**apikey**，界面会自动渲染

![](http://data.eolinker.com/course/tmP45AW70192162503de4fa4fabf96625bf991adfdaa608.gif)

3、编辑鉴权信息，可添加多个**apikey**

![](http://data.eolinker.com/course/m9uREaz91cfd9345d6acb7043c2702d422df9dff8db7c4e.gif)

字段描述说明

| 字段 | 描述                                                        |
|--|-----------------------------------------------------------|
| 是否隐藏证书 | 网关转发时是否将**Authorization**字段删除 |
| 密钥| apikey的值|
| 用户标签 | 当**apikey**被命中时，会将相关标签带入请求的过程中，如：在access日志中打印相关内容 | 
| 过期时间| apikey有效期，不填则为不过期|

4、绑定上游服务/路由，此处示例以绑定上游服务为例，凡匹配到该上游服务的请求都需要进行鉴权
