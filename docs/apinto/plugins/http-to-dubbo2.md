# http协议转dubbo2协议插件

### 插件信息

| 名称       | 字段                           | 属性   |
| ---------- |------------------------------|------|
| http协议转dubbo2 | http-to-dubbo2 | 协议转换 |

### 功能描述

将http请求转换成dubbo2请求

#### 注意事项
目前只支持读取http请求中body中的内容，且为json格式

### Open Api

#### 配置参数说明

| 参数名                                | 说明                                                  | 是否必填 | 默认值 | 值可能性         |
|------------------------------------|-----------------------------------------------------|------| ------ |--------------|
| service                            | 服务名                                                 | 是    |        | string       |
| method                             | 方法名                                                 | 是    |        | string       |
| params                         | 对转发的body内容进行匹配，匹配成功后读取并解析成dubbo2协议所需要数据             | 是    |        | array_object |
| params -> class_name     | 对应java中的className   获取方法（user.getClass().getName()） | 是    |        | string       |
| params -> field_name   | 从body中提取的字段名,不填默认读取整个body                           | 否    |        | string       |

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