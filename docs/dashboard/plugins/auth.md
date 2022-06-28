# 鉴权
### 插件名称

| 名称 | 字段 | 属性     |
| ---- | ---- | -------- |
| 鉴权 | auth | 安全防御 |

### 功能描述

鉴权是指验证用户是否拥有访问系统或服务的权利。目前主要提供了以下的鉴权功能：

| 功能   | 属性                  |
| ------ | --------------------- |
| AK/SK  | 用户鉴权              |
| APIKey | 用户鉴权（静态token） |
| Basic  | 用户鉴权（静态token） |
| JWT    | 用户鉴权（动态token） |

### 插件配置参数


| 参数名 | 说明                | 是否必填 | 默认值 | 取值范围     |
| ------ | ------------------- | -------- | ------ | ------------ |
| auth   | 所使用的auth ID列表 | 是       |        | array_string |

### 创建鉴权

以创建apikey为例

![](http://data.eolinker.com/course/lfnDFti05655f10873ca1958aa0d2cac103b814fbe87531.gif)

### 全局开启鉴权插件

![](http://data.eolinker.com/course/FK9eh3Qfc381df86fa7b5433d27c74420bb465c36d23b17.gif)

### 配置带有流量控制插件的服务

![](http://data.eolinker.com/course/5CJgIBF8f2a1d5f799e0bcebbc9b1d277934e9f60271586.gif)
