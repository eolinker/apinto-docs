# 访问鉴权

**鉴权**：是指验证用户是否拥有访问系统或服务的权利。

* 模块名称：鉴权

* 功能支持：

| 功能                                       | driver配置字段 | 属性                  |
|------------------------------------------| -------------- | --------------------- |
| [AK/SK](/docs/dashboard/auth/aksk.md)    | aksk           | 用户鉴权              |
| [APIKey](/docs/dashboard/auth/apikey.md) | apikey         | 用户鉴权（静态token） |
| [Basic](/docs/dashboard/auth/basic.md)   | basic          | 用户鉴权（静态token） |
| [JWT](/docs/dashboard/auth/jwt.md)          | jwt            | 用户鉴权（动态token） |


### 配置流程示例图：

设置全局鉴权插件为enable/global状态，具体配置点此[跳转](/docs/dashboard/plugins)

上游服务配置教程[点此](/docs/dashboard/service/http.md)进行跳转


![](http://data.eolinker.com/course/VLuGFHb49e061c9e4182ead46bff6aa89520721a2f3cc72.png)



