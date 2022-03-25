# 流量控制

### 插件名称

| 名称     | 字段          | 属性     |
| -------- | ------------- | -------- |
| 流量控制 | rate_limiting | 流量管控 |

### 功能描述

设置单位时间内的最大访问次数（每秒、每分钟、每小时、每天）

### Open Api

#### 配置参数说明

| 参数名           | 说明                              | 值可能性    |
| ---------------- | --------------------------------- | ----------- |
| second           | 每秒请求次数限制，为0代表不限制   |             |
| minute           | 每分钟请求次数限制，为0代表不限制 |             |
| hour             | 每小时请求次数限制，为0代表不限制 |             |
| day              | 每天请求次数限制，为0代表不限制   |             |
| hideClientHeader | 请求结果是否隐藏流控信息          | true、false |
| responseType     | 插件返回报错的类型                | text、json  |

#### 配置示例

```sh
{
    "second": 10, 
    "minute": 50, 
    "hour": 100, 
    "day": 1000,
    "hideClientHeader": false,
    "responseType":"text"
}
```

注：”second”:0，参数值传 0 视为不配置该单位的访问量；相应参数值缺省同样视为不配置该单位的访问量。

#### Open API请求配置示例

##### 全局配置

在使用流量控制插件之前，需要在全局插件配置中将name为rate_limiting的插件状态设置为enable，具体配置点此[跳转](/docs/plugins)

##### 配置带有流量控制插件的service服务

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```sh
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' -d '{"name": "demo","driver": "http","timeout": 3000,"retry": 3,"desc":"使用流控插件","scheme": "https","anonymous": {"type": "round-robin","config": "demo-apinto.eolink.com:8280"},"plugins": {"rate_limiting":{"disable": false,"config":{"second":5,"minute":10}}}}' 
```

```
成功创建id为demo@service的服务
```

##### 绑定路由

将上一步生成的服务id绑定至路由的target字段

```sh
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{"name":"demo","driver":"http","desc":"该路由的目标服务使用了流控插件","listen":8080,"rules":[{"location":"/demo"}],"target":"demo@service"}'
```

##### 接口请求示例

```sh
curl -X POST -H 'Content-Type:application/json' 'http://127.0.0.1:8080/demo'
```

##### 接口访问返回示例

当hideClientHeader设为false时会在返回结果头部信息中添加流控相关信息，如：

```
X-RateLimit-Limit-Second: 5
X-RateLimit-Remaining-Second: 4
X-RateLimit-Limit-Minute: 10
X-RateLimit-Remaining-Minute: 9
```

