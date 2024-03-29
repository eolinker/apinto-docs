# 灰度策略
点击服务治理菜单，展开后再点击灰度策略进入灰度策略列表页面，列表页如下图所示：

![](http://data.eolinker.com/course/EItvfvc51233c46f19bea4b896c642080d5e8f7c90495e3.png)

左侧显示按环境属性分类的所有集群，默认选中第一个环境下的第一个集群，而右侧区域显示该集群下所有灰度策略。

在操作上，可对该集群新建灰度策略，发布策略，对已有策略启停、查看、删除以及排优先级。

启停状态并发布到集群表示着该策略是否生效。

### 新建灰度策略
新建灰度策略如下图所示：

![](http://data.eolinker.com/course/zsHKI2x544db142484cf41f6f3ea6a7806a91b5f61cd311.png)
访问策略原理：配置筛选条件，用来筛选出符合条件的API请求，即筛选流量，按照配置灰度规则，将筛选的流量按照百分比或按规则转发到灰度节点。

部分字段说明：

| 字段名称    | 字段描述                                                         |
|---------|--------------------------------------------------------------|
| 策略名称    | 唯一策略标识                                                       |
| 优先级     | 值范围1-999，值越低优先级越高，当不同策略具有一定相同的筛选条件时，系统会根据策略优先级高低，来确定请求流量命中策略 |
| 筛选条件    | 支持多种组合条件筛选流量，如应用、API、上游、IP、标签属性等；不添加条件，即所有请求到网关的流量，全流量       |
| 会话规则    | 默认关，如果开，则网关将会保证同用户访问同一目标节点                                   |
| 灰度节点    | 转发的目标节点                                                      |
| 流量分配方式  | 可按百分比或高级匹配规则分配流量到灰度节点                                        |

配置筛选条件如流量策略的筛选操作即可：

属性名称可分为应用、API、上游服务、API路径、请求方式、IP以及应用的自定义属性，属性值则为对应类型的数据，可多选。

当某类型的值被全选时，该策略发布后，新建某类型的数据请求流量也会被策略命中。例如，当属性名称选择应用，属性值全选，往后创建的应用请求流量也符合该策略筛选。

### 发布灰度策略
列表右侧点击发布，弹出灰度策略如下图所示：

![](http://data.eolinker.com/course/K2WpHswe18ecb4b17b58637677bf8943069e17de0b71532.gif)
* 发布名称：系统根据时间自动生成，用作发布版本历史查看。
* 策略列表：该集群下所有状态为未上线或待更新的策略数据。

### 编辑优先级
列表中策略数据默认按照优先级从高到低，优先级值正序，优先级列可编辑，编辑优先级如流量策略中的编辑优先级操作。

不同灰度策略优先级不允许同值，值范围1-999。

当修改某条策略的优先级后，列表策略数据会根据优先级值正序重新排序，重新发布后生效。