# 服务发现

**服务发现**：又名服务注册，后端服务启动时，会自行将服务注册到服务注册中心中，如：consul、eureka、nacos等。此时，注册中心中有该服务有该服务的相关信息，包括服务访问地址、服务调用参数等信息。客户端可以通过使用服务名等标识对后端服务进行调用。

当后端服务启动/停止时，将会发送请求告知注册中心，触发注册中心的新增/删除事件

![](http://data.eolinker.com/course/HYdFKzVdcd035b99b8b4035f95a5d1f5ae826acd0319d4e.svg+xml)

未使用网关时，注册到服务注册中心的服务的调用情况：

![](http://data.eolinker.com/course/Z5nNZM9a5e8feb50b652abbd4eb6fbe50af57a86e6031e8.svg+xml)

启用网关后，注册到服务注册中心的服务的调用情况：

![](http://data.eolinker.com/course/2BldyIQ66951b680a9438d1f76850d221b64b4ba010b738.svg+xml)

### 支持的服务发现
| 功能                                            | driver配置字段 | 类型     |
|-----------------------------------------------| -------------- |--------|
| [consul](/docs/dashboard/discovery/consul.md) | consul         | 动态服务发现 |
| [eureka](/docs/dashboard/discovery/eureka.md)    | eureka         | 动态服务发现 |
| [nacos](/docs/dashboard/discovery/nacos.md)      | nacos          | 动态服务发现 |
| [静态服务发现](/docs/dashboard/discovery/static.md)    | static         | 静态服务   |
