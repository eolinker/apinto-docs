# dubbo2协议转发重写

### 插件信息

| 名称       | 字段                      | 属性     |
| ---------- |-------------------------| -------- |
| dubbo2协议转发重写 | dubbo2-proxy-rewrite | 参数处理 |

### 功能描述

该插件是dubbo2转发重写插件，用于对上游代理信息进行重写，支持对`service`、`method` 的重写，同时支持对转发请求的attachment的键值进行新增,修改或者删除。


#### 配置示例

**示例说明**：将转发请求的服务名 `/oldUserService`替换成`/newUserService`,若替换失败则转发失败返回报错。

```json
{
  "service": "newUserService"
}
```

#### 配置参数说明

| 参数名     | 说明                   | 是否必填 | 默认值 | 值可能性              |
|---------|----------------------| -------- | ----- |-------------------|
| service | 服务名                  | 否       |  | string            |
| method  | 方法名                  | 否       |       | string            |
| headers | 能对转发请求的attachment值进行新增,修改或删除 | 否       |       | map[string]object |


### 使用方法
1. 全局插件创建dubbo2-proxy-rewrite插件
   
   ![](http://data.eolinker.com/course/wWlVkQx67b176063e90150b309f9ddfecbeac1583466ab8.png)

2. 创建dubbo2路由时添加该插件
   ![](http://data.eolinker.com/course/CzSh1df94e1dcbc9acb7d7ca95d89160bc849fdd518b066.png)
