import{f as n}from"./app.ec6ae4af.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},t=n(`<h1 id="\u54CD\u5E94\u91CD\u5199" tabindex="-1"><a class="header-anchor" href="#\u54CD\u5E94\u91CD\u5199" aria-hidden="true">#</a> \u54CD\u5E94\u91CD\u5199</h1><h3 id="\u63D2\u4EF6\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#\u63D2\u4EF6\u4FE1\u606F" aria-hidden="true">#</a> \u63D2\u4EF6\u4FE1\u606F</h3><table><thead><tr><th>\u540D\u79F0</th><th>\u5B57\u6BB5</th><th>\u5C5E\u6027</th></tr></thead><tbody><tr><td>\u54CD\u5E94\u91CD\u5199</td><td>response_rewrite</td><td>\u53C2\u6570\u5904\u7406</td></tr></tbody></table><h3 id="\u529F\u80FD\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u529F\u80FD\u63CF\u8FF0" aria-hidden="true">#</a> \u529F\u80FD\u63CF\u8FF0</h3><p>\u8BE5\u63D2\u4EF6\u7528\u4E8E\u91CD\u5199\u7F51\u5173\u8FD4\u56DE\u7684\u72B6\u6001\u7801\u3001\u54CD\u5E94\u4F53\u3001\u5934\u90E8\u3002\u5F53\u4ECE\u4E0A\u6E38\u8FD4\u56DE\u7684\u54CD\u5E94\u72B6\u6001\u7801\u6EE1\u8DB3\u5BF9\u5E94\u72B6\u6001\u7801\u65F6\uFF0C\u7F51\u5173\u5BF9\u54CD\u5E94\u5185\u5BB9\u8FDB\u884C\u91CD\u5199\u3002</p><p><strong>\u6CE8\u610F\u4E8B\u9879</strong>\uFF1A\u5BF9\u72B6\u6001\u7801\u548C\u54CD\u5E94\u4F53body\u662F\u91CD\u5199\u8986\u76D6\uFF0C\u4F46\u5BF9\u5934\u90E8\u4FE1\u606F\u662F\u65B0\u589E\u6216\u4FEE\u6539\u3002</p><h3 id="open-api" tabindex="-1"><a class="header-anchor" href="#open-api" aria-hidden="true">#</a> Open Api</h3><h4 id="\u914D\u7F6E\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u793A\u4F8B" aria-hidden="true">#</a> \u914D\u7F6E\u793A\u4F8B</h4><p><strong>\u793A\u4F8B\u8BF4\u660E</strong>\uFF1A\u5F53\u54CD\u5E94\u72B6\u6001\u7801\u4E3A200\u6216\u8005404\u65F6\uFF0C\u54CD\u5E94\u72B6\u6001\u7801\u5C06\u88AB\u91CD\u5199\u4E3A201\uFF0C\u54CD\u5E94\u5934\u90E8\u8BBE\u7F6E<code>demo_header: &quot;1&quot;</code>\uFF0Cbody\u88AB\u8986\u76D6\u4E3A<code>{&quot;\u91CD\u5199\u54CD\u5E94\u4F53Body&quot;}</code>(\u4EE5\u4E0B\u914D\u7F6E\u7684body\u5DF2\u7ECF\u8FC7base64\u52A0\u5BC6)\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
	<span class="token property">&quot;status_code&quot;</span><span class="token operator">:</span> <span class="token number">201</span><span class="token punctuation">,</span>
	<span class="token property">&quot;body&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eyLph43lhpnlk43lupTkvZNCb2R5In0=&quot;</span><span class="token punctuation">,</span>
	<span class="token property">&quot;body_base64&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
	<span class="token property">&quot;headers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token property">&quot;demo_header&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">404</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="\u914D\u7F6E\u53C2\u6570\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u53C2\u6570\u8BF4\u660E" aria-hidden="true">#</a> \u914D\u7F6E\u53C2\u6570\u8BF4\u660E</h4><table><thead><tr><th>\u53C2\u6570\u540D</th><th>\u8BF4\u660E</th><th>\u662F\u5426\u5FC5\u586B</th><th>\u9ED8\u8BA4\u503C</th><th>\u503C\u53EF\u80FD\u6027</th></tr></thead><tbody><tr><td>status_code</td><td>\u65B0\u54CD\u5E94\u72B6\u6001\u7801</td><td>\u662F</td><td></td><td>[200,598]</td></tr><tr><td>body</td><td>\u65B0\u54CD\u5E94\u4F53</td><td>\u5426</td><td></td><td>string</td></tr><tr><td>body_base64</td><td>\u65B0\u54CD\u5E94\u4F53\u7684\u914D\u7F6E\u5185\u5BB9\u662F\u5426\u5DF2\u7ECF\u8FC7base64\u52A0\u5BC6</td><td>\u5426</td><td>false</td><td>[true,false]</td></tr><tr><td>headers</td><td>\u65B0\u589E\u7684\u54CD\u5E94\u5934\u90E8\u4FE1\u606F</td><td>\u5426</td><td></td><td>object</td></tr><tr><td>match</td><td>\u5339\u914D\u6761\u4EF6</td><td>\u662F</td><td></td><td>object</td></tr><tr><td>match-&gt;code</td><td>\u5339\u914D\u72B6\u6001\u7801</td><td>\u662F</td><td></td><td>int_array</td></tr></tbody></table><p><strong>\u6CE8\u610F\u4E8B\u9879</strong>\uFF1A</p><ul><li>match-&gt;code\u53C2\u6570\u662Fint\u6570\u7EC4\uFF0C\u540C\u65F6\u6BCF\u4E2A\u503C\u5F97\u8303\u56F4\u662F[200,598]\u3002</li></ul><h4 id="open-api-\u8BF7\u6C42\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#open-api-\u8BF7\u6C42\u793A\u4F8B" aria-hidden="true">#</a> Open API \u8BF7\u6C42\u793A\u4F8B</h4><h5 id="\u5168\u5C40\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5168\u5C40\u914D\u7F6E" aria-hidden="true">#</a> \u5168\u5C40\u914D\u7F6E</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/setting/plugin&#39;</span> <span class="token punctuation">\\</span>
-H <span class="token string">&#39;Content-Type:application/json&#39;</span> <span class="token punctuation">\\</span>
-d <span class="token string">&#39;{
	&quot;plugins&quot;: [{
		&quot;id&quot;: &quot;eolinker.com:apinto:response_rewrite&quot;,
		&quot;name&quot;: &quot;response_rewrite&quot;,
		&quot;type&quot;: &quot;service&quot;,
		&quot;status&quot;: &quot;enable&quot;
	}]
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h5 id="\u914D\u7F6E\u5E26\u6709\u54CD\u5E94\u91CD\u5199\u63D2\u4EF6\u7684service\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u5E26\u6709\u54CD\u5E94\u91CD\u5199\u63D2\u4EF6\u7684service\u670D\u52A1" aria-hidden="true">#</a> \u914D\u7F6E\u5E26\u6709\u54CD\u5E94\u91CD\u5199\u63D2\u4EF6\u7684service\u670D\u52A1</h5><p><strong>\u914D\u7F6E\u8BF4\u660E</strong>\uFF1A\u5F53\u54CD\u5E94\u72B6\u6001\u7801\u4E3A200\u6216\u8005404\u65F6\uFF0C\u54CD\u5E94\u72B6\u6001\u7801\u5C06\u88AB\u91CD\u5199\u4E3A201\uFF0C\u54CD\u5E94\u5934\u90E8\u8BBE\u7F6E<code>demo_header: &quot;1&quot;</code>\uFF0Cbody\u88AB\u8986\u76D6\u4E3A<code>{&quot;\u91CD\u5199\u54CD\u5E94\u4F53Body&quot;}</code>(\u4EE5\u4E0B\u914D\u7F6E\u7684body\u5DF2\u7ECF\u8FC7base64\u52A0\u5BC6)\u3002</p><p>\u5168\u5C40\u63D2\u4EF6\u5177\u4F53\u914D\u7F6E\u70B9\u6B64\u8FDB\u884C<a href="/docs/plugins">\u8DF3\u8F6C</a>\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/service&#39;</span> -H <span class="token string">&#39;Content-Type:application/json&#39;</span> -d <span class="token string">&#39;{
	&quot;name&quot;: &quot;response_rewrite_service&quot;,
	&quot;driver&quot;: &quot;http&quot;,
	&quot;timeout&quot;: 3000,
	&quot;retry&quot;: 3,
	&quot;scheme&quot;: &quot;http&quot;,
	&quot;anonymous&quot;: {
		&quot;type&quot;: &quot;round-robin&quot;,
		&quot;config&quot;: &quot;demo-apinto.eolink.com:8280&quot;
	},
	&quot;plugins&quot;: {
		&quot;response_rewrite&quot;: {
			&quot;disable&quot;: false,
			&quot;config&quot;: {
				&quot;status_code&quot;: 201,
				&quot;body&quot;: &quot;eyLph43lhpnlk43lupTkvZNCb2R5In0=&quot;,
				&quot;body_base64&quot;: true,
				&quot;headers&quot;: {
					&quot;demo_header&quot;: &quot;1&quot;
				},
				&quot;match&quot;: {
					&quot;code&quot;: [404,200]
				}
			}
		}
	}
}&#39;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h5 id="\u7ED1\u5B9A\u8DEF\u7531" tabindex="-1"><a class="header-anchor" href="#\u7ED1\u5B9A\u8DEF\u7531" aria-hidden="true">#</a> \u7ED1\u5B9A\u8DEF\u7531</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/router&#39;</span> <span class="token punctuation">\\</span>
-H <span class="token string">&#39;Content-Type:application/json&#39;</span> <span class="token punctuation">\\</span>
-d <span class="token string">&#39;{
    &quot;name&quot;:&quot;response_rewrite_router&quot;,
    &quot;driver&quot;:&quot;http&quot;,
    &quot;listen&quot;:8080,
    &quot;rules&quot;:[{
        &quot;location&quot;:&quot;/demo&quot;
    }],
    &quot;target&quot;:&quot;response_rewrite_service@service&quot;
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h5 id="\u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B" aria-hidden="true">#</a> \u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -i -X GET <span class="token string">&#39;http://127.0.0.1:8080/demo&#39;</span> -H <span class="token string">&#39;Content-Type:application/json&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h5 id="\u63A5\u53E3\u8BBF\u95EE\u8FD4\u56DE\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u8BBF\u95EE\u8FD4\u56DE\u793A\u4F8B" aria-hidden="true">#</a> \u63A5\u53E3\u8BBF\u95EE\u8FD4\u56DE\u793A\u4F8B</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>HTTP/1.1 201 Created
Server: fasthttp
Date: Mon, 13 Dec 2021 03:36:50 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 23
Demo_header: 1

{&quot;\u91CD\u5199\u54CD\u5E94\u4F53Body&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,27);function e(r,p){return t}var l=s(a,[["render",e]]);export{l as default};
