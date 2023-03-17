# 网关集群
管理同等业务或不同业务多环境集群，为企业解决同等业务不同环境管理多套控制台问题。
点击基础设施菜单，展开后再点击集群管理进入集群管理列表页面，对集群有查看和删除操作，可创建集群，操作如下图所示：

![](http://data.eolinker.com/course/ny6g9tM9a50c9e1e6d270ffd723d8384c9920eeb8850c29.png)

## 功能展示
1、创建集群

![](http://data.eolinker.com/course/dMaxv2g56f1ae68b98b31ccb333792d0f61759b90996f9d.png)

2、集群详情

网关集群详情主要对证书管理、网关节点管理、环境变量管理。

**环境变量**

![](http://data.eolinker.com/course/e2gDuMK0846560cb63f15101fdf23d6080a88967280a283.png)

系统内引用的环境变量，都需要在各个网关集群下的环境变量进行编辑赋值；新建、编辑、发布规则遵循apollo规则，环境变量发布到网关集群才会生效。

**证书管理**

![](http://data.eolinker.com/course/1QRrTXT9b915d565c043d611ef7d17c379640c4ccb27ee2.png)
可对该网关集群新建、编辑、删除服务端证书。

**网关节点**

![](http://data.eolinker.com/course/MbEjNT2a9c61393be4984ee95a81ed591f8f6f3f5bee223.png)

当网关节点实例发生变化，可更新控制台本地配置，也支持对该网关集群重新配置网关节点。
* 服务地址：前端调用API的主机/IP：端口，服务地址+API的请求路径即完整的调用URL。
* 管理地址：apinto网关节点地址。