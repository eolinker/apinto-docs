# gzip压缩
### 插件名称

| 名称     | 字段 | 属性     |
| -------- | ---- | -------- |
| gzip压缩 | gzip | 效率提升 |

### 功能描述

将响应进行gzip压缩，以提高传输效率

使用前提：客户端请求时必须带有Accept-encoding头部，且值包括gzip

### 配置参数说明

| 参数名     | 说明                                                         | 是否必填 | 默认值 | 值可能性     |
| ---------- | ------------------------------------------------------------ | -------- | ------ | ------------ |
| types      | 需要压缩的响应content-type类型列表，不填则 匹配任何 MIME 类型， 不填则为所有 | 否       |        | array_string |
| min_length | 待压缩内容的最小长度                                         | 否       | 1      | int          |
| vary       | 是否加上Vary: Accept-Encoding响应头部                        | 否       | false  | bool         |

### 全局开启gzip插件

![](http://data.eolinker.com/course/83UqLUZa21949b3a269d2f275a084b2fd93bd52bfff39cd.gif)

### 配置带有gzip压缩插件的服务

![](http://data.eolinker.com/course/jYIcFvMdfec98a42b4d5f9ab21b296a44d18a4b7eec6487.gif)
