# 常见问题

## 为什么APINTO没有启动成功？

APINTO启动失败可能是以下原因：

* config.yml配置文件不存在
* config.yml配置的监听端口已经被占用
* 初始化配置文件夹时权限不足

若非上述原因，可以开启DEBUG模式来进行下一步排查。

备注：`config.yml`的读取路径可以由[系统配置文件](https://help.apinto.com/docs/apinto/system/)`apinto.yml`决定。若不存在`apinto.yml`，则`config.yml`默认读取路径是当前目录。

## 命令行配置太麻烦，APINTO 是否有控制台界面？

目前已发布并开源了[APINTO Dashboard](https://github.com/eolinker/apinto-dashboard)，并且是一个独立的项目。能够通过ui界面轻松修改APINTO配置，告别繁琐复杂的Curl命令。控制台教程[点此](https://help.apinto.com/docs/dashboard/)进行跳转。

## APINTO如何进入DEBUG模式？

APINTO若要以DEBUG模式启动，需要设置环境变量。

```shell
export APINTO_DEBUG=true
```

设置完环境变量后，再启动，这时APINTO将会以前台的方式运行，debug等信息会直接输出到前台命令行和系统日志文件。

## 程序运行中报错了，要如何查看报错日志？

程序运行时的报错将会被记录在系统日志文件中，系统日志文件默认路径是`/var/log/apinto/error.log`。当然，也可以通过修改[系统配置文件](https://help.apinto.com/docs/apinto/system/)`apinto.yml`来改变日志文件的路径或者日志等级。

## 为什么我配置了路由和服务，访问会失败？

请求经过APINTO转发时host是透传的，这时需要使用转发重写插件来进行改写转发请求头内的host。

另外需要注意，请求url的path也是透传的，若要改写转发请求的path，也需要使用[转发重写插件](https://help.apinto.com/docs/apinto/plugins/proxy_rewrite.html#%E6%8F%92%E4%BB%B6%E4%BF%A1%E6%81%AF)。

## 如果在使用 APINTO过程中遇到问题，我可以在哪里寻求更多帮助？

- **QQ群**: 725853895
- **Slack**：[加入我们](https://join.slack.com/t/slack-zer6755/shared_invite/zt-u7wzqp1u-aNA0XK9Bdb3kOpN03jRmYQ)
- **论坛**：[https://community.apinto.com](https://community.apinto.com/)
- **微信群**：<img src="http://data.eolinker.com/course/2HdT4zd10b670318462bec90f0f390bef896c21cad66172.png" style="width:150px" />
