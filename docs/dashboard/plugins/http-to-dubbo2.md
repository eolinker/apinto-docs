# http协议转dubbo2协议插件

### 插件信息

| 名称       | 字段                           | 属性   |
| ---------- |------------------------------|------|
| http协议转dubbo2 | http-to-dubbo2 | 协议转换 |

### 功能描述

将客户端 **HTTP请求** 转换成 **Dubbo2请求** 转发给上游服务，并将上游服务的 **Dubbo2响应** 转换成 **HTTP响应** 转发给客户端。该插件仅当路由驱动为`http`时生效。

### 配置参数说明

| 参数名                                | 值类型                        | 是否必填 | 值可能性         | 默认值 | 说明                                                  |
|:-----------------------------------| :----- |:-------------|:-------------|:-------------|:-------------|
| service                            | string                      | 是    | api.Server |        | 服务名                                                 |
| method                             | string                       | 是    | getUser |        | 方法名                                                 |
| params                         | array_object             | 是    |  |        | 对转发的body内容进行匹配，匹配成功后读取并解析成dubbo2协议所需要数据             |
| params -> class_name     | string | 是    | cn.apinto.model.UserInfo |        | 对应java中的className   获取方法（user.getClass().getName()） |
| params -> field_name   | string | 否 （仅params长度为0时可不填）   |        |        | 从body中提取的字段名,不填默认读取整个body                           |


### 使用方法
1. 全局插件创建http-to-dubbo2插件

   ![](http://data.eolinker.com/course/Ct9ttXeae08d3ee8899fd074d3e340f9efcfec9662fbd72.png)

2. 创建http路由时添加该插件
   ![](http://data.eolinker.com/course/DHRMJ3mfe6b7425bf00cef546c0c1e5e8a3ca551ba29867.png)

#### 参数详细配置 参考教程[Http转dubbo2插件](/docs/apinto/plugins/http-to-dubbo2.md)
