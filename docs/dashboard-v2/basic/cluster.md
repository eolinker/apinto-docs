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

**插件管理**

* 插件列表

![](http://data.eolinker.com/course/fwH4VHz5df1b578175c873daddf31ddecfecc37b978ac81.gif)
插件来源于插件管理的数据，默认状态为禁用，发布状态为未发布；原已使用的插件如app、灰度、访问、熔断等插件，状态是全局，不可修改，发布状态为已发布，且配置按钮置灰。

插件名称中的新：表示着插件管理那里添加了一个插件，会自动同步到网关集群，表示新插件

插件名称中的改：表示着用户更改状态或修改配置，表示该插件被修改过，同时要记录下来，在更改历史可查看所有的更改操作

禁用状态：
a、禁用：全局或启用状态，可切换到禁用状态，更新或上线到集群才生效，该插件不可用
b、启用：禁用或全局状态，可切换到启用状态，更新或上线到集群才生效，该插件被API绑定有效
c、全局启用：禁用或启用状态，可切换到全局状态，更新或上线到集群才生效，该插件全局有效

* 配置

![](http://data.eolinker.com/course/vIxlAiS7861a8eee7a164acff69ce6786c9638c7e86d06d.png)
状态：可选值为全局启用、启用、禁用，从插件管理那同步过来的新插件，编辑配置时状态为禁用,网关集群对于插件单独存一份插件配置.

* 发布

![](http://data.eolinker.com/course/329UY774577fdbcf26d7cd73ecb182bc731c86461cfcb7f.png)
插件列表：表示都是更新过的插件

发布的配置：修改前的插件顺序+状态+配置信息，json展示。

未发布的配置：修改后的插件顺序+状态+配置信息，json展示。

发布名称：默认系统自动生成，生成规则：弹框当前时间，时间格式yyyyddMMHHmmss，再加上‘-release’；支持修改

提交：所有插件整体发布到网关

* 更改历史

![](http://data.eolinker.com/course/TrTluCeae6b0515bb9e7ff26dfebafb3ddf6406a5d9ef02.png)
从插件管理同步过来的数据，作新增记录。

旧配置：状态,配置信息，json展示。

新配置：状态,配置信息，json展示。

* 发布历史

![](http://data.eolinker.com/course/CQXmKrN46028b8951f7bdcc11fff092d3c14704a9179528.png)