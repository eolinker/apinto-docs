# 访问鉴权

> 作用： 
> * 对请求进行鉴权校验，拦截非法请求 
> * 当鉴权校验成功，请求将被分配**应用id**
> * 根据该**应用id**，执行统一的应用操作，如：[额外参数](/docs/apinto/app/extra-param) 等

## 鉴权驱动

鉴权支持类型如下：

| 鉴权类型                                       | 说明                       |
|-------------------------------------------|--------------------------|
| [AK/SK](/docs/apinto/app/auth/aksk)             | ak/sk鉴权（动态token），一般用于防篡改 |
| [APIKey](/docs/apinto/app/auth/apikey)          | apikey鉴权（静态token）        |
| [Basic](/docs/apinto/app/auth/basic)            | basic鉴权（静态token）         |
| [JWT](/docs/apinto/app/auth/jwt)                  | jwt鉴权（动态token）           |



