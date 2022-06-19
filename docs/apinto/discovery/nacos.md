# Nacos

### 功能描述

Nacos服务发现为网关动态地提供了服务的接入地址，网关可以基于这些地址进行负载均衡处理。

Nacos注册中心自带健康检查，从该注册中心获取节点时可以获取到稳定健康的节点。






### OpenAPI配置服务发现

##### 请求参数说明

![](http://data.eolinker.com/course/NyYRv8h5b5be8cd6313a9ac144e83be49b57b22c0762455.png)



##### 返回参数说明

![](http://data.eolinker.com/course/HPchu7A969ad4eec79c3640ae968686ea270388f1555d70.png)



#### 创建nacos服务发现

若有命名空间字段，则在params里填入。

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/discovery' \
  -H 'Content-Type:application/json' \
  -d '{"driver":"nacos","scheme":"http","config":{"address":["127.0.0.1:8848"],"params":{"username":"test","password":"test"}},"name":"nacos_1"}'
```



#### 结果示例

```json
{
    "id": "nacos_1@discovery",
    "name": "nacos_1",
    "driver": "nacos",
    "discovery": "discovery",
    "create": "2021-08-04 16:55:15",
    "update": "2021-08-04 16:55:15"
}
```

```
返回的discoveryID为nacos_1@discovery
```



#### 创建负载

**服务发现id绑定负载**：上一步生成的服务发现id绑定至下面的discovery字段

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/upstream' \
  -H 'Content-Type:application/json' \
  -d '{"name":"nacos_upstream","driver":"http_proxy","discovery":"nacos_1@discovery","config":"redis","scheme":"http","type":"round-robin"}'
```



