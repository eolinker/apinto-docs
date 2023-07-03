# 服务发现

**服务发现**：通过请求注册到注册中心的服务实例来获取这些实例提供的服务。

* 模块名称：服务发现

* 功能支持：

| 功能                                            | driver配置字段 | 属性         |
| ----------------------------------------------- | -------------- | ------------ |
| [consul](/docs/apinto/discovery/consul.md)       | consul         | 动态服务发现 |
| [eureka](/docs/apinto/discovery/eureka.md)       | eureka         | 动态服务发现 |
| [nacos](/docs/apinto/discovery/nacos.md)         | nacos          | 动态服务发现 |
| [polaris](/docs/apinto/discovery/polaris.md)     | polaris        | 动态服务发现 |
| [静态服务发现](/docs/apinto/discovery/static.md) | static         | 静态服务     |


### 配置流程：

* 创建服务发现
* 服务发现id绑定服务
* 服务id绑定路由



#### 配置流程示例图：

服务配置教程[点此](/docs/apinto/service/http.md)进行跳转

![](http://data.eolinker.com/course/vDBaJuib5e9438c36c8ff5c17ff4ab06ed99e70fe61f78d.png)