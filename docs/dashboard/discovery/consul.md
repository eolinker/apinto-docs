# Consul

### 功能描述

Consul服务发现：只需要填写Consul的地址，网关即可定时从Consul中获取健康的节点列表，在转发时网关选择其中一个健康的节点进行转发操作。

Consul注册中心自带健康检查，从该注册中心获取节点时可以获取到稳定健康的节点，因此网关不做健康检查操作。

### 配置示例
1、新建并配置**Consul**信服务发现，**Driver**选择**consul**，将自动弹出配置页面

![](http://data.eolinker.com/course/d6qzdNI1122ff99b90d9f89ca9b38857ca001b98cbc93bc.gif)



字段描述说明

| 字段       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| Consul地址 | consul地址列表，填写各个节点的地址                           |
| 参数       | 访问consul时需要传递的参数，按需填入，可不填<br>namespace：命名空间<br>token：访问令牌 |

2、绑定上游服务，输入Consul里的服务名

绑定过程时网关会做校验，当服务名不存在时则会新建失败

![](http://data.eolinker.com/course/Hysrhlfa93c623342bdd30b54417a25c29a1956a00f7893.png)

![](http://data.eolinker.com/course/DU2I38Gaa0021af490925ef5ef98f4b29377b5f999e0fa8.gif)
