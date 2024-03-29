
# 服务端证书

| 类别  | 说明                                               |
|-----|--------------------------------------------------|
| 证书  | 用于客户端与网关间的SSL/TLS加密通信，仅支持域名证书，该功能在v0.9.0及后续版本中支持 |

### OpenAPI配置证书

#### 请求参数说明


| 参数名      | 值类型 | 是否必填 | 值可能性 | 默认值 | 说明         |
| ----------- | ------ | -------- | -------- | ------ | :----------- |
| name        | string | 是       |          |        | 实例名       |
| driver      | string | 是       | server   |        | 证书驱动类型 |
| description | string | 否       |          |        | 描述         |
| key         | string | 是       |          |        | 密钥内容     |
| pem         | string | 是       |          |        | 证书内容     |

#### 返回参数说明


| 参数名         | 类型         | 是否必含 | 说明    |
|-------------|------------|------|-------|
| id          | string     | 是    | 实例id  |
| name        | string     | 是    | 实例名   |
| driver      | string     | 是    | 驱动名   |
| description | string     | 是    | 描述    |
| profession  | string     | 是    | 模块名   |
| create      | string     | 是    | 创建时间  |
| update      | string     | 是    | 更新时间  |
| key         | string     | 是    | 密钥内容  |
| pem         | string     | 是    | 证书内容  |

### 配置前准备
配置文件网关监听地址部分需要设置https协议监听，示例如下：
```yaml
version: 2
...
gateway:
  listen_urls:
  - https://0.0.0.0:8099
  - http://0.0.0.0:8099
...
```

### 配置示例
```shell
curl -X POST  \
  'http://127.0.0.1:9400/api/certificate' \
  -H 'Content-Type:application/json' \
  -d '{
	"name": "demo_certificate",
	"driver": "server",
	"description": "示例证书",
	"key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAzW3J0RWA7sutdeBYFe8BrZSQD2fSKZZwZBcD6SLwm5ufjRqA\n21VWeMukG0MhiWu3IhRrVarQQrb70gLwWKyy26a1cGZasWDGvG0unBBw44MueSno\ntx+4tXLg4v0ffWNtTEy7GJxhxROMDtBS35d1PJ0bd1enz2ihbsOhyHA+WNj2T+Sx\n3NdFZj2dxmgRS118NGe/1vh4xm+fkZx4wWbEJM615J/SesRE+dvisyUesULuSC0U\ndUjf2m0OuidZ8mrwqvXtN8xiUKg3KjwudxVpt+1aFDeV/4svp91Ll1Vm82vhIKKK\nx4pfNWGAsAXhLr+2oHr0mq/alzDqjC6ZWAnz2wIDAQABAoIBAE0Id+8LOMOTJhM3\nUuC6tO7h8FmOjY0hyDiINuO0QfSgGWcAwsQ8zoXSm1HLzSYqecxySsOfn6P82RZq\nGrWt4Q4kCBLDlwu/5hZffORx99sg5Irz77vHzexgzTrhP282GxTLCzfR4InV6CXf\n8cu9kG1v3o5UlO1eZ3bRLngquv52hX1muskUW+WFAUAaDGkkwfWSjC2sNVyZcZEw\nH+7u+M/c3HglZSTRvrG5SdbkfsxQ0zBAdTJNwyoTHZ+IPqpbO70PEF6HWudp2yYW\nUBlQmwW3iXMYHNLVuRgxu2OrYXuOiSsTmdiJagLsABabYceSQ9Uazns8GVqtNNJZ\nVBc7KRECgYEA5d17Hg7hudIgpLF1VTfgomyimJ1UjMKp3OTx8RMbTrVbhN2d2kKt\nlNw0V8vxsJxTPu3s9YxDdkfVdww2j0XmMHwech80lkkPVRroyKhtFZLhLtTG4h2vUn\nIR79iknV06KZ8GMeSh0NPLc/r5okgaXT86PDJzPUecq+DfU/UwMjycsCgYEA5MkO\nxtVmiDsWGv4sfFf6F33gwAiD98Gt73CMXzNDEhIKPkMOpNhqfIQiygsMDrOcLugL\nIsWtVohDCskSCtyH2rPxwPHckiT1jpyLFZ33pbixVMtwbRDKoeyHZ0lK1U1UiidZ\na1ECpGSUUaeY4MsNUhXPj/ZtPqeJLLXfCRMWfDECgYB6WHIpQ359awwY3KM44m7b\nxLqeRE82RH4opmroB2VndTvq8hIMk6TUMIhjmpdfizT7r6OJ5kgZ8o3XnpZijo8Y\nc68sUIoIZao+H2uz6kVvMn+/SHcYlZdoF5iXPEllRYxt2DPM+r2K7XYmPwLjRqIT\ncbxzZzDWSkTyJPC5fFhWFQKBgQDHaL8qayI9J1LzIAtiLcRb6WmVt1ZfAj86bZzL\n9YBGJdcrwYLoB4F5GirAc7SEs+QztijOnAGjZI0av3qsYN9ArorOo4CfGPu225cW\ntmL93Ocjg1ZwmawkSmcSjX1eQVKoP/feY/Ormcb1DOFhPVpU65HIZv99FsWnZLYL\n0MlOYQKBgDg8ayJRjOODoQ4p5h4AcNshLhnw51kDEqCyUa2VbERi3VX5Ug/JFX7v\n/NTuDB1iKrZLej2JFPYE6FHqwHv+PzHwxSYgJviPS0D3JH+L3tLBotactfjRXKs/\nuhpHmUXpwQQmLCnM1UyqrIny/BawIes8ssEh/twaaObrrh/bZ9Dv\n-----END RSA PRIVATE KEY-----\n",
    "pem": "-----BEGIN CERTIFICATE-----\nMIIGAjCCBOqgAwIBAgIQAX9tLliwgnIPfdoWFLULlTANBgkqhkiG9w0BAQsFADBu\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\nd3cuZGlnaWNlcnQuY29tMS0wKwYDVQQDEyRFbmNyeXB0aW9uIEV2ZXJ5d2hlcmUg\nRFYgVExTIENBIC0gRzEwHhcNMjMwMTI5MDAwMDAwWhcNMjQwMTI4MjM1OTU5WjAY\nMRYwFAYDVQQDEw1jaG9vc3ktbGl1LmNuMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A\nMIIBCgKCAQEAzW3J0RWA7sutdeBYFe8BrZSQD2fSKZZwZBcD6SLwm5ufjRqA21VW\neMukG0MhiWu3IhRrVarQQrb70gLwWKyy26a1cGZasWDGvG0unBBw44MueSnotx+4\ntXLg4v0ffWNtTEy7GJxhxROMDtBS35d1PJ0bd1enz2ihbsOhyHA+WNj2T+Sx3NdF\nZj2dxmgRS118NGe/1vh4xm+fkZx4wWbEJM615J/SesRE+dvisyUesULuSC0UdUjf\n2m0OuidZ8mrwqvXtN8xiUKg3KjwudxVpt+1aFDeV/4svp91Ll1Vm82vhIKKKx4pf\nNWGAsAXhLr+2oHr0mq/alzDqjC6ZWAnz2wIDAQABo4IC8DCCAuwwHwYDVR0jBBgw\nFoAUVXRPsnJP9WC6UNHX5lFcmgGHGtcwHQYDVR0OBBYEFDjKqVFNn74WbQl5zMl+\nfo5QHC2DMCsGA1UdEQQkMCKCDWNob29zeS1saXUuY26CEXd3dy5jaG9vc3ktbGl1\nLmNuMA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUH\nAwIwPgYDVR0gBDcwNTAzBgZngQwBAgEwKTAnBggrBgEFBQcCARYbaHR0cDovL3d3\ndy5kaWdpY2VydC5jb20vQ1BTMIGABggrBgEFBQcBAQR0MHIwJAYIKwYBBQUHMAGG\nGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0LmNvbTBKBggrBgEFBQcwAoY+aHR0cDovL2Nh\nY2VydHMuZGlnaWNlcnQuY29tL0VuY3J5cHRpb25FdmVyeXdoZXJlRFZUTFNDQS1H\nMS5jcnQwCQYDVR0TBAIwADCCAX4GCisGAQQB1nkCBAIEggFuBIIBagFoAHYAdv+I\nPwq2+5VRwmHM9Ye6NLSkzbsp3GhCCp/mZ0xaOnQAAAGF/Ia97gAABAMARzBFAiEA\n7pd/AuML+S3e8VquEQ8eAHIuRFkarMIAjAmlBP9JmIgCIBpRI15pD6a5Lw/Lhilg\nejAqPSevBsUOCcECrRIApdDWAHYASLDja9qmRzQP5WoC+p0w6xxSActW3SyB2bu/\nqznYhHMAAAGF/Ia9uAAABAMARzBFAiB6Zmp7w/cjFErP7BS5vg95frPfPbwPzs/k\nuOpIDP018AIhAJ6sOjUqCPGYU+59aTn9LbaFqW13EvaVWZe1jh93zazTAHYAO1N3\ndT4tuYBOizBbBv5AO2fYT8P0x70ADS1yb+H61BcAAAGF/Ia9qwAABAMARzBFAiEA\nktjHNKA6Naavfwyw0EOQhNZYUNRz6EWTbUHiDoD45CMCICCjoNH8+RQs4Lzf1Fnw\nqoKPcjaufcH+dUwoMWdtCOpdMA0GCSqGSIb3DQEBCwUAA4IBAQCJ1+PJXkBaPpOv\n8YjSEk6B2iu5LJbXl92wWczfOJIwD3pZ6eSHO56IA8MAPNmCkSc496tMNRER97Op\nonGER5xvK/TnbvYV6J1YhszQuTAWddw/B5CKF2KbuR/OQbbG8RKkheH8x3SzsFhq\nwW3PmAeU4dJhmoA75D5XX8qbb7uBp+F2h7tAmHBWOtPV87jTqyii97mryFdLDpCY\nem2b3KvHBvi7pX+ifApkYtOUH0d61PTkBuqfBayXvbTDmyLih6bLyq6PtUVXqxA1\nQpjS1V3rNMaQsHKzBYhva0LHTSd4I6XHRlhqtBGnH+Tu/JQvspzpXMgvi+THvJ6c\nbEYIe/ZU\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIEqjCCA5KgAwIBAgIQAnmsRYvBskWr+YBTzSybsTANBgkqhkiG9w0BAQsFADBh\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\nd3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\nQTAeFw0xNzExMjcxMjQ2MTBaFw0yNzExMjcxMjQ2MTBaMG4xCzAJBgNVBAYTAlVT\nMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\nb20xLTArBgNVBAMTJEVuY3J5cHRpb24gRXZlcnl3aGVyZSBEViBUTFMgQ0EgLSBH\nMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALPeP6wkab41dyQh6mKc\noHqt3jRIxW5MDvf9QyiOR7VfFwK656es0UFiIb74N9pRntzF1UgYzDGu3ppZVMdo\nlbxhm6dWS9OK/lFehKNT0OYI9aqk6F+U7cA6jxSC+iDBPXwdF4rs3KRyp3aQn6pj\npp1yr7IB6Y4zv72Ee/PlZ/6rK6InC6WpK0nPVOYR7n9iDuPe1E4IxUMBH/T33+3h\nyuH3dvfgiWUOUkjdpMbyxX+XNle5uEIiyBsi4IvbcTCh8ruifCIi5mDXkZrnMT8n\nwfYCV6v6kDdXkbgGRLKsR4pucbJtbKqIkUGxuZI2t7pfewKRc5nWecvDBZf3+p1M\npA8CAwEAAaOCAU8wggFLMB0GA1UdDgQWBBRVdE+yck/1YLpQ0dfmUVyaAYca1zAf\nBgNVHSMEGDAWgBQD3lA1VtFMu2bwo+IbG8OXsj3RVTAOBgNVHQ8BAf8EBAMCAYYw\nHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMBIGA1UdEwEB/wQIMAYBAf8C\nAQAwNAYIKwYBBQUHAQEEKDAmMCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5kaWdp\ndwdwdwdwccewdeYDVR0fBDswOTA3oDWgM4YxaHR0cDovL2NybDMuZGlnaWNlcnQu\nY29tL0RpZ2lDZXJ0R2xvYmFsUm9vdENBLmNybDBMBgNVHSAERTBDMDcGCWCGSAGG\n/WwBAjAqMCgGCCsGAQUFBwIBFhxodHRwczovL3d3dy5kaWdpY2VydC5jb20vQ1BT\nMAgGBmeBDAECATANBgkqhkiG9w0BAQsFAAOCAQEAK3Gp6/aGq7aBZsxf/oQ+TD/B\nSwW3AU4ETK+GQf2kFzYZkby5SFrHdPomunx2HBzViUchGoofGgg7gHW0W3MlQAXW\nM0r5LUvStcr82QDWYNPaUy4taCQmyaJ+VB+6wxHstSigOlSNF2a6vg4rgexixeiV\n4YSB03Yqp2t3TeZHM9ESfkus74nQyW7pRGezj+TC44xCagCQQOzzNmzEAP2SnCrJ\nsNE2DpRVMnL8J6xBRdjmOsC3N6cQuKuRXbzByVBjCqAA8t1L0I+9wXJerLPyErjy\nrMKWaBFLmfK/AHNF4ZihwPGOc7w6UHczBZXH5RFzJNnww+WnKuTPI0HfnVH8lg==\n-----END CERTIFICATE-----\n",
}'
```

**返回结果示例**

```json
{
  "create": "2023-01-29 16:42:49",
  "description": "示例证书",
  "driver": "server",
  "id": "demo_certificate@certificate",
  "name": "demo_certificate",
  "key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAzW3J0RWA7sutdeBYFe8BrZSQD2fSKZZwZBcD6SLwm5ufjRqA\n21VWeMukG0MhiWu3IhRrVarQQrb70gLwWKyy26a1cGZasWDGvG0unBBw44MueSno\ntx+4tXLg4v0ffWNtTEy7GJxhxROMDtBS35d1PJ0bd1enz2ihbsOhyHA+WNj2T+Sx\n3NdFZj2dxmgRS118NGe/1vh4xm+fkZx4wWbEJM615J/SesRE+dvisyUesULuSC0U\ndUjf2m0OuidZ8mrwqvXtN8xiUKg3KjwudxVpt+1aFDeV/4svp91Ll1Vm82vhIKKK\nx4pfNWGAsAXhLr+2oHr0mq/alzDqjC6ZWAnz2wIDAQABAoIBAE0Id+8LOMOTJhM3\nUuC6tO7h8FmOjY0hyDiINuO0QfSgGWcAwsQ8zoXSm1HLzSYqecxySsOfn6P82RZq\nGrWt4Q4kCBLDlwu/5hZffORx99sg5Irz77vHzexgzTrhP282GxTLCzfR4InV6CXf\n8cu9kG1v3o5UlO1eZ3bRLngquv52hX1muskUW+WFAUAaDGkkwfWSjC2sNVyZcZEw\nH+7u+M/c3HglZSTRvrG5SdbkfsxQ0zBAdTJNwyoTHZ+IPqpbO70PEF6HWudp2yYW\nUBlQmwW3iXMYHNLVuRgxu2OrYXuOiSsTmdiJagLsABabYceSQ9Uazns8GVqtNNJZ\nVBc7KRECgYEA5d17Hg7hudIgpLF1VTfgomyimJ1UjMKp3OTx8RMbTrVbhN2d2kKt\nlNw0V8vxsJxTPu3s9YxDdkfVdww2j0XmMHwech80lkkPVRroyKhtFZLhLtTG4h2vUn\nIR79iknV06KZ8GMeSh0NPLc/r5okgaXT86PDJzPUecq+DfU/UwMjycsCgYEA5MkO\nxtVmiDsWGv4sfFf6F33gwAiD98Gt73CMXzNDEhIKPkMOpNhqfIQiygsMDrOcLugL\nIsWtVohDCskSCtyH2rPxwPHckiT1jpyLFZ33pbixVMtwbRDKoeyHZ0lK1U1UiidZ\na1ECpGSUUaeY4MsNUhXPj/ZtPqeJLLXfCRMWfDECgYB6WHIpQ359awwY3KM44m7b\nxLqeRE82RH4opmroB2VndTvq8hIMk6TUMIhjmpdfizT7r6OJ5kgZ8o3XnpZijo8Y\nc68sUIoIZao+H2uz6kVvMn+/SHcYlZdoF5iXPEllRYxt2DPM+r2K7XYmPwLjRqIT\ncbxzZzDWSkTyJPC5fFhWFQKBgQDHaL8qayI9J1LzIAtiLcRb6WmVt1ZfAj86bZzL\n9YBGJdcrwYLoB4F5GirAc7SEs+QztijOnAGjZI0av3qsYN9ArorOo4CfGPu225cW\ntmL93Ocjg1ZwmawkSmcSjX1eQVKoP/feY/Ormcb1DOFhPVpU65HIZv99FsWnZLYL\n0MlOYQKBgDg8ayJRjOODoQ4p5h4AcNshLhnw51kDEqCyUa2VbERi3VX5Ug/JFX7v\n/NTuDB1iKrZLej2JFPYE6FHqwHv+PzHwxSYgJviPS0D3JH+L3tLBotactfjRXKs/\nuhpHmUXpwQQmLCnM1UyqrIny/BawIes8ssEh/twaaObrrh/bZ9Dv\n-----END RSA PRIVATE KEY-----\n",
  "pem": "-----BEGIN CERTIFICATE-----\nMIIGAjCCBOqgAwIBAgIQAX9tLliwgnIPfdoWFLULlTANBgkqhkiG9w0BAQsFADBu\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\nd3cuZGlnaWNlcnQuY29tMS0wKwYDVQQDEyRFbmNyeXB0aW9uIEV2ZXJ5d2hlcmUg\nRFYgVExTIENBIC0gRzEwHhcNMjMwMTI5MDAwMDAwWhcNMjQwMTI4MjM1OTU5WjAY\nMRYwFAYDVQQDEw1jaG9vc3ktbGl1LmNuMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A\nMIIBCgKCAQEAzW3J0RWA7sutdeBYFe8BrZSQD2fSKZZwZBcD6SLwm5ufjRqA21VW\neMukG0MhiWu3IhRrVarQQrb70gLwWKyy26a1cGZasWDGvG0unBBw44MueSnotx+4\ntXLg4v0ffWNtTEy7GJxhxROMDtBS35d1PJ0bd1enz2ihbsOhyHA+WNj2T+Sx3NdF\nZj2dxmgRS118NGe/1vh4xm+fkZx4wWbEJM615J/SesRE+dvisyUesULuSC0UdUjf\n2m0OuidZ8mrwqvXtN8xiUKg3KjwudxVpt+1aFDeV/4svp91Ll1Vm82vhIKKKx4pf\nNWGAsAXhLr+2oHr0mq/alzDqjC6ZWAnz2wIDAQABo4IC8DCCAuwwHwYDVR0jBBgw\nFoAUVXRPsnJP9WC6UNHX5lFcmgGHGtcwHQYDVR0OBBYEFDjKqVFNn74WbQl5zMl+\nfo5QHC2DMCsGA1UdEQQkMCKCDWNob29zeS1saXUuY26CEXd3dy5jaG9vc3ktbGl1\nLmNuMA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUH\nAwIwPgYDVR0gBDcwNTAzBgZngQwBAgEwKTAnBggrBgEFBQcCARYbaHR0cDovL3d3\ndy5kaWdpY2VydC5jb20vQ1BTMIGABggrBgEFBQcBAQR0MHIwJAYIKwYBBQUHMAGG\nGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0LmNvbTBKBggrBgEFBQcwAoY+aHR0cDovL2Nh\nY2VydHMuZGlnaWNlcnQuY29tL0VuY3J5cHRpb25FdmVyeXdoZXJlRFZUTFNDQS1H\nMS5jcnQwCQYDVR0TBAIwADCCAX4GCisGAQQB1nkCBAIEggFuBIIBagFoAHYAdv+I\nPwq2+5VRwmHM9Ye6NLSkzbsp3GhCCp/mZ0xaOnQAAAGF/Ia97gAABAMARzBFAiEA\n7pd/AuML+S3e8VquEQ8eAHIuRFkarMIAjAmlBP9JmIgCIBpRI15pD6a5Lw/Lhilg\nejAqPSevBsUOCcECrRIApdDWAHYASLDja9qmRzQP5WoC+p0w6xxSActW3SyB2bu/\nqznYhHMAAAGF/Ia9uAAABAMARzBFAiB6Zmp7w/cjFErP7BS5vg95frPfPbwPzs/k\nuOpIDP018AIhAJ6sOjUqCPGYU+59aTn9LbaFqW13EvaVWZe1jh93zazTAHYAO1N3\ndT4tuYBOizBbBv5AO2fYT8P0x70ADS1yb+H61BcAAAGF/Ia9qwAABAMARzBFAiEA\nktjHNKA6Naavfwyw0EOQhNZYUNRz6EWTbUHiDoD45CMCICCjoNH8+RQs4Lzf1Fnw\nqoKPcjaufcH+dUwoMWdtCOpdMA0GCSqGSIb3DQEBCwUAA4IBAQCJ1+PJXkBaPpOv\n8YjSEk6B2iu5LJbXl92wWczfOJIwD3pZ6eSHO56IA8MAPNmCkSc496tMNRER97Op\nonGER5xvK/TnbvYV6J1YhszQuTAWddw/B5CKF2KbuR/OQbbG8RKkheH8x3SzsFhq\nwW3PmAeU4dJhmoA75D5XX8qbb7uBp+F2h7tAmHBWOtPV87jTqyii97mryFdLDpCY\nem2b3KvHBvi7pX+ifApkYtOUH0d61PTkBuqfBayXvbTDmyLih6bLyq6PtUVXqxA1\nQpjS1V3rNMaQsHKzBYhva0LHTSd4I6XHRlhqtBGnH+Tu/JQvspzpXMgvi+THvJ6c\nbEYIe/ZU\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIEqjCCA5KgAwIBAgIQAnmsRYvBskWr+YBTzSybsTANBgkqhkiG9w0BAQsFADBh\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\nd3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\nQTAeFw0xNzExMjcxMjQ2MTBaFw0yNzExMjcxMjQ2MTBaMG4xCzAJBgNVBAYTAlVT\nMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\nb20xLTArBgNVBAMTJEVuY3J5cHRpb24gRXZlcnl3aGVyZSBEViBUTFMgQ0EgLSBH\nMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALPeP6wkab41dyQh6mKc\noHqt3jRIxW5MDvf9QyiOR7VfFwK656es0UFiIb74N9pRntzF1UgYzDGu3ppZVMdo\nlbxhm6dWS9OK/lFehKNT0OYI9aqk6F+U7cA6jxSC+iDBPXwdF4rs3KRyp3aQn6pj\npp1yr7IB6Y4zv72Ee/PlZ/6rK6InC6WpK0nPVOYR7n9iDuPe1E4IxUMBH/T33+3h\nyuH3dvfgiWUOUkjdpMbyxX+XNle5uEIiyBsi4IvbcTCh8ruifCIi5mDXkZrnMT8n\nwfYCV6v6kDdXkbgGRLKsR4pucbJtbKqIkUGxuZI2t7pfewKRc5nWecvDBZf3+p1M\npA8CAwEAAaOCAU8wggFLMB0GA1UdDgQWBBRVdE+yck/1YLpQ0dfmUVyaAYca1zAf\nBgNVHSMEGDAWgBQD3lA1VtFMu2bwo+IbG8OXsj3RVTAOBgNVHQ8BAf8EBAMCAYYw\nHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMBIGA1UdEwEB/wQIMAYBAf8C\nAQAwNAYIKwYBBQUHAQEEKDAmMCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5kaWdp\ndwdwdwdwccewdeYDVR0fBDswOTA3oDWgM4YxaHR0cDovL2NybDMuZGlnaWNlcnQu\nY29tL0RpZ2lDZXJ0R2xvYmFsUm9vdENBLmNybDBMBgNVHSAERTBDMDcGCWCGSAGG\n/WwBAjAqMCgGCCsGAQUFBwIBFhxodHRwczovL3d3dy5kaWdpY2VydC5jb20vQ1BT\nMAgGBmeBDAECATANBgkqhkiG9w0BAQsFAAOCAQEAK3Gp6/aGq7aBZsxf/oQ+TD/B\nSwW3AU4ETK+GQf2kFzYZkby5SFrHdPomunx2HBzViUchGoofGgg7gHW0W3MlQAXW\nM0r5LUvStcr82QDWYNPaUy4taCQmyaJ+VB+6wxHstSigOlSNF2a6vg4rgexixeiV\n4YSB03Yqp2t3TeZHM9ESfkus74nQyW7pRGezj+TC44xCagCQQOzzNmzEAP2SnCrJ\nsNE2DpRVMnL8J6xBRdjmOsC3N6cQuKuRXbzByVBjCqAA8t1L0I+9wXJerLPyErjy\nrMKWaBFLmfK/AHNF4ZihwPGOc7w6UHczBZXH5RFzJNnww+WnKuTPI0HfnVH8lg==\n-----END CERTIFICATE-----\n",
  "profession": "certificate",
  "update": "2023-01-30 15:33:48"
}
```

配置完成后，即可使用https协议访问接口

