# Nacos

### 功能描述

Nacos服务发现：只需要填写Nacos的地址，网关即可定时从Nacos中获取健康的节点列表，在转发时网关选择其中一个健康的节点进行转发操作。

Nacos注册中心自带健康检查，从该注册中心获取节点时可以获取到稳定健康的节点，因此网关不做健康检查操作。

### 配置示例
1、新建并配置**Nacos**服务发现，**Driver**选择**nacos**，将自动弹出配置页面

![](http://data.eolinker.com/course/w8lc9yQ76e7ea75a016ae8cd172a145f9adda28bbcf9429.gif)


字段描述说明

| 字段      | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| Nacos地址 | Nacos地址列表，填写各个节点的地址                            |
| 参数      | 访问Nacos时需要传递的参数，按需填入，可不填<br>username：用户名<br>password：密码 |

3、绑定上游服务，输入Nacos里的服务名

![](http://data.eolinker.com/course/QgCqr1J75add4b23c750dcc14c9cb15d2ea4e1a784a63e1.gif)