# HTTP服务


| 类别 | 属性     |
| ---- | -------- |
| 服务 | 网关转发 |



### 功能描述

**服务**是一组可用的api，用于网关转发。可配置负载及鉴权。



### OpenAPI配置服务

#### 不同场景下的配置示例

* 普通场景
* 高可用场景



鉴权配置教程[点此](/docs/auth)进行跳转



##### 请求参数说明

![](http://data.eolinker.com/course/aASF6GB56e2fb17cc85eb54fe99728aec52082cf00d3a6b.png)



##### 返回结果参数说明

![](http://data.eolinker.com/course/u74G56bce2625c3563719666a0253e94d9451955ff4c1bc.png)



#### 一、普通场景，不需高可用的服务配置示例

通过anonymous字段直接配置上游地址示例

**备注**：匿名服务配置的是apinto官方示例接口。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{"name":"annoymous","driver":"http","desc":"直接请求上游地址，不使用鉴权","timeout":3000,"anonymous":{"type":"round-robin","config":"demo-apinto.eolink.com:8280"},"retry":3,"scheme":"https"}'
```

##### 返回结果示例

```json
{
    "id": "annoymous@service",
    "name": "annoymous",
    "driver": "http",
    "profession": "service",
    "create": "2021-08-04 09:51:10",
    "update": "2021-08-04 09:51:10"
}
```



#### 二、高可用场景，高可用的服务配置示例

upstream字段填上配置了服务发现的负载。

负载配置教程[点此](/docs/upstream/http.md)进行跳转

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/service' \
  -H 'Content-Type:application/json' \
  -d '{"name":"consul_upstream_service","driver":"http","desc":"配置了服务发现的负载，不使用鉴权","timeout":3000,"upstream":"upstream_http_1@upstream","retry":3}'
```

##### 返回结果示例

```json
{
    "id": "consul_upstream_service@service",
    "name": "consul_upstream_service",
    "driver": "http",
    "profession": "service",
    "create": "2021-08-04 11:02:36",
    "update": "2021-08-04 11:02:36"
}
```

