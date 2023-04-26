<script lang='ts' setup>
const Blogs = [
  {
    title: 'Apinto Dashboard v2.0发布：可视化控制台让配置更轻松！',
    description: '大家好， Eolink 旗下开源网关 Apinto 本次带来了 Apinto Dashboad V2.0 的版…',
    link: 'https://www.apinto.com/?p=600'
  },
  {
    title: 'Apinto v0.12.1发布-新增两个插件，丰富路由特性',
    description: '新特性 1、新增流量镜像（eolinker.com:apinto:proxy_mirror）插件 流量镜像（e…',
    link: 'https://www.apinto.com/?p=594'
  },
  {
    title: 'Apinto v0.11.1发布-支持gRPC、Dubbo2协议的转换',
    description: '新特性 协议转换功能上线，支持HTTP与gRPC、HTTP与Dubbo2之间的协议互转 Apinto v0.1…',
    link: 'https://www.apinto.com/?p=590'
  },
]
</script>

<template>
  <section>
    <h2 class="text-12 lh-16 font-bold mb-6">博客</h2>
    <div grid="~ cols-3 gap-8">
      <ul v-for="blog in Blogs" :key="blog.link">
        <li space-y-6>
          <h3>
            <a class="clip" :href="blog.link" target="_blank">{{ blog.title }}</a>
          </h3>
          <p>
            {{ blog.description }}
            <a :href="blog.link" class="clip" target="_blank">继续阅读</a>
          </p>
          <p>
            <a :href="blog.link" class="clip" target="_blank">继续阅读</a>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}
</style>
