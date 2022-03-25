# 配置简介
系统配置指的是网关运行过程的全局配置情况，主要用于记录目录等环境变量的配置，目前的可配置项包括：
- 数据文件放置目录
- pid文件放置目录
- 日志文件放置目录
- socket文件放置目录
- apinto运行配置地址
- 扩展仓库目录
- 错误日志详细配置

### 默认配置文件路径
  ```
  /etc/apinto/apinto.yml
  ```
### 配置实例
```yaml
# 数据文件放置目录
data_dir: /var/lib/apinto

# pid文件放置地址
pid_dir: /var/run/apinto

# 日志放置目录
log_dir: /var/log/apinto

# socket放置目录
socket_dir: /tmp/apinto

# apinto运行配置地址
config: /etc/apinto/config.yml

# 扩展仓库目录
extends_dir: /var/lib/apinto/extends

# 错误日志文件名：
error_log_name:  error.log

# 错误日志等级
error_log_level: error

# 错误日志过期时间，默认单位为天，d|天，h|小时
error_log_expire: 7d

# 错误日志切割周期，仅支持day、hour
error_log_period: day
```
