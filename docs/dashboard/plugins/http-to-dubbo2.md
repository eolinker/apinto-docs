# http协议转dubbo2协议插件

### 插件信息

| 名称       | 字段                           | 属性   |
| ---------- |------------------------------|------|
| http协议转dubbo2 | http-to-dubbo2 | 协议转换 |

### 功能描述

将客户端 **HTTP请求** 转换成 **Dubbo2请求** 转发给上游服务，并将上游服务的 **Dubbo2响应** 转换成 **HTTP响应** 转发给客户端。该插件仅当路由驱动为`http`时生效。


### 使用方法
1. 全局插件创建http-to-dubbo2插件

   ![](http://data.eolinker.com/course/Ct9ttXeae08d3ee8899fd074d3e340f9efcfec9662fbd72.png)

2. 创建http路由时添加该插件
   ![](http://data.eolinker.com/course/DHRMJ3mfe6b7425bf00cef546c0c1e5e8a3ca551ba29867.png)

#### 参数详细配置 参考教程[Http转dubbo2插件](/docs/apinto/plugins/http-to-dubbo2.md)
