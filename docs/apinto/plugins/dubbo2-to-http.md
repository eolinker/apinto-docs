# dubbo2协议转http协议插件

### 插件信息

| 名称       | 字段                           | 属性   |
| ---------- |------------------------------|------|
| dubbo2协议转http | dubbo2-to-http | 协议转换 |

### 功能描述

将客户端 **Dubbo2请求** 转换成 **HTTP请求** 转发给上游服务，并将上游服务的 **HTTP响应** 转换成 **Dubbo2响应** 转发给客户端。该插件仅当路由驱动为`dubbo2`时生效。

### Open Api

#### 配置参数说明

| 参数名                                | 说明                                                  | 是否必填               | 默认值 | 值可能性         |
|------------------------------------|-----------------------------------------------------|--------------------| ------ |--------------|
| path                            | 转发路径                                                | 是                  |        | string       |
| method                             | http请求方法 默认POST                                     | 是                  |        | string       |
| content_type                         | 暂时只支持application/json                               | 是                  |        | array_object |
| params                         | 对转发dubbo2协议的内容进行匹配，匹配成功后读取并解析成json             | 是                  |        | array_object |
| params -> class_name     | 对应java中的className   获取方法（user.getClass().getName()） | 是                  |        | string       |
| params -> field_name   | 用于转发给http服务中body内容中的key名（json），不填整个内容转成json         | 否（仅params长度为0时可不填） |        | string       |

#### 配置示例

##### dubbo2路由配置
```json
{
	"name": "complex_router",
	"driver": "dubbo2",
	"description": "dubbo2路由",
	"listen": 8099,
	"service_name": "api.Server",
	"rules": [],
    "plugins": "引用当前配置的dubbo2-to-http插件",
	"service": "anonymous_service@service",
	"template": ""
}
```
##### http服务端接口配置

```go
package main

import (
	"fmt"
	"io"
	"net/http"
)

func complexServer(writer http.ResponseWriter, request *http.Request) {
	bytes, err := io.ReadAll(request.Body)
	if err != nil {
		return
	}
	fmt.Println("complexServer info:", string(bytes))
	writer.Write(bytes)
}

func main() {

	http.HandleFunc("/complexServer", complexServer)

	http.ListenAndServe(":20002", nil)
}
```

#### 测试用例

###### 插件配置

```json
{
  "path": "/complexServer",
  "method": "POST",
  "content_type": "application/json",
  "params": [
    {
      "class_name": "object"
    }
  ]
}
```
##### dubbo2请求

**如需要go版本的 可在apinto源码文件下的example/dubbo2/client/main.go 使用**
```java

import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ReferenceConfig;
import com.alibaba.dubbo.rpc.service.GenericService;
import java.util.HashMap;
import java.util.Map;

public static void main(String[] args) {
        ReferenceConfig<GenericService> reference = new ReferenceConfig<GenericService>();
        reference.setInterface("api.Server");
        ApplicationConfig config = new ApplicationConfig();
        config.setName("dubbo");
        reference.setApplication(config);
        reference.setUrl("dubbo://172.28.187.118:8099");
        reference.setGeneric(true);
        GenericService genericService = reference.get();
        String[] typeList = new String[1];
        typeList[0] = "object";
        Map<String,Object> maps = new HashMap<>();
        maps.put("name","apinto");
        maps.put("id",10);
        Object[] valueList = new Object[1];
        valueList[0] = maps;
        Object result = genericService.$invoke("ComplexServer", typeList, valueList);
        System.out.println(result);
    }
```
##### http服务端收到请求打印
```text
complexServer info: {"id":10,"name":"apinto"}
```

##### dubbo2客户端调用打印result
```text
{name=apinto, id=10.0}
```
