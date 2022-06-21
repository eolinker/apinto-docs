# ErrorLog

### 描述
**Error Log**指的是网关运行过程中的日志记录

### 配置示例
```yaml
# 日志放置目录
log_dir: /var/log/apinto

# 错误日志文件名
error_log_name:  error.log

# 错误日志等级
error_log_level: error

# 错误日志过期时间，默认单位为天，d|天，h|小时
error_log_expire: 7d

# 错误日志切割周期，仅支持day、hour
error_log_period: day
```

### 配置说明

| 字段             | 描述                                                       | 默认值        | 说明                                                         |
| ---------------- | ---------------------------------------------------------- | ------------- | ------------------------------------------------------------ |
| log_dir          | 日志放置目录                                               | /var/log/apinto | 表示放置日志文件的具体目录                                   |
| error_log_name   | 错误日志文件名                                             | error.log     | 表示记录日志的具体文件名，上述配置表示最终生成的运行日志会记录在/var/log/apinto/error.log文件中 |
| error_log_level  | 错误日志等级                                               | error         | 表示日志的记录等级，日志等级可以划分为：debug，info，warn，error，panic五个等级，默认等级为error |
| error_log_expire | 错误日志的过期时间，默认过期单位为天（d），也支持小时（h） | 7d            | 表示错误日志过期时间，过期的日志文件系统将自动删除           |
| error_log_period | 错误日志切割周期，仅支持day、hour                          | day           | 表示日志文件的切割周期。当周期为day时，2021.01.01所生成的日志记录和2021.01.02所生成的日志记录将分开存储在不同的日志文件中 |

#### 日志等级说明

1. 日志等级：默认为 **error**

   - Panic：若worker进程打印panic日志，则worker进程重启，若master进程打印panic日志，则打印日志后，程序退出
   - Error：该日志等级报错但程序不退出，此类报错会影响到流程的正常返回
   - Warn：该日志等级报错但程序不退出，此类报错可能影响到流程的正常返回
   - Info：该日志等级输出程序的运行信息
   - Debug：该日志等级输出程序的调试信息，供调试时使用

2. 日志等级包含关系：**Debug ⊇ Info ⊇ Warn ⊇ Error ⊇ Panic**

   **上述包含关系中，高等级的日志将包含低等级日志的所有内容**

