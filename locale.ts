import { version } from './package.json'

import type { LocaleConfig } from '@rspress/shared'

const langSlug = {
  en: 'en',
  zhCN: 'zh-cn',
}

export { version }

export const sidebar = {
  en: {
    '/guide': [
      {
        text: '🎉 Introduction',
        link: '/guide/introduction',
      },
      {
        text: '🏃 Installation',
        link: '/guide/installation',
      },
      {
        text: '🔧 Usage',
        items: [
          {
            text: '⚛️ React',
            link: '/guide/usage/react',
          },
          {
            text: '🟡 Vanilla JavaScript',
            link: '/guide/usage/vanilla',
          },
        ],
      },
      {
        text: '🧩 Enhancers',
        items: [
          {
            text: 'Introduction',
            link: '/guide/enhancers/introduction',
          },
          {
            text: 'Built-in Enhancers',
            collapsed: true,
            items: [
              {
                text: 'withSnapshot',
                link: '/guide/enhancers/builtins/with-snapshot',
              },
              {
                text: 'withUseSnapshot',
                link: '/guide/enhancers/builtins/with-use-snapshot',
              },
              {
                text: 'withSubscribe',
                link: '/guide/enhancers/builtins/with-subscribe',
              },
              {
                text: 'withUseSubscribe',
                link: '/guide/enhancers/builtins/with-use-subscribe',
              },
              {
                text: 'withDerived',
                link: '/guide/enhancers/builtins/with-derived',
              },
              {
                text: 'withUseDerived',
                link: '/guide/enhancers/builtins/with-use-derived',
              },
            ],
          },
        ],
      },
      {
        text: '🔌 Integrations',
        items: [
          {
            text: '🔌 Redux DevTools',
            link: '/guide/integrations/redux-devtools',
          },
        ],
      },
      {
        text: '❓ FAQs',
        link: '/guide/faq',
      },
    ],
    '/reference': [
      {
        text: 'Basic API',
        items: [
          {
            text: 'create',
            link: '/reference/basic/create',
          },
          {
            text: 'createVanilla',
            link: '/reference/basic/create-vanilla',
          },
          {
            text: 'useReactive',
            link: '/reference/basic/use-reactive',
          },
        ],
      },
      {
        text: 'Advanced API',
        items: [
          {
            text: 'ref',
            link: '/reference/advanced/ref',
          },
          {
            text: 'devtools',
            link: '/reference/advanced/devtools',
          },
          {
            text: 'produce',
            link: '/reference/advanced/produce',
          },
        ],
      },
      {
        text: 'Standalone API',
        items: [
          {
            text: 'createSingleLoading',
            link: '/reference/standalone/create-single-loading',
          },
        ],
      },
      {
        text: 'Internal API',
        collapsed: true,
        items: [
          {
            text: 'snapshot',
            link: '/reference/internal/snapshot',
          },
          {
            text: 'getSnapshot',
            link: '/reference/internal/get-snapshot',
          },
          {
            text: 'subscribe',
            link: '/reference/internal/subscribe',
          },
          {
            text: 'proxy',
            link: '/reference/internal/proxy',
          },
          {
            text: 'useSnapshot',
            link: '/reference/internal/use-snapshot',
          },
          {
            text: 'useSubscribe',
            link: '/reference/internal/use-subscribe',
          },
        ],
      },
    ],
  },
  zhCN: {
    '/zh-cn/guide': [
      {
        text: '🎉 介绍',
        link: `/${langSlug.zhCN}/guide/introduction`,
      },
      {
        text: '🏃 安装',
        link: `/${langSlug.zhCN}/guide/installation`,
      },
      {
        text: '🔧 使用',
        items: [
          {
            text: '⚛️ React',
            link: `/${langSlug.zhCN}/guide/usage/react`,
          },
          {
            text: '🟡 Vanilla JavaScript',
            link: `/${langSlug.zhCN}/guide/usage/vanilla`,
          },
        ],
      },
      {
        text: '🧩 增强器',
        items: [
          {
            text: '介绍',
            link: `/${langSlug.zhCN}/guide/enhancers/introduction`,
          },
          {
            text: '内置增强器',
            collapsed: true,
            items: [
              {
                text: 'withSnapshot',
                link: `/${langSlug.zhCN}/guide/enhancers/builtins/with-snapshot`,
              },
              {
                text: 'withUseSnapshot',
                link: `/${langSlug.zhCN}/guide/enhancers/builtins/with-use-snapshot`,
              },
              {
                text: 'withSubscribe',
                link: `/${langSlug.zhCN}/guide/enhancers/builtins/with-subscribe`,
              },
              {
                text: 'withUseSubscribe',
                link: `/${langSlug.zhCN}/guide/enhancers/builtins/with-use-subscribe`,
              },
              {
                text: 'withDerived',
                link: `/${langSlug.zhCN}/guide/enhancers/builtins/with-derived`,
              },
              {
                text: 'withUseDerived',
                link: `/${langSlug.zhCN}/guide/enhancers/builtins/with-use-derived`,
              },
            ],
          },
        ],
      },
      {
        text: '🔌 集成',
        items: [
          {
            text: '🔌 Redux DevTools',
            link: `/${langSlug.zhCN}/guide/integrations/redux-devtools`,
          },
        ],
      },
      {
        text: '❓ 常见问题',
        link: `/${langSlug.zhCN}/guide/faq`,
      },
    ],
    '/reference': [
      {
        text: '基础 API',
        items: [
          {
            text: 'create',
            link: `/${langSlug.zhCN}/reference/basic/create`,
          },
          {
            text: 'createVanilla',
            link: `/${langSlug.zhCN}/reference/basic/create-vanilla`,
          },
          {
            text: 'useReactive',
            link: `/${langSlug.zhCN}/reference/basic/use-reactive`,
          },
        ],
      },
      {
        text: '进阶 API',
        items: [
          {
            text: 'ref',
            link: `/${langSlug.zhCN}/reference/advanced/ref`,
          },
          {
            text: 'devtools',
            link: `/${langSlug.zhCN}/reference/advanced/devtools`,
          },
          {
            text: 'produce',
            link: `/${langSlug.zhCN}/reference/advanced/produce`,
          },
        ],
      },
      {
        text: '独立导出 API',
        items: [
          {
            text: 'createSingleLoading',
            link: `/${langSlug.zhCN}/reference/standalone/create-single-loading`,
          },
        ],
      },
      {
        text: '内部 API',
        collapsed: true,
        items: [
          {
            text: 'snapshot',
            link: `/${langSlug.zhCN}/reference/internal/snapshot`,
          },
          {
            text: 'getSnapshot',
            link: `/${langSlug.zhCN}/reference/internal/get-snapshot`,
          },
          {
            text: 'subscribe',
            link: `/${langSlug.zhCN}/reference/internal/subscribe`,
          },
          {
            text: 'proxy',
            link: `/${langSlug.zhCN}/reference/internal/proxy`,
          },
          {
            text: 'useSnapshot',
            link: `/${langSlug.zhCN}/reference/internal/use-snapshot`,
          },
          {
            text: 'useSubscribe',
            link: `/${langSlug.zhCN}/reference/internal/use-subscribe`,
          },
        ],
      },
    ],
  },
} satisfies Record<string, LocaleConfig['sidebar']>

export const navbar = {
  en: [
    {
      text: 'Guide',
      link: '/guide/introduction',
    },
    {
      text: 'Reference',
      link: '/reference/basic/create',
    },
    {
      text: `v${version}`,
      items: [
        {
          text: 'Release Notes',
          link: 'https://github.com/sheinsight/reactive/releases',
        },
        {
          text: 'Playground',
          link: 'https://githubbox.com/sheinsight/reactive/tree/main/examples/basic',
        },
      ],
    },
  ],
  zhCN: [
    {
      text: '上手指南',
      link: `/${langSlug.zhCN}/guide/introduction`,
    },
    {
      text: 'API 参考',
      link: `/${langSlug.zhCN}/reference/basic/create`,
    },
    {
      text: `v${version}`,
      items: [
        {
          text: '发布日志',
          link: 'https://github.com/sheinsight/reactive/releases',
        },
        {
          text: '演练场',
          link: 'https://githubbox.com/sheinsight/reactive/tree/main/examples/basic',
        },
      ],
    },
  ],
} satisfies Record<string, LocaleConfig['nav']>

export const locale = {
  en: {
    lang: 'en',
    label: 'English',
    title: '@shined/reactive',
    description: 'Intuitive, Flexible and Written in TypeScript.',
    lastUpdatedText: 'Updated at',
    lastUpdated: !process.env.IS_SODOC,
    prevPageText: 'Previous',
    nextPageText: 'Next',
    searchPlaceholderText: 'Search...',
    searchNoResultsText: 'No results found',
    searchSuggestedQueryText: 'Try different keywords?',
    nav: navbar.en,
    sidebar: sidebar.en,
  },
  zhCN: {
    lang: 'zh-cn',
    label: '简体中文',
    title: '@shined/reactive',
    description: '直观、灵活、使用 TypeScript 编写。',
    lastUpdatedText: '更新于',
    lastUpdated: !process.env.IS_SODOC,
    prevPageText: '上一页',
    nextPageText: '下一页',
    searchPlaceholderText: '搜索...',
    searchNoResultsText: '没有找到相关结果',
    searchSuggestedQueryText: '试试不同的关键词？',
    nav: navbar.zhCN,
    sidebar: sidebar.zhCN,
  },
} satisfies Record<string, LocaleConfig>
