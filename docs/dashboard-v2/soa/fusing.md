# 熔断策略
点击服务治理菜单，展开后再点击熔断策略进入熔断策略列表页面，列表页如下图所示：

![](http://data.eolinker.com/course/yuF1hIlc6d3d79dbb2552d66d5eaad495b206f0157e3e2d.png)

左侧显示按环境属性分类的所有集群，默认选中第一个环境下的第一个集群，而右侧区域显示该集群下所有熔断策略。

在操作上，可对该集群新建熔断策略，发布策略，对已有策略启停、查看、删除以及排优先级。

启停状态且状态是已上线表示着该策略是否生效。
## 功能展示
### 新建熔断策略
新建熔断策略如下图所示：

![](http://data.eolinker.com/course/6NdjwkN9a4ae2c3e5676fec0b3e52de27943be16a3d2fa3.gif)

熔断策略原理：配置筛选条件，用来筛选出符合条件的API请求，即筛选流量，按照配置熔断规则执行，上线后达到熔断API或上游目的，并在熔断期的请求返回预先配置的响应信息。

![](http://data.eolinker.com/course/sRf4irn63ef166d3a3538290d685a0eb16cb486c13befa0.png)

部分字段说明：

| 字段名称      | 字段描述                                                         |
|-----------|--------------------------------------------------------------|
| 策略名称      | 唯一策略标识                                                       |
| 优先级       | 值范围1-999，值越低优先级越高，当不同策略具有一定相同的筛选条件时，系统会根据策略优先级高低，来确定请求流量命中策略 |
| 筛选条件      | 支持多种组合条件筛选流量，如应用、API、上游、IP、标签属性等；不添加条件，即所有请求到网关的流量，全流量       |
| 熔断维度      | 支持熔断API或上游服务                                                 |
| 失败HTTP状态码 | 失败HTTP状态码：默认500，多个状态码以逗号分隔                                   |
| 失败数       | 默认3次，在1秒内达到设置的失败数进入熔断期                                       |
| 熔断持续时间    | 默认2秒为基准，乘以连续熔断次数，第1次熔断时间为2秒，连续第2次熔断时间为2秒乘以２为４秒，以此类推          |
| 熔断最大持续时间  | 随着连续熔断次数增多，熔断时间会越来越大，该值固定了熔断最大持续时间                           |
| 成功HTTP状态码 | 默认200，多个状态码以逗号分隔                                             |
| 成功数       | 默认3次，在1秒内连续请求成功，进入健康，否则依旧处于观察期，或达到失败数进入熔断期                   |
| 响应内容      | 在熔断期，网关将会配置的响应内容返回给请求主体应用                                    |

配置筛选条件如流量筛选操作即可

属性名称可分为应用、API、上游服务、API路径、请求方式、IP以及应用的自定义属性，属性值则为对应类型的数据，可多选。

当某类型的值被全选时，该策略发布后，新建某类型的数据请求流量也会被策略命中。例如，当属性名称选择应用，属性值全选，往后创建的应用请求流量也符合该策略筛选。

### 发布熔断策略
列表右侧点击发布，弹出熔断策略如下图所示：

![](http://data.eolinker.com/course/GSskIPG6ae64ee822fa6eeb94a56ef8442dde6a14c62f06.png)
* 发布名称：系统根据时间自动生成，用作发布版本历史查看。
* 策略列表：该集群下所有状态为未上线或待更新的策略数据。

### 编辑优先级
列表中策略数据默认按照优先级从高到低，优先级值正序，优先级列可编辑，编辑优先级如流量策略中的编辑优先级操作

不同熔断策略优先级不允许同值，值范围1-999。

当修改某条策略的优先级后，列表策略数据会根据优先级值正序重新排序，重新发布即可生效。  