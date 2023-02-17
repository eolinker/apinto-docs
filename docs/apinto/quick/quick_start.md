# 启动

## 运行参数配置
```shell
version: 2
#certificate: # 证书存放根目录
#  dir: /etc/apinto/cert
client:
  #advertise_urls: # open api 服务的广播地址
  #- http://127.0.0.1:9400
  listen_urls: # open api 服务的监听地址
  - http://0.0.0.0:9400
  #certificate:  # 证书配置，允许使用ip的自签证书
  #  - cert: server.pem
  #    key: server.key
gateway:
	#advertise_urls: # 转发服务的广播地址
   #- http://127.0.0.1:9400
  listen_urls: # 转发服务的监听地址
  - https://0.0.0.0:8099 # 开启ssl监听，证书模块配置的证书信息将会在此生效
  - http://0.0.0.0:8099
  - tcp://0.0.0.0:8099
peer: # 集群间节点通信配置信息
  listen_urls: # 节点监听地址
  - http://0.0.0.0:9401
  #advertise_urls: # 节点通信广播地址
    #- http://127.0.0.1:9400
  #certificate:  # 证书配置，允许使用ip的自签证书
	#  - cert: server.pem
	#    key: server.key


```

## 配置路由监听端口

```shell
cp config.yml.tmp config.yml && vi config.yml
```

复制配置文件模板，修改配置文件监听端口。路由监听端口默认为8099，可配置多个。

## 启动程序

```shell
./apinto start
```

非debug模式下启动程序是后台运行apinto程序

## DEBUG模式启动程序

```shell
export APINTO_DEBUG=true
./apinto start
```

debug模式下启动程序是在前台运行apinto程序
