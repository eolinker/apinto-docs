# 插件系统
插件系统的插件能够在**路由**、**服务**、**全局**中配置。

若在多个模块配置了同一个插件，则**配置优先级**为：路由>服务>全局，且同个插件只生效一次。
`即路由和服务均配置同一个插件，最终会以路由的配置为准`

插件执行流程及其更多细节[点此](/docs/apinto/plugins/index.md)进行跳转。

**备注**：

* 全局插件配置用于启动具体插件，也可为具体插件配置参数，让其在全局范围内生效。
* 配置多个插件时，**插件执行顺序**按全局插件配置中插件的顺序。

### 插件列表

| 插件名称                                       | 字段名             | 说明                                                         |
| ---------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| [额外参数](/docs/dashboard/plugins/extra_params.md)       | extra_params       | 转发时在请求中携带自定义参数                                 |
| [参数映射](/docs/dashboard/plugins/params_transformer.md) | params_transformer | 转发时将请求中的原参数映射成自定义参数                       |
| [转发重写](/docs/dashboard/plugins/proxy_rewrite.md)      | proxy_rewrite      | 转发时对请求的host、scheme、uri进行重写，同时能在请求头加入自定义参数 |
| [dubbo2协议转发重写](/docs/apinto/plugins/dubbo2-proxy-rewrite.md) | dubbo2-proxy-rewrite      | 转发时，对dubbo2协议请求的service_name、method_name进行重写，同时能对attachment加入自定义参数 |
| [IP黑白名单](/docs/dashboard/plugins/ip_restriction.md)   | ip_restriction     | 对访问的客户端ip进行黑白限制                                 |
| [流量控制](/docs/dashboard/plugins/rate_limiting.md)      | rate_limiting      | 控制请求在单位时间内的访问次数                               |
| [鉴权](/docs/dashboard/plugins/auth.md)                   | auth               | 对请求进行权限校验                                           |
| [响应重写](/docs/dashboard/plugins/response_rewrite.md)   | response_rewrite   | 用于重写网关返回的状态码、响应体、头部                       |
| [API熔断](/docs/dashboard/plugins/circuit_breaker.md)     | circuit_breaker    | 用于停止对不可用API的转发                                    |
| [跨域CORS](/docs/dashboard/plugins/cors.md)               | cors               | 设置跨域的头部字段，实现跨域功能                             |
| [gzip压缩](/docs/dashboard/plugins/gzip.md)               | gzip               | 将响应进行gzip压缩，以提高传输效率                           |
| [access_log](/docs/dashboard/plugins/access_log.md)       | access_log         | 记录到达网关的http请求的访问日志                             |

### 在全局配置插件

全局插件可以声明在程序运行过程中加载插件的名称、顺序、插件的启用状态，也可以配置具体插件在全局范围生效。

以配置在全局范围生效的IP黑白名单插件为例：

![](http://data.eolinker.com/course/278Av1X300b5732dab93e5fcdd210aa5eb875467134b0a7.gif)



### 路由、上游服务中配置插件

在全局插件中启用了某个插件之后，可以在`路由`或`上游服务`中引用并配置它。

以在上游服务中配置IP黑白名单插件插件为例：

##### 全局插件中开启

![](http://data.eolinker.com/course/vbliCUz01f0d2ca5032e1371d6ad857e834bbcb68ddae2a.gif)

##### 在上游服务中配置该插件

![](http://data.eolinker.com/course/MTlZ6FR7f97f1285f829250fbbf81f43d167f17a95b5b57.gif)

### 调整多个插件执行顺序

当一条转发路径配置多个插件时，对插件鼠标左键进行拖拉可以改变插件的执行顺序

![](http://data.eolinker.com/course/VR48zuKad94b8620f8318f41005fd946242c8a94054896a.gif)
