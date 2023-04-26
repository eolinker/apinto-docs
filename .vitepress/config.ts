import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress/types'

const title = 'Apinto'
const description = '专门为微服务架构设计的开源 API 网关'

const Docs: DefaultTheme.NavItemWithLink[] = [
  { text: 'Apinto', link: '/docs/apinto/' },
  { text: 'Apinto Dashboard V2', link: '/docs/dashboard-v2/' },
  { text: 'Apinto Dashboard', link: '/docs/dashboard/' },
]

const Community: DefaultTheme.NavItemWithLink[] = [
  { text: '论坛', link: 'https://community.apinto.com/', target: '_blank' },
  { text: 'Contributor', link: '/community/contributor' },
]

const Blog: DefaultTheme.NavItemWithLink = { text: '博客', link: 'https://www.apinto.com/?page_id=15', target: '_blank' }

const Downloads: DefaultTheme.NavItemWithLink[] = [
  {
    text: 'Apinto',
    link: 'https://github.com/eolinker/apinto/releases',
  },
  {
    text: 'Apinto Dashboard',
    link: 'https://github.com/eolinker/apinto-dashboard/releases',
  },
]

const Nav: DefaultTheme.NavItem[] = [
  {
    text: '文档',
    items: Docs,
    activeMatch: '^/docs/',
  },
  {
    text: '社区',
    items: Community,
  },
  Blog,
  {
    text: '下载',
    items: Downloads,
  },
]

const ApintoGuide: DefaultTheme.SidebarItem[] = [
  { text: '关于 Apinto', link: '/docs/apinto/' },
  {
    text: '快速开始',
    collapsed: true,
    items: [
      { text: '部署', link: '/docs/apinto/quick/arrange' },
      { text: '启动', link: '/docs/apinto/quick/quick_start' },
      { text: ' 🚀快速入门教程 ', link: '/docs/apinto/quick/quick_course' },
    ],
  },
  {
    text: '系统配置',
    link: '/docs/apinto/system/index',
    collapsed: true,
    items: [
      { text: 'ErrorLog', link: '/docs/apinto/system/error_log.md' },
    ],
  },
  {
    text: '路由',
    collapsed: true,
    items: [
      { text: 'HTTP 协议路由', link: '/docs/apinto/router/http' },
      { text: 'dubbo2 协议路由', link: '/docs/apinto/router/dubbo2' },
      { text: 'gRPC 协议路由', link: '/docs/apinto/router/grpc' },
    ],
  },
  {
    text: '服务',
    collapsed: true,
    items: [
      { text: 'HTTP 服务', link: '/docs/apinto/service/http' },
    ],
  },
  {
    text: '服务发现',
    link: '/docs/apinto/discovery/',
    collapsed: true,
    items: [
      { text: '静态负载', link: '/docs/apinto/discovery/static' },
      { text: 'Consul', link: '/docs/apinto/discovery/consul' },
      { text: 'Eureka', link: '/docs/apinto/discovery/eureka' },
      { text: 'Nacos', link: '/docs/apinto/discovery/nacos' },
    ],
  },
  {
    text: '应用',
    link: '/docs/apinto/app/index',
    collapsed: true,
    items: [
      { text: '访问鉴权', link: '/docs/apinto/app/auth' },
      { text: '额外参数', link: '/docs/apinto/app/extra-param' },
    ],
  },
  {
    text: '输出器',
    collapsed: true,
    items: [
      { text: '文件输出器', link: '/docs/apinto/outputer/file' },
      { text: 'syslog 输出器', link: '/docs/apinto/outputer/syslog' },
      { text: 'kafka 输出器', link: '/docs/apinto/outputer/kafka' },
      { text: 'http 输出器', link: '/docs/apinto/outputer/http' },
      { text: 'nsq 输出器', link: '/docs/apinto/outputer/nsq' },
      { text: 'prometheus 输出器', link: '/docs/apinto/outputer/prometheus' },
    ],
  },
  { text: 'formatter', link: '/docs/apinto/formatter/' },
  {
    text: '证书',
    collapsed: true,
    items: [
      { text: '服务端证书', link: '/docs/apinto/certificate/server' },
    ],
  },
  { text: '插件模版', link: '/docs/apinto/template/' },
  {
    text: '插件系统',
    link: '/docs/apinto/plugins/',
    collapsed: true,
    items: [
      { text: '额外参数', link: '/docs/apinto/plugins/extra_params' },
      { text: '参数映射', link: '/docs/apinto/plugins/params_transformer' },
      { text: '转发重写', link: '/docs/apinto/plugins/proxy_rewrite' },
      { text: '转发重写V2', link: '/docs/apinto/plugins/proxy_rewrite_v2' },
      { text: 'http_mocking', link: '/docs/apinto/plugins/http-mocking' },
      { text: 'dubbo2协议转发重写', link: '/docs/apinto/plugins/dubbo2-proxy-rewrite' },
      { text: 'http协议转dubbo2协议插件', link: '/docs/apinto/plugins/http-to-dubbo2' },
      { text: 'dubbo2协议转http协议插件', link: '/docs/apinto/plugins/dubbo2-to-http' },
      { text: 'gRPC请求转发重写', link: '/docs/apinto/plugins/grpc-proxy_rewrite' },
      { text: 'IP黑白名单', link: '/docs/apinto/plugins/ip_restriction' },
      { text: '流量控制', link: '/docs/apinto/plugins/rate_limiting' },
      { text: '鉴权（v0.8.x废弃）', link: '/docs/apinto/plugins/auth' },
      { text: '响应重写', link: '/docs/apinto/plugins/response_rewrite' },
      { text: 'API熔断', link: '/docs/apinto/plugins/circuit_breaker' },
      { text: '跨域CORS', link: '/docs/apinto/plugins/cors' },
      { text: 'gzip压缩', link: '/docs/apinto/plugins/gzip' },
      { text: 'access-log', link: '/docs/apinto/plugins/access_log' },
      { text: 'prometheus', link: '/docs/apinto/plugins/prometheus' },
      { text: 'Http协议转gRPC协议插件', link: '/docs/apinto/plugins/http-to-grpc' },
      { text: 'gRPC协议转Http协议插件', link: '/docs/apinto/plugins/grpc-to-http' },
      { text: 'prometheus', link: '/docs/apinto/plugins/proxy_mirror' },
    ],
  },
  {
    text: 'cli命令',
    link: '/docs/apinto/cli/',
    collapsed: true,
    items: [
      { text: '启动网关', link: '/docs/apinto/cli/start' },
      { text: '关闭网关', link: '/docs/apinto/cli/stop' },
      { text: '重启网管', link: '/docs/apinto/cli/restart' },
      { text: '加入集群', link: '/docs/apinto/cli/join' },
      { text: '离开集群', link: '/docs/apinto/cli/leave' },
      { text: '打印节点信息', link: '/docs/apinto/cli/info' },
    ],
  },
  { text: 'Open Api', link: '/docs/apinto/open' },
  { text: 'FAQ', link: '/docs/apinto/faq/' },
]

const DashboardV2Guide: DefaultTheme.SidebarItem[] = [
  {
    text: '关于 Apinto dashboard v2',
    link: '/docs/dashboard-v2',
  },
  {
    text: '快速开始',
    collapsed: true,
    items: [
      { text: '安装部署', link: '/docs/dashboard-v2/quick/arrange' },
      { text: '快速入门', link: '/docs/dashboard-v2/quick/quick_start' },
    ],
  },
  {
    text: '基础设施',
    collapsed: true,
    items: [
      { text: '网关集群', link: '/docs/dashboard-v2/basic/cluster' },
      { text: '环境变量', link: '/docs/dashboard-v2/basic/env' },
      { text: '插件管理', link: '/docs/dashboard-v2/basic/plugin' },
    ],
  },
  {
    text: '上游服务',
    collapsed: true,
    items: [
      { text: '上游管理', link: '/docs/dashboard-v2/upstream/upstream' },
      { text: '服务发现', link: '/docs/dashboard-v2/upstream/discovery' },
    ],
  },
  {
    text: 'API管理',
    collapsed: true,
    items: [
      { text: 'API管理', link: '/docs/dashboard-v2/api/api' },
      { text: '插件模板', link: '/docs/dashboard-v2/api/plugin-template' },
    ],
  },
  {
    text: '应用管理',
    collapsed: true,
    items: [
      { text: '应用管理', link: '/docs/dashboard-v2/app/app' },
    ],
  },
  {
    text: '服务治理',
    collapsed: true,
    items: [
      { text: '访问策略', link: '/docs/dashboard-v2/soa/access' },
      { text: '熔断策略', link: '/docs/dashboard-v2/soa/fusing' },
      { text: '灰度策略', link: '/docs/dashboard-v2/soa/grayscale' },
      { text: '缓存策略', link: '/docs/dashboard-v2/soa/cache' },
      { text: '流量策略', link: '/docs/dashboard-v2/soa/flow' },
    ],
  },
  {
    text: '日志审计',
    collapsed: true,
    items: [
      { text: '日志审计', link: '/docs/dashboard-v2/logging/audit' },
    ],
  },
  {
    text: '系统管理',
    collapsed: true,
    items: [
      { text: '外部应用', link: '/docs/dashboard-v2/system/external-application' },
    ],
  },
  { text: 'FAQ', link: '/docs/dashboard-v2/faq/dashboard_v2' },
]

const DashboardGuide: DefaultTheme.SidebarItem[] = [
  {
    text: '关于 Apinto dashboard',
    link: '/docs/dashboard/',
  },
  {
    text: '快速开始',
    collapsed: true,
    items: [
      { text: '部署', link: '/docs/dashboard/quick/arrange' },
      { text: '快速入门教程🚀🚀', link: '/docs/dashboard/quick/quick_course' },
    ]
    ,
  },
  {
    text: '路由',
    collapsed: true,
    items: [
      { text: 'HTTP 路由', link: '/docs/dashboard/router/http' },
      { text: 'dubbo2 路由', link: '/docs/dashboard/router/dubbo2' },
      { text: 'gRPC 路由', link: '/docs/dashboard/router/grpc' },
    ]
    ,
  },
  {
    text: '上游服务',
    collapsed: true,
    items: [
      { text: 'HTTP 上游服务', link: '/docs/dashboard/service/http' },
    ]
    ,
  },
  {
    text: '服务发现',
    link: '/docs/dashboard/discovery/',
    collapsed: true,
    items: [
      { text: '静态服务发现', link: '/docs/dashboard/discovery/static' },
      { text: 'Consul', link: '/docs/dashboard/discovery/consul' },
      { text: 'Eureka', link: '/docs/dashboard/discovery/eureka' },
      { text: 'Nacos', link: '/docs/dashboard/discovery/nacos' },
    ]
    ,
  },
  {
    text: '应用',
    link: '/docs/dashboard/app/',
    collapsed: true,
    items: [
      { text: '访问鉴权', link: '/docs/dashboard/app/auth' },
      { text: '额外参数', link: '/docs/dashboard/app/extra-param' },
    ]
    ,
  },
  {
    text: '证书',
    collapsed: true,
    items: [
      { text: '服务端证书', link: '/docs/dashboard/certificate/server' },
    ],
  },
  {
    text: '插件模版',
    link: '/docs/dashboard/template/',
    collapsed: true,
    items: [
    ],
  },
  {
    text: '编码器',
    collapsed: true,
    items: [
      { text: 'Protobuf 编码器', link: '/docs/dashboard/transcode/protobuf' },
    ]
    ,
  },
  {
    text: '输出器',
    link: '/docs/dashboard/outputer/',
    collapsed: true,
    items: [
      { text: '文件输出器', link: '/docs/dashboard/outputer/file' },
      { text: 'Prometheus 输出器', link: '/docs/dashboard/outputer/prometheus' },
    ]
    ,
  },

  {
    text: '插件系统',
    link: '/docs/dashboard/plugins/',
    collapsed: true,
    items: [
      { text: '额外参数', link: '/docs/dashboard/plugins/extra_params.md' },
      { text: '参数映射', link: '/docs/dashboard/plugins/params_transformer.md' },
      { text: '转发重写', link: '/docs/dashboard/plugins/proxy_rewrite.md' },
      { text: '转发重写 V2', link: '/docs/dashboard/plugins/proxy_rewrite_v2.md' },
      { text: 'http_mocking', link: '/docs/dashboard/plugins/http-mocking.md' },
      { text: 'dubbo2协议转发重写', link: '/docs/dashboard/plugins/dubbo2-proxy-rewrite.md' },
      { text: 'http协议转dubbo2协议插件', link: '/docs/dashboard/plugins/http-to-dubbo2.md' },
      { text: 'dubbo2协议转http协议插件', link: '/docs/dashboard/plugins/dubbo2-to-http.md' },
      { text: 'ggRPC请求转发重写', link: '/docs/dashboard/plugins/grpc-proxy_rewrite.md' },
      { text: 'IP黑白名单', link: '/docs/dashboard/plugins/ip_restriction.md' },
      { text: '流量控制', link: '/docs/dashboard/plugins/rate_limiting.md' },
      { text: '鉴全', link: '/docs/dashboard/plugins/auth.md' },
      { text: '响应重写', link: '/docs/dashboard/plugins/response_rewrite.md' },
      { text: 'API熔断', link: '/docs/dashboard/plugins/circuit_breaker.md' },
      { text: '跨域CORS', link: '/docs/dashboard/plugins/cors.md' },
      { text: 'gzip 压缩', link: '/docs/dashboard/plugins/gzip.md' },
      { text: 'access-log', link: '/docs/dashboard/plugins/access_log.md' },
      { text: 'prometheus', link: '/docs/dashboard/plugins/prometheus.md' },
      { text: 'Http协议转gRPC协议插件', link: '/docs/dashboard/plugins/http-to-grpc.md' },
      { text: 'gRPC协议转Http协议插件', link: '/docs/dashboard/plugins/grpc-to-http.md' },
      { text: 'prometheus', link: '/docs/dashboard/plugins/proxy_mirror.md' },
    ],
  },
]

const CommunityGuidde: DefaultTheme.SidebarItem[] = [
  { text: 'Apinto', link: '/docs/apinto/' },
  { text: 'Apinto Dashboard', link: '/docs/dashboard/' },
  { text: 'Apinto Dashboard V2', link: '/docs/dashboard-v2/' },
]

const Sidebar: DefaultTheme.Sidebar = {
  '/docs/apinto': ApintoGuide,
  '/docs/dashboard-v2': DashboardV2Guide,
  '/docs/dashboard': DashboardGuide,
  '/community': CommunityGuidde,
}

export default defineConfig({
  lang: 'zh-CN',
  title,
  titleTemplate: title,
  description,
  outDir: './dist',
  head: [
    ['link', { rel: 'icon', href: '/logo-bg.svg', type: 'image/svg+xml' }],
  ],
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    logo: '/logo-bg.svg',
    nav: Nav,
    search: {
      provider: 'local',
    },
    sidebar: Sidebar,
    editLink: {
      pattern: 'https://github.com/eolinker/apinto-docs/edit/main/:path',
      text: 'Suggest changes to this page',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/eolinker/apinto' },
    ],
    footer: {
      message: '粤ICP备15111480号-24',
      copyright: 'Copyright © 深圳市银云信息技术有限公司',
    },
  },
})
