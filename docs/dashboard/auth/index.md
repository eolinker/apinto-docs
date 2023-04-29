# 访问鉴权

**鉴权**：是指验证用户是否拥有访问系统或服务的权利。

* 模块名称：鉴权

* 功能支持：

| 功能                                       | driver配置字段 | 属性                  |
|------------------------------------------| -------------- | --------------------- |
| [AK/SK](/docs/dashboard/auth/aksk)    | aksk           | 用户鉴权              |
| [APIKey](/docs/dashboard/auth/apikey) | apikey         | 用户鉴权（静态token） |
| [Basic](/docs/dashboard/auth/basic)   | basic          | 用户鉴权（静态token） |
| [JWT](/docs/dashboard/auth/jwt)          | jwt            | 用户鉴权（动态token） |


### 配置流程示例图：

设置全局鉴权插件为enable/global状态，具体配置点此[跳转](/docs/dashboard/plugins/)

上游服务配置教程[点此](/docs/dashboard/service/http)进行跳转


![](http://data.eolinker.com/course/VLuGFHb49e061c9e4182ead46bff6aa89520721a2f3cc72.png)

绑定鉴权时可以绑定多个，访问接口时只需要其中一个鉴权通过即可

