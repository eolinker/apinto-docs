# API管理

API管理是管理所有上游提供的API生命周期功能，提供按业务域分类管理、添加API、导入API、单个或批量API从不同集群上下线等功能。 

API管理列表页如下图所示：

![](http://data.eolinker.com/course/HSwUKwD38798b2fcdcbb9dd34f88d4a1af84a0b2b820acf.png)

添加业务域分组如下图所示：

![](http://data.eolinker.com/course/Qcmu8Wu8282d6de6b5ce60f93dc56ddc4e38d3b176fd9aa.png)
## 功能展示
### 新建API

新建API如下图所示：

![](http://data.eolinker.com/course/vky2XRy237d64d49efd5197797d619da4b361157ee14362.png)

部分字段说明：

| 字段名称      | 字段描述                                     |
|-----------|------------------------------------------|
| 所属分组      | 可根据上游或业务域进行分组                            |
| API名称     | 可输入中英文名称                                 |
| 请求路径      | API的URI，用于应用请求URL中的相对路径                  |
| 绑定上游服务    | 可选值是上游服务列表，请求转发到上游，API所属上游服务             |
| 请求方式      | 支持常见HTTP请求方式GET、POST、PUT、DELETE等，支持多选    |
| 转发上游路径    | 上游服务提供对应的API相对路径，默认转发上游路径继承请求路径          |
| 请求超时时间    | 定义网关转发请求到上游至响应的单次消耗时间                    |
| 重试次数      | 当转发请求到上游失败时，网关会自动触发重试转发请求，最大次数不超过重试次数    |
| websocket | 默认关闭，该API是HTTP类型的，当打开时，协议为websocket类型    |
| 高级匹配      | 支持通过请求头，请求参数、Cookie 进行路由匹配，可添加多条，应用于灰度发布 |
| 转发上游请求头   | 可对转发上游请求头进行新建、编辑以及删除参数，主要应用于网关与上游间鉴权     |

系统会根据请求方式和请求路径校验API是否是重复的。

当请求流量进入网关时，网关支持请求路径、请求方式、高级匹配动态路由。

### 批量上线
批量上线API流程图：

![](http://data.eolinker.com/course/jHKp2kP2505ca3786abb247c4c6bf364276e88993b0a57c.png)

选中将要上线的APIs如下图所示：

![](http://data.eolinker.com/course/YdIRY2Vcacbc479c16088560511b34a2eb9573acc113056.png)

点击表头上面的上线操作按钮，弹出选择集群如下图所示：

![](http://data.eolinker.com/course/NWkurV7f429f5fc94e001c117ead520a15d6e3b365fcd8e.png)

操作下一步，进入检测结果页。

检测上游是否上线到指定集群结果如下图所示：

![](http://data.eolinker.com/course/Q28cGZl93bb31c8402cc2122f832657a58e105ab50793f3.png)

弹出框里的表中标红的数据指的是要上线的API所绑定的zzytest上游没有上线到test_apinto集群，可直接点击操作栏中的‘解决方案’跳转到该上游上线的页面，操作上线即可，然后重新检测。

* 重新检测：当某个上游检测结果失败，可以在操作栏点击快速解决按钮上线上游，如此可以操作重新检测，刷新检测结果。

* 上一步：返回上一个页面，即返回到选择集群页面。

* 批量上线：当列表数据的状态都是成功状态时，此按钮才可点击，否则灰显。点击批量上线，进入API上线结果如下图所示：

![](http://data.eolinker.com/course/vk5y7CR3b5e12448d2142b25eae536c84e155666b08d393.png)

### 批量下线
僵尸API或即将要砍掉业务的API，都可以通过批量下线API进行解决，不占系统资源。
  
批量下线API流程图：

![](http://data.eolinker.com/course/6qvveTVad054cd6fb44f88355933b8fc2d140e6bda86b26.png)
  
选择集群如下图所示：

![](http://data.eolinker.com/course/iTCF92iddd9c013462bf716077860b6420f054be87ec1ac.png)

点击提交，进入APIs下线结果页如下图所示：

![](http://data.eolinker.com/course/hY8MUeQacdebf50d625ef3819f5d34e1af1ee1543d49f77.png)
### 导入
  
API管理列表表头上点击‘导入’，弹出导入框如下图所示：

![](http://data.eolinker.com/course/q1qw5cG983bc8d98fa0b93ba5dcb1916539f7f21ae989f3.png)

暂时支持swagger3.0的json、yaml格式文件导入。
* API分组：将要导入的APIs归属到哪个分组

* 绑定上游服务：将要导入的APIs必须由同一个后端业务系统或微服务提供，需先创建好上游服务，新建上游可参考3.2.1章节

* 请求前缀：统一给所有API添加前缀，如导入其中的一个API的URI为/user，为了保障路径的隐蔽与安全性，可添加请求前缀，如输入/web/app，那么这个API的请求URI为/web/app/user

### API详情
  
点击列表操作栏中的查看或点击列表中的数据，进入API详情，API详情-API信息如下图所示：

![](http://data.eolinker.com/course/SvBvjyY071a54a84545613467f4861d6fa19255f854f85e.png)

除了API的描述字段，编辑API其余字段信息，提交后系统会更改在各个集群网关的状态，需要重新上线才会生效更改的属性。

### 上线管理
在API列表中，可对单个API进行上下线管理，上线管理如下图所示：

![](http://data.eolinker.com/course/xCCHVjmf7a2a3d2cc586cdb4a060a0b1931fcadfbf48fe0.png)

上线管理的列表显示该API在所有集群的状态和禁用状态，可对该API所在每个集群进行上线、下线、禁用以及启用操作。

API在集群的初始状态为未上线，禁用状态为未禁用，上线操作后变为已上线，该API才能被应用调用。

当状态为已上线或待更新时，对禁用状态修改，都会更改控制台API所在集群状态为待更新，需要更新到网关才会生效。

禁用状态中的已禁用表示该API在集群不生效，网关不会转发该API请求。
