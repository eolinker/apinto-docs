# gRPC请求转发重写

### 插件信息

| 名称         | 字段                 | 属性     |
|------------|--------------------| -------- |
| gRPC请求转发重写 | grpc-proxy_rewrite | 参数处理 |

### 功能描述

该插件是gRPC请求转发重写插件，用于对上游代理信息进行重写。支持以下内容的修改及重写
* 重写转发的服务名
* 重写转发的方法名
* 重写虚拟主机域名（`:authority`）
* 对转发的请求头部进行新增、修改

### Open Api

#### 配置示例

**示例说明**：将转发请求的方法名 `Hello`替换成 `StreamRequest`,若替换失败则转发失败返回报错。

```json
{
  "method": "StreamRequest"
}
```

#### 配置参数说明

| 参数名       | 值类型 | 是否必填 | 值可能性              | 默认值 | 说明                       |
|:----------| :------- |:------------------| :---- |:-------------------------|:-------------------------|
| service   | string | 否       | api.Server   |  | 服务名                      |
| method    | string | 否       | getUser      |       | 方法名                      |
| authority | string | 否       |             |       | 虚拟主机域名                         |
| headers   | map[string]object | 否       | {"name":"apinto"} |       | 能对转发请求的header值进行新增,修改或删除 |



### 使用方法
1、全局插件创建grpc-proxy_rewrite插件

![](http://data.eolinker.com/course/wjynvbz0e9a5aed5dc74a8f7ce0f4beffc06f112e5fe406.png)

2、在gRPC路由上绑定grpc-proxy_rewrite插件

![](http://data.eolinker.com/course/j8LeYb3d7fd27e9e6bce64a77cc4585199ad4d7d153658b.png)
