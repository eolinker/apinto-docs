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

### 插件配置参数


| 参数名        | 值类型       | 是否必填 | 值可能性                  | 默认值 | 说明               |
| ------------- | ------------ | -------- | ------------------------- | ------ | ------------------ |
| ip_list_type  | string       | 是       | ["white","black"]         |        | IP名单类型         |
| ip_white_list | array_string | 是       | ["127.0.0.1","127.1.1.1"] |        | IP白名单列表       |
| ip_black_list | array_string | 是       | ["127.0.0.1","127.1.1.1"] |        | IP黑名单列表       |
| response_type | string       | 是       | ["text","json"]           |        | 插件返回报错的类型 |


### 全局开启IP黑白名单插件

![](http://data.eolinker.com/course/kP26Shh00ec1c553cf66097b07c41a3deccdc131fc7a4d3.gif)

### 配置带有IP黑白名单插件的服务

以开启白名单为例。

![](http://data.eolinker.com/course/8FKRTG2cc2a4e556e6673901204ecf3058533b7340694eb.gif)

