# 额外参数

> 说明
> * 将参数添加到转发请求的请求头、query、body中 
> * 目前仅支持静态额外参数
> * 可用于上游服务的静态token校验
> * body额外参数仅支持表单和json格式，即`content-type`仅支持`application/x-www-form-urlencoded`、`multipart/form-data`、`application/json`



## 配置说明

| 字段       | 类型                         | 说明                                                                                                                     |
|----------|----------------------------|------------------------------------------------------------------------------------------------------------------------|
| 参数名      | string                     | 参数名                                                                                                                    |
| 参数值      | string                     | 参数值，当position为`body`，且`content-type`为`application/json`时，支持`JsonPath`语法                                                |
| 参数位置     | string                     | 参数位置。参数可能性：`header`、`body`、`query`                                                                                     |
| 参数存在替换规则 | string                     | 当参数已经存在，执行当冲突解决策略。参数值可能性：`origin`、`convert`、`error`<br/>* origin：使用原始值<br/>* convert：使用额外参数设置的值<br/>* error：不转发，返回冲突报错 |
| 额外参数标签   | object (map[string]string) | 参数额外标签                                                                                                                 |

该额外参数需要搭配应用使用，详情点击[应用](/docs/apinto/app/index.md）
