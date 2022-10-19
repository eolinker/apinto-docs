# 应用

## 模块说明

  * 应用是对请求来源的抽象概念，其可以是一个客户端App，也可以是一个后端服务，还可以是Web App......
  * 请求达到网关时，会先进行鉴权检验，鉴权通过后，将匹配唯一应用，并进行应用设置的规定行为，包括但不限于流量限制、数据修饰（额外参数、格式转换等）、访问控制等。
  * 该模块需要配合全局插件 **eolinker.com:apinto:plugin_app** 使用，插件配置请参考[应用插件](/docs/apinto/plugins/app.md)

## 配置说明
| 字段         | 类型                         | 说明                                                      |
|------------|----------------------------|---------------------------------------------------------|
| 鉴权配置       | object数组                   | 鉴权配置，详细配置请阅读[鉴权文档](/docs/apinto/app/auth.md)            | 
| additional | object数组                   | 额外参数配置，详细配置请阅读[额外参数文档](/docs/apinto/app/extra-param.md) | 
| 是否禁用       | bool                       | 是否禁用该应用                                                 |
| 应用标签       | object (map[string]string) | 应用标签                                                    |
| 描述         | string                     | 应用描述                                                    |

## 配置流程：
### 1、新增全局应用插件（eolinker.com:apinto:plugin_app）

![](http://data.eolinker.com/course/GEdBatIf0fdaf866ad4eacfeae1aad535390f9140f4a21f.png)
### 2、创建应用，配置应用鉴权及额外参数信息

![](http://data.eolinker.com/course/mARLezm0c9fea8f2d5be72413454ae4ab57ff2bd1757abe.png)

如果全局应用插件的状态为`enable`时，则需要在路由、插件模版绑定应用插件，应用功能才可生效