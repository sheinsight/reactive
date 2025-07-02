import path from 'node:path'
import { pluginGoogleAnalytics } from 'rsbuild-plugin-google-analytics'
import { defineConfig } from 'rspress/config'
import { locale } from './locale'

import type { RspressPlugin } from '@rspress/shared'

const base = '/reactive/'
const plugins: RspressPlugin[] = []
const builderPlugins: ReturnType<typeof pluginGoogleAnalytics>[] = []

if (process.env.IS_SODOC) {
  const mod = require('@shein/rspress-plugin-sodoc');
  plugins.push((mod.default || mod)())
} else {
  builderPlugins.push(pluginGoogleAnalytics({ id: 'G-R8D51L3PN0' }))
}

export default defineConfig({
  root: path.resolve(__dirname, './docs'),
  base,
  lang: 'zh-cn',
  title: 'Reactive',
  description: locale.en.description,
  outDir: 'docs-dist',
  plugins,
  globalStyles: path.join(__dirname, './docs/theme/style.css'),
  themeConfig: {
    // enableContentAnimation: true,
    enableScrollToTop: true,
    darkMode: !process.env.IS_SODOC,
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/sheinsight/reactive',
      },
    ],
    locales: [locale.en, locale.zhCN],
  },
  builderPlugins,
  builderConfig: {
    html: {
      tags: process.env.IS_SODOC
        ? [{ tag: 'script', children: "window.RSPRESS_THEME = 'light';" }]
        : [],
    },
    output: {
      cleanDistPath: true,
    },
    resolve: {
      alias: {
        '@@': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
})
