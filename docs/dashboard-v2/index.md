# Apinto Dashboard

<div class="[&>p]-flex [&>p]-gap-2">

[![Go Report Card](https://goreportcard.com/badge/github.com/eolinker/apinto-dashboard)](https://goreportcard.com/report/github.com/eolinker/apinto-dashboard) [![Releases](https://img.shields.io/github/release/eolinker/apinto-dashboard/all.svg?style=flat-square)](https://github.com/eolinker/apinto-dashboard/releases) [![LICENSE](https://img.shields.io/github/license/eolinker/Apinto-dashboard.svg?style=flat-square)](https://github.com/eolinker/apinto-dashboard/blob/main/LICENSE) ![](https://shields.io/github/downloads/eolinker/apinto-dashboard/total) ![Star](https://img.shields.io/github/stars/eolinker/apinto-dashboard)

</div>

* **Apinto Dashboard**项目**main**分支与**Apinto**项目**main**分支同步更新

* 当前**Apinto Dashboard**最新版本为**v1.2.1-beta**，**Apinto**要求版本不低于**v0.11.x**

注意：main分支为开发主要分支，频繁更新可能导致使用不稳定，若需要使用稳定版本，请查看[release](https://github.com/eolinker/apinto-dashboard/releases)

**Apinto Dashboard**需要搭配**Apinto**使用，若未部署**Apinto**，请点击[Apinto部署教程](/docs/apinto/quick/arrange)


## 什么是Apinto Dashboard
Apinto Dashboard 是基于开源网关 Apinto并符合企业级API网关需求场景的可视化控制台项目。 通过Dashboard 可以管理集群、上游、应用以及API等模块，并以集群维度管理各个模块的生命周期。
* 具有优秀的用户操作体验，配置流程简短，上手难度低。
* 内置了丰富的插件，用户可根据业务需求动态灵活地配置策略。

Apinto Dashboard与Apinto交互流程如下图所示：

![](http://data.eolinker.com/course/v3yCfe42a214660debc1f01d54e19b12fe088b1247a4859.png)



## 特性
- 支持集群管理，引入环境变量，一次性配置（上游服务、API、应用）发布到不同集群生效
- 支持作为调用API主体的应用多种类型认证鉴权
- 支持路径、请求方式、请求头、请求参数等方式的动态路由
- 支持单条件或多条件（上游、应用、API、请求方式、路径、IP等）组合筛选流量，执行多维度限流、熔断、灰度、访问、缓存等规则策略
- 支持HTTP/HTTPS、WebSocket协议转发，计划支持gRPC、Dubbo2
- 即将推出扩展企业插件模块，并且将会提供业务型企业插件如：用户角色权限、监控告警、日志、API文档、开放平台、安全防护、数据分析、调用链、mock、在线调测、安全测试、国密、多协议等。 

## 功能架构

![](http://data.eolinker.com/course/Bs8aPeWb5689ed409aea6d56216c489b01580a98a297e94.png)
* 集群管理：管理各个环境的集群，给集群配置证书、配置并发布该集群下的环境变量、监控并管理集群下各个网关节点、配置管理等。
* 上游服务：上游管理和服务发现。服务发现支持Consul、Eureka、Nacos注册中心；上游管理是管理所有提供API调用的后端系统，都需要上线到指定的集群才生效；
* API管理：支持业务域分组，管理所有后端系统提供的API及其生命周期，根据业务上下线到相应的集群。
* 应用管理：管理所有调用方，配置请求网关的鉴权，以及支持转发后端的额外参数鉴权，上下线到指定集群生效。
* 服务治理：针对不同集群配置并上线限流、访问、熔断、灰度、缓存等策略，保障网关集群以及后端系统稳定工作。
* 网关插件：管理Apinto插件，Apinto内置几十个插件，同时支持自定义添加插件。
* 企业插件：即将提供并支持自定义业务型企业插件，供用户安装使用，业务型插件如：用户角色、监控告警、日志、API文档、开放平台、安全防护、数据分析、调用链、Mock、在线调测、安全测试、国密、多协议……
* 系统管理：配置邮箱，配置告警模板等。

## 联系我们
- **帮助文档**：[https://help.apinto.com](https://help.apinto.com/docs)

- **Github**：
    - [Apinto](https://github.com/eolinker/apinto)
    - [Apinto Dashboard](https://github.com/eolinker/apinto-dashboard)

- **QQ群**: 725853895

- **Slack**：[加入我们](https://join.slack.com/t/slack-zer6755/shared_invite/zt-u7wzqp1u-aNA0XK9Bdb3kOpN03jRmYQ)

- **官网**：[https://www.apinto.com](https://www.apinto.com/)

- **论坛**：[https://community.apinto.com](https://community.apinto.com/)

- **微信群**：[![img](https://user-images.githubusercontent.com/25589530/149860447-5879437b-3cda-4833-aee3-69a2e538e85d.png)](https://user-images.githubusercontent.com/25589530/149860447-5879437b-3cda-4833-aee3-69a2e538e85d.png)
