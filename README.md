# apinto-docs
Apinto document project, which includes the use tutorials, development documents and other related contents of apinto. 

# README

本文档由 [Vitepress](https://vitepress.dev/) 搭建

### 项目结构

```bash
.
├── README.md       # 本文档
├── index.md        # 首页
├── .vitepress/      # vuepress配置，构建后的静态资源也在该文件夹下。
│   ├─ theme
│   │  ├─ components/ # markdown 文档中需要运行的vue组件，例如定制化的首页
│   │  └─ index.ts   # 主题入口
│   └─ config.ts     # 主题配置
├── public/         # 不需要编译的公共资源，如 favicon.ico,logo等
├── docs/           # 各详细文档
├── package.json    # 依赖配置
└── pnpm-lock.lock  # 依赖配置
```

### 如何开始编辑

#### 第一步

环境准备： 需要安装12.20.0或14.13.0或大于等于15.0.0版本的node

依赖安装：确保项目下`package.json`文件内的依赖已用`pnpm`安装。

#### 第二步

运行 Vitepress 环境

```bash
$ pnpm dev
```

运行成功后，可以在`localhost:5173/`实时查看编辑结果。

#### 第三步

用编辑器打开项目 `/docs/` 目录下需要编辑的`.md`文档，或新建`.md`文档，进行编辑。`.md`文件和`.vue`的变动，都可以在步骤一所打开的页面上实时看到最终效果。

#### 文档中的配置

VuePress 提供了一些配置选项，用于控制`.md`文档的细节，目前本项目所用不多，如需要查阅，可参考官方的[Frontmatter](https://v2.vuepress.vuejs.org/reference/default-theme/frontmatter.html)。

#### 文档中的静态资源

在`.md`文件中的图片，目前约定放置在`/assets/`文件夹下，在`.md`文件中使用相对路径引入即可。

#### 如何在 markdown 嵌入 vue 组件

在`.md`文件中嵌入 vue 组件的语法非常简单，只需要在components文件夹中编写组件代码，便可在markdown中直接使用。

在`.vue`组件中可以使用 css 预编译器描述样式，本项目选用了`stylus`。

```markdown
...markdown 语法内容...

<Test />

...markdown 语法内容...
```

关于自定义组件的注册和使用，具体可以参照官方文档的[register-components](https://v2.vuepress.vuejs.org/reference/plugin/register-components.html)。

### 如何构建

构建命令为：

```bash
$ pnpm build
```

构建成功后，会在根目录下创建名为 `dist/`的文件夹，其中内容即是构建后的静态资源，如果需要在本地预览，可以运行`pnpm preview`命令，在本地临时启动一个静态资源服务器，即可预览构建后的最终效果。

也可以将`dist/`中的内容放置到正式服务器上浏览。
