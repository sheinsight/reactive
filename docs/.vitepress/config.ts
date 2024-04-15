import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/reactive',
  title: 'Reactive',
  description: 'Proxy-driven state for React & vanilla JS.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/get-started/react' },
      { text: 'API', link: '/reference/api' },
      {
        text: 'Online Example',
        link: 'https://githubbox.com/sheinsight/reactive/tree/main/examples/basic',
      },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'What is Reactive?', link: '/what-is-reactive' },
          { text: 'Installation', link: '/installation' },
          {
            text: 'Usage',
            items: [
              { text: 'React', link: '/usage/react' },
              { text: 'Vanilla JS', link: '/usage/vanilla' },
            ],
          },
          { text: 'FAQ', link: '/faq' },
        ],
      },
      {
        text: 'Integrations',
        items: [{ text: 'Redux DevTools', link: '/integrations/redux-devtools' }],
      },
      {
        text: 'Reference',
        items: [{ text: 'API', link: '/reference/api' }],
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
