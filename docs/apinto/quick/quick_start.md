# 启动

## 运行参数说明
* ip：程序监听IP，默认0.0.0.0

* port：程序监听端口，默认9400

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
