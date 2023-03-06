# http_mocking

### 插件信息

| 名称       | 字段                           | 属性      |
| ---------- |------------------------------|---------|
| http_mocking | http_mocking | 返回模拟的数据 |

### 功能描述

当执行该插件时，它将随机返回指定格式的模拟数据，并且请求不会转发到上游。

#### 配置示例

**示例说明**：将API的返回数据模拟成配置的jsonSchema转换而成的json数据

**以下JSON为jsonSchema格式**
```json
{
   "properties": {
      "name": {
         "example": "abcd",
         "type": "string"
      },
      "price": {
         "example": 123.12,
         "type": "number"
      },
      "user": {
         "properties": {
            "uuid": {
               "type": "string"
            },
            "role": {
               "properties": {
                  "firing": {
                     "example": true,
                     "type": "boolean"
                  },
                  "menu_id": {
                     "items": {
                        "type": "integer"
                     },
                     "type": "array"
                  }
               },
               "type": "object"
            }
         },
         "type": "object"
      },
      "role_ids": {
         "items": {
            "type": "string"
         },
         "type": "array"
      }
   },
   "type": "object"
}
```

#### 配置参数说明

| 参数名                                | 说明                                                  | 是否必填               | 默认值             | 值可能性   |
|------------------------------------|-----------------------------------------------------|--------------------|-----------------|--------|
| response_status                            | 响应状态码                                               | 否                  | 200             | int    |
| content_type                             | 返回响应的 Header Content-Type                           | 是                  | application/json | string |
| response_example                         | 返回响应的Body，与jsonschema字段二选一            | 否                  |                 | string |
| response_schema     | 指定响应的jsonschema对象 | 是                  |                 | string |
| response_header   | 响应头                                                 | 否  |                 | map    |


### 使用方法
1. 全局插件创建http-mocking插件

   ![](http://data.eolinker.com/course/1PGkZDje17a4150dd8590360c9cb92915df44ccc08511dd.gif)

2. 创建http路由时添加该插件

   ![](http://data.eolinker.com/course/V82e3Kgd50d630632afb58373c331327c59cd64f42002b9.gif)


#### 参数详细配置 参考教程[http-mocking](/docs/apinto/plugins/http-mocking.md)