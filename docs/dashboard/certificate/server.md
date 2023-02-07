# 服务端证书

## 功能描述
用于客户端与网关间的SSL/TLS加密通信，仅支持域名证书，该功能在v0.9.0及后续版本中支持。

## 配置前准备
配置文件网关监听地址部分需要设置https协议监听，示例如下：
```yaml
version: 2
...
gateway:
  listen_urls:
  - https://0.0.0.0:8099
  - http://0.0.0.0:8099
...
```

## 配置示例
1、进入证书管理页面，点击 "创建" 按钮

![](http://data.eolinker.com/course/6QBuXDt27c89c640f4e73958269e41768f45bf254ddd218.gif)

2、填写服务端证书配置信息

![](http://data.eolinker.com/course/zjsgHdy7033bc49ba403983238ad17641eb1f44b371c8ac.png)

![](http://data.eolinker.com/course/hfzUzyAe7c8c883c9d1061a94444bb6f51874fbec26c955.png)

字段描述说明

| 字段        | 说明                                                                                   |
|-----------|--------------------------------------------------------------------------------------|
| 密钥内容      | 密钥文件信息，密钥文件的后缀名一般为.key                                                               |
| 证书内容      | 证书文件信息，证书文件的后缀名一般为.crt 或 .pem                                                        |
|