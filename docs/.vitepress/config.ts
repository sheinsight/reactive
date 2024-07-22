import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: "/reactive/",
	title: "Reactive",
	description: "Proxy-driven state library for JavaScript application.",
	head: [
		[
			"script",
			{
				async: "",
				src: "https://www.googletagmanager.com/gtag/js?id=G-R8D51L3PN0",
			},
		],
		[
			"script",
			{},
			`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-R8D51L3PN0');`,
		],
	],
	sitemap: {
		hostname: "https://sheinsight.github.io",
	},
	locales: {
		root: {
			label: "English",
			lang: "en",
		},
		"zh-cn": {
			label: "简体中文",
			lang: "zh-Hans",
			title: "Reactive",
			description: "由 Proxy 驱动的 JavaScript 应用程序状态管理库",
			themeConfig: {
				nav: [
					{ text: "上手指南", link: "/zh-cn/what-is-reactive" },
					{
						text: "API 参考",
						items: [
							{ text: "Root API", link: "/zh-cn/reference/root-api" },
							{ text: "Vanilla API", link: "/zh-cn/reference/vanilla-api" },
						],
					},
					{
						text: "版本发布",
						link: "https://github.com/sheinsight/reactive/releases",
					},
					{
						text: "在线示例",
						link: "https://githubbox.com/sheinsight/reactive/tree/main/examples/basic",
					},
				],

				sidebar: [
					{
						text: "上手指南",
						items: [
							{ text: "什么是 Reactive？", link: "/zh-cn/what-is-reactive" },
							{ text: "安装", link: "/zh-cn/installation" },
							{
								text: "用法",
								items: [
									{ text: "React", link: "/zh-cn/usage/react" },
									{ text: "Vanilla JavaScript", link: "/zh-cn/usage/vanilla" },
								],
							},
							{ text: "FAQ (常见问题)", link: "/zh-cn/faq" },
						],
					},
					{
						text: "集成",
						items: [
							{ text: "Redux DevTools", link: "/zh-cn/integrations/redux-devtools" },
						],
					},
					{
						text: "API 参考",
						items: [
							{ text: "根 API", link: "/zh-cn/reference/root-api" },
							{ text: "Vanilla API", link: "/zh-cn/reference/vanilla-api" },
						],
					},
				],

				editLink: {
					pattern:
						"https://github.com/sheinsight/reactive/edit/main/docs/:path",
					text: "在 GitHub 上编辑",
				},

				lastUpdated: {
					text: "更新于",
				},

				footer: {
					message: "Reactive 使用 MIT 许可发布。",
					copyright: "Copyright © 2023-Present @shined",
				},
			},
		},
	},
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Guide", link: "/what-is-reactive" },
			{
				text: "API",
				items: [
					{ text: "Root API", link: "/reference/root-api" },
					{ text: "Vanilla API", link: "/reference/vanilla-api" },
				],
			},
			{
				text: "Release",
				link: "https://github.com/sheinsight/reactive/releases",
			},
			{
				text: "Online Example",
				link: "https://githubbox.com/sheinsight/reactive/tree/main/examples/basic",
			},
		],

		sidebar: [
			{
				text: "Guide",
				items: [
					{ text: "What is Reactive?", link: "/what-is-reactive" },
					{ text: "Installation", link: "/installation" },
					{
						text: "Usage",
						items: [
							{ text: "React", link: "/usage/react" },
							{ text: "Vanilla JavaScript", link: "/usage/vanilla" },
						],
					},
					{ text: "FAQ", link: "/faq" },
				],
			},
			{
				text: "Integrations",
				items: [
					{ text: "Redux DevTools", link: "/integrations/redux-devtools" },
				],
			},
			{
				text: "Reference",
				items: [
					{ text: "Root API", link: "/reference/root-api" },
					{ text: "Vanilla API", link: "/reference/vanilla-api" },
				],
			},
		],

		editLink: {
			pattern: "https://github.com/sheinsight/reactive/edit/main/docs/:path",
			text: "Edit this page on GitHub",
		},

		lastUpdated: {
			text: "Updated at",
		},

		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2023-Present @shined",
		},

		socialLinks: [
			{ icon: "github", link: "https://github.com/sheinsight/reactive" },
		],
	},
});
