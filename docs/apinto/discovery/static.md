# 静态负载



### 功能描述

静态服务发现提供了服务的接入地址，方便网关在转发时进行负载均衡处理。

静态服务可选择是否进行健康检查。



**健康检查**：节点转发时若发现后端服务地址异常，节点就会在转发列表中剔除该IP，并把该IP加入到健康检查的列表中；当IP的检查结果为成功时，则会重新加入到转发列表。



### OpenAPI配置服务发现

##### 请求参数说明

![](http://data.eolinker.com/course/PN95FVrd2fb08bdeab31e415283c53f4be44e9fc2fcd8fc.png)



##### 返回参数说明

![](http://data.eolinker.com/course/HPchu7A969ad4eec79c3640ae968686ea270388f1555d70.png)



#### 配置带健康检查的静态服务发现

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/discovery' \
  -H 'Content-Type:application/json' \
  -d '{"driver":"static","scheme":"http","health":{"scheme":"http","method":"GET","url":"/health/check","success_code":200,"timeout":3000,"period":30},"health_on":true,"name":"static_1"}'
```



#### 结果示例

```json
{
    "id": "static_1@discovery",
    "name": "static_1",
    "driver": "static",
    "discovery": "discovery",
    "create": "2021-08-04 17:09:58",
    "update": "2021-08-04 17:09:58"
}
```

```
返回的discoveryID为static_1@discovery
```



#### 创建负载

**服务发现id绑定负载**：上一步生成的服务发现id绑定至下面的discovery字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/upstream' \
  -H 'Content-Type:application/json' \
  -d '{"name":"static_upstream","driver":"http_proxy","discovery":"static_1@discovery","config":"127.0.0.1:8580 weight=1000;10.1.1.2 weight=10","scheme":"http","type":"round-robin"}'
```





