# 次数扣减

### 插件信息

| 名称   | 字段      | 属性   |
|------|---------|------|
| 次数扣减 | counter | 流量管控 |

### 描述
假设你经营一家超市，每个顾客购物时需要使用购物袋。为了管理超市的容量和资源，你设置了每个顾客最多可以使用的购物袋数量。这个限制就类似于次数扣减，在API网关中，每个请求都会消耗一定的次数。
超市代表API网关，顾客代表发起API请求的客户端，购物袋代表可用的请求配额。
次数扣减确保API请求的数量保持在可接受的限制范围内，防止过载，并确保资源的公平分配，就像超市限制购物袋数量一样，防止过度使用。
当可用次数用完时，可以通过购买额外的请求次数或根据特定条件自动充值来增加可用的请求配额。
Apinto网关支持以下两种次数扣减方式：
- 对单一请求进行单次计数：每成功转发一次，计数为1次。
- 对单一请求进行批量计数：可配置参数拆分规则，如短信接口，参数phone允许输入多个手机号码，此时根据批量扣次的规则，计数为手机号码个数。

![](http://data.eolinker.com/course/piS6Prg2f35938be06726fdf60614e6ae337f631cb9933b.png)

### 配置示例

```json
{
    "count": {
        "key": "$.phone",
        "max": 100,
        "request_body_type": "json",
        "separator": ",",
        "separator_type": "splite"
    },
    "key": "apispace:$application:$token:$api_id",
    "match": {
        "params": [
            {
                "key": "success",
                "kind": "boolean",
                "value": [
                  "true"
                ]
            }
        ],
        "status_codes": [200, 201, 202, 203, 204, 205, 206, 207, 208, 226],
        "type": "json"
    }
}
```

### 配置详细说明

- count：批量扣数信息

    - key：请求体匹配字段，当`request_body_type`为json时，支持`json path`格式

    - max：最大扣减次数，当值为0时不作限制

    - request_body_type：请求体类型，值可能性：`form-data`、`json`、`multipart-formdata`

    - separator：分隔符，当`separator_type`为splite、length时，该值有意义

    - separator_type：分隔计数类型，值可能性如下

        - splite：分隔符分组计数，根据`separator`的分隔符，进行分组计数，示例配置如下
          ```json
            {
              ...
               "count": {
                  "key": "$.phone",
                  "max": 100,
                  "request_body_type": "json",
                  "separator": ",",
                  "separator_type": "splite"
              },
              ...
            }
            ```

            此时请求体如下

            ```json
            {"cpCode":"YTO","province":"广东省","city":"广州市","phone":"11,33"}
            ```

          根据配置，使用`,`分隔参数并计数得到2次，此时次数将扣减2次。

      * array：根据数组长度进行计数，当`request_body_type`为`json`时该值有效，示例配置如下

         ```json
         {
             ...
              "count": {
                 "key": "$.phone",
                 "max": 100,
                 "request_body_type": "json",
                 "separator": ",",
                 "separator_type": "array"
             },
             ...
         }
         ```

        此时请求体如下

         ```json
         {"cpCode":"YTO","province":"广东省","city":"广州市","phone":["122","33"]}
         ```

        数组长度为2，此时次数将扣减2次。

        - length：根据请求体字数进行计数，根据`separator`的值划分次数，示例配置如下

         ```json
         {
             ...
              "count": {
                 "key": "$.msg",
                 "max": 10000,
                 "request_body_type": "json",
                 "separator": "8",
                 "separator_type": "array"
             },
             ...
         }
         ```

        此时请求体如下：

         ```json
         {"msg":"感谢您订购短信通知"}
         ```

        上述消息中，`msg`字段有9个字，`separator`配置为8，此时计数为2次

- match：匹配信息，当响应参数和状态码均匹配成功，次数进行扣减，反之，不做扣减

    - params：匹配响应参数列表，当所有参数匹配成功，即响应参数匹配成功，反之，则匹配失败
        - key：响应参数key，使用`json path`格式
        - kind：参数类型，值可能性：**string、bool、int、float**
        - value：参数值列表，字符串数组，只要匹配中其中任一值，该参数视为匹配成功
    - status_codes：匹配状态码列表，只要响应状态码在该列表中存在，视为匹配状态码成功
    - key：支持使用变量、标签值
        - 使用变量使用`$`开始，`:`结尾，示例：`apinto:$application:$token:$api_id`
        - 支持变量
            - `application`：应用名称
            - `token`：请求token
            - `api_id`：接口ID信息