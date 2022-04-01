import{f as n}from"./app.ec6ae4af.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h1 id="\u914D\u7F6E\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u7B80\u4ECB" aria-hidden="true">#</a> \u914D\u7F6E\u7B80\u4ECB</h1><p>\u7CFB\u7EDF\u914D\u7F6E\u6307\u7684\u662F\u7F51\u5173\u8FD0\u884C\u8FC7\u7A0B\u7684\u5168\u5C40\u914D\u7F6E\u60C5\u51B5\uFF0C\u4E3B\u8981\u7528\u4E8E\u8BB0\u5F55\u76EE\u5F55\u7B49\u73AF\u5883\u53D8\u91CF\u7684\u914D\u7F6E\uFF0C\u76EE\u524D\u7684\u53EF\u914D\u7F6E\u9879\u5305\u62EC\uFF1A</p><ul><li>\u6570\u636E\u6587\u4EF6\u653E\u7F6E\u76EE\u5F55</li><li>pid\u6587\u4EF6\u653E\u7F6E\u76EE\u5F55</li><li>\u65E5\u5FD7\u6587\u4EF6\u653E\u7F6E\u76EE\u5F55</li><li>socket\u6587\u4EF6\u653E\u7F6E\u76EE\u5F55</li><li>apinto\u8FD0\u884C\u914D\u7F6E\u5730\u5740</li><li>\u6269\u5C55\u4ED3\u5E93\u76EE\u5F55</li><li>\u9519\u8BEF\u65E5\u5FD7\u8BE6\u7EC6\u914D\u7F6E</li></ul><h3 id="\u9ED8\u8BA4\u914D\u7F6E\u6587\u4EF6\u8DEF\u5F84" tabindex="-1"><a class="header-anchor" href="#\u9ED8\u8BA4\u914D\u7F6E\u6587\u4EF6\u8DEF\u5F84" aria-hidden="true">#</a> \u9ED8\u8BA4\u914D\u7F6E\u6587\u4EF6\u8DEF\u5F84</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/etc/apinto/apinto.yml
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="\u914D\u7F6E\u5B9E\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u5B9E\u4F8B" aria-hidden="true">#</a> \u914D\u7F6E\u5B9E\u4F8B</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># \u6570\u636E\u6587\u4EF6\u653E\u7F6E\u76EE\u5F55</span>
<span class="token key atrule">data_dir</span><span class="token punctuation">:</span> /var/lib/apinto

<span class="token comment"># pid\u6587\u4EF6\u653E\u7F6E\u5730\u5740</span>
<span class="token key atrule">pid_dir</span><span class="token punctuation">:</span> /var/run/apinto

<span class="token comment"># \u65E5\u5FD7\u653E\u7F6E\u76EE\u5F55</span>
<span class="token key atrule">log_dir</span><span class="token punctuation">:</span> /var/log/apinto

<span class="token comment"># socket\u653E\u7F6E\u76EE\u5F55</span>
<span class="token key atrule">socket_dir</span><span class="token punctuation">:</span> /tmp/apinto

<span class="token comment"># apinto\u8FD0\u884C\u914D\u7F6E\u5730\u5740</span>
<span class="token key atrule">config</span><span class="token punctuation">:</span> /etc/apinto/config.yml

<span class="token comment"># \u6269\u5C55\u4ED3\u5E93\u76EE\u5F55</span>
<span class="token key atrule">extends_dir</span><span class="token punctuation">:</span> /var/lib/apinto/extends

<span class="token comment"># \u9519\u8BEF\u65E5\u5FD7\u6587\u4EF6\u540D\uFF1A</span>
<span class="token key atrule">error_log_name</span><span class="token punctuation">:</span>  error.log

<span class="token comment"># \u9519\u8BEF\u65E5\u5FD7\u7B49\u7EA7</span>
<span class="token key atrule">error_log_level</span><span class="token punctuation">:</span> error

<span class="token comment"># \u9519\u8BEF\u65E5\u5FD7\u8FC7\u671F\u65F6\u95F4\uFF0C\u9ED8\u8BA4\u5355\u4F4D\u4E3A\u5929\uFF0Cd|\u5929\uFF0Ch|\u5C0F\u65F6</span>
<span class="token key atrule">error_log_expire</span><span class="token punctuation">:</span> 7d

<span class="token comment"># \u9519\u8BEF\u65E5\u5FD7\u5207\u5272\u5468\u671F\uFF0C\u4EC5\u652F\u6301day\u3001hour</span>
<span class="token key atrule">error_log_period</span><span class="token punctuation">:</span> day
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div>`,7);function p(l,r){return e}var i=s(a,[["render",p]]);export{i as default};
