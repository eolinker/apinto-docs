import{f as n}from"./app.ec6ae4af.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},t=n(`<h1 id="\u53C2\u6570\u6620\u5C04" tabindex="-1"><a class="header-anchor" href="#\u53C2\u6570\u6620\u5C04" aria-hidden="true">#</a> \u53C2\u6570\u6620\u5C04</h1><h3 id="\u63D2\u4EF6\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#\u63D2\u4EF6\u4FE1\u606F" aria-hidden="true">#</a> \u63D2\u4EF6\u4FE1\u606F</h3><table><thead><tr><th>\u540D\u79F0</th><th>\u5B57\u6BB5</th><th>\u5C5E\u6027</th></tr></thead><tbody><tr><td>\u53C2\u6570\u6620\u5C04</td><td>params_transformer</td><td>\u53C2\u6570\u5904\u7406</td></tr></tbody></table><h3 id="\u529F\u80FD\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u529F\u80FD\u63CF\u8FF0" aria-hidden="true">#</a> \u529F\u80FD\u63CF\u8FF0</h3><p>\u5B9E\u73B0\u8868\u5355\u6216json\u53C2\u6570\u7684\u6620\u5C04\uFF0C\u8BBF\u95EEAPI\u7684 <strong>\u53C2\u6570A</strong> \u7ED1\u5B9A\u5230\u76EE\u6807API\u7684 <strong>\u53C2\u6570B</strong>\uFF0C\u6620\u5C04\u4F4D\u7F6E\u5305\u62ECheader\u3001body\u3001query\u3002</p><p>\u6CE8\u610F\u4E8B\u9879\uFF1A</p><ul><li>\u82E5\u8BBF\u95EEAPI\u7684\u53C2\u6570\u540D\u662Fuser\uFF0C\u76EE\u6807API\u7684\u53C2\u6570\u540D\u662Fusername\uFF0C\u6B64\u65F6\u9700\u5F00\u542F\u53C2\u6570\u6620\u5C04\u63D2\u4EF6\uFF1B\u82E5\u5747\u4E3Ausername\uFF0C\u5219\u65E0\u9700\u5F00\u542F\u6B64\u63D2\u4EF6\u3002</li><li>json\u4EC5\u652F\u6301 <strong>\u4E00\u7EA7</strong> \u6620\u5C04\u3002</li><li>\u82E5\u53C2\u6570\u7C7B\u578B\u4E3A\u8868\u5355\u65F6\uFF0C\u6620\u5C04\u63D2\u4EF6\u652F\u6301\u540C\u540D\u53C2\u6570\u7684\u4F7F\u7528\u3002</li><li>\u4F7F\u7528\u8BE5\u63D2\u4EF6\u65F6\u8BF7\u4FDD\u8BC1Content-Type\u4E3A application/x-www-form-urlencoded\u3001 multipart/form-data \u6216 application/json\u3002</li></ul><h3 id="open-api" tabindex="-1"><a class="header-anchor" href="#open-api" aria-hidden="true">#</a> Open Api</h3><h4 id="\u914D\u7F6E\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u793A\u4F8B" aria-hidden="true">#</a> \u914D\u7F6E\u793A\u4F8B</h4><p><strong>\u793A\u4F8B\u8BF4\u660E</strong>\uFF1A\u5C06\u8F6C\u53D1\u8BF7\u6C42\u7684query\u53C2\u6570a\u6620\u5C04\u5230\u5934\u90E8header\u4E2D\u7684b\uFF0C\u5E76\u4E14\u5220\u9664\u539F\u53C2\u6570\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;params&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;position&quot;</span><span class="token operator">:</span><span class="token string">&quot;query&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;proxy_name&quot;</span><span class="token operator">:</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;proxy_position&quot;</span><span class="token operator">:</span><span class="token string">&quot;header&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;required&quot;</span><span class="token operator">:</span><span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;remove&quot;</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;error_type&quot;</span><span class="token operator">:</span><span class="token string">&quot;text&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="\u914D\u7F6E\u53C2\u6570\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u53C2\u6570\u8BF4\u660E" aria-hidden="true">#</a> \u914D\u7F6E\u53C2\u6570\u8BF4\u660E</h4><table><thead><tr><th>\u53C2\u6570\u540D</th><th>\u8BF4\u660E</th><th>\u662F\u5426\u5FC5\u586B</th><th>\u9ED8\u8BA4\u503C</th><th>\u503C\u53EF\u80FD\u6027</th></tr></thead><tbody><tr><td>name</td><td>\u5F85\u6620\u5C04\u53C2\u6570\u540D\u79F0</td><td>\u662F</td><td></td><td>string</td></tr><tr><td>position</td><td>\u5F85\u6620\u5C04\u53C2\u6570\u6240\u5728\u4F4D\u7F6E</td><td>\u662F</td><td></td><td>[body/header/query]</td></tr><tr><td>proxy_name</td><td>\u76EE\u6807\u53C2\u6570\u540D\u79F0</td><td>\u662F</td><td></td><td>string</td></tr><tr><td>proxy_position</td><td>\u76EE\u6807\u53C2\u6570\u6240\u5728\u4F4D\u7F6E</td><td>\u662F</td><td></td><td>string</td></tr><tr><td>required</td><td>\u5F85\u6620\u5C04\u53C2\u6570\u662F\u5426\u5FC5\u542B\uFF0C\u5982\u4E3Atrue\uFF0C\u8BE5\u53C2\u6570\u4E0D\u5B58\u5728\u65F6\u4F1A\u62A5\u9519</td><td>\u5426</td><td>false</td><td>[true/false]</td></tr><tr><td>remove</td><td>\u6620\u5C04\u540E\u5220\u9664\u539F\u53C2\u6570</td><td>\u5426</td><td>false</td><td>[true/false]</td></tr><tr><td>error_type</td><td>\u63D2\u4EF6\u8FD4\u56DE\u62A5\u9519\u7684\u7C7B\u578B</td><td>\u5426</td><td>text</td><td>text/json</td></tr></tbody></table><p>\u82E5error_type\u4E3A\u7A7A\u6216\u53D6\u503C\u8303\u56F4\u4E4B\u5916\uFF0C\u89C6\u4E3A\u4F7F\u7528\u9ED8\u8BA4\u503Ctext\u3002</p><h4 id="open-api-\u8BF7\u6C42\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#open-api-\u8BF7\u6C42\u793A\u4F8B" aria-hidden="true">#</a> Open API \u8BF7\u6C42\u793A\u4F8B</h4><h5 id="\u5168\u5C40\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5168\u5C40\u914D\u7F6E" aria-hidden="true">#</a> \u5168\u5C40\u914D\u7F6E</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/setting/plugin&#39;</span> <span class="token punctuation">\\</span>
-H <span class="token string">&#39;Content-Type:application/json&#39;</span> <span class="token punctuation">\\</span>
-d <span class="token string">&#39;{
    &quot;plugins&quot;:[{
        &quot;id&quot;:&quot;eolinker.com:apinto:params_transformer&quot;,
        &quot;name&quot;:&quot;my_params_transformer&quot;,
        &quot;type&quot;:&quot;service&quot;,
        &quot;status&quot;:&quot;enable&quot;
    }]
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h5 id="\u914D\u7F6E\u5E26\u6709\u53C2\u6570\u6620\u5C04\u63D2\u4EF6\u7684service\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u5E26\u6709\u53C2\u6570\u6620\u5C04\u63D2\u4EF6\u7684service\u670D\u52A1" aria-hidden="true">#</a> \u914D\u7F6E\u5E26\u6709\u53C2\u6570\u6620\u5C04\u63D2\u4EF6\u7684service\u670D\u52A1</h5><p>\u914D\u7F6E\u63D2\u4EF6\u8BF4\u660E\uFF1A\u5C06\u8F6C\u53D1\u8BF7\u6C42\u91CCquery\u53C2\u6570a\u6620\u5C04\u4E3Aheader\u91CC\u7684b\uFF0C\u5E76\u4E14\u5220\u9664query\u91CC\u7684\u539F\u53C2\u6570a\u3002</p><p>\u5168\u5C40\u63D2\u4EF6\u5177\u4F53\u914D\u7F6E\u70B9\u6B64\u8FDB\u884C<a href="/docs/plugins">\u8DF3\u8F6C</a>\u3002</p><p><strong>\u5907\u6CE8</strong>\uFF1A\u533F\u540D\u670D\u52A1\u914D\u7F6E\u7684\u662Fapinto\u5B98\u65B9\u793A\u4F8B\u63A5\u53E3\uFF0C\u5C06\u8FD4\u56DE\u8BF7\u6C42\u7684\u76F8\u5173\u4FE1\u606F\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/service&#39;</span> -H <span class="token string">&#39;Content-Type:application/json&#39;</span> -d <span class="token string">&#39;{
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
        &quot;my_params_transformer&quot;:{
            &quot;disable&quot;: false,
            &quot;config&quot;:{
                &quot;params&quot;: [{
                &quot;name&quot;: &quot;a&quot;,
                &quot;position&quot;: &quot;query&quot;,
                &quot;proxy_name&quot;:&quot;b&quot;,
                &quot;proxy_position&quot;:&quot;header&quot;,
                &quot;required&quot;:true,
                &quot;conflict&quot;: &quot;Convert&quot;
                }],
            &quot;remove&quot;: true,
            &quot;error_type&quot;: &quot;text&quot;
            }
        }
    }
}&#39;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h5 id="\u7ED1\u5B9A\u8DEF\u7531" tabindex="-1"><a class="header-anchor" href="#\u7ED1\u5B9A\u8DEF\u7531" aria-hidden="true">#</a> \u7ED1\u5B9A\u8DEF\u7531</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X POST  <span class="token string">&#39;http://127.0.0.1:9400/api/router&#39;</span> <span class="token punctuation">\\</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h5 id="\u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B" aria-hidden="true">#</a> \u63A5\u53E3\u8BF7\u6C42\u793A\u4F8B</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -X GET <span class="token string">&#39;http://127.0.0.1:8080/demo?a=test_plugin&#39;</span> -H <span class="token string">&#39;Content-Type:application/json&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h5 id="\u63A5\u53E3\u8BBF\u95EE\u8FD4\u56DE\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u8BBF\u95EE\u8FD4\u56DE\u793A\u4F8B" aria-hidden="true">#</a> \u63A5\u53E3\u8BBF\u95EE\u8FD4\u56DE\u793A\u4F8B</h5><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;body&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;header&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;Accept&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token string">&quot;*/*&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;B&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token string">&quot;test_plugin&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;User-Agent&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token string">&quot;curl/7.75.0&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;X-Forwarded-For&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token string">&quot;127.0.0.1,127.0.0.1&quot;</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;host&quot;</span><span class="token operator">:</span><span class="token string">&quot;127.0.0.1:8080&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;method&quot;</span><span class="token operator">:</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;path&quot;</span><span class="token operator">:</span><span class="token string">&quot;/demo&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>

    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;url&quot;</span><span class="token operator">:</span><span class="token string">&quot;/demo&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div>`,28);function e(p,r){return t}var l=s(a,[["render",e]]);export{l as default};
