# 格式转换

### 插件信息

| 名称   | 字段             | 属性     |
|------|----------------| -------- |
| 格式转换 | data_transform | 参数处理 |

### 描述

XML和JSON是目前主要的两种数据交换格式。由于历史原因，一些后端服务系统采用SOAP协议开发，使用XML作为数据通讯格式。然而，现在业界大多数开放的API都采用JSON格式数据进行通信。但由于后端服务技术老旧，无法进行改造。为了向用户提供更便利的调用方式，我们可以使用格式转换插件来解决JSON和XML之间的互转问题。这样，我们就能够通过JSON格式开放给用户调用，同时与后端服务系统进行无缝交互。

当客户端请求体为JSON时，经过Apinto网关后，将会将数据转换成XML发送给后端服务；接收到后端服务返回的XML后，Apinto将会把该内容转成JSON返回给客户端，如下图所示：

![](http://data.eolinker.com/course/vXNVhhp3fed8da6162ac62d4c95ad42685d7940083f2509.png)

同理，当客户端请求体为XML时，也会自动转换成JSON发送给后端服务。
### 功能演示

该插件根据请求/响应头部`Content-Type`自动匹配数据格式，进行数据格式转换。当`Content-Type`包含`application/json`、`text/json`时，此时数据格式被判定为`JSON`，`Apinto`将把数据转成`XML`；当`Content-Type`包含`application/xml`、`text/xml`时，此时数据格式被判定为`XML`，`Apinto`将把数据转成`JSON`。

**字段描述**

| 字段名             | 字段类型 | 值可能性    | 说明                                                         |
| ------------------ | -------- | ----------- | ------------------------------------------------------------ |
| request_transform  | boolean  | true、false | 转发的请求内容是否进行格式转换，若选择为false，响应体将不会进行数据格式转换 |
| response_transform | boolean  | true、false | 响应内容是否进行格式转换，若选择为false，响应体将不会进行数据格式转换 |
| xml_root_tag       | string   |             | xml根标签                                                    |
| xml_declaration    | object   |             | 当数据从json转成xml时，携带的xml定义内容                     |
| error_type         | string   | text、json  | 报错响应返回类型                                             |

**配置示例**

```json
{
    "error_type": "json",
    "request_transform": true,
    "response_transform": true,
    "xml_declaration": {
        "encoding": "UTF-8",
        "standalone": "no",
        "version": "1.0"
    },
    "xml_root_tag": "apinto"
}
```

根据上述示例配置好插件后，客户端请求网关时需要携带**请求头部**`Content-Type: application/json`，请求体内容如下

```json
{"cpCode":"YTO","province":"广东省","city":"广州市","phone":"11,33"}
```

经过格式转换，上游服务接收的请求体内容即为

```XML
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<apinto>
  <city>广州市</city>
  <cpCode>YTO</cpCode>
  <phone>11,33</phone>
  <province>广东省</province>
</apinto>
```

上游服务接收的请求头部`Content-Type`为`application/xml`

假设上游服务返回响应体为

```XML
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="http://example.com/soap" targetNamespace="http://example.com/soap">
    <types>
        <schema xmlns="http://www.w3.org/2001/XMLSchema">
            <element name="MyMethodRequest">
                <complexType>
                    <sequence>
                        <element name="Name" type="string">
                                aaa
                        </element>

                    </sequence>
                </complexType>
            </element>
            <element name="MyMethodResponse">
                <complexType>
                    <sequence>
                        <element name="Result" type="string"/>
                    </sequence>
                </complexType>
            </element>
        </schema>
    </types>
    <message name="MyMethodRequest">
        <part name="parameters" element="tns:MyMethodRequest"/>
    </message>
    <message name="MyMethodResponse">
        <part name="parameters" element="tns:MyMethodResponse"/>
    </message>
    <portType name="MyServicePortType">
        <operation name="MyMethod">
            <input message="tns:MyMethodRequest"/>
            <output message="tns:MyMethodResponse"/>
        </operation>
    </portType>
    <binding name="MyServiceBinding" type="tns:MyServicePortType">
        <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
        <operation name="MyMethod">
            <soap:operation soapAction="http://example.com/soap/MyMethod"/>
            <input>
                <soap:body use="literal"/>
            </input>
            <output>
                <soap:body use="literal"/>
            </output>
        </operation>
    </binding>
    <service name="MyService">
        <port name="MyServicePort" binding="tns:MyServiceBinding">
            <soap:address location="http://localhost:8080/soap"/>
        </port>
    </service>
</definitions>
```

上游服务返回的响应头部携带`Content-Type: application/xml`，此时，经过格式转换插件，客户端接收的响应内容为

```json
{
    "definitions": {
        "-soap": "http://schemas.xmlsoap.org/wsdl/soap/",
        "-targetNamespace": "http://example.com/soap",
        "-tns": "http://example.com/soap",
        "-xmlns": "http://schemas.xmlsoap.org/wsdl/",
        "binding": {
            "-name": "MyServiceBinding",
            "-type": "tns:MyServicePortType",
            "binding": {
                "-style": "document",
                "-transport": "http://schemas.xmlsoap.org/soap/http"
            },
            "operation": {
                "-name": "MyMethod",
                "input": {
                    "body": {
                        "-use": "literal"
                    }
                },
                "operation": {
                    "-soapAction": "http://example.com/soap/MyMethod"
                },
                "output": {
                    "body": {
                        "-use": "literal"
                    }
                }
            }
        },
        "message": [
            {
                "-name": "MyMethodRequest",
                "part": {
                    "-element": "tns:MyMethodRequest",
                    "-name": "parameters"
                }
            },
            {
                "-name": "MyMethodResponse",
                "part": {
                    "-element": "tns:MyMethodResponse",
                    "-name": "parameters"
                }
            }
        ],
        "portType": {
            "-name": "MyServicePortType",
            "operation": {
                "-name": "MyMethod",
                "input": {
                    "-message": "tns:MyMethodRequest"
                },
                "output": {
                    "-message": "tns:MyMethodResponse"
                }
            }
        },
        "service": {
            "-name": "MyService",
            "port": {
                "-binding": "tns:MyServiceBinding",
                "-name": "MyServicePort",
                "address": {
                    "-location": "http://localhost:8080/soap"
                }
            }
        },
        "types": {
            "schema": {
                "-xmlns": "http://www.w3.org/2001/XMLSchema",
                "element": [
                    {
                        "-name": "MyMethodRequest",
                        "complexType": {
                            "sequence": {
                                "element": {
                                    "#text": "aaa",
                                    "-name": "Name",
                                    "-type": "string"
                                }
                            }
                        }
                    },
                    {
                        "-name": "MyMethodResponse",
                        "complexType": {
                            "sequence": {
                                "element": {
                                    "-name": "Result",
                                    "-type": "string"
                                }
                            }
                        }
                    }
                ]
            }
        }
    },
    "encoding": "UTF-8",
    "standalone": "no",
    "version": "1.0"
}
```

同时，客户端收到的响应头部`Content-Type`为`application/json`。