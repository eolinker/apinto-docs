# Eureka

### 功能描述

Eureka服务发现：只需要填写Eureka的地址，网关即可定时从Eureka中获取健康的节点列表，在转发时网关选择其中一个健康的节点进行转发操作。

Eureka注册中心自带健康检查，从该注册中心获取节点时可以获取到稳定健康的节点，因此网关不做健康检查操作。

### 配置示例
1、新建并配置**Eureka**服务发现，**Driver**选择**eureka**，将自动弹出配置页面

![](http://data.eolinker.com/course/hvZG76H8da1ce3741e99538b5f12cd04df7522cceea9d1d.gif)


字段描述说明

| 字段      | 描述                                                      |
|---------|---------------------------------------------------------|
| Eureka地址 | Eureka地址列表，填写各个节点的地址，需要填写到访问url，如/eureka                |
| 参数      | 访问Eureka时需要传递的参数，按需填入 |

**备注**：若eureka地址配置了basic鉴权，则鉴权信息需要配置在eureka地址，如：{username}:{password}@{eureka_address}/eureka

3、绑定上游服务，输入Eureka里的服务名

绑定过程时网关会做校验，当服务名不存在时则会新建失败
![](http://data.eolinker.com/course/bMT6KFmd1ae3f382ea114e719ad96a7332851b008651491.png)

![](http://data.eolinker.com/course/eTtNilpbcead1954fcbf4c902a7a0d79696f1bf1da6a287.gif)