const ROOT_GUIDES = 'guides';
const ROOT_SAMPLES = 'samples';
const ROOT_REFERENCE = 'references';

import { defineConfig } from 'vitepress';
import escapeHtml from 'escape-html';
import prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';

loadLanguages();

const wrap = (code: string, lang: string) => {
	if (lang === 'text') code = escapeHtml(code);
	return `<pre v-pre><code>${code}</code></pre>`;
};

const highlight = (str: string, lang: string) => {
	if (!lang) return wrap(str, 'text');
	lang = lang.toLowerCase();
	const rawLang = lang;
	if (lang === 'vue' || lang === 'html') lang = 'markup';
	if (lang === 'md') lang = 'markdown';
	if (lang === 'ts') lang = 'typescript';
	if (lang === 'py') lang = 'python';
	if (!prism.languages[lang])
		try {
			loadLanguages([lang]);
		} catch {}
	if (prism.languages[lang]) {
		const code = prism.highlight(str, prism.languages[lang], lang);
		return wrap(code, rawLang);
	}
	return wrap(str, 'text');
};

export default {
	title: 'Alis Build',
	description: 'Documentation for Alis Build',
	head: [
		['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/favicon-32x32.png"}],
		['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/favicon-16x16.png"}],
	],
	markdown:{
		highlight,
	},
	themeConfig: {
		siteTitle: 'Docs',
		logo: '/assets/site-icon.png',
        editLink: {
            pattern: 'https://github.com/alis-exchange/build/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },
		// nav: [
		// 	{
		// 		text: toTitleCase(ROOT_GUIDES),
		// 		link: `/${ROOT_GUIDES}/getting-started/introduction`
		// 	},
		// 	// {
		// 	// 	text: toTitleCase(ROOT_SAMPLES),
		// 	// 	link: `/${ROOT_SAMPLES}/`
		// 	// },
		// 	{
		// 		text: toTitleCase(ROOT_REFERENCE),
		// 		link: '/references/core-concepts'
		// 	}
		// ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/alis-exchange/build' },
            { icon: 'youtube', link: 'https://www.youtube.com/channel/UCcUppUH_3cLwHUEJ7e4lLLg/featured' },
        ],
		sidebar:  [
				{
					text: 'Getting Started',
                    collapsible: true,
					items: [
                        {
                            text: 'Introduction',
                            link: `/${ROOT_GUIDES}/getting-started/introduction`
                        },
						{
							text: "Overview",
							items: [
								{
									text: 'Conceptual framework',
									link: '/guides/getting-started/conceptual-framework'
								},
								{
									text: 'Developer flow',
									link: '/guides/getting-started/developer-flow'
								},
								{
									text: 'Consumer experience',
									link: '/guides/getting-started/consumer-experience'
								},
							]
						},
						{
							text: 'Alis CLI installation',
							link: '/guides/getting-started/command-line-interface'
						},
                    ]
				},
				{
					text: 'How-to-guides',
                    collapsible: true,
                    collapsed: true,
					items: [
						{
							text: 'Make a request to a product',
							link: '/guides/how-to-guides/make-your-first-request'
						},
						{
							text: 'Leverage auto-generated documentation',
							link: '/guides/how-to-guides/auto-generated-docs'
						},
						{
							text: 'Specify proto visibility scopes',
							link: '/guides/how-to-guides/proto-visibility-scopes'
						},
						{
							text: 'Configure your IDE',
							link: '/guides/how-to-guides/configure-your-IDE'
						},
						{
							text: 'Build a service',
							collapsible: true,
							items: [
								{
									text: 'Overview',
									link: '/guides/how-to-guides/build-a-service/overview',
								},
								{
									text: 'Design',
									link: '/guides/how-to-guides/build-a-service/design',
								},
								{
									text: 'Implement',
									link: '/guides/how-to-guides/build-a-service/implement',
								},
								{
									text: 'Deploy',
									link: '/guides/how-to-guides/build-a-service/deploy',
								},
							]
						}
					]
				},
				{
					text: 'Further Reading',
					collapsible: true,
					collapsed: true,
					items: [
						{
							text: 'Resource-oriented design',
							link: '/guides/references/resource-oriented-design'
						},
						{
							text: "Core technologies",
							link: '/guides/references/core-technologies'
						},
					]
				},
			],
			// '/references/':[
			// 	{
			// 		text: 'Reference Documents',
			// 		items: [
            //             {
            //                 text: 'Alis Exchange core concepts',
            //                 link: '/references/core-concepts'
            //             },
            //         ],
			// 	},
			// ]
	}
};

function toTitleCase(s) {
	return s.replace (/^[-_]*(.)/, (_, c) => c.toUpperCase())       // Initial char (after -/_)
		.replace (/[-_]+(.)/g, (_, c) => ' ' + c) // Fir
}