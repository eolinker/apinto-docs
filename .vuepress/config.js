const path = require('path');
const basedir = path.resolve(__dirname, '..')
module.exports = {
  title: 'APINTO',
  description: '一款基于 Golang 开发的微服务网关',
  public: path.resolve(basedir, './public'),
  head: [['link', { rel: 'icon', href: '/images/logo.svg' }]],
  themeConfig: {
    logo: '/images/logo.svg',
    home: '/docs/',
    docsRepo: 'https://github.com/eolinker/apinto-docs',
    docsBranch: 'main',
    navbar: [
      { text: "首页", link: "https://www.apinto.com/", target: "_self" },
      { 
        text: "文档", 
        children:[
          {
            text:"Apinto",link: "/docs/index.md"
          }
        ],
      },
      { text: "社区", children: [
        {
          text: '论坛',
          link: "https://community.apinto.com/",
        },
        {
          text: 'Contributor',
          link: "/contributor/contributor.md",
        }
        
        ], 
      },
      { text: "博客", link: "https://blog.apinto.com" },
      { 
        text: "下载", 
        children:[
          {
            text:"Apinto",link: "https://github.com/eolinker/apinto/releases"
          }
        ],
        
      },
      {
        text: "Github",
        children:[
          {
            text:"Apinto",link: "https://github.com/eolinker/apinto"
          }
        ],
      }
    ],
    sidebar: getSideBar(),
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(basedir, './components'),
      },
    ],
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          
        },
      },
    ]
  ],
}

function getSideBar(){
  return {
    '/': [
      {
        text: '关于Apinto',
        link: '/docs/index.md',
      },
      {
        text: '快速开始',
        collapsible: true,
        children: [
          '/docs/quick/introduction.md', 
          '/docs/quick/arrange.md', 
          '/docs/quick/quick_start.md', 
          '/docs/quick/quick_course.md'
        ],
      },
      {
        text: '系统配置',
        link: '/docs/system/index.md',
        collapsible: true,
        children: ['/docs/system/error_log.md'],
      },
      {
        text: '路由',
        collapsible: true,
        children: ['/docs/router/http.md'],
      },
      {
        text: '服务',
        collapsible: true,
        children: ['/docs/service/http.md'],
      },
      {
        text: '负载均衡',
        collapsible: true,
        children: ['/docs/upstream/http.md'],
      },
      {
        text: '服务发现',
        link: '/docs/discovery/index.md',
        collapsible: true,
        children: [
          '/docs/discovery/static.md', 
          '/docs/discovery/consul.md', 
          '/docs/discovery/eureka.md', 
          '/docs/discovery/nacos.md'
        ],
      },
      {
        text: '访问鉴权',
        link: '/docs/auth/index.md',
        collapsible: true,
        children: [
          '/docs/auth/aksk.md', 
          '/docs/auth/apikey.md', 
          '/docs/auth/basic.md', 
          '/docs/auth/jwt.md'
        ],
      },
      {
        text: '输出器',
        collapsible: true,
        children: ['/docs/outputer/file.md', '/docs/outputer/syslog.md', '/docs/outputer/kafka.md', '/docs/outputer/http.md', '/docs/outputer/nsq.md'],
      },
      {
        text: 'formatter',
        link: '/docs/formatter/index.md',
        collapsible: true,
        children: [
        '/docs/formatter/line.md', 
        '/docs/formatter/json.md', 
        '/docs/formatter/system_valid.md'
      ],
      },

      {
        text: '插件系统',
        link: '/docs/plugins/index.md',
        collapsible: true,
        children: [
          '/docs/plugins/plugin_build.md', 
          '/docs/plugins/extra_params.md', 
          '/docs/plugins/params_transformer.md', 
          '/docs/plugins/proxy_rewrite.md', 
          '/docs/plugins/ip_restriction.md', 
          '/docs/plugins/rate_limiting.md', 
          '/docs/plugins/auth.md', 
          '/docs/plugins/response_rewrite.md', 
          '/docs/plugins/circuit_breaker.md',
          '/docs/plugins/cors.md',
          '/docs/plugins/gzip.md',
          '/docs/plugins/access_log.md',
          
        ],
      },
      {
        text: 'cli命令',
        link: '/docs/cli/index.md',
        collapsible: true,
        children: [
          '/docs/cli/start.md', 
          '/docs/cli/stop.md', 
          '/docs/cli/restart.md', 
          '/docs/cli/join.md', 
          '/docs/cli/leave.md', 
          '/docs/cli/info.md', 
          '/docs/cli/extender_install.md', 
          '/docs/cli/extender_upgrade.md', 
          '/docs/cli/extender_uninstall.md',
          '/docs/cli/extender_download.md',
          '/docs/cli/extender_info.md',
          '/docs/cli/extender_version.md',
        ],
      },
    ],
  }
}