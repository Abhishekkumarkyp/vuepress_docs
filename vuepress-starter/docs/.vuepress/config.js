// import { path } from '@vuepress/utils'

// Resolve the path for a specific directory
// const myPath = path.resolve(__dirname, 'my-directory')
// console.log(myPath)

module.exports = {
  
  // plugins: ['@vuepress/active-header-links'],
  plugins: [
    ['@vuepress/active-header-links'],
    ['@vuepress/register-components', {
      // componentsDir: './path/to/components/global-components.js', // Directory containing your global components
      components: [
        // {
        //   name: 'MyDocument',
        //   path: './components/MyDocument.vue' // Path to your component
        // },
        // Add more components as needed
      ]
    }],
    // 'vuepress-plugin-code-copy',
      ['vuepress-plugin-code-copy', {
        align: 'bottom', // position of the copy button
        // color: '#3eaf7c', // color of the copy button
        color: '#27b1ff', // color of the copy button
        // backgroundColor: '#ffffff', // background color of the copy button
        successText: 'Copied!', // text that appears when code is successfully copied
        // staticIcon: true, // keep the icon static or not
        staticIcon: true, // Keep the icon static (does not change on hover)
        iconClass: 'copy', // Custom icon class (e.g., from FontAwesome)
      }],
      // [
      //   '@vuepress/register-components',
      //   {
      //     componentsDir: path.resolve(__dirname, './components'),
      //   },
      // ],
  ],
  title: 'Doodle Press',
  description: 'Just playing around',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    docsDir: "packages/docs/docs",
    searchPlaceholder: 'Search...',
    smoothScroll: true,
    nav: [
      { text: 'Home', link: '/',},
      { text: 'Git', link: '/gitdocs/',},
      { text: 'DSA', link: '/dsa/',},
      { text: 'SQL', link: '/sql/',},
      { text: 'VueJS', link: '/vuejs/',},
      { text: 'Productivity', ariaLabel: 'Productivity Menu',
      items: [
        { text: 'VS-Code ShortCut', link: '/productivity/vsCodeShortCut' },
        { text: 'React Coding Environment', link: '/productivity/reactCodingEnvironment' },
        { text: 'Tips', link: '/productivity/devloperPrdoductivity' },
      ]},
      {
        text: 'AIML',
        ariaLabel: 'AIML Menu',
        items: [
          { text: 'SVM', link: '/aiml/svm' },
          { text: 'Tree Model', link: '/aiml/treeModel' },
        ]
      },
      // { text: 'Guide', link: '/guide/' },
      // { text: 'JavaScript', link: '/JavaScript/' },
      // { text: 'my-page', link: '/my-page' },
      // { text: 'Documentation', link: '/documentation/' },
      // { text: 'Documentation', link: '/docs/' },
      { text: 'External Link', link: 'https://example.com' }, // Custom link
      { text: 'My Page', link: '/mypage/' } // Ensure the link to /mypage/ is present

    ],




    sidebar: {
      '/baz/': 'auto',


      '/guide/': [
        '',
        'frontend',
        'backend',

      ],
      '/aiml/':[
        '',
        'svm',
        'treeModel'
      ],
      '/gitdocs/':[
        '',
      ],
      '/dsa/':[
        '',
        'questions',
        'sortingAlgorithms'
      ],
      '/sql/':[
        '',
      ],
      '/angular/':[
        '',
        'mypage.vue'
      ],
      // '/mypage/':[
      //   '',
      // ],
      '/vuejs/':[
        '',
      ],
      '/productivity/':[
        'vsCodeShortCut',
        'reactCodingEnvironment',
        'devloperPrdoductivity'
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
    // Adding the custom route to 'MyPage.vue'
  extraPages: [
    {
      path: '/mypage/',  // This will be your route URL
      frontmatter: {
        title: 'My Page'
      },
      component: './.vuepress/pages/MyPage.vue'
    }
  ]
    
  },

  // enhanceAppFiles: resolve(__dirname, './components/global-components.js'),

  // alias: {
  //   'styles': path.resolve(__dirname, './styles')
  // }
  // theme: 'vuepress-theme-reco',
  // theme: '@vuepress/theme-blog',
  // extend: 'vuepress-theme-reco',
  // extend: '@vuepress/vuepress-theme-reco',
  extend: '@vuepress/theme-default',
  markdown: {
    lineNumbers: true
  },
  // extraCssFiles: [
  //   '/styles/python-custom.css',
  // ],
  

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
