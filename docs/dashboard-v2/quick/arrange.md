# 安装部署

### 安装包部署

> 依赖程序：
>
> * Mysql 5.7.x及其以上版本
> * Redis 6.2.7
>
> 注意：Redis需要使用集群模式的节点

1、下载最新版本`apinto-dashboard`

以`apinto-dashboard v2.0.1`版本示例

```
wget https://github.com/eolinker/apinto-dashboard/releases/download/v2.0.1/apserver_v2.0.1_linux_amd64.tar.gz
```

安装包支持Linux、Darwin系统，AMD64、ARM64架构，使用者可以按需到[Release页面](https://github.com/eolinker/apinto-dashboard/releases/tag)进行下载。

2、解压安装包，并进入对应目录

```
tar -zxvf apserver_v2.0.1_linux_amd64.tar.gz && cd apserver_v2.0.1
```

3、安装程序

```
./install.sh
```

执行过程中，我们可以选择安装的目录，若无需更改，输入`y`即可

![](http://data.eolinker.com/course/d6WQ1Kka72b01f32dd0fb930264706eed96a11631b197d7.png)

4、编辑配置文件`config.yml`

```
port: 服务监听的端口号
mysql:
  user_name: "数据库用户名"
  password: "数据库密码"
  ip: "数据库IP地址"
  port: 端口号
  db: "数据库DB"
error_log:
  dir: work/logs               # 日志放置目录, 仅支持绝对路径, 不填则默认为执行程序上一层目录的work/logs. 若填写的值不为绝对路径，则以上一层目录为相对路径的根目录，比如填写 work/test/logs， 则目录为可执行程序所在目录的 ../work/test/logs
  file_name: error.log         # 错误日志文件名
  log_level: warning            # 错误日志等级,可选:panic,fatal,error,warning,info,debug,trace 不填或者非法则为info
  log_expire: 7d                # 错误日志过期时间，默认单位为天，d|天，h|小时, 不合法配置默认为7d
  log_period: day               # 错误日志切割周期，仅支持day、hour
redis:
  user_name: "redis集群密码"
  password: "redis集群密码"
  addr:
   - 192.168.128.198:7201
   - 192.168.128.198:7202
```

示例配置

```
port: 18080
mysql:
  user_name: "root"
  password: "123456"
  ip: "127.0.0.1"
  port: 33306
  db: "apinto"
error_log:
  dir: work/logs               # 日志放置目录, 仅支持绝对路径, 不填则默认为执行程序上一层目录的work/logs. 若填写的值不为绝对路径，则以>上一层目录为相对路径的根目录，比如填写 work/test/logs， 则目录为可执行程序所在目录的 ../work/test/logs
  file_name: error.log         # 错误日志文件名
  log_level: warning            # 错误日志等级,可选:panic,fatal,error,warning,info,debug,trace 不填或者非法则为info
  log_expire: 7d                # 错误日志过期时间，默认单位为天，d|天，h|小时, 不合法配置默认为7d
  log_period: day               # 错误日志切割周期，仅支持day、hour
redis:
  user_name: ""
  password: "123456"
  addr:
   - 172.100.0.1:7201
   - 172.100.0.1:7202
```

5、启动控制台

```
./run.sh start
```

### Docker部署

1、新建docker网段

```shell
docker network create --driver bridge --subnet=172.100.0.0/24 --gateway=172.100.0.1 apinto
```

2、安装`Mysql`

```shell
docker run -dt --name apinto_mysql -p {PORT}:3306 \
-v /var/lib/apinto/mysql:/var/lib/mysql \
--network=apinto --privileged=true --restart=always \
-e MYSQL_ROOT_PASSWORD={PASSWORD} -e MYSQL_DATABASE=apinto \
mysql:5.7.21
```

上述命令中，使用`{}`包裹的为可修改变量，变量说明如下

* PORT：宿主机映射端口号
* PASSWORD：Mysql数据库root用户的密码

示例命令：

```shell
docker run -dt --name apinto_mysql -p 33306:3306 \
-v /var/lib/apinto/mysql:/var/lib/mysql \
--network=apinto --privileged=true \
-e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=apinto \
mysql:5.7.21
```

3、安装`Redis`

```shell
docker run -dt --name redis_cluster --restart=always \
-v /var/lib/apinto/redis-cluster/data:/usr/local/cluster_redis/data \
-e REDIS_PWD={PASSWORD} -e HOST={HOST} -e PORT=7201 \
--net=host eolinker/cluster-redis:6.2.7
```

上述命令中，使用`{}`包裹的为可修改变量，变量说明如下

* PASSWORD：Redis数据库密码
* HOST：Redis广播IP，可设置宿主机的局域网IP/外网IP，建议此处设置宿主机的局域网IP。

查看宿主机IP方法如下：

```Shell
ip route
```

执行后得到下列IP列表，从下表可以看到，宿主机默认局域网`ip`是`172.18.31.253`

![](http://data.eolinker.com/course/RaGBZly2702d3bae33e4b66eed674ce65d0e4b0dbf27ab0.png)

示例命令：

```shell
docker run -dt --name redis_cluster --restart=always \
-v /var/lib/apinto/redis-cluster/data:/usr/local/cluster_redis/data \
-e REDIS_PWD=123456 -e HOST=172.18.31.253 -e PORT=7201 \
--net=host eolinker/cluster-redis:6.2.7
```

4、安装`Apinto-Dashboard`

```shell
docker run -dt --name apinto-dashboard --restart=always \
-p 18080:8080 -v /var/log/apinto/apinto-dashboard/work:/apinto-dashboard/work \
--network=apinto --privileged=true \
-e MYSQL_USER_NAME=root -e MYSQL_IP=apinto_mysql \
-e MYSQL_PWD={MYSQL_PWD} -e MYSQL_PORT=3306 -e MYSQL_DB=apinto \
-e REDIS_ADDR=172.100.0.1:7201,172.100.0.1:7202,172.100.0.1:7203 \
-e REDIS_PWD={REDIS_PWD} eolinker/apinto-dashboard
```

上述配置中，使用 "{}" 包裹的均为变量，相关变量说明如下：

- MYSQL_PWD：Mysql数据库root用户的密码
- REDIS_PWD：Redis数据库密码

示例命令：

```shell
docker run -dt --name apinto-dashboard --restart=always \
-p 18080:8080 -v /var/log/apinto/apinto-dashboard/work:/apinto-dashboard/work \
--network=apinto --privileged=true \
-e MYSQL_USER_NAME=root -e MYSQL_IP=apinto_mysql \
-e MYSQL_PWD=123456 -e MYSQL_PORT=3306 -e MYSQL_DB=apinto \
-e REDIS_ADDR=172.100.0.1:7201,172.100.0.1:7202,172.100.0.1:7203 \
-e REDIS_PWD=123456 eolinker/apinto-dashboard
```



### Docker-Compose一键化部署

使用该方式部署，会将Mysql、Redis也一并安装启动。

1、编辑`docker-compose.yml`文件

```Shell
vi docker-compose.yml
```

2、修改文件配置

```Shell
version: '3'
services:
  mysql:
    image: mysql:5.7.21
    privileged: true
    restart: always
    container_name: apinto_mysql
    hostname: apinto_mysql
    ports:
      - "33306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD={MYSQL_PWD}
      - MYSQL_DATABASE=apinto
    volumes:
      - /var/lib/apinto/mysql:/var/lib/mysql
    networks:
      - apinto
  apinto-dashboard:
    image: eolinker/apinto-dashboard
    container_name: apinto-dashboard
    privileged: true
    restart: always
    networks:
      - apinto
    ports:
      - "18080:8080"
    depends_on:
      - mysql
      - redis_cluster
    environment:
      - MYSQL_USER_NAME=root
      - MYSQL_PWD={MYSQL_PWD}
      - MYSQL_IP=apinto_mysql
      - MYSQL_PORT=3306                 #mysql端口
      - MYSQL_DB="apinto"
      - ERROR_DIR=/apinto-dashboard/work/logs  # 日志放置目录
      - ERROR_FILE_NAME=error.log          # 错误日志文件名
      - ERROR_LOG_LEVEL=info               # 错误日志等级,可选:panic,fatal,error,warning,info,debug,trace 不填或者非法则为info
      - ERROR_EXPIRE=7d                    # 错误日志过期时间，默认单位为天，d|天，h|小时, 不合法配置默认为7d
      - ERROR_PERIOD=day                  # 错误日志切割周期，仅支持day、hour
      - REDIS_ADDR=172.100.0.1:7201,172.100.0.1:7202,172.100.0.1:7203,172.100.0.1:7204,172.100.0.1:7205,172.100.0.1:7206 #Redis集群地址 多个用,隔开
      - REDIS_PWD={REDIS_PWD}                         # Redis密码
    volumes:
      - /var/log/apinto/apinto-dashboard/work:/apinto-dashboard/work   #挂载log到主机目录
  redis_cluster:
    container_name: redis_cluster
    image: eolinker/cluster-redis:6.2.7
    hostname: redis_cluster
    privileged: true
    restart: always
    environment:
      - REDIS_PWD={REDIS_PWD}
      - PORT=7201
      - HOST={HOST}
    volumes: 
      - /var/lib/apinto/redis-cluster/data:/usr/local/cluster_redis/data
    network_mode: host
networks:
  apinto:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.100.0.0/24
```

上述配置中，使用 "{}" 包裹的均为变量，相关变量说明如下：

- MYSQL_PWD：mysql数据库root用户初始化密码
- REDIS_PWD：redis密码
- HOST：Redis广播IP，可设置宿主机的局域网IP/外网IP，建议此处设置宿主机的局域网IP。

查看宿主机IP方法如下：

```Shell
ip route
```

执行后得到下列IP列表，从下表可以看到，宿主机默认局域网`ip`是`172.18.31.253`

![](http://data.eolinker.com/course/RaGBZly2702d3bae33e4b66eed674ce65d0e4b0dbf27ab0.png)

替换后配置示例如下：

```Shell
version: '3'
services:
  mysql:
    image: mysql:5.7.21
    privileged: true
    restart: always
    container_name: apinto_mysql
    hostname: apinto_mysql
    ports:
      - "33306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_DATABASE=apinto
    volumes:
      - /var/lib/apinto/mysql:/var/lib/mysql
    networks:
      - apinto
  apinto-dashboard:
    image: eolinker/apinto-dashboard
    container_name: apinto-dashboard
    privileged: true
    restart: always
    networks:
      - apinto
    ports:
      - "18080:8080"
    depends_on:
      - mysql
      - redis_cluster
    environment:
      - MYSQL_USER_NAME=root
      - MYSQL_PWD=123456
      - MYSQL_IP=apinto_mysql
      - MYSQL_PORT=3306                 #mysql端口
      - MYSQL_DB="apinto"
      - ERROR_DIR=/apinto-dashboard/work/logs  # 日志放置目录
      - ERROR_FILE_NAME=error.log          # 错误日志文件名
      - ERROR_LOG_LEVEL=info               # 错误日志等级,可选:panic,fatal,error,warning,info,debug,trace 不填或者非法则为info
      - ERROR_EXPIRE=7d                    # 错误日志过期时间，默认单位为天，d|天，h|小时, 不合法配置默认为7d
      - ERROR_PERIOD=day                  # 错误日志切割周期，仅支持day、hour
      - REDIS_ADDR=172.100.0.1:7201,172.100.0.1:7202,172.100.0.1:7203,172.100.0.1:7204,172.100.0.1:7205,172.100.0.1:7206 #Redis集群地址 多个用,隔开
      - REDIS_PWD=123456                         # Redis密码
    volumes:
      - /var/log/apinto/apinto-dashboard/work:/apinto-dashboard/work   #挂载log到主机目录
  redis_cluster:
    container_name: redis_cluster
    image: eolinker/cluster-redis:6.2.7
    hostname: redis_cluster
    privileged: true
    restart: always
    environment:
      - REDIS_PWD=123456
      - PORT=7201
      - HOST=172.18.31.253
    volumes: 
      - /var/lib/apinto/redis-cluster/data:/usr/local/cluster_redis/data
    network_mode: host
networks:
  apinto:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.100.0.0/24
```

3、启动程序

在`docker-compose.yml`文件所在目录下执行下列命令，即可一键完成部署。

```Shell
docker-compose up -d
```

部署完成结果如下图

![](http://data.eolinker.com/course/gqrr8iz6b7b95319074a48041548c59f786a853804b9e6b.png)

## 浏览器访问

在浏览器输入地址：http://{ip或域名}:{端口号}，访问控制台页面

![](http://data.eolinker.com/course/cvYVZfEe75da267b31d873df0fdb7bf00e14f63b41bed9d.png)