import{b as e,o,c as r,a as s,d as u,w as p,F as l,f as a,e as n}from"./app.ec6ae4af.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const c={},d=a('<h1 id="access-log" tabindex="-1"><a class="header-anchor" href="#access-log" aria-hidden="true">#</a> access-log</h1><h3 id="\u63D2\u4EF6\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#\u63D2\u4EF6\u4FE1\u606F" aria-hidden="true">#</a> \u63D2\u4EF6\u4FE1\u606F</h3><table><thead><tr><th>\u540D\u79F0</th><th>\u5B57\u6BB5</th><th>\u5C5E\u6027</th></tr></thead><tbody><tr><td>access-log</td><td>access_log</td><td>\u53EF\u89C2\u6D4B\u6027</td></tr></tbody></table><h3 id="\u529F\u80FD\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u529F\u80FD\u63CF\u8FF0" aria-hidden="true">#</a> \u529F\u80FD\u63CF\u8FF0</h3><p>\u80FD\u591F\u8BB0\u5F55\u5230\u8FBE\u7F51\u5173\u7684http\u8BF7\u6C42\u7684\u8BBF\u95EE\u65E5\u5FD7\uFF0C\u901A\u8FC7\u914D\u7F6E\u7684\u8F93\u51FA\u5668\u5C06\u7B5B\u9009\u540E\u7684\u4FE1\u606F\u8F93\u51FA\u5230\u7279\u5B9A\u7684\u5730\u65B9\u3002</p>',5),b=s("strong",null,"\u5907\u6CE8",-1),q=n("\uFF1A\u8F93\u51FA\u5668\u7684\u6559\u7A0B"),h=n("\u70B9\u6B64"),m=n("\u8FDB\u884C\u8DF3\u8F6C\u3002"),g=a(`<h4 id="\u914D\u7F6E\u53C2\u6570\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u53C2\u6570\u8BF4\u660E" aria-hidden="true">#</a> \u914D\u7F6E\u53C2\u6570\u8BF4\u660E</h4><table><thead><tr><th>\u53C2\u6570\u540D</th><th>\u8BF4\u660E</th><th>\u662F\u5426\u5FC5\u586B</th><th>\u9ED8\u8BA4\u503C</th><th>\u503C\u53EF\u80FD\u6027</th></tr></thead><tbody><tr><td>output</td><td>\u8F93\u51FA\u5668id\u6570\u7EC4</td><td>\u662F</td><td></td><td>string_array</td></tr></tbody></table><h4 id="open-api-\u8BF7\u6C42\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#open-api-\u8BF7\u6C42\u793A\u4F8B" aria-hidden="true">#</a> Open API \u8BF7\u6C42\u793A\u4F8B</h4><h5 id="\u914D\u7F6E\u8F93\u51FA\u5668-\u4EE5\u6587\u4EF6\u8F93\u51FA\u5668\u4E3A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u8F93\u51FA\u5668-\u4EE5\u6587\u4EF6\u8F93\u51FA\u5668\u4E3A\u4F8B" aria-hidden="true">#</a> \u914D\u7F6E\u8F93\u51FA\u5668\uFF08\u4EE5\u6587\u4EF6\u8F93\u51FA\u5668\u4E3A\u4F8B\uFF09</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token punctuation">\\</span>
  <span class="token string">&#39;http://127.0.0.1:9400/api/output&#39;</span> <span class="token punctuation">\\</span>
  -H <span class="token string">&#39;Content-Type:application/json&#39;</span> <span class="token punctuation">\\</span>
  -d <span class="token string">&#39;{
	&quot;name&quot;: &quot;demo_file&quot;,
	&quot;driver&quot;: &quot;file_output&quot;,
	&quot;config&quot;: {
		&quot;dir&quot;: &quot;/var/log&quot;,
		&quot;file&quot;: &quot;demo&quot;,
		&quot;period&quot;: &quot;day&quot;,
		&quot;expire&quot;: 1,
		&quot;type&quot;: &quot;line&quot;,
		&quot;formatter&quot;: {
			&quot;fields&quot;: [&quot;$request_id&quot;, &quot;$request&quot;, &quot;$status&quot;, &quot;@time&quot;, &quot;@proxy&quot;, &quot;$response_time&quot;],
			&quot;time&quot;: [&quot;$msec&quot;, &quot;$time_iso8601&quot;, &quot;$time_local&quot;],
			&quot;proxy&quot;: [&quot;$proxy_uri&quot;, &quot;$proxy_scheme&quot;, &quot;$proxy_addr&quot;]
		}
	}
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>\u8FD4\u56DE\u7684\u8F93\u51FA\u5668id\u4E3A<code>demo_file@output</code></p><p><strong>output\u793A\u4F8B\u8BF4\u660E</strong>\uFF1A\u8BBF\u95EE\u65E5\u5FD7\u5C06\u8F93\u51FA\u5230<code>/var/log</code>\u76EE\u5F55\u4E0B\u7684<code>demo.log</code>\u6587\u4EF6\uFF0C\u6BCF\u5929\u751F\u6210\u4E00\u4E2A\u65B0\u7684\u65E5\u5FD7\u6587\u4EF6\uFF0C\u65E7\u65E5\u5FD7\u6587\u4EF6\u4FDD\u7559\u4E00\u5929\u540E\u5220\u9664\u3002\u65E5\u5FD7\u683C\u5F0F\u4E3Aline\uFF0C\u8F93\u51FA\u7684\u53D8\u91CF\u5982\u914D\u7F6E\u6240\u793A\u3002</p><h5 id="\u5168\u5C40\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5168\u5C40\u914D\u7F6E" aria-hidden="true">#</a> \u5168\u5C40\u914D\u7F6E</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/setting/plugin&#39;</span> <span class="token punctuation">\\</span>
-H <span class="token string">&#39;Content-Type:application/json&#39;</span> <span class="token punctuation">\\</span>
-d <span class="token string">&#39;{
    &quot;plugins&quot;:[{
        &quot;id&quot;:&quot;eolinker.com:apinto:access_log&quot;,
        &quot;name&quot;:&quot;my_access_log&quot;,
        &quot;type&quot;:&quot;router&quot;,
        &quot;status&quot;:&quot;enable&quot;
    }]
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h5 id="\u914D\u7F6E\u5E26\u6709access-log\u63D2\u4EF6\u7684service\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u5E26\u6709access-log\u63D2\u4EF6\u7684service\u670D\u52A1" aria-hidden="true">#</a> \u914D\u7F6E\u5E26\u6709access-log\u63D2\u4EF6\u7684service\u670D\u52A1</h5><p>\u5168\u5C40\u63D2\u4EF6\u5177\u4F53\u914D\u7F6E\u70B9\u6B64\u8FDB\u884C<a href="/docs/plugins">\u8DF3\u8F6C</a>\u3002</p><p><strong>\u5907\u6CE8</strong>\uFF1A\u533F\u540D\u670D\u52A1\u914D\u7F6E\u7684\u662Fapinto\u5B98\u65B9\u793A\u4F8B\u63A5\u53E3\uFF0C\u5C06\u8FD4\u56DE\u8BF7\u6C42\u7684\u76F8\u5173\u4FE1\u606F\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/service&#39;</span> <span class="token punctuation">\\</span>
-H <span class="token string">&#39;Content-Type:application/json&#39;</span> <span class="token punctuation">\\</span>
-d <span class="token string">&#39;{
	&quot;name&quot;: &quot;access_log_service&quot;,
	&quot;driver&quot;: &quot;http&quot;,
	&quot;timeout&quot;: 3000,
	&quot;retry&quot;: 3,
	&quot;scheme&quot;: &quot;http&quot;,
	&quot;anonymous&quot;: {
		&quot;type&quot;: &quot;round-robin&quot;,
		&quot;config&quot;: &quot;demo-apinto.eolink.com:8280&quot;
	},
	&quot;plugins&quot;: {
		&quot;my_access_log&quot;: {
			&quot;disable&quot;: false,
			&quot;config&quot;: {
				&quot;output&quot;: [&quot;demo_file@output&quot;]
			}
		}
	}
}&#39;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h5 id="\u7ED1\u5B9A\u8DEF\u7531" tabindex="-1"><a class="header-anchor" href="#\u7ED1\u5B9A\u8DEF\u7531" aria-hidden="true">#</a> \u7ED1\u5B9A\u8DEF\u7531</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/router&#39;</span> <span class="token punctuation">\\</span>
-H <span class="token string">&#39;Content-Type:application/json&#39;</span> <span class="token punctuation">\\</span>
-d <span class="token string">&#39;{
    &quot;name&quot;:&quot;access_log_router&quot;,
    &quot;driver&quot;:&quot;http&quot;,
    &quot;listen&quot;:8080,
    &quot;rules&quot;:[{
        &quot;location&quot;:&quot;/demo&quot;
    }],
    &quot;target&quot;:&quot;access_log_service@service&quot;
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h5 id="\u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B" aria-hidden="true">#</a> \u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -i -X GET <span class="token string">&#39;http://127.0.0.1:8080/demo&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h5 id="\u8BBF\u95EE\u65E5\u5FD7\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u8BBF\u95EE\u65E5\u5FD7\u793A\u4F8B" aria-hidden="true">#</a> \u8BBF\u95EE\u65E5\u5FD7\u793A\u4F8B</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>a72e12f9-e33a-4425-b7c2-7e48b0b598bf    GET /demo HTTP/1.1      200     &quot;1640601794 2021-12-27T18:43:14.294+08:00 2021-12-27 18:43:14&quot;  &quot;http://demo-apinto.eolink.com:8280/demo http demo-apinto.eolink.com:8280&quot;  1389
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,19);function _(f,v){const t=e("RouterLink");return o(),r(l,null,[d,s("p",null,[b,q,u(t,{to:"/docs/outputer/file.html"},{default:p(()=>[h]),_:1}),m]),g],64)}var y=i(c,[["render",_]]);export{y as default};
