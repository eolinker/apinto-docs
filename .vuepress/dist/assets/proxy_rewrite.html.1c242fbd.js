import{f as n}from"./app.ec6ae4af.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},t=n(`<h1 id="\u8F6C\u53D1\u91CD\u5199" tabindex="-1"><a class="header-anchor" href="#\u8F6C\u53D1\u91CD\u5199" aria-hidden="true">#</a> \u8F6C\u53D1\u91CD\u5199</h1><h3 id="\u63D2\u4EF6\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#\u63D2\u4EF6\u4FE1\u606F" aria-hidden="true">#</a> \u63D2\u4EF6\u4FE1\u606F</h3><table><thead><tr><th>\u540D\u79F0</th><th>\u5B57\u6BB5</th><th>\u5C5E\u6027</th></tr></thead><tbody><tr><td>\u8F6C\u53D1\u91CD\u5199</td><td>proxy_rewrite</td><td>\u53C2\u6570\u5904\u7406</td></tr></tbody></table><h3 id="\u529F\u80FD\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u529F\u80FD\u63CF\u8FF0" aria-hidden="true">#</a> \u529F\u80FD\u63CF\u8FF0</h3><p>\u8BE5\u63D2\u4EF6\u7528\u4E8E\u5BF9\u4E0A\u6E38\u4EE3\u7406\u4FE1\u606F\u8FDB\u884C\u91CD\u5199\uFF0C\u652F\u6301\u5BF9 <code>scheme</code>\u3001<code>uri</code>\u3001<code>host</code> \u7684\u91CD\u5199\uFF0C\u540C\u65F6\u652F\u6301\u5BF9\u8F6C\u53D1\u8BF7\u6C42\u7684\u8BF7\u6C42\u5934\u90E8header\u7684\u503C\u8FDB\u884C\u65B0\u589E\u6216\u8005\u5220\u9664\u3002</p><p>\u6CE8\u610F\u4E8B\u9879\uFF1A</p><ul><li>\u5BF9uri\u7684\u91CD\u5199\u652F\u6301\u6B63\u5219\u66FF\u6362</li></ul><h3 id="open-api" tabindex="-1"><a class="header-anchor" href="#open-api" aria-hidden="true">#</a> Open Api</h3><h4 id="\u914D\u7F6E\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u793A\u4F8B" aria-hidden="true">#</a> \u914D\u7F6E\u793A\u4F8B</h4><p><strong>\u793A\u4F8B\u8BF4\u660E</strong>\uFF1A\u5C06\u8F6C\u53D1\u8BF7\u6C42\u7684<code>scheme</code>\u8BBE\u7F6E\u4E3Ahttp\uFF0C<code>uri</code>\u8BBE\u7F6E\u4E3Atest ,<code>host</code>\u8BBE\u7F6E\u4E3A <code>1.1.1.1</code>\uFF0C\u540C\u65F6\u8BF7\u6C42\u5934\u90E8\u4E2D\u5220\u6389<code>a</code> \u548C\u65B0\u589E<code>b:1</code>\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;scheme&quot;</span><span class="token operator">:</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;uri&quot;</span><span class="token operator">:</span><span class="token string">&quot;/test&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;regex_uri&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;demo&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;host&quot;</span><span class="token operator">:</span><span class="token string">&quot;1.1.1.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;headers&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;a&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;b&quot;</span><span class="token operator">:</span><span class="token string">&quot;1&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="\u914D\u7F6E\u53C2\u6570\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u53C2\u6570\u8BF4\u660E" aria-hidden="true">#</a> \u914D\u7F6E\u53C2\u6570\u8BF4\u660E</h4><table><thead><tr><th>\u53C2\u6570\u540D</th><th>\u8BF4\u660E</th><th>\u662F\u5426\u5FC5\u586B</th><th>\u9ED8\u8BA4\u503C</th><th>\u503C\u53EF\u80FD\u6027</th></tr></thead><tbody><tr><td>scheme</td><td>\u8BBE\u7F6E\u8F6C\u53D1\u8BF7\u6C42\u7684scheme</td><td>\u5426</td><td>http</td><td>[&quot;http&quot;,&quot;https&quot;]</td></tr><tr><td>uri</td><td>\u8BBE\u7F6E\u8F6C\u53D1\u8BF7\u6C42\u7684\u65B0uri\u5730\u5740</td><td>\u5426</td><td></td><td>string</td></tr><tr><td>regex_uri</td><td>\u5BF9\u539Furi\u8FDB\u884C\u6B63\u5219\u66FF\u6362\u5E76\u5C06\u5176\u8BBE\u7F6E\u5230\u8F6C\u53D1\u8BF7\u6C42\u7684\u65B0uri\u5730\u5740\u3002\u8BE5\u5B57\u7B26\u4E32\u6570\u7EC4\u6709\u4E24\u4E2A\u503C\uFF0C\u7B2C\u4E00\u4E2A\u8868\u793A\u5339\u914D\u8BF7\u6C42\u7684uri\u6240\u9700\u8981\u7684\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u7B2C\u4E8C\u4E2A\u8868\u793A\u5339\u914D\u6210\u529F\u540E\u6240\u9700\u8981\u7684uri\u66FF\u6362\u6B63\u5219\u8868\u8FBE\u5F0F\u3002</td><td>\u5426</td><td></td><td>string_array</td></tr><tr><td>host</td><td>\u8BBE\u7F6E\u8F6C\u53D1\u8BF7\u6C42\u7684\u65B0host\u5730\u5740</td><td>\u5426</td><td></td><td>string</td></tr><tr><td>headers</td><td>\u80FD\u5BF9\u8F6C\u53D1\u8BF7\u6C42\u7684\u5934\u90E8\u503C\u8FDB\u884C\u65B0\u589E\u6216\u5220\u9664</td><td>\u5426</td><td></td><td>object</td></tr></tbody></table><p><strong>\u6CE8\u610F\u4E8B\u9879</strong>\uFF1A</p><ul><li>uri\u548Cregex_uri\u5747\u7528\u4E8E\u4FEE\u6539uri\uFF0Curi\u548Cregex_uri\u4E0D\u80FD\u540C\u65F6\u4E3A\u7A7A\uFF0C\u81F3\u5C11\u4E00\u9879\u6709\u503C\u3002\u82E5\u540C\u65F6\u6709\u503C\uFF0C\u5219uri\u7684\u503C\u4F18\u5148\u3002</li><li>\u60F3\u8981\u5220\u9664\u8F6C\u53D1\u8BF7\u6C42\u5934\u90E8\u91CC\u7684\u503C\uFF0C\u53EA\u9700\u8981\u5C06\u5BF9\u5E94\u7684\u503C\u8BBE\u7F6E\u4E3A\u7A7A\u5B57\u7B26\u4E32\u5373\u53EF\u3002</li></ul><h4 id="open-api-\u8BF7\u6C42\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#open-api-\u8BF7\u6C42\u793A\u4F8B" aria-hidden="true">#</a> Open API \u8BF7\u6C42\u793A\u4F8B</h4><h5 id="\u5168\u5C40\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5168\u5C40\u914D\u7F6E" aria-hidden="true">#</a> \u5168\u5C40\u914D\u7F6E</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/setting/plugin&#39;</span> <span class="token punctuation">\\</span>
-H <span class="token string">&#39;Content-Type:application/json&#39;</span> <span class="token punctuation">\\</span>
-d <span class="token string">&#39;{
    &quot;plugins&quot;:[{
        &quot;id&quot;:&quot;eolinker.com:apinto:proxy_rewrite&quot;,
        &quot;name&quot;:&quot;my_proxy_rewrite&quot;,
        &quot;type&quot;:&quot;service&quot;,
        &quot;status&quot;:&quot;enable&quot;
    }]
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h5 id="\u914D\u7F6E\u5E26\u6709\u8F6C\u53D1\u91CD\u5199\u63D2\u4EF6\u7684service\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u5E26\u6709\u8F6C\u53D1\u91CD\u5199\u63D2\u4EF6\u7684service\u670D\u52A1" aria-hidden="true">#</a> \u914D\u7F6E\u5E26\u6709\u8F6C\u53D1\u91CD\u5199\u63D2\u4EF6\u7684service\u670D\u52A1</h5><p><strong>\u914D\u7F6E\u8BF4\u660E</strong>\uFF1A\u5C06\u8F6C\u53D1\u8BF7\u6C42\u7684<code>scheme</code>\u8BBE\u7F6E\u4E3Ahttp\uFF0C<code>uri</code>\u8BBE\u7F6E\u4E3Atest ,<code>host</code>\u8BBE\u7F6E\u4E3A <code>1.1.1.1</code>\uFF0C\u540C\u65F6\u8BF7\u6C42\u5934\u90E8\u4E2D\u5220\u6389<code>a</code> \u548C\u65B0\u589E<code>b:2</code>\u3002</p><p>\u5168\u5C40\u63D2\u4EF6\u5177\u4F53\u914D\u7F6E\u70B9\u6B64\u8FDB\u884C<a href="/docs/plugins">\u8DF3\u8F6C</a>\u3002</p><p><strong>\u5907\u6CE8</strong>\uFF1A\u533F\u540D\u670D\u52A1\u914D\u7F6E\u7684\u662Fapinto\u5B98\u65B9\u793A\u4F8B\u63A5\u53E3\uFF0C\u5C06\u8FD4\u56DE\u8BF7\u6C42\u7684\u76F8\u5173\u4FE1\u606F\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/service&#39;</span> -H <span class="token string">&#39;Content-Type:application/json&#39;</span> -d <span class="token string">&#39;{
    &quot;name&quot;: &quot;param&quot;,
    &quot;driver&quot;: &quot;http&quot;,
    &quot;timeout&quot;: 3000,
    &quot;retry&quot;: 3,
    &quot;scheme&quot;: &quot;http&quot;,
    &quot;anonymous&quot;: {
        &quot;type&quot;: &quot;round-robin&quot;,
        &quot;config&quot;: &quot;demo-apinto.eolink.com:8280&quot;
    },
    &quot;plugins&quot;: {
        &quot;my_proxy_rewrite&quot;:{
            &quot;disable&quot;: false,
            &quot;config&quot;:{
             &quot;scheme&quot;: &quot;http&quot;,
             &quot;uri&quot;: &quot;/test&quot;,
             &quot;regex_uri&quot;: [&quot;demo&quot;,&quot;test&quot;],
             &quot;host&quot;: &quot;1.1.1.1&quot;,
             &quot;headers&quot;:{
               &quot;a&quot;: &quot;&quot;,
               &quot;b&quot;: &quot;2&quot;
              }
            }
        }
    }
}&#39;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h5 id="\u7ED1\u5B9A\u8DEF\u7531" tabindex="-1"><a class="header-anchor" href="#\u7ED1\u5B9A\u8DEF\u7531" aria-hidden="true">#</a> \u7ED1\u5B9A\u8DEF\u7531</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/router&#39;</span> <span class="token punctuation">\\</span>
-H <span class="token string">&#39;Content-Type:application/json&#39;</span> <span class="token punctuation">\\</span>
-d <span class="token string">&#39;{
    &quot;name&quot;:&quot;params&quot;,
    &quot;driver&quot;:&quot;http&quot;,
    &quot;listen&quot;:8080,
    &quot;rules&quot;:[{
        &quot;location&quot;:&quot;/demo&quot;
    }],
    &quot;target&quot;:&quot;param@service&quot;
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h5 id="\u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B" aria-hidden="true">#</a> \u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X GET <span class="token string">&#39;http://127.0.0.1:8080/demo&#39;</span> <span class="token punctuation">\\</span>
-H <span class="token string">&#39;Content-Type:application/json&#39;</span><span class="token punctuation">\\</span>
-H <span class="token string">&#39;a:1&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="\u63A5\u53E3\u8BBF\u95EE\u8FD4\u56DE\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u8BBF\u95EE\u8FD4\u56DE\u793A\u4F8B" aria-hidden="true">#</a> \u63A5\u53E3\u8BBF\u95EE\u8FD4\u56DE\u793A\u4F8B</h5><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;body&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;header&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;Accept&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token string">&quot;*/*&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;B&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token string">&quot;2&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Content-Type&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token string">&quot;application/json-H&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;User-Agent&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token string">&quot;curl/7.75.0&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;X-Forwarded-For&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token string">&quot;127.0.0.1,127.0.0.1&quot;</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;host&quot;</span><span class="token operator">:</span><span class="token string">&quot;1.1.1.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;method&quot;</span><span class="token operator">:</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;path&quot;</span><span class="token operator">:</span><span class="token string">&quot;/test&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>

    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;url&quot;</span><span class="token operator">:</span><span class="token string">&quot;/test&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div>`,29);function e(p,o){return t}var l=s(a,[["render",e]]);export{l as default};
