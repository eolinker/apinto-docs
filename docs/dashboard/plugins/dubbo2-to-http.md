# dubbo2协议转http协议插件

### 插件信息

| 名称       | 字段                           | 属性   |
| ---------- |------------------------------|------|
| dubbo2协议转http | dubbo2-to-http | 协议转换 |

### 功能描述

将客户端 **Dubbo2请求** 转换成 **HTTP请求** 转发给上游服务，并将上游服务的 **HTTP响应** 转换成 **Dubbo2响应** 转发给客户端。该插件仅当路由驱动为`dubbo2`时生效。

### 使用方法
1. 全局插件创建dubbo2-to-http插件

   ![](http://data.eolinker.com/course/6XucDUJd71871b66d403c542a6c32c088f4796dee26425e.png)

2. 创建dubbo2路由时添加该插件
   ![](http://data.eolinker.com/course/W2hHpTm0f6be788ab06630d3873f6ca961c5c3e26f7b5fa.png)

#### 参数详细配置 参考教程[dubbo2转http插件](/docs/apinto/plugins/dubbo2-to-http.md)
