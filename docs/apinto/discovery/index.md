# 服务发现

**服务发现**：通过请求注册到注册中心的服务实例来获取这些实例提供的服务。

* 模块名称：服务发现

* 功能支持：

| 功能                                            | driver配置字段 | 属性         |
| ----------------------------------------------- | -------------- | ------------ |
| [consul](/docs/discovery/consul.md)       | consul         | 动态服务发现 |
| [eureka](/docs/discovery/eureka.md)       | eureka         | 动态服务发现 |
| [nacos](/docs/discovery/nacos.md)         | nacos          | 动态服务发现 |
| [静态服务发现](/docs/discovery/static.md) | static         | 静态服务     |


### 配置流程：

* 创建服务发现
* 服务发现id绑定负载
* 负载id绑定服务
* 服务id绑定路由



#### 配置流程示例图：

负载配置教程[点此](/docs/upstream/http.md)进行跳转

![](http://data.eolinker.com/course/DhT6F8496871469222d3e16a97d1964154a2e49f1326850.png)