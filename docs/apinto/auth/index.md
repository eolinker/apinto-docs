# 访问鉴权

**鉴权**：是指验证用户是否拥有访问系统或服务的权利。

* 模块名称：鉴权

* 功能支持：

| 功能                                 | driver配置字段 | 属性                  |
| ------------------------------------ | -------------- | --------------------- |
| [AK/SK](/docs/apinto/auth/aksk.md)    | aksk           | 用户鉴权              |
| [APIKey](/docs/apinto/auth/apikey.md) | apikey         | 用户鉴权（静态token） |
| [Basic](/docs/apinto/auth/basic.md)   | basic          | 用户鉴权（静态token） |
| [JWT](/docs/apinto/auth/jwt.md)       | jwt            | 用户鉴权（动态token） |



### 配置流程：

* 全局插件加入鉴权插件配置
* 创建鉴权，获取鉴权id
* 服务或路由配置鉴权插件，在插件内引用鉴权id



#### 配置流程示例图：

设置全局鉴权插件为enable/global状态，具体配置点此[跳转](/docs/apinto/plugins)

服务配置教程[点此](/docs/apinto/service/http.md)进行跳转


![](http://data.eolinker.com/course/cHeruWp166412c6a8e5f156ae8e56532444aaf0240ca6cc.png)
