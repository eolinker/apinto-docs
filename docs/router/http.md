
# HTTP 协议路由


| 类别 | 属性     |
| ---- | -------- |
| 路由 | 路由匹配 |



### 功能描述

路由是完成网关转发步骤的第一步，该路由类型能使网关可接收http请求并匹配到目标服务。

### 路由匹配规则
路由可配置五种指标，分别是host、method、location、header、query，除了location外，其它指标均可配置多个。且每个指标的值可配置一种匹配规则。

#### 指标匹配顺序
**优先级递减**
host -> method -> location -> header（key根据单词字母升序进行排序） -> query（key根据单词字母升序进行排序）   

```yaml
host:
  - str
method: 
  - str
rules:
  - location: str
    header: 
      user: str
      token: str
    query:
      id: str
      
此时指标匹配顺序为：host>method>location>header:token>header:user>query:id
共六个指标
```



#### 指标值匹配规则

| 匹配类型               | 规则    | 说明                                             |
| ---------------------- | ------- | ------------------------------------------------ |
| 全等匹配               | str     | 值存在，且与str完全相等                          |
| 前缀匹配               | str*    | 值存在，且str是值的前缀                          |
| 后缀匹配               | *str    | 值存在，且str是值的后缀                          |
| 子串匹配               | \*str\* | 值存在，且str是值的子串                          |
| 非等匹配               | !=str   | 值存在，且值不等于str时匹配成功                  |
| 空值匹配               | $       | 要求key存在且值为空值，多用于header、query指标   |
| 存在匹配               | **      | 要求key存在但不能为空值，多用于header、query指标 |
| 不存在匹配             | !       | 要求key不存在，多用于header、query指标           |
| 区分大小写的正则匹配   | ~=str   | 值符合正则匹配                                   |
| 不区分大小写的正则匹配 | ~*=str  | 值符合正则匹配                                   |
| 任意匹配               | *       | 任何情况都匹配成功                               |

**优先级**：全等匹配 > 前缀匹配 > 后缀匹配 > 子串匹配 > 非等匹配 > 空值匹配 > 存在匹配 > 不存在匹配 > 区分大小写的正则匹配 > 不区分大小写的正则匹配 > 任意匹配

以上所有匹配规则仅支持host、method、location、header、query的字符串值（以下用str来表示）。

如：

```yaml
host:
  - str
method: 
  - str
rules:
  - location: str
    header: 
      user: str
      token: str
    query:
      id: str
      
#示例      
host:
  - www.eolinker.* #前缀匹配
  - *.eolinker.com #后缀匹配
  - *.com* #子串匹配
method: 
  -GET  #全等匹配
rules:
  - location: * #任意匹配,任何情况下都能匹配成功
    header: 
      user: ** #存在匹配，要求值存在且不为空值
      content-type: !=application/json #非等匹配,如不等于application/json都能匹配
    query:
      id: $ #空值匹配，要求值为空值
      name: ! #不存在匹配   

```



#### 匹配优先级

以下优先级递减

* 指标匹配顺序优先级。

* 在同指标下，按指标值的匹配规则优先级。

* 在同指标、同指标值匹配规则下，按指标值长度递增，若长度相同则按字母升序。
* 同时满足多条路由，指标数量多的路由优先匹配。



(1)当一个请求满足多个路由时，指标匹配顺序优先级最高

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host:www.apinto.com
method: GET
location: /user/login
query_classID: 1
```

路由B(转发到serviceB):

```
method: GET
location: /user/login
query_sex: 男
```

```
请求（GET http://www.apinto.com/user/login?classID=1&sex=男 ）：该请求匹配路由A，转发到serviceA
```



(2)当一个请求满足多个路由且指标匹配顺序相同时，指标值匹配规则优先级更高

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host:www.apinto.com
method: GET
location: /user/login  #全等匹配
query_classID: 1
```

路由B(转发到serviceB):

```
host:www.apinto.com
method: GET
location: /user*  #前缀匹配
query_classID: 1
```

```
请求（GET http://www.apinto.com/user/login?classID=1 ）：该请求匹配路由A，转发到serviceA
```



(3)当一个请求满足多个路由且指标匹配顺序和指标值匹配规则优先级相同时，根据指标值单词字母升序的优先级进行匹配

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host: www.apinto.com
method: GET
location: /user/login
query_name：chen*
```

路由B(转发到serviceB):

```
host: www.apinto.com
method: GET
location: /user/login
query_name：zhang*
```

```
请求A（GET http://www.apinto.com/user/login?name=chenwu ）：该请求优先匹配完路由A所有规则，转发到serviceA
```



(4)当一个请求满足多个路由且指标匹配顺序相同，同时一个路由为另一个路由的子集时，满足指标数量更多的优先

如下面的配置（下述配置有header为请求头部信息，对应的key为“_”后的字段，query同）：

路由A（转发到serviceA):

```
host: www.apinto.com
method: GET
location: /user/login
query_classID：1
```

路由B(转发到serviceB):

```
host: www.apinto.com
method: GET
location: /user/login
query_classID：1
query_sex：男
```

```
请求A（GET http://www.apinto.com/user/login?classID=1 ）：该请求匹配路由A，转发到serviceA

请求B（GET http://www.apinto.com/user/login?classID=1&sex=男 ）：该请求匹配路由B，转发到serviceB
```



### OpenAPI配置路由

服务配置教程[点此](/docs/service/http.md)进行跳转

##### 请求参数说明

![](http://data.eolinker.com/course/QErwwRqee27a611dba1f6341473cefbbe5ba0771eb1d176.png)


##### 返回参数说明

![](http://data.eolinker.com/course/ZyPW36jb5d2f88cf4e94e5e3b116fa716b547c2e54d1209.png)

#### 创建路由

```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/router' \
  -H 'Content-Type:application/json' \
  -d '{
    "name": "complex_router",
    "driver": "http",
    "desc": "一个较复杂匹配规则的路由",
    "listen": 8080,
    "host": ["*.com"],
    "rules": [
        {
            "location": "/demo",
            "header": {"name":"**"},
            "query": {
                "id": "!=123"
            }
        }
    ],
    "target": "annoymous@service",
    "method": [
        "GET",
        "POST"
    ]
}'

#当http请求同时满足以下条件时才能匹配这个路由
#method为GET或者POST
#请求host的值后缀为.com
#请求路径uri为/demo
#头部存在name这个key，且对应值不为空值
#请求参数里包含key为id，且值不为123
```

**注意**：该路由内配置的监听端口`listen`必须在config.yml配置文件里的监听端口列表中存在。

#### 返回结果示例

```json
{
    "id": "complex_router@router",
    "name": "complex_router",
    "driver": "http",
    "profession": "router",
    "create": "2021-08-05 19:17:03",
    "update": "2021-08-05 19:17:03"
}
```

