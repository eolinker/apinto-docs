# 插件开发细则
### 插件开发教程

1、实现**eosc.IExtenderDriverFactory**接口

```go
type IExtenderDriverFactory interface {
    Render() interface{}
    Create(profession string, name string, label string, desc string, params map[string]interface{}) (IExtenderDriver, error)
}
```

2、实现**eosc.IExtenderConfigChecker**接口

```go
type IExtenderConfigChecker interface {
    Check(v interface{}, workers map[RequireId]IWorker) error//检查插件配置是否合法
}
```

3、实现**eosc.IExtenderDriver**接口

```go
type IExtenderDriver interface {
	ConfigType() reflect.Type																	// 获取插件配置类型，使用反射获取
	Create(id, name string, v interface{}, workers map[RequireId]IWorker) (IWorker, error)  	// 创建插件实例方法
}
```

4、实现**eosc.IWorker**接口

```go
type IWorker interface {
	Id() string															// 返回插件实例ID
	Start() error														// 插件实例初始化时执行
	Reset(conf interface{}, workers map[RequireId]IWorker) error  	    // 插件实例配置修改时执行
	Stop() error														// 插件实例被删除时执行
	CheckSkill(skill string) bool										// 判断当前实例是否实现了skill方法
}
```

5、实现**eosc/http_service.IFilter**接口

```go
type IFilter interface {
	DoFilter(ctx EoContext, next IChain) (err error)		// 插件执行主方法
	Destroy()												// 当插件被移除或关闭时，销毁该插件相关内容
}
```



6、实现插件的main文件

```go
package main
// 包名必须为main

import (
	"github.com/eolinker/eosc"
)
// eosc.ExtenderBuilder实现
type builder struct{
}

// 插件注册入口
func (b *builder) Register(register eosc.IExtenderDriverRegister) {
    // 可以一次性注册多个eosc.IExtenderDriverFactory实现
	register.RegisterExtenderDriver("demo1", NewFactory1())
    
    // register.RegisterExtenderDriver("demo2", NewFactory2())
    // register.RegisterExtenderDriver("demo3", demo3.NewFactory())
    // register.RegisterExtenderDriver("demo4", demo4.NewFactory())
    // ...
}

// 插件的导出方法，必须实现，必须返回eosc.ExtenderBuilder实例
func Builder() eosc.ExtenderBuilder {
	return new(builder)
}
```

上述方法实现后即可进行编译，编译指令如下：

```
go build -buildmode=plugin -o xxx.so	// 编译后的文件后缀必须为.so
```

编译后的插件放在插件仓库如下地址：

```
 {repository}/repository/{eosc version}/{go version}/{group}/{project}/{version}/
```

> 1. 仓库根目录为 {repository}, 根目录默认地址为: /var/lib/apinto/extends
> 2. 通过 APINTO_EXTENDS_DIR 可以指定自定义的根目录，例如: export APINTO_EXTENDS_DIR=/Users/username/extends
> 3. 通过修改配置文件**/etc/apinto/apinto.yml**字段**extends_dir**配置



### 插件注意事项

1、插件编译时需要确保和主程序编译的**GO版本**一致，目前github上编译的release版本依赖的GO版本为**1.17.3**

2、插件编译的**GOPATH**必须和主程序编译时的**GOPATH** 一致

3、插件编译时需要确保**eosc**的依赖版本一致，具体看**apinto**仓库的**go.mod**文件

4、插件编译时需要确保系统及架构一致，目前github上上编译的release版本依赖的系统为**linux/amd64**