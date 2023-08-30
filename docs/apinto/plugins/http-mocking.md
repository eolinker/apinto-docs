# HTTP-MOCK

### 插件信息

| 名称       | 字段                           | 属性      |
| ---------- |------------------------------|---------|
| http_mocking | http_mocking | 返回模拟的数据 |

### 功能描述

当执行该插件时，它将随机返回指定格式的模拟数据，并且请求不会转发到上游。


#### 配置参数说明

| 参数名                                | 值类型                             | 是否必填               | 值可能性   | 默认值             | 说明                                                  |
|:-----------------------------------|:-------------------|:-------|:----------------|:----------------------------------------------------|:----------------------------------------------------|
| response_status                            | int                         | 否                  | 200  | 200             | 响应状态码,仅http路由有效                                     |
| content_type                             | string                       | 是                  | application/json | application/json | 返回响应的 Header Content-Type                           |
| response_example                         | string                   | 否                  | {"name":"apinto"} |                 | 响应Body，与jsonschema字段二选一      |
| response_schema     | string | 是                  | JSON Schema格式字符串 |                 | Mock生成的Json Schema语法数据，与响应Body字段二选一 |
| response_header   | object | 否  | {"name":"apinto"} |                 | 响应头                                                 |


**JSON Schema** 在其字段中支持以下类型：

- string
- number
- integer
- boolean
- object
- array

以下是一个 **JSON Schema** 示例：

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

以下为上述 **JSON Schema** 可能生成的返回对象：

```json
{
	"name": "abcd",
	"price": 123.12,
	"role_ids": ["BfXIwsZxtQ"],
	"user": {
		"role": {
			"firing": true,
			"menu_id": [8875890974822320583]
		},
		"uuid": "TztryysOIr"
	}
}
```

### Open Api


### 使用方法

**在Http路由中绑定该插件即可生效**

### 前置配置

#### 创建http-mocking全局插件

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
	"plugins": [{
	"id": "eolinker.com:apinto:http-mocking",
	"name": "http-mocking",
	"status": "enable"
	}]
}'
```

#### 配置示例

#### 测试用例1

**只配置响应的Body**

###### 插件配置

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "http_router",
	"driver": "http",
	"description": "",
	"location": "/sayHello",
	"rules": [],
	"plugins":{
	   "http-mocking":{
	     "disable":false,
	     "config":{
	       "response_status": 200,
           "content_type": "application/json",
           "response_example": "{\"id\":10,\"name\": \"apinto\",\"user\":{\"name\":10}}",
           "response_schema": "",
           "response_header": {}
	     }
	   } 
	}
}'
```

##### http请求

```shell
curl -X POST  \
  'http://127.0.0.1:8099/sayHello' \
  -H 'Content-Type:application/json' 
```

调用结果

![](http://data.eolinker.com/course/kZGNuSAe673a6e9e546752276c1fe3290536653fb2c4a67.png)

#### 测试用例2

**配置jsonSchema**

###### 插件配置

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "http_router",
	"driver": "http",
	"description": "",
	"location": "/sayHello",
	"rules": [],
	"plugins":{
	   "http-mocking":{
	     "disable":false,
	     "config":{
	       "response_status": 200,
           "content_type": "application/json",
           "response_example": "",
           "response_schema": "{\"properties\": {\"name\": {\"example\": \"abcd\",\"type\": \"string\"},\"price\": {\"example\": 123.12,\"type\": \"number\"},\"user\": {\"properties\": {	\"uuid\": {\"type\": \"string\"},\"role\": {\"properties\": {\"firing\": {\"example\": true,\"type\": \"boolean\"},\"menu_id\": {\"items\": {\"type\": \"integer\"},\"type\": \"array\"}},\"type\": \"object\"}},\"type\": \"object\"},\"role_ids\": {\"items\": {\"type\": \"string\"},\"type\": \"array\"}},\"type\": \"object\"}",
           "response_header": {}
	     }
	   } 
	}
}'
```

##### http请求

```shell
curl -X POST  \
  'http://127.0.0.1:8099/sayHello' \
  -H 'Content-Type:application/json' 
```

调用结果

![](http://data.eolinker.com/course/B5dNKcyf1ef40736ef746094a4bc208f7c97fd3648af3c5.png)

### 使用mockJs生成的jsonSchema

- [参考网站](https://github.com/nuysoft/Mock/wiki/Syntax-Specification)
- 生成[jsonSchema](http://jsfiddle.net/nuysoft/Y3rg6/7/)

template生成jsonSchema
```js
$('<pre>').text(JSON.stringify(Mock.toJSONSchema(template), null, 4))
    .appendTo('body')
```

#### 测试示例1

随机生成1-10个对象数组

template 结构如下
```js
var template = {
    'list|1-10': [{
        'email': '@email',
        'name':'@name',
        'ip':'@ip'
    }]
}
```
调用**Mock.toJSONSchema**后生成的jsonSchema

```json
{
    "template": {
        "list|1-10": [
            {
                "email": "@email",
                "name": "@name",
                "ip": "@ip"
            }
        ]
    },
    "type": "object",
    "rule": {},
    "path": [
        "ROOT"
    ],
    "properties": [
        {
            "name": "list",
            "template": [
                {
                    "email": "@email",
                    "name": "@name",
                    "ip": "@ip"
                }
            ],
            "type": "array",
            "rule": {
                "parameters": [
                    "list|1-10",
                    "list",
                    null,
                    "1-10",
                    null
                ],
                "range": [
                    "1-10",
                    "1",
                    "10"
                ],
                "min": 1,
                "max": 10,
                "count": 5
            },
            "path": [
                "ROOT",
                "list"
            ],
            "items": [
                {
                    "name": 0,
                    "template": {
                        "email": "@email",
                        "name": "@name",
                        "ip": "@ip"
                    },
                    "type": "object",
                    "rule": {},
                    "path": [
                        "ROOT",
                        "list",
                        0
                    ],
                    "properties": [
                        {
                            "name": "email",
                            "template": "@email",
                            "type": "string",
                            "rule": {},
                            "path": [
                                "ROOT",
                                "list",
                                0,
                                "email"
                            ]
                        },
                        {
                            "name": "name",
                            "template": "@name",
                            "type": "string",
                            "rule": {},
                            "path": [
                                "ROOT",
                                "list",
                                0,
                                "name"
                            ]
                        },
                        {
                            "name": "ip",
                            "template": "@ip",
                            "type": "string",
                            "rule": {},
                            "path": [
                                "ROOT",
                                "list",
                                0,
                                "ip"
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

#### 插件配置

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
	"description": "",
	"driver": "http",
	"location": "/sayHello",
	"name": "http_router",
	"plugins": {
		"http-mocking": {
			"config": {
				"content_type": "application/json",
				"response_example": "",
				"response_header": {},
				"response_schema": "{\n    \"template\": {\n        \"list|1-10\": [\n            {\n                \"email\": \"@email\",\n                \"name\": \"@name\",\n                \"ip\": \"@ip\"\n            }\n        ]\n    },\n    \"type\": \"object\",\n    \"rule\": {},\n    \"path\": [\n        \"ROOT\"\n    ],\n    \"properties\": [\n        {\n            \"name\": \"list\",\n            \"template\": [\n                {\n                    \"email\": \"@email\",\n                    \"name\": \"@name\",\n                    \"ip\": \"@ip\"\n                }\n            ],\n            \"type\": \"array\",\n            \"rule\": {\n                \"parameters\": [\n                    \"list|1-10\",\n                    \"list\",\n                    null,\n                    \"1-10\",\n                    null\n                ],\n                \"range\": [\n                    \"1-10\",\n                    \"1\",\n                    \"10\"\n                ],\n                \"min\": 1,\n                \"max\": 10,\n                \"count\": 5\n            },\n            \"path\": [\n                \"ROOT\",\n                \"list\"\n            ],\n            \"items\": [\n                {\n                    \"name\": 0,\n                    \"template\": {\n                        \"email\": \"@email\",\n                        \"name\": \"@name\",\n                        \"ip\": \"@ip\"\n                    },\n                    \"type\": \"object\",\n                    \"rule\": {},\n                    \"path\": [\n                        \"ROOT\",\n                        \"list\",\n                        0\n                    ],\n                    \"properties\": [\n                        {\n                            \"name\": \"email\",\n                            \"template\": \"@email\",\n                            \"type\": \"string\",\n                            \"rule\": {},\n                            \"path\": [\n                                \"ROOT\",\n                                \"list\",\n                                0,\n                                \"email\"\n                            ]\n                        },\n                        {\n                            \"name\": \"name\",\n                            \"template\": \"@name\",\n                            \"type\": \"string\",\n                            \"rule\": {},\n                            \"path\": [\n                                \"ROOT\",\n                                \"list\",\n                                0,\n                                \"name\"\n                            ]\n                        },\n                        {\n                            \"name\": \"ip\",\n                            \"template\": \"@ip\",\n                            \"type\": \"string\",\n                            \"rule\": {},\n                            \"path\": [\n                                \"ROOT\",\n                                \"list\",\n                                0,\n                                \"ip\"\n                            ]\n                        }\n                    ]\n                }\n            ]\n        }\n    ]\n}\n",
				"response_status": 200
			},
			"disable": false
		}
	}
}'
```

##### http请求

```shell
curl -X POST  \
  'http://127.0.0.1:8099/sayHello' \
  -H 'Content-Type:application/json' 
```

调用结果

![](http://data.eolinker.com/course/IRYciaz4fa6501478010b42b260e6f527797ef28621c6ef.png)