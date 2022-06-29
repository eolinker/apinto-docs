# Eureka

### 功能描述

Eureka服务发现：只需要填写Eureka的地址，网关即可定时从Eureka中获取健康的节点列表，在转发时网关选择其中一个健康的节点进行转发操作。

Eureka注册中心自带健康检查，从该注册中心获取节点时可以获取到稳定健康的节点，因此网关不做健康检查操作。

### 配置示例
1、新建服务发现，**Driver**选择**eureka**，将自动弹出配置页面

![](http://data.eolinker.com/course/i4lwFrCfdfa0e08b9bd0fc85a62ac56893c00ee193cb994.gif)
2、配置**Eureka**信息

![](http://data.eolinker.com/course/GYZHv4V00e931ba681919e7cc1abdaedd8c5cdb04c1b2c3.gif)
字段描述说明

| 字段      | 描述                                                      |
|---------|---------------------------------------------------------|
| 请求协议    | 请求Nacos的协议类型，可能性：HTTP/HTTPS                             |
| Eureka地址 | Eureka地址列表，填写各个节点的地址，需要填写到访问url，如/eureka                |
| 参数      | 访问Eureka时需要传递的参数，按需填入 |           

3、绑定上游服务，输入Eureka里的服务名

![](http://data.eolinker.com/course/QgCqr1J75add4b23c750dcc14c9cb15d2ea4e1a784a63e1.gif)