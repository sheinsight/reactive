import path from 'node:path'
import { defineConfig } from 'rspress/config'
import { pluginGoogleAnalytics } from 'rsbuild-plugin-google-analytics'
import { locale, version } from './locale'

import type { RspressPlugin } from '@rspress/shared'

const base = '/reactive/'
const plugins: RspressPlugin[] = []
const builderPlugins: ReturnType<typeof pluginGoogleAnalytics>[] = []

if (process.env.IS_SODOC) {
  plugins.push(require('@shein/rspress-plugin-sodoc')())
} else {
  builderPlugins.push(pluginGoogleAnalytics({ id: 'G-R8D51L3PN0' }))
}

export default defineConfig({
  root: path.resolve(__dirname, './docs'),
  base,
  lang: 'en',
  title: 'Reactive',
  description: locale.en.description,
  outDir: 'docs-dist',
  plugins,
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
      tags: process.env.IS_SODOC ? [{ tag: 'script', children: "window.RSPRESS_THEME = 'light';" }] : [],
    },
    output: {
      cleanDistPath: true,
    },
    source: {
      alias: {
        '@@': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
})
