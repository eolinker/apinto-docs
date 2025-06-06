# 部署
由于**Apinto Dashboard**是**Apinto**的可视化UI项目，因此在部署该项目前，需要确保**Apinto**项目已经部署完成。

若未部署**Apinto**，请参考教程[Apinto快速部署](/docs/apinto/quick/arrange)

## 安装包部署

1. 下载并解压安装包

```
wget https://github.com/eolinker/apinto-dashboard/releases/download/v1.2.1-beta/apinto-dashboard_v1.2.1-beta_linux_amd64.tar.gz && tar -zxvf apinto-dashboard_v1.2.1-beta_linux_amd64.tar.gz && cd apinto-dashboard
```

Apinto-Dashboard支持在arm64、i386、amd64架构上运行。

请根据需要下载对应架构及系统的安装包，安装包下载请[点击](https://github.com/eolinker/apinto-dashboard/releases)跳转

2. 编辑配置文件config.yml

```yaml
zone: zh_cn # 时区，根据时区获取当地语言的前端渲染页面，可选项：zh_cn｜ja_jp｜ en_us，当前版本仅支持zh_cn
default: upstream
apinto:		# Apinto openAPI地址列表，若有多个节点，可填写多个节点的openAPI地址
  - "http://127.0.0.1:9400"
port: 8081    # dashboard监听端口
user_details:	# 用户账号获取渠道
  type: file	# 文件，当前版本只支持读取文件
  file: ./account.yml	# 文件名称
professions:    # 流程阶段，下面配置中的name和profession为dashboard在apinto的映射名称，下述配置内容将会在dashboard导航栏中展现
  - name: services    # dashboard模块：服务
    profession: service # apinto模块：服务
    i18n_name:    # 国际化语言名称
      zh_cn: 上游服务   # 中文描述
      en_us: upstream services  # 英文描述
  - name: discoveries    # dashboard模块：服务发现
    profession: discovery    # apinto模块：服务发现
    i18n_name:
      zh_cn: 服务发现
      en_us: discoveries
  - name: auths        # dashboard模块：鉴权
    profession: auth    # apinto模块：鉴权
    i18n_name:
      zh_cn: 鉴权
      en_us: auths
  - name: outputs        # dashboard模块：输出器
    profession: output    # apinto模块：输出器
    i18n_name:
      zh_cn: 输出
      en_us: outputs
```

用户账号、密码默认均为**admin**。如若需要修改账号密码信息，可编辑**account.yml**文件，语法遵从**yaml**语法，配置详细说明如下：

```yaml
account_list: # 账号列表
- user_name: admin	# 账号
  password: admin		# 密码
  info:							# 基本信息
    desc: admin用户		# 描述
```

3. 启动程序

（1） 在当前窗口运行，该方式启动的程序，当窗口关闭，进程也会关闭

```
./apinto-dashboard
```

（2）在后台运行

```
nohup ./apinto-dashboard > logs/stdout_apinto-dashboard_"$(date '+%Y%m%d-%H%M%S')".log 2>&1 &
```

## Docker部署

### 可挂载目录
容器有两个可挂载文件和一个可挂载目录：
- /apinto-dashboard/config.yml:  dashboard配置文件
```yaml
zone: zh_cn
default: monitor
apinto:
  - "http://xxxx"  // 此处根据实际情况填写apinto的admin地址
port: 8081
filter_forwarded: false
user_details:
  type: file
  file: ./account.yml
professions:
  - name: services
    profession: service
    i18n_name:
      zh_cn: 上游服务
      en_us: upstream services
  - name: templates
    profession: template
    i18n_name:
      zh_cn: 模版
      en_us: template
  - name: discoveries
    profession: discovery
    i18n_name:
      zh_cn: 服务发现
      en_us: discoveries
  - name: outputs
    profession: output
    i18n_name:
      zh_cn: 输出
      en_us: outputs
  - name: certificates
    profession: certificate
    i18n_name:
      zh_cn: 证书
      en_us: certificates
  - name: transcode
    profession: transcode
    i18n_name:
      zh_cn: 编码器
      en_us: transcode
```

- /apinto-dashboard/account.yml:  账户信息配置
```yaml
#该文件默认配置
account_list:
- user_name: admin
  password: admin
  info:
    desc: admin用户
```
- /apinto-dashboard/data:
```shell
#该目录下存放操作日志的sqlite数据库文件
activity-log.db
```

注意：
- `/apinto-dashboard/config.yml`：该配置文件必须挂载。需要手动修改配置文件，更改指定的apinto地址，接着再挂载到容器内相应的配置文件。不然，即便dashboard容器能成功启动，也无法从apinto获取信息。
- `/apinto-dashboard/account.yml` 和 `/apinto-dashboard/data` 可以不挂载。
### 容器运行示例
#### 全部挂载示例
```shell
docker run -td  -p 8081:8081 \
-v /data/apinto-dashboard/config.yml:/apinto-dashboard/config.yml \
-v /data/apinto-dashboard/account.yml:/apinto-dashboard/account.yml \
-v /data/apinto-dashboard/data/:/apinto-dashboard/data/ \
--name=apinto_dashboard  eolinker/apinto-dashboard:1.2.1-beta
```
  
  最快可运行示例
```shell
docker run -td  -p 8081:8081 \
-v /data/apinto-dashboard/config.yml:/apinto-dashboard/config.yml \
--name=apinto_dashboard  eolinker/apinto-dashboard:1.2.1-beta
```

## 浏览器访问
浏览器打开**Apinto Dashboard**地址，本示例在本地部署，因此ip为127.0.0.1，端口为8081

![image-20220616181447371](https://user-images.githubusercontent.com/14105999/174442723-1fe42ac5-012c-4f60-b1ec-e147d8d8ca9b.png)

在浏览器中输入账号密码登录即可

![](http://data.eolinker.com/course/dZGltwI35d227dc2c5682824cedf40629ef3ea8114d6a37.gif)

至此，部署启用教程已结束，如需了解更多使用教程，请点击[更多](https://help.apinto.com/docs/dashboard)
