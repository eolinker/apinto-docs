# Dubbo2协议转发重写

### 插件信息

| 名称       | 字段                      | 属性     |
| ---------- |-------------------------| -------- |
| dubbo2协议转发重写 | dubbo2-proxy-rewrite | 参数处理 |

### 功能描述

该插件是dubbo2转发重写插件，用于对上游代理信息进行重写，支持对`service`、`method` 的重写，同时支持对转发请求的attachment的键值进行新增,修改或者删除。

### Open Api

#### 配置示例

**示例说明**：将转发请求的服务名 `/oldUserService`替换成`/newUserService`,若替换失败则转发失败返回报错。

```json
{
  "service": "newUserService"
}
```

#### 配置参数说明

| 参数名     | 值类型  | 是否必填 | 值可能性              | 默认值 | 说明                   |
|:--------| :------- |:------------------| :---- |:---------------------|:---------------------|
| service | string | 否       | api.Server |  | 服务名                  |
| method  | string | 否       | getUser |       | 方法名                  |
| headers | object | 否       | {"app_name":"apinto"} |       | 能对转发请求的attachment值进行新增,修改或删除 |

