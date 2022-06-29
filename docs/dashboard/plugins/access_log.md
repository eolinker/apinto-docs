# access-log
### 插件信息

| 名称       | 字段       | 属性     |
| ---------- | ---------- | -------- |
| access-log | access_log | 可观测性 |

### 功能描述

能够记录到达网关的http请求的访问日志，通过配置的输出器将筛选后的信息输出到特定的地方。

#### 配置参数说明

| 参数名 | 说明         | 是否必填 | 默认值 | 值可能性     |
| ------ | ------------ | -------- | ------ | ------------ |
| output | 输出器id数组 | 是       |        | string_array |

### 创建输出器

以文件输出器为例

**配置说明**：访问日志将输出到`/var/log`目录下的`demo.log`文件，每天生成一个新的日志文件，旧日志文件保留1天后删除。日志格式为line，内容输出`request_id`。

![](http://data.eolinker.com/course/71ZtYVF7c48281eef1a4db89de2c76c5d2b6539cd55042e.gif)

### 全局开启access-log插件

![](http://data.eolinker.com/course/4aFT7J954fee3b3162e62c412a85b73d05186c155a28c18.gif)

### 配置带有access-log插件的服务

![](http://data.eolinker.com/course/QK4EULed4f7d776e82dfcb0e80cf84701f571c7fb2fd91a.gif)
