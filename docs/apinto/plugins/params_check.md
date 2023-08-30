# 参数校验

### 插件信息

| 名称      | 字段            | 属性    |
|---------|---------------|-------|
| 参数校验    | params_check  | 安全防控  |

### 描述
校验请求体 、请求头部 、Query参数的有效性和合法性，过滤/拦截无效请求。在进行参数校验时，支持正则表达式校验、前缀校验、后缀校验、包含校验、全等校验、为空校验等多种校验方式。
参数校验插件执行简化流程图如下，该图省略路由匹配、剩余插件执行等操作。

![](http://data.eolinker.com/course/LMdSID4df5782ef533ab0ddef1c69606c6876cacbc2c314.png)

### 配置示例
```json
{
  "params": [
    {
      "match_text": "**",
      "name": "X-Apinto-Token",
      "position": "header"
    }
  ]
}
```
**字段描述**

| 字段                   | 类型     | 描述                                             |
|----------------------|--------|------------------------------------------------|
| params               | array  | 参数校验规则列表                                       |
| params -> match_text | string | 匹配文本，支持正则表达式匹配、前缀匹配、后缀匹配、包含匹配、全等匹配、为空匹配等多种校验方式 |
| params -> name       | string | 参数名称                                           |
| params -> position   | string | 参数位置，可选值：header、query、body                     |

### 参数校验规则

| 匹配类型               | 规则      | 说明                              |
|--------------------|---------|---------------------------------|
| 全等匹配               | str     | 值存在，且与str完全相等                   |
| 前缀匹配               | str*    | 值存在，且str是值的前缀                   |
| 后缀匹配               | *str    | 值存在，且str是值的后缀                   |
| 子串匹配               | \*str\* | 值存在，且str是值的子串                   |
| 非等匹配               | !=str   | 值存在，且值不等于str时匹配成功               |
| 空值匹配               | $       | 要求key存在且值为空值，多用于header、query指标  |
| 存在匹配               | **      | 要求key存在但不能为空值，多用于header、query指标 |
| 不存在匹配              | !       | 要求key不存在，多用于header、query指标      |
| 区分大小写的正则匹配         | ~=str   | 值符合正则匹配                         |
| 不区分大小写的正则匹配        | ~*=str  | 值符合正则匹配                         |
| 任意匹配               | *       | 任何情况都匹配成功                       |

### 参数校验规则示例

#### 全等匹配
以请求头`X-Apinto-Token`为例，匹配值为`dknrkdlkenrj`
```json
{
  "params": [
    {
      "match_text": "dknrkdlkenrj",
      "name": "X-Apinto-Token",
      "position": "header"
    }
  ]
}
```

#### 前缀匹配
以请求头`X-Apinto-Token`为例，允许值前缀为`apinto-user-`的请求
```json
{
  "params": [
    {
      "match_text": "apinto-user-*",
      "name": "X-Apinto-Token",
      "position": "header"
    }
  ]
}
```

#### 后缀匹配
以请求头`X-Apinto-Token`为例，允许值前缀为`apinto-user-`的请求
```json
{
  "params": [
    {
      "match_text": "apinto-user-*",
      "name": "X-Apinto-Token",
      "position": "header"
    }
  ]
}
```

#### 正则匹配
以请求头`X-Apinto-Token`为例，允许符合正则表达式`^[a-zA-Z0-9]{6,16}$`的请求
```json
{
  "params": [
    {
      "match_text": "^[a-zA-Z0-9]{6,16}$",
      "name": "X-Apinto-Token",
      "position": "header"
    }
  ]
}
```

#### 存在匹配
以请求头`X-Apinto-Token`为例，该请求头必须存在
```json
{
  "params": [
    {
      "match_text": "**",
      "name": "X-Apinto-Token",
      "position": "header"
    }
  ]
}
```