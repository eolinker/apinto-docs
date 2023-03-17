# 快速入门
> 前提：已经部署好Apinto网关节点群和控制台，并且运行程序。

Apinto网关控制台主流程配置如下图所示：

![](http://data.eolinker.com/course/iYspq4sadfa14540567d72866ef25d92838d385ff9b7aa3.png)

主流程有四步，完成这四步就可以试着调用API，看网关能否成功转发API到后端系统。
## 一、配置网关集群
1、在浏览器输入控制台访问页面，输入用户名和密码进入控制台页面。

![](http://data.eolinker.com/course/2jz6vuW524b6b49e2b8698f993a0dce8c2d8a65109500b1.png)

2、再点击基础设施菜单，展开后再点击集群管理进入集群管理列表页面，我们直接创建集群，操作如下图所示：

![](http://data.eolinker.com/course/4BwMEu256783f8bbd4f1dc8ceec7a8afc6191a2f12512a5.png)

3、新建集群如下图所示：

![](http://data.eolinker.com/course/QUENID5c99edd4a86d56aa3a0de3f237ea86dc3bb282dd3.png)

## 二、配置并发布上游服务
1、点击上游服务菜单，展开后再点击上游管理进入上游管理列表页面，如下图所示：

![](http://data.eolinker.com/course/f6Xh9NCd2dd4dcc57110f23ca440cded143302d372b6289.png)

2、点击新建上游，我们以静态节点说明，配置如下图所示：

![](http://data.eolinker.com/course/5X71HXZ2f38d41d472aad87302d2b506c8ae63c38ce6e74.png)

部分字段说明：

| 字段名称   | 字段描述                                                                                                                      |
|--------|---------------------------------------------------------------------------------------------------------------------------|
| 上游名称   | 上游服务名称不能使用中文，因为系统用它作为该上游服务的唯一标识读取或更新数据                                                                                    |
| 请求协议   | 后端系统API的协议，支持HTTP/HTTPS                                                                                                   |
| 负载算法   | 多目标节点，支持轮询算法                                                                                                              |
| 服务发现   | 支持静态节点类型和动态服务类型，该项可选值为静态节点、服务发现列表名称数据                                                                                     |
| 目标节点   | 提供API响应后端系统的主机名/IP+端口号；如果有多个目标节点，则可以通过配置‘权重’来规划每个节点承载的流量比例；目标节点也可以通过引用环境变量，引用的环境变量通过配置格式：{域名/ip}:{port} {weight}，多个以‘;’隔开 |
| 请求超时时间 | 网关请求到后端系统的超时时间                                                                                                            |
3、把刚配置好的上游发布到集群，如下图如示：

![](http://data.eolinker.com/course/ACsAPYN81ecbce2f00e13a60b1c5bf19c924d82c4ece1fa.png)

## 三、配置并发布API
API管理是管理所有上游提供的API生命周期功能，提供按业务域分类管理、添加API、单个或批量API从不同集群上下线等功能。
1、点击左侧导航API管理，进入API管理页面：

![](http://data.eolinker.com/course/uwGh59u86c9449b34286cbc7bf796f6337a09ae71750272.png)

2、新建API

![](http://data.eolinker.com/course/mqJnZ4ud08a0f04922d21caad9b0606b5811d6f88d6f7ba.png)

部分字段说明：

| 字段名称     | 字段描述                                     |
|----------|------------------------------------------|
| 所属分组     | 可根据上游或业务域进行分组                            | 
| API名称    | 可输入中英文名称                                 |
| 请求路径     | API的URI，用于应用请求URL中的相对路径                  |
| 绑定上游服务   | 可选值是上游服务列表，请求转发到上游，API所属上游服务             |
| 请求方式     | 支持常见HTTP请求方式GET、POST、PUT、DELETE等，支持多选    |
| 转发上游路径   | 上游服务提供对应的API相对路径，默认转发上游路径继承请求路径          |
| 请求超时时间   | 定义网关转发请求到上游至响应的单次消耗时间                    |
| 重试次数     | 当转发请求到上游失败时，网关会自动触发重试转发请求，最大次数不超过重试次数    |
| 高级匹配     | 支持通过请求头，请求参数、Cookie 进行路由匹配，可添加多条，应用于灰度发布 |
| 转发上游请求头  | 可对转发上游请求头进行新建、编辑以及删除参数，主要应用于网关与上游间鉴权     |

新建的testnews的API如下图所示：

![](http://data.eolinker.com/course/Nq1W7d87a6320b59ffd5b0ed0ef0bbf7c8d280767d0a657.png)

3、上线该API到集群：

![](http://data.eolinker.com/course/mGgmZw9addadf61aa3b98b077b7b9cdfa9054507a54769c.png)

## 四、调用API
在测试转发testnews这个API前，我们先测试直接调用后端这个API，测试结果如下图所示：

![](http://data.eolinker.com/course/96EU64k7eb115574e446a5df6b251aefb8719e65eef8906.png)

说明后端这个服务的API是正常可以调用的。

1、获取testnews完整调用地址
调用API的URL：网关节点的服务地址+API的请求路径：
（1）获取服务地址：

![](http://data.eolinker.com/course/WgVsYNX8647f0c43c4c7b9ae6d6b34a3c77330f362042c0.png)
（2）获取testnews的请求路径：

![](http://data.eolinker.com/course/GNKaFGBfab1493e97ddd644ebf9bed595199868ab4d485d.png)
（3）拼接地址，得到testnews这个API的完整请求路径：网关节点的服务地址+API的请求路径

2、用API研发管理工具Apikit来测试

![](http://data.eolinker.com/course/syErggq278a3b0406595818af082fc5bd32b79be648bf76.png)
测试结果与浏览器访问结果一致，表明网关转发功能正常