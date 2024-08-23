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
        text: '🔗 Root API',
        link: '/reference/root',
      },
      {
        text: '🔗 Vanilla API',
        link: '/reference/vanilla',
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
        text: '🔗 Root API',
        link: `/${langSlug.zhCN}/reference/root`,
      },
      {
        text: '🔗 Vanilla API',
        link: `/${langSlug.zhCN}/reference/vanilla`,
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
      items: [
        { text: 'Root API', link: '/reference/root' },
        { text: 'Vanilla API', link: '/reference/vanilla' },
      ],
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
      items: [
        { text: 'Root API', link: `/${langSlug.zhCN}/reference/root` },
        { text: 'Vanilla API', link: `/${langSlug.zhCN}/reference/vanilla` },
      ],
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
