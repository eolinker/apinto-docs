const path = require('path');
const basedir = path.resolve(__dirname, '..')
module.exports = {
  title: 'APINTO',
  description: '一款基于 Golang 开发的微服务网关',
  public: path.resolve(basedir, './public'),
  head: [['link', { rel: 'icon', href: '/images/logo.svg' }]],
  themeConfig: {
    logo: '/images/logo.png',
    darkMode: false,
    home: '/docs/',
    docsRepo: 'https://github.com/eolinker/apinto-docs',
    docsBranch: 'main',
    navbar: [
      { text: "首页", link: "https://www.apinto.com/"},
      { 
        text: "文档", 
        children:[
          {
            text:"Apinto",link: "/docs/index.md"
          },
          {
            text:"Apinto Dashboard",link: "/docs/dashboard/index.md"
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
          link: "/view/contributor.md",
        }
        
        ], 
      },
      { text: "博客", link: "https://www.apinto.com/?page_id=15" },
      { 
        text: "下载", 
        children:[
          {
            text:"Apinto",link: "https://github.com/eolinker/apinto/releases"
          },
          {
            text:"Apinto Dashboard",link: "https://github.com/eolinker/apinto-dashboard/releases"
          }
        ],
        
      },
      {
        text: "Github",
        children:[
          {
            text:"Apinto",link: "https://github.com/eolinker/apinto"
          },
          {
            text:"Apinto Dashboard",link: "https://github.com/eolinker/apinto-dashboard"
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
            placeholder: '搜索...',
          },
          
        },
      },
    ]
  ],
}

function getSideBar(){
  return {
    '/docs': apinto(),
    "/docs/dashboard": dashboard()
  }
}

function apinto() {
  return [
    {
      text: '关于Apinto',
      link: '/docs/index.md',
    },
    {
      text: '快速开始',
      collapsible: true,
      children: [
        // '/docs/apinto/quick/introduction.md',
        '/docs/apinto/quick/arrange.md',
        '/docs/apinto/quick/quick_start.md',
        '/docs/apinto/quick/quick_course.md'
      ],
    },
    {
      text: '系统配置',
      link: '/docs/apinto/system/index.md',
      collapsible: true,
      children: ['/docs/apinto/system/error_log.md'],
    },
    {
      text: '路由',
      collapsible: true,
      children: ['/docs/apinto/router/http.md','/docs/apinto/router/http_v0.7.x.md'],
    },
    {
      text: '服务',
      collapsible: true,
      children: ['/docs/apinto/service/http.md'],
    },
    {
      text: '服务发现',
      link: '/docs/apinto/discovery/index.md',
      collapsible: true,
      children: [
        '/docs/apinto/discovery/static.md',
        '/docs/apinto/discovery/consul.md',
        '/docs/apinto/discovery/eureka.md',
        '/docs/apinto/discovery/nacos.md'
      ],
    },
    {
      text: '应用',
      link: '/docs/apinto/app/index.md',
      collapsible: true,
      children: [
        '/docs/apinto/app/auth.md',
        '/docs/apinto/app/extra-param.md'
      ],
    },
    {
      text: '访问鉴权（v0.8.x版本废弃）',
      link: '/docs/apinto/auth/index.md',
      collapsible: true,
      children: [
        '/docs/apinto/auth/aksk.md',
        '/docs/apinto/auth/apikey.md',
        '/docs/apinto/auth/basic.md',
        '/docs/apinto/auth/jwt.md'
      ],
    },
    {
      text: '输出器',
      collapsible: true,
      children: ['/docs/apinto/outputer/file.md', '/docs/apinto/outputer/syslog.md', '/docs/apinto/outputer/kafka.md', '/docs/apinto/outputer/http.md', '/docs/apinto/outputer/nsq.md'],
    },
    {
      text: 'formatter',
      link: '/docs/formatter/index.md',
      collapsible: true,
    },
    {
      text: '证书',
      // link: '/docs/apinto/template/index.md',
      collapsible: true,
      children: [
        '/docs/apinto/certificate/server.md'
      ],
    },
    {
      text: '插件模版',
      link: '/docs/apinto/template/index.md',
      collapsible: true,
      children: [
      ],
    },
    {
      text: '插件系统',
      link: '/docs/apinto/plugins/index.md',
      collapsible: true,
      children: [
        '/docs/apinto/plugins/plugin_build.md',
        '/docs/apinto/plugins/extra_params.md',
        '/docs/apinto/plugins/params_transformer.md',
        '/docs/apinto/plugins/proxy_rewrite.md',
        '/docs/apinto/plugins/proxy_rewrite_v2.md',
        '/docs/apinto/plugins/ip_restriction.md',
        '/docs/apinto/plugins/rate_limiting.md',
        '/docs/apinto/plugins/auth.md',
        '/docs/apinto/plugins/response_rewrite.md',
        '/docs/apinto/plugins/circuit_breaker.md',
        '/docs/apinto/plugins/cors.md',
        '/docs/apinto/plugins/gzip.md',
        '/docs/apinto/plugins/access_log.md',

      ],
    },
    {
      text: 'cli命令',
      link: '/docs/apinto/cli/index.md',
      collapsible: true,
      children: [
        '/docs/apinto/cli/start.md',
        '/docs/apinto/cli/stop.md',
        '/docs/apinto/cli/restart.md',
        '/docs/apinto/cli/join.md',
        '/docs/apinto/cli/leave.md',
        '/docs/apinto/cli/info.md',
      ],
    },
    {
      text: 'Open Api',
      link: '/docs/apinto/open.md',
    },
    {
      text: 'FAQ',
      link: '/docs/apinto/faq/index.md',
    },
  ]
}

function dashboard() {
  let name = "dashboard"
  return [
    {
      text: '关于Apinto dashboard',
      link: '/docs/' + name + '/index.md',
    },
    {
      text: '快速开始',
      collapsible: true,
      children: [
        // '/docs/' + name + '/quick/introduction.md',
        '/docs/' + name + '/quick/arrange.md',
        '/docs/' + name + '/quick/quick_course.md'
      ],
    },
    {
      text: '路由',
      collapsible: true,
      children: ['/docs/' + name + '/router/http.md'],
    },
    {
      text: '上游服务',
      collapsible: true,
      children: ['/docs/' + name + '/service/http.md'],
    },
    {
      text: '服务发现',
      link: '/docs/' + name + '/discovery/index.md',
      collapsible: true,
      children: [
        '/docs/' + name + '/discovery/static.md',
        '/docs/' + name + '/discovery/consul.md',
        '/docs/' + name + '/discovery/eureka.md',
        '/docs/' + name + '/discovery/nacos.md'
      ],
    },
    {
      text: '应用',
      link: '/docs/' + name + '/app/index.md',
      collapsible: true,
      children: [
        '/docs/' + name + '/app/auth.md',
        '/docs/' + name + '/app/extra-param.md'
      ],
    },
    {
      text: '证书',
      // link: '/docs/' + name + '/template/index.md',
      collapsible: true,
      children: [
        '/docs/' + name + '/certificate/server.md',
      ],
    },
    {
      text: '插件模版',
      link: '/docs/' + name + '/template/index.md',
      collapsible: true,
      children: [
      ],
    },

    {
      text: '输出器',
      link: '/docs/' + name + '/outputer/index.md',
      collapsible: true,
      children: [
          '/docs/' + name + '/outputer/file.md',
        // '/docs/' + name + '/outputer/syslog.md',
        // '/docs/' + name + '/outputer/kafka.md',
        // '/docs/' + name + '/outputer/http.md',
        // '/docs/' + name + '/outputer/nsq.md'
      ],
    },

    {
      text: '插件系统',
      link: '/docs/' + name + '/plugins/index.md',
      collapsible: true,
      children: [
        '/docs/' + name + '/plugins/extra_params.md',
        '/docs/' + name + '/plugins/params_transformer.md',
        '/docs/' + name + '/plugins/proxy_rewrite.md',
        '/docs/' + name + '/plugins/proxy_rewrite_v2.md',
        '/docs/' + name + '/plugins/ip_restriction.md',
        '/docs/' + name + '/plugins/rate_limiting.md',
        '/docs/' + name + '/plugins/auth.md',
        '/docs/' + name + '/plugins/response_rewrite.md',
        '/docs/' + name + '/plugins/circuit_breaker.md',
        '/docs/' + name + '/plugins/cors.md',
        '/docs/' + name + '/plugins/gzip.md',
        '/docs/' + name + '/plugins/access_log.md',

      ],
    },
  ]
}