# HTTP协议转Dubbo2协议

### 插件信息

| 名称       | 字段                           | 属性   |
| ---------- |------------------------------|------|
| http协议转dubbo2 | http-to-dubbo2 | 协议转换 |

### 功能描述

将客户端 **HTTP请求** 转换成 **Dubbo2请求** 转发给上游服务，并将上游服务的 **Dubbo2响应** 转换成 **HTTP响应** 转发给客户端。该插件仅当路由驱动为`http`时生效。


#### 注意事项
目前只支持读取http请求中body中的内容，且为json格式

### Open Api

#### 配置参数说明

| 参数名                                | 值类型                        | 是否必填 | 值可能性         | 默认值 | 说明                                                  |
|:-----------------------------------| :----- |:-------------|:-------------|:-------------|:-------------|
| service                            | string                      | 是    | api.Server |        | 服务名                                                 |
| method                             | string                       | 是    | getUser |        | 方法名                                                 |
| params                         | array_object             | 是    |  |        | 对转发的body内容进行匹配，匹配成功后读取并解析成dubbo2协议所需要数据             |
| params -> class_name     | string | 是    | cn.apinto.model.UserInfo |        | 对应java中的className   获取方法（user.getClass().getName()） |
| params -> field_name   | string | 否 （仅params长度为0时可不填）   |        |        | 从body中提取的字段名,不填默认读取整个body                           |

#### 配置示例

##### dubbo2服务端接口配置

```java
package cn.apinto.model;

public class User {
    String name;
    int id;
    Integer age;
}
```

```java
package cn.apinto.api.UserService;

import cn.apinto.model.User;
import java.util.List;
import java.util.Map;

public interface UserService {
    User getUserByUser(User user);
    User getUserByName(String name);
    User getUserByNameByUser(String name,User user);
    Map<String,User> getUserMap(Map<String,User> users);
    List<User> getUserList(List<User> users);
}
```

#### 测试用例1

###### 插件配置

```json
{
  "service": "cn.apinto.api.UserService",
  "method": "getUserByUser",
  "params": [
    {
      "class_name": "cn.apinto.model.User"
    }
  ]
}
```

##### http请求的body内容

```json
{
  "name": "apinto",
  "id": 10,
  "age": 30
}
```

#### 测试用例2

###### 插件配置

```json
{
  "service": "cn.apinto.api.UserService",
  "method": "getUserByName",
  "params": [
    {
      "class_name": "java.lang.String",
      "filed_name": "name"
    }
  ]
}
```

##### http请求的body内容

```json
{
  "name": "apinto"
}
```

#### 测试用例3

###### 插件配置

```json
{
  "service": "cn.apinto.api.UserService",
  "method": "getUserByNameByUser",
  "params": [
    {
      "class_name": "java.lang.String",
      "filed_name": "name"
    },
    {
      "class_name": "cn.apinto.model.User",
      "filed_name": "user"
    }
  ]
}
```

##### http请求的body内容

```json
{
  "name": "apinto",
  "user": {
    "name": "apinto",
    "id": 10,
    "age": 30
  }
}
```

#### 测试用例4

###### 插件配置

```json
{
  "service": "cn.apinto.api.UserService",
  "method": "getUserMap",
  "params": [
    {
      "class_name": "java.util.Map"
    }
  ]
}
```

##### http请求的body内容

```json
{
  "user1": {
    "name": "apinto",
    "id": 1,
    "age": 10
  },
  "user2": {
    "name": "apinto",
    "id": 2,
    "age": 20
  },
  "user3": {
    "name": "apinto",
    "id": 3,
    "age": 30
  }
}
```

#### 测试用例5

###### 插件配置

```json
{
  "service": "cn.apinto.api.UserService",
  "method": "getUserList",
  "params": [
    {
      "class_name": "java.util.List"
    }
  ]
}
```

##### http请求的body内容

```json
[
  {
    "name": "apinto",
    "id": 1,
    "age": 10
  },
  {
    "name": "apinto",
    "id": 2,
    "age": 20
  },
  {
    "name": "apinto",
    "id": 3,
    "age": 30
  }
]

```