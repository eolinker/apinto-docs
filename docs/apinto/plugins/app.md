# 应用

## 插件名称

| 名称  | 字段 | 属性   |
|-----| ---- |------|
| 应用  | app | 用户筛选 |

## 功能描述

该插件结合应用模块使用，此处插件用于配置应用模块的作用范围，包括：开启（enable）、关闭（disable）、全局生效（global）。

。

## Open Api

### 全局插件加入鉴权插件配置

#### 设置状态为**enable**

```sh
curl -X POST 'http://127.0.0.1:9400/api/setting/plugin' -H 'Content-Type:application/json' \
-d '{
  "plugins": [{
    "id": "eolinker.com:apinto:plugin_app",
    "name": "my_app",
    "status": "enable"
  }]
}'
```
当插件启用状态为 **enable** 时，应用模块的配置仅在添加了该插件的实例（路由、插件模版）中生效

#### 设置状态为**global**

```sh
curl -X POST 'http://127.0.0.1:9400/api/setting/plugin' -H 'Content-Type:application/json' \
-d '{
  "plugins": [{
    "id": "eolinker.com:apinto:plugin_app",
    "name": "my_app",
    "status": "global"
  }]
}'
```
