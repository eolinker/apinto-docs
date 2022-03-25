# HTTP 负载



| 类别 | 属性     |
| ---- | -------- |
| 负载 | 负载均衡 |



### 功能描述

负责将请求转发到支持http/https的上游服务器。



### 配置流程

![](http://data.eolinker.com/course/FBcgxzZ7b7c6dac043ef9002cc18be256be87f1afce3b6d.png)

### 负载均衡算法

暂只支持轮询调度算法



### 支持的服务发现

支持consul、nacos、eureka及静态服务发现。

服务发现配置教程[点此](/docs/discovery)进行跳转

### OpenAPI配置负载

#### 请求参数说明

![](http://data.eolinker.com/course/7cpfB3e8c10bca0a8048c35750145feeeb3ae419e8591be.png)



**config参数配置说明**：负载配置，具体格式根据所使用的服务发现类型而定。

- 若使用nacos，consul，eureka配置中心，discovery字段填配置中心内的服务名。
- 若使用静态服务发现，则配置填入静态接入地址及其权重，格式为：**addr1 weight1;addr2 weight2;**  不同地址之间用分号进行分割。



#### 返回参数说明

![](http://data.eolinker.com/course/kh2yj982bf32c9c4d0efbcb88b07ade1247c808da9b7aaa.png)



#### 配置静态服务发现的负载

配置不带健康检查的静态服务发现

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/discovery' \
  -H 'Content-Type:application/json' \
  -d '{"driver":"static","scheme":"http","health_on":false,"name":"static_no_health"}'
```

```shell
#新增服务发现返回的json结构
{
    "id": "static_no_health@discovery",
    "name": "static_no_health",
    "driver": "static",
    "profession": "discovery",
    "create": "2021-10-29 10:28:51",
    "update": "2021-10-29 10:28:51"
}
```

新增负载，上一步返回的服务发现id作为配置负载的discovery字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/upstream' \
  -H 'Content-Type:application/json' \
  -d '{"name":"static_upstream","driver":"http_proxy","discovery":"static_no_health@discovery","config":"127.0.0.1:8580 weight=1000;10.1.1.2 weight=10","scheme":"http","type":"round-robin"}'
```



##### 结果示例

```json
{
    "id": "static_upstream@upstream",
    "name": "static_upstream",
    "driver": "http_proxy",
    "profession": "upstream",
    "create": "2021-10-29 10:30:52",
    "update": "2021-10-29 10:30:52"
}
```



#### 配置动态服务发现的负载

以配置consul为例

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/discovery' \
  -H 'Content-Type:application/json' \
  -d '{"driver":"consul","scheme":"http","config":{"address":["127.0.0.1:8501","127.0.0.1:8500"],"params":{"token":"a92316d8-5c99-4fa0-b4cd-30b9e66718aa","namespace":"default"}},"name":"consul_1"}'
```

```shell
#新增consul服务发现返回的json结构体
{
    "id": "consul_1@discovery",
    "name": "consul_1",
    "driver": "consul",
    "discovery": "discovery",
    "create": "2021-08-04 10:56:13",
    "update": "2021-08-04 16:00:16"
}
```

新增负载，上一步返回的服务发现id作为配置负载的discovery字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/upstream' \
  -H 'Content-Type:application/json' \
  -d '{"name":"consul_upstream","driver":"http_proxy","discovery":"consul_1@discovery","config":"consulService","scheme":"http","type":"round-robin"}'
```



##### 结果示例

```json
{
    "id": "consul_upstream@upstream",
    "name": "consul_upstream",
    "driver": "http_proxy",
    "profession": "upstream",
    "create": "2021-08-04 14:53:46",
    "update": "2021-08-04 14:53:46"
}
```

