const ROOT_GUIDES = 'guides';
const ROOT_SAMPLES = 'samples';
const ROOT_REFERENCE = 'references';

export default {
	title: 'Alis Build OS',
	description: 'Documentation for Alis Build OS',
	head: [
		['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/favicon-32x32.png"}],
		['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/favicon-16x16.png"}],
	],
	themeConfig: {
		siteTitle: 'Docs',
		logo: '/assets/site-icon.png',
        editLink: {
            pattern: 'https://github.com/alis-exchange/build/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },
		nav: [
			{
				text: toTitleCase(ROOT_GUIDES),
				link: `/${ROOT_GUIDES}/getting-started/introduction`
			},
			// {
			// 	text: toTitleCase(ROOT_SAMPLES),
			// 	link: `/${ROOT_SAMPLES}/`
			// },
			{
				text: toTitleCase(ROOT_REFERENCE),
				link: '/references/core-concepts'
			}
		],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/alis-exchange/build' },
            { icon: 'youtube', link: 'https://www.youtube.com/channel/UCcUppUH_3cLwHUEJ7e4lLLg/featured' },
        ],
		sidebar: {
			'/guides/': [
				{
					text: 'Getting Started',
                    collapsible: true,
					items: [
                        {
                            text: 'Introduction',
                            link: `/${ROOT_GUIDES}/getting-started/introduction`
                        }
                    ]
				},
				{
					text: 'How-to-guides',
                    collapsible: true,
					items: [
                        {
                            text: 'Build',
                            items: [
                                {
                                    text: 'Overview',
                                    link: '/guides/build/overview'
                                },
                                {
                                    text: 'Leveraging auto-generated documentation',
                                    link: '/guides/build/auto-generated-docs'
                                }
                            ]
                        },
                        {
                            text: 'Consume',
                            items: [
                                {
                                    text: 'Quick start',
                                    link: '/guides/consume/quick-start'
                                },
                                {
                                    text: 'Make a request to a product',
                                    link: '/guides/consume/make-your-first-request'
                                },
                            ]
                        },
                        {
                            text: 'Device Configuration',
                            items: [
                                {
                                    text: 'Install the Alis CLI',
                                    link: '/guides/configuration/command-line-interface'
                                },
                                {
                                    text: 'Configure your IDE',
                                    link: '/guides/configuration/set-up-your-favourite-IDE'
                                },
                            ]
                        }
                    ]
				}
			],
			'/references/':[
				{
					text: 'Reference Documents',
					items: [
                        {
                            text: 'Alis Exchange core concepts',
                            link: '/references/core-concepts'
                        },
                        {
                            text: 'Resource-oriented design',
                            link: '/references/resource-oriented-design'
                        },
                    ],
				},
				{
					text: 'Further Reading',
                    items: [
                        {
                            text: "Additional resources",
                            link: '/references/other-resources/other-resources'
                        }
                    ]
				},
			]
		},
	}
}

function toTitleCase(s) {
	return s.replace (/^[-_]*(.)/, (_, c) => c.toUpperCase())       // Initial char (after -/_)
		.replace (/[-_]+(.)/g, (_, c) => ' ' + c) // Fir
}