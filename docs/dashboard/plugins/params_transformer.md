# 参数映射
### 插件信息

| 名称     | 字段               | 属性     |
| -------- | ------------------ | -------- |
| 参数映射 | params_transformer | 参数处理 |

### 功能描述

实现表单或json参数的映射，访问API的 **参数A** 绑定到目标API的 **参数B**，映射位置包括header、body、query。

注意事项：

- 若访问API的参数名是user，目标API的参数名是username，此时需开启参数映射插件；若均为username，则无需开启此插件。
- json仅支持 **一级** 映射。
- 若参数类型为表单时，映射插件支持同名参数的使用。
- 使用该插件时请保证Content-Type为 application/x-www-form-urlencoded、 multipart/form-data 或 application/json。

### 配置参数说明

| 参数名                   | 值类型       | 是否必填 | 值可能性                  | 默认值 | 说明                                               |
| ------------------------ | ------------ | -------- | ------------------------- | ------ | -------------------------------------------------- |
| params                   | array_object | 是       |                           |        | 映射参数列表                                       |
| params -> name           | string       | 是       |                           |        | 待映射参数名称                                     |
| params -> position       | string       | 是       | ["body","header","query"] |        | 待映射参数所在位置                                 |
| params -> proxy_name     | string       | 是       |                           |        | 目标参数名称                                       |
| params -> proxy_position | string       | 是       |                           |        | 目标参数所在位置                                   |
| params -> required       | bool         | 否       | false                     | false  | 待映射参数是否必含，如为true，该参数不存在时会报错 |
| remove                   | bool         | 否       | false                     | false  | 映射后删除原参数                                   |
| error_type               | string       | 否       | ["text","json"]           | text   | 插件返回报错的类型                                 |

### 全局开启该插件

![](http://data.eolinker.com/course/nIjmFAn051b881172d989f3d9f2e6a8f5a76275af212c48.gif)



### 配置带有参数映射插件的服务

![](http://data.eolinker.com/course/HapAnkkdbb9b124f3b749ed219d71c88572822f94f1dd90.gif)





