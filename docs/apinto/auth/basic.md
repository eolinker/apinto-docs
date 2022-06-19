# Basic Auth

### 功能描述

鉴权方式的一种，设置Basic Auth的Username与Password，不能通过认证的用户将无权访问接口。



### yaml配置鉴权

```yaml
auth:
  -
    name: basic_1
    driver: basic
    hide_credentials: true 
    user: 
      -
        username: wu  
        password: 123456  
        expire: 0
      -
        username: liu
        password: 123456
        expire: 0
```

**注意**：若yaml文件发生变动，需要重启网关。



#### 配置参数

| 参数名           | 说明                                                | 是否必填 | 默认值 | 值可能性     |
| ---------------- | --------------------------------------------------- | -------- | ------ | ------------ |
| name             | 实例名                                              | 是       |        | string       |
| driver           | 所使用的鉴权类别                                    | 是       |        | ["basic"]    |
| hide_credentials | 是否隐藏证书字段 默认为false                        | 否       | false  | bool         |
| user             | 密钥列表                                            | 是       |        | object_array |
| user -> username | 用户名                                              | 是       |        | string       |
| user -> password | 用户密码                                            | 是       |        | string       |
| user -> expire   | 过期时间 类型是unix时间戳 范围>=0 值为0表示永久有效 | 是       |        | int          |



### OpenAPI配置鉴权及进行请求的示例

##### 请求中鉴权参数填写位置说明

| 参数名             | 说明     | 必填 | 值可能性                                             | 参数位置 |
| ------------------ | -------- | ---- | ---------------------------------------------------- | -------- |
| Authorization-Type | 鉴权方式 | 是   | basic、basic_auth、basic-auth、basicauth             | Header   |
| Authorization      | 鉴权值   | 是   | Basic+空格+(username:password用base64加密后的字符串) | Header   |



##### 请求参数说明

![](http://data.eolinker.com/course/wdcjs36787e7a5e582eacc714c33a10035a323862935724.png)



##### 返回参数说明

![](http://data.eolinker.com/course/Up3FcE56ea9365a8b5b624eb7037a75969e0945194f7dad.png)

#### 全局配置

在使用basic鉴权插件之前，需要在全局插件配置中将鉴权插件状态设置为enable，具体配置点此[跳转](/docs/plugins)

#### 创建鉴权

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/auth' \
  -H 'Content-Type:application/json' \
  -d '{"name":"basic_1","driver":"basic","desc":"basic鉴权，当前仅配置了一组user","user":[{"username":"apinto","password":"123456","expire":0}]}'
```

##### 返回结果示例

```json
{
    "id": "basic_1@auth",
    "name": "basic_1",
    "driver": "basic",
    "profession": "auth",
    "create": "2021-08-06 17:40:40",
    "update": "2021-08-06 17:40:40"
}
```

```
返回的鉴权id为basic_1@auth
```



#### 创建服务

**鉴权id绑定服务**：将上一步生成的鉴权id添加至服务plugins配置中的auth数组

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{"name":"auth_basic_service","driver":"http","desc":"该服务使用了basic鉴权","timeout":10000,"anonymous":{"type":"round-robin","config":"demo-apinto.eolink.com:8280"},"retry":3,"plugins":{"auth":{"disable":false,"config":{"auth":["basic_1@auth"]}}},"scheme":"https"}'
```

##### 返回结果示例

```json
{
	"id": "auth_basic_service@service",
	"name": "auth_basic_service",
    "driver": "http",
	"profession": "service",
    "create": "2021-10-29 11:33:27",
	"update": "2021-10-29 11:33:27"
}
```

```
返回的serviceID为auth_basic_service@service
```



#### 创建路由

**服务id绑定路由**：上一步生成的服务id绑定至路由路由的target字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{"name":"auth_basic_router","driver":"http","desc":"创建使用鉴权basic服务的路由","listen":8080,"host":["www.demo.com"],"target":"auth_basic_service@service"}'
```

##### 返回结果示例

```json
{
	"id": "auth_basic_router@router",
	"name": "auth_basic_router",
    "driver": "http",
	"profession": "router",
    "create": "2021-10-29 11:34:13",
	"update": "2021-10-29 11:37:27"
}
```



#### 请求

```shell
curl -X GET  \
  'http://127.0.0.1:8080/' \
  -H 'Host:www.demo.com'\
  -H 'Content-Type:application/x-www-form-urlencoded' \
  -H 'Authorization-Type:basic' \
  -H 'Authorization: Basic Z29rdToxMjM0NTY='
```

返回状态码200及demo接口反馈内容