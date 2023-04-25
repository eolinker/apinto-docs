# FAQ

## plugin proxy_rewrite not found
问题：
![](http://data.eolinker.com/course/kZtZ7ref1af11db6d43402400277f5e032439306d4b8094.png)

解决方法：

![](http://data.eolinker.com/course/cJLcyR4402f948782828cf53a32ec2a567f7d3a81cdb3c2.png)

## 上游服务和API的超时时间的含义
* 上游服务：规定转发请求到上游的超时时间大小，当转发请求市场超过上游设定的超时时间时，会返回`504`状态码
* API：请求转发到上游的总超时时间，包含重试操作，每次重试的请求时间超过API设定的超时时间时，会返回`504`状态码