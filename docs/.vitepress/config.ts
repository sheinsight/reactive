import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/reactive',
  title: 'Reactive',
  description: 'Proxy-driven state for React & vanilla JS.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    editLink: {
      pattern: 'https://github.com/sheinsight/reactive/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    lastUpdated: {
      text: 'Updated at',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/sheinsight/reactive' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-Present SHEIN FE Team',
    },
  },
})
