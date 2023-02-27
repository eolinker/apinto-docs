# prometheus
### 插件信息

| 名称           | 字段       | 属性     |
| -------------- | ---------- | -------- |
| prometheus插件 | prometheus | 可观测性 |

### 功能描述

通过给路由配置该插件，当请求到达网关时，能够将请求的信息和配置的指标列表发送给指定的prometheus输出器，由各个prometheus输出器内同名的指标处理并采集请求内的信息。



**备注**：输出器的教程[点此](/docs/dashboard/outputer/prometheus.md)进行跳转。

#### 配置参数说明

| 参数名  | 说明                   | 是否必填 | 默认值 | 值可能性     |
| ------- | ---------------------- | -------- | ------ | ------------ |
| metrics | 指标列表               | 是       |        | string_array |
| output  | prometheus输出器id数组 | 否       |        | string_array |

当output为空，将会使用作用域包含`prometheus`的prometheus输出器作为ouput。



#### Open API 请求示例

##### 配置prometheus输出器

![](http://data.eolinker.com/course/aXbsh4Bf21443e8c1b9b7c448c894489e4dcb93c30e5fe0.gif)

**示例说明**：prometheus实际拉取的metrics路径为`/apinto/test`(默认在配置的路径前加上/apinto/)，配置指标名为`apinto_request_total`，采集request_total请求总数。
指标配置的标签分别为:

| 标签名  | 标签值                               |
| ------- | ------------------------------------ |
| api     | $api表示取变量  `该请求的路由名`     |
| service | $service表示取变量  `该请求的服务名` |


##### 全局启用插件

![](http://data.eolinker.com/course/v8SRWh57d8892fd84174cb815c15bd54e70b30541c5d26a.gif)

全局插件具体配置点此进行[跳转](/docs/dashboard/plugins)。



##### 配置带有prometheus插件的路由

![](http://data.eolinker.com/course/ZFDV3P75d0c3c26d51cccd739d8835921c9f8332017928a.gif)



##### 调用路由

![](http://data.eolinker.com/course/UCb2crD99d0ceb064e42a4fe35e18d1ebee4e72ac3115cf.png)



##### 查看test_prometheus输出器的指标信息

![](http://data.eolinker.com/course/5uTxh9wbecac3e399ec3d149ac6a21a28c4fbfda6c631e5.png)

