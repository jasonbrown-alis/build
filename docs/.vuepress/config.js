const sidebar = [
    {
        title: "Getting Started",
        collapsable: false,
        children: [
            "/getting-started/introduction",
        ]
    },
    {
    title: 'Guides',
    collapsable: false, 
    children: [
      {
        title: "Build",
        collapsable: false, 
        children: [
          '/guides/build/overview',
          // '/guides/build/build-your-first-product/build-your-first-product',
        ]
      },
      {
        title: "Consume",
        collapsable: false, 
        children: [
          "/guides/consume/quick-start",
          '/guides/consume/make-your-first-request',
        ]
      },
      {
        title: "Device Configuration",
        collapsable: false, 
        children: [
          "/guides/configuration/command-line-interface",
          "/guides/configuration/set-up-your-favourite-IDE",
        ]
      },
    ]
    },
    {
    title: 'References',
    collapsable: false,
    children: [
        '/references/resource-oriented-design',
        '/references/core-concepts'
    ],
    },
    {
        title: "Other Resources",
        path: "/other-resources/other-resources",
        collapsable: false,
    }
];

module.exports = {
    // site config
    base: "/",
    lang: 'en-UK',
    title: 'alis.build',
    description: 'Build better, iterate quicker, scale simpler.',
    head: [
        ['link', { rel: 'icon', href: '/assets/images/_EX.png', type: "image/x-icon" }]
      ],
    configureWebpack: {
      resolve: {
        alias: {
          '@asset_directory': '../.vuepress/public/assets/images'
        }
      }
    },
    // theme and its config
    theme: '@vuepress/theme-default',
    themeConfig: {
      repo: "alis-x/docs",
      docsDir: 'docs',
      docsBranch: 'main',
      editLinks: true,
      logo: "https://github.com/alis-x/docs/blob/main/docs/.vuepress/public/assets/images/alis_exchange.png?raw=true",
      displayAllHeaderLinks: true,
      sidebar: sidebar,
      nextLinks: false,
      prevLinks: false,
      searchPlaceholder: 'Search...',
      nav: [
        { text: 'Request Demo', link: 'https://alis.exchange/signup', rel: false },
      ]
    },
    plugins: [
        [
          'vuepress-plugin-container',
          {
            type: 'VSCodePluginImage',
            before: `<div class="VSCodePluginImage">`,
            after: '</div>',
          },
        ],
        [
            'vuepress-plugin-container',
            {
              type: 'GoLandPluginImage',
              before: `<div class="GoLandPluginImage">`,
              after: '</div>',
            },
          ],
        [ 'tabs' ],
        ["vuepress-plugin-code-copy", {
            align: "bottom",
            color: "#FFFFFF",
            backgroundTransition: false,
            staticIcon: true
        }
        ]
    ],
  }
