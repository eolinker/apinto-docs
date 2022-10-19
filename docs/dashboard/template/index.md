# 插件模版

> 描述：
> * 提取相同的插件配置，构建统一的插件模版
> * 允许多个路由实例引用同一个插件模版
> * 添加了插件模版的实例允许另外新增插件
> * 当新增的插件和插件模版中配置的插件有交集时，有交集的插件配置以路由新增的插件配置为准

## 配置说明
|      |                           |                 |
|------|---------------------------|-----------------|
| 插件配置 | object（map[string]object） | 插件配置，以插件别名作为key |
| 描述   | string                    | 模版描述            |



## 配置流程
插件已经提前加入全局插件列表中，并设置了相应的别名。

全局插件列表截图如下：

![](http://data.eolinker.com/course/xIEQLcic1419e67cc40558b3fd6946d4af650824a52915e.png)
1、新增插件模版

![](http://data.eolinker.com/course/u3Pg1YYe6f9adf5911cf4c5a95e7b970c1d6bafa5816459.png)

2、绑定路由

![](http://data.eolinker.com/course/f6ec3tW4baf77e76ee5e313205d3ed3b435500f2b7fd319.png)