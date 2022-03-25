# 访问鉴权

**鉴权**：是指验证用户是否拥有访问系统或服务的权利。

* 模块名称：鉴权

* 功能支持：

| 功能                                 | driver配置字段 | 属性                  |
| ------------------------------------ | -------------- | --------------------- |
| [AK/SK](/docs/auth/aksk.md)    | aksk           | 用户鉴权              |
| [APIKey](/docs/auth/apikey.md) | apikey         | 用户鉴权（静态token） |
| [Basic](/docs/auth/basic.md)   | basic          | 用户鉴权（静态token） |
| [JWT](/docs/auth/jwt.md)       | jwt            | 用户鉴权（动态token） |



### 配置流程：

* 全局插件加入鉴权插件配置
* 创建鉴权，获取鉴权id
* 鉴权id绑定服务，获取服务id
* 服务id绑定路由



#### 配置流程示例图：

设置全局鉴权插件为enable/global状态，具体配置点此[跳转](/docs/plugins)

服务配置教程[点此](/docs/service/http.md)进行跳转


![](http://data.eolinker.com/course/VLuGFHb49e061c9e4182ead46bff6aa89520721a2f3cc72.png)



