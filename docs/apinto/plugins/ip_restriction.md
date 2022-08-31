# IP黑白名单
### 插件名称

| 名称       | 字段           | 属性     |
| ---------- | -------------- | -------- |
| IP黑白名单 | ip_restriction | 安全防御 |

### 功能描述

IP黑名单指除黑名单外的IP均可访问，IP白名单指除白名单外的IP不能访问，网关通过会 **X-Real-IP** 头判断客户端真实IP。

##### 一、IP配置支持以下写法：

（1）192.168.0.1
（2）192.168.0.1/26
（3）192.168.0.*

注：\*仅支持放最后一位，如：192.*、192.168.*、192.168.0.*

##### 二、配合nginx的X-Real-IP使用：

（1）若客户端与网关之间不存在代理服务器，此时从请求中解析出的IP地址就是实际客户端的IP，网关会把该地址设为X-Real-IP头的值；
（2）若客户端与网关之间存在多层代理，则需在 **第一层代理** 中设置X-Real-IP请求头，此时网关会把代理传来的X-Real-IP转发到服务器。

**代理配置示例**：

```sh
location / {
    root   html;
    index  index.html index.htm index.php;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://192.168.247.132;
    }
```

### Open Api

#### 插件配置参数


| 参数名        | 说明               | 是否必填 | 默认值 | 取值范围          |
| ------------- | ------------------ | -------- | ------ | ----------------- |
| ip_list_type  | IP名单类型         | 是       |        | ["white","black"] |
| ip_white_list | IP白名单列表       | 是       |        | array_string      |
| ip_black_list | IP黑名单列表       | 是       |        | array_string      |
| response_type | 插件返回报错的类型 | 是       |        | ["text","json"]   |


#### 配置示例

```
{
    "ip_list_type":"black",
    "ip_white_list":["127.0.0.1"],
    "ip_black_list":["127.0.0.2"],
    "response_type":"text"
}
```

#### Open API请求示例

##### 全局配置

在使用IP黑白名单插件之前，需要在全局插件配置中将name为ip_restriction的插件状态设置为enable，具体配置点此[跳转](/docs/apinto/plugins)

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:ip_restriction",
        "name":"my_ip_restriction",
        "status":"enable"
    }]
}'
```

##### 配置带有IP黑白名单插件的服务

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```sh
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' \
-d '{
  "name": "ip_restriction_service",
  "driver": "http",
  "timeout": 3000,
  "retry": 3,
  "description": "使用黑白ip插件",
  "scheme": "https",
  "nodes": ["demo.apinto.com:8280"],
  "balance": "round-robin",
  "plugins": {
	"my_ip_restriction": {
	"disable": false,
	"config": {
	  "ip_list_type": "black",
	  "ip_black_list": ["127.0.0.1"]
	  }
	}
  }
}' 
```

```
成功创建id为ip_restriction_service@service的服务
```

##### 绑定路由

将上一步生成的服务id绑定至路由的target字段

```sh
curl -X POST 'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
  "name": "ip_restriction_router",
  "driver": "http",
  "description": "该路由的目标服务使用了黑白ip插件",
  "listen": 8099,
  "rules": [{
	"location": "/demo/ip_restriction"
  }],
  "target": "ip_restriction_service@service"
}'
```

##### 接口请求示例

```sh
curl -X POST 'http://127.0.0.1:8099/demo/ip_restriction' -H 'Content-Type:application/json'
```

##### 接口访问返回示例

127.0.0.1为黑名单中的ip，故返回403

```sh
HTTP/1.1 403 Forbidden
Content-Type: text/plain
Content-Length: 18

[ip_restriction] Illegal IP!
```

