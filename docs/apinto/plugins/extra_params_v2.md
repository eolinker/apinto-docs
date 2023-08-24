# 额外参数插件V2
### 插件信息

| 名称       | 字段             | 属性     |
|----------|----------------| -------- |
| 额外参数插件V2 | extra_params_v2 | 参数处理 |

## 额外参数插件

- 插件id：`eolinker.com:apinto:extra_params_v2`
- 插件名称：`extra_params_v2`

### 配置示例

```json
{
    "params": [
        {
            "name": "appKey",
            "position": "body",
            "type": "string",
            "value": [
                "dasdjbhevrghqvjwdbjqwdqw"
            ]
        },
        {
            "name": "format",
            "position": "body",
            "type": "string",
            "value": [
                "json"
            ]
        },
        {
            "name": "version",
            "position": "body",
            "type": "string",
            "value": [
                "1.0"
            ]
        },
        {
            "name": "sign_method",
            "position": "body",
            "type": "string",
            "value": [
                "md5"
            ]
        },
        {
            "name": "timestamp",
            "position": "body",
            "type": "$datetime",
            "value": [
                "2006-01-02 15:04:05"
            ]
        },
        {
            "name": "method",
            "position": "body",
            "type": "string",
            "value": [
                "kdzs.address.reachable"
            ]
        },
        {
            "name": "sign",
            "position": "body",
            "type": "$md5",
            "value": [
                "ddqerjqhwdjghvjhwqdghevgqhwdh",
                "#address",
                "{address}",
                "appKey",
                "{appKey}",
                "#city",
                "{city}",
                "#country",
                "{country}",
                "#cpCode",
                "{cpCode}",
                "format",
                "{format}",
                "method",
                "{method}",
                "#province",
                "{province}",
                "sign_method",
                "{sign_method}",
                "timestamp",
                "{timestamp}",
                "#town",
                "{town}",
                "version",
                "{version}",
                "ddqerjqhwdjghvjhwqdghevgqhwdh"
            ]
        }
    ],
    "request_body_type": "json"
}
```

### 配置详细说明

#### 当 type 没有 $ 前缀

- 当`position`为 **header、****query** ，或`position`为body时，`request_body_type`为`form-data`、`multipart-formdata`时

    - 此时`type`无效，默认将多个值内容进行拼接

    ```json
    {
        "params": [
            {
                "name": "x-apinto-token",
                "position": "header",
                "type": "string",
                "value": [
                    "a",
                    "b",
                    "c",
                    "d"
                ]
            }
        ],
        "request_body_type": "json"
    }
    ```

    - 上述配置将发送请求头：`x-apinto-token`，值为：`abcd`

    - 若此时`value`为空值，视为**删除**该参数，示例配置如下：

    ```json
    {
        "params": [
            {
                "name": "x-apinto-token",
                "position": "header",
                "type": "string",
                "value": []
            }
        ],
        "request_body_type": "json"
    }
    ```

上述配置将会删除请求头`x-apinto-token`

- 当`position`为body，`request_body_type`为`json`时

    - `name`支持`json path`格式

    - 根据`type`类型设置参数值，示例配置如下：

    ```json
    {
        "params": [
            {
                "name": "$.app_id",
                "position": "body",
                "type": "int",
                "value": [
                   "10023"
                ]
            }
        ],
        "request_body_type": "json"
    }
    ```

    - 若此时客户端请求body为：

    ```json
    {
        "product": "Apinto",
        "publish":true,
        "description":"高性能、可拓展的云原生API网关"
    }
    ```

    - 转发给上游服务的请求body被修饰为：

    ```json
    {
        "product": "Apinto",
        "publish": true,
        "description": "高性能、可拓展的云原生API网关",
        "app_id": 10023
    }
    ```

    - 若此时`value`为空值，视为**删除**该参数，示例配置如下：

    ```json
    {
        "params": [
            {
                "name": "$.app_id",
                "position": "body",
                "type": "int",
                "value": []
            }
        ],
        "request_body_type": "json"
    }
    ```

上述配置将会删除 **body** 的参数`app_id`

#### 当 type 拥有 $ 前缀

根据不同的type，value值有不同的含义

- **type = $concat**

    - `value` 表示要用计算原文的规则

    - 每个值为文本，允许从请求参数中（header、query、body均支持）根据变量名获取变量值

    - 若需要从参数中获取变量值，允许指定获取参数值的位置，则需要使用{变量名}来表示

        - 从header中获取变量值：{header.xxx}
        - 从body中获取变量值：{body.xxx} 或 {xxx}
        - 从query中获取变量值：{query.xxx}

    - 请求体为json时，只支持根字段

    - 计算时，把所有值按字段顺序**拼接**

    - 使用`#`号表示非必填参数常量，如`#abc`，表示从请求中获取abc这个参数，当这个参数存在，则将abc作为常量拼接

    - 当需要使用系统变量时，值携带`$`符号，如：`$request_uri`，系统变量可参考：[系统可用值](https://help.apinto.com/docs/formatter/#%E7%B3%BB%E7%BB%9F%E5%8F%AF%E7%94%A8%E5%80%BC)

      ```json
      {
          "name":"concat",
          "type":"$concat",
          "value":["这里是secret","bar","{bar}","foo","{foo}","foo_bar","{foo_bar}","secret"]
      }
      ```



- **type = $md5**

    - value 表示要用计算原文的规则

    - 每个值为文本，允许从请求参数中（header、query、body均支持）根据变量名获取变量值

    - 若需要从参数中获取变量值，允许指定获取参数值的位置，则需要使用**{变量名}**来表示

        - 从header中获取变量值：{header.xxx}
        - 从body中获取变量值：{body.xxx} 或 {xxx}
        - 从query中获取变量值：{query.xxx}

    - 请求体为json时，只支持根字段

    - 计算时，把所有值按字段顺序拼接后，执行md5加密

    - 使用`#`号表示非必填参数常量，如`#abc`，表示从请求中获取abc这个参数，当这个参数存在，则将abc作为常量拼接

    - 默认大写加密，如果需要**转成小写**，则需要修改name字段的值，加上 `__` 的前缀，如以下配置：

    - 当需要使用系统变量时，值携带`$`符号，如：`$request_uri`，系统变量可参考：[系统可用值](https://help.apinto.com/docs/formatter/#%E7%B3%BB%E7%BB%9F%E5%8F%AF%E7%94%A8%E5%80%BC)

      ```json
      {
          "name":"__sign",
          "type":"$md5",
          "value":["这里是secret","bar","{bar}","foo","{foo}","foo_bar","{foo_bar}","secret","$request_uri"]
      }
      ```

- **type = $datetime**

    - value只有**第一个值**有效，值为时间格式化字符串，用go标准库的表达式
    - 暂时不支持自定义时区，使用网关服务器配置的时区

- **type = $timestamp**

    - 请求体为formdata时，不需要value
    - 请求体为json时，value**第一个值**表示值类型，值可能性：string、int。value为空或者第一个值不是 string、int 时，默认为 int