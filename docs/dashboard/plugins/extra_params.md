# 额外参数
### 插件信息

| 插件名称 | 字段插件     | 属性     |
| -------- | ------------ | -------- |
| 额外参数 | extra_params | 参数处理 |

### 功能描述

开启该插件后，不需要用户传某些参数值，网关会在转发时自动带上这些参数，支持header、body、query参数。
额外参数仅支持 **表单** 类型与 **json** 类型：

- formdata的参数值须为string类型，头部补充Conent-Type:x-www-form-urlencoded。
- 若额外参数是json类型，需在头部补充Content-Type:application/json。
- 参数类型为表单时支持同名参数。



#### 配置参数说明

| 参数名             | 值类型       | 是否必填 | 值可能性                     | 默认值  | 说明                 |
| :----------------- | :----------- | :------- | :--------------------------- | :------ | :------------------- |
| params             | array_object | 是       |                              |         | 额外参数列表         |
| params -> name     | string       | 是       | test                         |         | 参数名               |
| params -> position | string       | 是       | ["header","body","query"]    |         | 参数位置             |
| params -> value    | string       | 是       | string                       |         | 参数值               |
| params -> conflict | string       | 否       | ["origin","convert","error"] | convert | 参数冲突时的处理方式 |
| error_type         | string       | 否       | ["text","json"]              | text    | 插件返回报错的类型   |

**参数冲突说明**：
额外参数插件配置了参数A的值，但是直接请求时也传了参数A，此时为参数出现冲突，参数A实际上会接收两个参数值。

- convert：参数出现冲突时，取映射后的参数，即配置的值
- origin：参数出现冲突时，取映射前的参数，即实际传的值
- error：请求时报错，”param_name” has a conflict.

#### 请求参数

| 参数名       | 说明     | 必填 | 值可能性                                  | 参数位置 |
| :----------- | :------- | :--- | :---------------------------------------- | :------- |
| Content-Type | 数据类型 | 是   | x-www-form-urlencoded 或 application/json | header   |

若配置示例里的 test 参数为表单参数，则请求头部填写 Conent-Type:x-www-form-urlencoded。
若配置示例里的 test 参数为Json参数，则请求头部需加 Conent-Type:application/json。



### 配置额外参数全局插件

开启插件教程[点此](/docs/dashboard/plugins/)进行跳转。

![](http://data.eolinker.com/course/5KvDHZs12fa33a027fc4d08dba4322b5d01814723d5aee9.gif)







