# 请求文件解析

### 插件信息

| 名称      | 字段                 | 属性     |
|---------|--------------------|--------|
| 请求文件解析  | request-file-parse | 请求处理   |

### 描述
解析客户端请求上传的文件信息，提取文件请求中的文件后缀、文件大小等信息，将其设置为系统变量，供后续插件使用。

该插件仅支持解析`POST`、`PUT`、`PATCH`请求方式中的文件参数，并且请求头部`Content-Type`应包含`multipart/form-data`，否则将不会解析文件参数。

### 配置描述


| 字段               | 类型       | 描述                                                                                                          |
|------------------|----------|-------------------------------------------------------------------------------------------------------------|
| file_key         | string   | 解析文件参数名称                                                                                                    |
| file_suffix      | []string | 文件解析额外支持后缀，当前已支持后缀： csv,tar,bz2,xz,jar,pdf,doc,docx,xls,ppt,xlsx,pptx,zip,txt,rar,gz,dot，若需要解析其余文件，可在该参数中填写 |
| large_warn       | int      | 文件大小告警阈值，单位：M                                                                                               |
| large_warn_text  | string   | 文件大小告警标签值，当文件大小大于`large_warn`时，将设置系统变量`file_size_warn`为`large_warn_text`的值，默认值为：`large`                     |
### 示例配置

```json
{
    "file_key": "file",
    "file_suffix":[],
    "large_warn": 10,
    "large_warn_text": "large"
}
```
上述配置将会解析请求中的文件参数，文件参数名为`file`，文件大小超过10M时，将设置系统变量`file_size_warn`为`large`的值。

插件执行成功后，将会设置以下系统变量：

| 变量名                  | 变量说明                                                                                     |
|----------------------|------------------------------------------------------------------------------------------|
| ctx_request_body     | 上下文请求体信息，该参数会提取出文件的内容，忽略其余参数信息                                                           |
| ctx_file_direction   | 文件方向，此处默认为`upload`                                                                       |
| ctx_file_name        | 文件名称                                                                                     |
| ctx_file_size        | 文件大小，单位：字节                                                                               |
| ctx_file_suffix      | 文件后缀                                                                                     |
| ctx_file_size_warn   | 文件大小告警标签值，当文件大小大于`large_warn`时，将设置系统变量`file_size_warn`为`large_warn_text`的值，默认值为：`large`  |

系统变量可用于填写日志Formatter配置，使用方法请参考[Formatter教程](/docs/formatter/index.md)

