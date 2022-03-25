# Line

### Line Formatter概述

Line Formatter主要应用于将日志内容格式化成line格式

### 配置规则

```yaml
fields:
  - $request_id
  - @proxy
  - @proxy#
proxy:
  - $proxy_uri
  - $proxy_scheme
```



#### key

1. fields配置项为默认的格式化字段列表，其他为额外的自定义引用项（如上述proxy项）
2. 在配置内容中可以用@{key}来引用其他字段作为复合内容，引用效果由具体实现定义

#### 值

1. 值为字符串列表，每一项元素表示一个字段取值

2. 元素格式为: ($|@){pattern}[#] （**注**：[]表示可选内容）

   * $ 表示取出字符串

   - @{pattern}表示引用名为{pattern}的配置，当目标字段实际类型为数组时，取最后一个元素
   - @{pattern}#表示引用名为{pattern}的配置，值类型为数组类型
   - 当数据不带$或@前缀时，其为常量
   
3. 每个值之间用间隔符分割

4. 使用@时，按层次替换分隔符，且按层次使用包含符号

   * 分隔符依次为: 

     i. `\t` 

     ii. `空格`

     iii.  `,`

     iv. `|`

     v. `剩下的不显示`

   * 包含符号依次为

     i. `""`

     ii. `[]`

     iii. `<>`

5.  空值或者超过层级部分显示为`-`减号。

### 配置示例

#### 配置

```yaml
fields:
    - "$request_id"
    - "$time_local"
    - "$null_value"  #不存在null_value这个key,显示-
    - "@proxy"
    - "@proxy#"  #数组
    - "@tmp1"
tmp1:
    - "@tmp2"
tmp2:
    - "@proxy"  
    - "@proxy#" #超出层级,则显示-
proxy:
    - "$proxy_scheme"
    - "$proxy_uri"
```

> 更多可配置字段详见：[系统可用值](/docs/formatter/system_valid.md)

#### 输出

```text
0ff7692b-3833-464d-9fb9-6d24274756fe    2021-12-28 17:29:32     -       "http /demo?a=1"        "[http,/demo?a=1]"      "[<http|/demo?a=1>,<->]"
```

### 配置规则详解

**fields**配置项中指定了待记录的日志字段，fields中每个元素为第一层的输出元素，可以是常量、变量也可以是数据对象。其余配置项则为**自定义引用项**。具体配置规则如下：

#### ${pattern}

对于形如”${pattern}“的字段格式，表示直接取出指定pattern字段的值进行记录，且字段键值规定为pattern。如：

##### 配置

```yaml
fields:
  - "$request_id" #表示记录请求过程中的请求id
  - "$proxy_scheme"  #表示转发时的http方法
```

##### 输出

```json
0ff7692b-3833-464d-9fb9-6d24274756fe    http
```

#### @{pattern}

对于形如”@{pattern}“的字段格式，表示引用**名为pattern的数据对象**，当目标字段实际类型为数组时，取最后一个对象元素，字段键值规定为pattern，具体的值类型为对象类型，且所引用的名为pattern的数据对象应事先定义在与fields配置项同级的**自定义引用项**中，具体例子如下所示：

##### 配置

```yaml
fields":
  - "$request_id"
  - "@proxy"
proxy:
  - "$proxy_scheme"
  - "$proxy_uri"
```

##### 输出

```
0ff7692b-3833-464d-9fb9-6d24274756fe    "http /demo?a=1"
```

#### @{pattern}#

对于形如”@{pattern}#“的字段格式，表示引用名为pattern的配置项，字段键值规定为pattern，具体的值类型为数组类型。具体例子如下所示：

##### 配置

```yaml
fields":
  - "$request_id"
  - "@proxy"
proxy:
  - "$proxy_scheme"
  - "$proxy_uri"
```

##### 输出

```
0ff7692b-3833-464d-9fb9-6d24274756fe    "[http,/demo?a=1]"
```

#### 元素前缀不为$或@

当元素前缀不为$或@时，表明该元素为常量，直接取值，具体例子如下所示：

##### 配置

```yaml
fields:
  - "123"
  - "abc"
```

##### 输出

```json
123    abc
```