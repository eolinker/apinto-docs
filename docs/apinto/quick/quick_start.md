# 启动

## 程序配置说明

> 文件名：apinto.yml
> 存放路径：/etc/apinto/
> 作用：apinto运行配置文件，配置日志输出目录等相关信息

示例配置：
```
# 数据文件放置目录
data_dir: /var/lib/apinto

# pid文件放置地址
pid_dir: /var/run/apinto/

# 日志放置目录
log_dir: /var/log/apinto

# socket放置目录
socket_dir: /tmp/apinto

# apinto运行配置地址
config: config.yml

# 扩展仓库目录
extends_dir: /var/lib/apinto/extenders/

# 错误日志文件名
error_log_name:  error.log

# 错误日志等级
error_log_level: error

# 错误日志过期时间，默认单位为天，d|天，h|小时
error_log_expire: 7d

# 错误日志切割周期，仅支持day、hour
error_log_period: day
```

> 文件名：config.yml
> 存放路径：/etc/apinto/
> 作用：指定节点的路由监听端口，ssl证书等信息

程序启动前需要配置与程序相同目录下的文件`config.yml`,用于指定节点的路由监听端口，ssl证书等信息。

```yaml
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
    - https://0.0.0.0:8099
    - http://0.0.0.0:8099
peer: # 集群间节点通信配置信息
  listen_urls: # 节点监听地址
    - http://0.0.0.0:9401
  #advertise_urls: # 节点通信广播地址
  # - http://127.0.0.1:9400
  #certificate:  # 证书配置，允许使用ip的自签证书
  #  - cert: server.pem
  #    key: server.key

```

## 安装程序
```shell
./install.sh install
```

## 启动程序
```shell
apinto start
```

非debug模式下启动程序是后台运行apinto程序

## DEBUG模式启动程序

```shell
export APINTO_DEBUG=true
./apinto start
```

debug模式下启动程序是在前台运行apinto程序
