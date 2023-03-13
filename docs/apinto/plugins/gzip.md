# gzip压缩
### 插件名称

| 名称     | 字段 | 属性     |
| -------- | ---- | -------- |
| gzip压缩 | gzip | 效率提升 |

### 功能描述

将响应进行gzip压缩，以提高传输效率

使用前提：客户端请求时必须带有Accept-encoding头部，且值包括gzip

### Open Api

#### 配置参数说明

| 参数名     | 值类型       | 是否必填 | 值可能性      | 默认值 | 说明                                                         |
| :--------- | :----------- | :------- | :------------ | :----- | :----------------------------------------------------------- |
| types      | array_string | 否       | ["text/html"] |        | 需要压缩的响应content-type类型列表，不填则 匹配任何 MIME 类型， 不填则为所有 |
| min_length | int          | 否       | 1             | 1      | 待压缩内容的最小长度                                         |
| vary       | bool         | 否       | false         | false  | 是否加上Vary: Accept-Encoding响应头部                        |

#### 配置示例

```sh
{
    "type":["text/html"],
    "min_length":10,
    "vary":true
}
```



#### Open API请求配置示例

##### 全局配置

```shell
curl -X POST  'http://127.0.0.1:9400/api/setting/plugin' \
-H 'Content-Type:application/json' \
-d '{
    "plugins":[{
        "id":"eolinker.com:apinto:gzip",
        "name":"my_gzip",
        "status":"enable"
    }]
}'
```

在使用流量控制插件之前，需要在全局插件配置中将name为rate_limiting的插件状态设置为enable，具体配置点此[跳转](/docs/apinto/plugins)

##### 配置带有gzip压缩插件的服务

**备注**：匿名服务配置的是apinto官方示例接口，将返回请求的相关信息。

```sh
curl -X POST  'http://127.0.0.1:9400/api/service' -H 'Content-Type:application/json' \
-d '{
  "name": "gzip_service",
  "driver": "http",
  "timeout": 3000,
  "retry": 3,
  "desc": "使用gzip插件",
  "scheme": "https",
  "nodes": ["demo.apinto.com:8280"],
  "balance": "round-robin",
  "plugins": {
    "gzip": {
    "disable": false,
    "config": {
      "min_length": 10,
      "vary": true
	  }
    }
  }
}' 
```

```
成功创建id为gzip_service@service的服务
```

##### 绑定路由

将上一步生成的服务id绑定至路由的target字段

```sh
curl -X POST 'http://127.0.0.1:9400/api/router' -H 'Content-Type:application/json' \
-d '{
  "name": "gzip_router",
  "driver": "http",
  "description": "该路由的目标服务使用了gzip插件",
  "listen": 8099,
  "rules": [{
    "location": "/demo/gzip"
  }],
  "target": "gzip_service@service"
}'
```

##### 接口请求示例

```sh
curl -X POST -H 'Content-Type:application/json' -H 'Accept-Encoding: gzip, deflate, br' 'http://127.0.0.1:8099/demo/gzip'
```

##### 接口访问返回示例

压缩前反馈

```sh
HTTP/1.1 200 OK
Content-Length: 326
```

压缩后反馈

```sh
HTTP/1.1 200 OK
Content-Length: 258
Content-Encoding: gzip
Vary: Accept-Encoding
```
