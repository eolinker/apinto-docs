# API KEY

### 功能描述

鉴权方式的一种，多用于OpenAPI，设置Apikey参数，不能通过认证的用户将无权访问接口。



### yaml配置鉴权

```yaml
auth:
  -
    name: apikey_1
    driver: apikey
    hide_credentials: true 
    user:
      -
        apikey: eolinker
        expire: 0
      -
        apikey: apinto
        expire: 1627013522
```

**注意**：若yaml文件发生变动，需要重启网关。



##### 配置参数

| 参数名           | 说明                                                | 是否必填 | 默认值 | 值可能性     |
| ---------------- | --------------------------------------------------- | -------- | ------ | ------------ |
| name             | 实例名                                              | 是       |        | string       |
| driver           | 所使用的鉴权类别                                    | 是       |        | ["apikey"]   |
| hide_credentials | 是否隐藏证书字段 默认为false                        | 否       | false  | bool         |
| user             | 密钥列表                                            | 是       |        | object_array |
| user -> apikey   | api密钥                                             | 是       |        | string       |
| user -> expire   | 过期时间 类型是unix时间戳 范围>=0 值为0表示永久有效 | 是       |        | int          |




### OpenAPI配置鉴权及进行请求的示例
##### 请求中鉴权参数填写位置说明

| 参数名             | 说明     | 必填 | 值可能性                                     | 参数位置 |
| ------------------ | -------- | ---- | -------------------------------------------- | -------- |
| Authorization-Type | 鉴权方式 | 是   | apikey、apikeyauth、apikey-auth、apikey_auth | Header   |
| Authorization      | Apikey值 | 是   |                                              | Header   |
| Apikey             | Apikey值 | 是   |                                              | Body     |
| Apikey             | Apikey值 | 是   |                                              | Query    |

**注意**：Apikey在Header、Body、Query三处任意一处添加即可。



##### 请求参数说明

![](http://data.eolinker.com/course/N2ItXUYbaa5dcdc8039f2acde8b9e9b838597ef8baa0572.png)



##### 返回参数说明

![](http://data.eolinker.com/course/Up3FcE56ea9365a8b5b624eb7037a75969e0945194f7dad.png)

#### 全局配置

在使用apikey鉴权插件之前，需要在全局插件配置中将鉴权插件状态设置为enable，具体配置点此[跳转](/docs/plugins)

#### 创建鉴权

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/auth' \
  -H 'Content-Type:application/json' \
  -d '{"name":"apikey_1","driver":"apikey","desc":"apikey鉴权","user":[{"apikey":"apinto","expire":0},{"apikey":"eolinker","expire":1659776375}]}'
```



##### 返回结果示例

```json
{
    "id": "apikey_1@auth",
    "name": "apikey_1",
    "profession": "auth",
    "driver": "apikey",
    "create": "2021-08-06 17:00:09",
    "update": "2021-08-06 17:00:09"
}
```

```
返回的鉴权ID为apikey_1@auth
```



#### 创建服务

**鉴权id绑定服务**：将上一步生成的鉴权id添加至服务plugins配置中的auth数组

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{"name":"auth_apikey_service","driver":"http","desc":"使用apikey鉴权的服务","timeout":10000,"anonymous":{"type":"round-robin","config":"demo-apinto.eolink.com:8280"},"retry":3,"plugins":{"auth":{"disable":false,"config":{"auth":["apikey_1@auth"]}}},"scheme":"https"}'
```

##### 返回结果示例

```json
{
	"id": "auth_apikey_service@service",
	"name": "auth_apikey_service",
    "driver": "http",
	"profession": "service",
    "create": "2021-10-29 10:38:31",
	"update": "2021-10-29 10:38:31"
}
```

```
返回的serviceID为auth_apikey_service@service
```



#### 创建路由

**服务id绑定路由**：上一步生成的服务id绑定至路由路由的target字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{"name":"auth_apikey_router","driver":"http","desc":"该路由的目标服务使用了apikey鉴权","listen":8080,"host":["www.demo.com"],"target":"auth_apikey_service@service"}'
```

##### 返回结果示例

```json
{
	"id": "auth_apikey_router@router",
	"name": "auth_apikey_router",
    "driver": "http",
	"profession": "router",
    "create": "2021-10-29 10:43:29",
	"update": "2021-10-29 10:43:29"
}
```



#### 请求示例

```shell
curl -X GET  \
  'http://127.0.0.1:8080/' \
  -H 'Host:www.demo.com'\
  -H 'Content-Type:application/x-www-form-urlencoded' \
  -H 'Authorization-Type:apikey' \
  -H 'Authorization:apinto'
```

返回状态码200及demo接口反馈内容



