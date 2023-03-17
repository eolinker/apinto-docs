# 外部应用
外部应用是指调用网关的OpenAPI的调用方，

关联标签：应用调用网关提供的OpenAPI传过来的自定义标签信息

操作：
* 更新鉴权TOKEN：更新应用的鉴权token，防止token泄漏还可以更新
* 复制鉴权TOKEN：复制TOKEN
* 禁用启用：禁用，则表示该应用无法再调用OpenAPI；启用，则表示应用通过鉴权TOKEN可以调用网关提供的OpenAPI
* 删除：物理删除应用

![](http://data.eolinker.com/course/nNH6rR1269ae86ba47b996b4b237fe34cce030380941814.png)