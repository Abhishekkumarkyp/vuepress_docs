module.exports = {
  // plugins: ['@vuepress/active-header-links'],
  plugins: [
    ['@vuepress/active-header-links'],
    ['@vuepress/register-components', {
      componentsDir: './path/to/components/global-components.js', // Directory containing your global components
      // components: [
      //   // {
      //   //   name: 'V-Card',
      //   //   path: './path/to/components/Card.vue' // Path to your component
      //   // },
      //   // Add more components as needed
      // ]
    }]
  ],
  title: 'Doodle Press',
  description: 'Just playing around',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    docsDir: "packages/docs/docs",
    nav: [
      { text: 'Home', link: '/',
      },
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      },
      // { text: 'Guide', link: '/guide/' },
      // { text: 'JavaScript', link: '/JavaScript/' },
      // { text: 'my-page', link: '/my-page' },
      // { text: 'Documentation', link: '/documentation/' },
      // { text: 'Documentation', link: '/docs/' },
      { text: 'External Link', link: 'https://example.com' } // Custom link
    ],




    sidebar: {
      '/baz/': 'auto',


      '/guide/': [
        '',
        'frontend',
        'backend',

      ],
      // '/JavaScript/': [
      //   '',
      //   'frontend',
      //   'backend',

      // ],



      // fallback
      '/': [
        '',
        'contact',
        'about',    /* /about.html */
        'documentation',

      ],

    },
    
  },

  // enhanceAppFiles: resolve(__dirname, './components/global-components.js'),

  // alias: {
  //   'styles': path.resolve(__dirname, './styles')
  // }
  // extend: '@vuepress/theme-default',
  // markdown: {
  //   lineNumbers: true
  // },
  

}


// function guide() {
//   return [
   
//       '',
//       'frontend',
//       'backend',

   
//     // {
//     //   text: 'Advanced',
//     //   children: [
//     //     { text: 'API', link: '/api/overview' },
//     //   ]
//     // }
//   ]
// }
