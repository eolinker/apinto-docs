# 文件输出器

### 功能描述

文件输出器：将请求信息输出到日志文件中，具备以下特性：
* 自定义文件的存放目录及文件名称

* 按照一定周期分割日志文件，避免单个文件过大不好查看的问题

* 定时删除过期文件，降低硬盘空间开销

### 调用流程图解

![](http://data.eolinker.com/course/7HT98Cu64d5deb0bfd7b58d09142d2379ab8698a643eaec.svg+xml)

### 文件日志生命周期图解

![](http://data.eolinker.com/course/gfE3gYq468410a54454d0d778dc4f3b747f7d96598292d5.png)

### 配置示例
1、新建输出器，在**Driver**处选择**file**

![](http://data.eolinker.com/course/t7FA9i553f24f01776f8fa95d221b1ed78c34593a253bff.gif)

2、填写配置相关信息

![](http://data.eolinker.com/course/h1MqlHe183889ea72a8ea9a7119aa8ab738328506fe99b4.gif)

配置说明

| 字段    | 描述                                      |
|-------|-----------------------------------------|
| 文件名称  | 文件命名，生成的文件会加上**.log**后缀                 |
| 文件存放目录 | 存放文件的目录                                 |
| 日志分割周期| 定时分割日志文件，可选项：hour、day                   |     
| 日志保存时间| 日志保存时间，当超过该时间后，日志会被删除，单位：天              |     
| 输出格式| 支持格式：json、line                          |     
| 格式化配置| 具体配置请查看[formatter配置说明](/docs/apinto/formatter/) |     

3、开启access日志插件，将插件的状态设置为**global**，并绑定需要用到的输出器

![](http://data.eolinker.com/course/JXSJcBa84c49e8a5c43c9b37d7bcc4892392da5947ac968.gif)

插件状态为**global**表示所有路由、服务均生效

4、访问接口（该操作默认已经配置好了接口并且可以正常访问）
```shell
curl "http://127.0.0.1:8099/apinto/output?name=abc"
```

5、查看日志输出
示例的日志名称为**access**，日志存放目录为**tmp/**，因此查看**tmp/access.log**文件输出

日志输出内容如下：
![](http://data.eolinker.com/course/x4nFMnYfc25a2c64a93a0090eb42a41dbff5e16c140e5b8.png)
