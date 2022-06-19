# formatter

### 功能描述

Formatter主要应用于规定待记录的日志字段，在实际调用时获取指定字段的具体值以生成详细的日志内容，并将日志内容格式化成规定的格式给到[output输出器](/docs/outputer/file.md)进行记录

### 类型支持

| 类型 | 说明                           |
| ---- | ------------------------------ |
| json | 将日志内容格式化为json格式输出 |
| line | 将日志内容格式化为line格式输出 |

### 输出流程

![](http://data.eolinker.com/course/2UJr1mbd493864877b08887aa92d3c32f1ab8aa5fb959ea.png)
