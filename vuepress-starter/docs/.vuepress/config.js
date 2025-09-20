// import { path } from '@vuepress/utils'

// Resolve the path for a specific directory
// const myPath = path.resolve(__dirname, 'my-directory')
// console.log(myPath)

module.exports = {
  
  // plugins: ['@vuepress/active-header-links'],
  plugins: [
    ['@vuepress/active-header-links'],
  //   ['@vuepress/register-components', {
  //     // componentsDir: './path/to/components/global-components.js', // Directory containing your global components
    
  //   }
  
  // ],
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
      ['@vuepress/search', {
      searchMaxSuggestions: 10
      }]
      // [
      //   '@vuepress/register-components',
      //   {
      //     componentsDir: path.resolve(__dirname, './components'),
      //   },
      // ],
  ],
  title: 'Doodle Press',
  description: 'Welcome to Doodle Press, Transforming Code into Knowledge',

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
      { text: 'Frontend Best Practice', link: '/frontend-best-practices/',},
      { "text": "CSS Mastery", "link": "/css/01-foundations.md" },
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
      { text: 'Interview Notes', link: '/interview/' },
      { text: 'Most Asked', link: '/mostAsked/' },
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
  
      '/frontend-best-practices/': [
        {
          // Clicking this header only toggles; use the child below to navigate
          title: 'Overview',
          collapsable: false,
          children: [
            // This makes a visible, clickable item that opens README
            { title: 'Overview (Start Here)', path: '/frontend-best-practices/' },
          ],
        },
        {
          title: 'Fundamentals',
          collapsable: true,
          children: [
            '/frontend-best-practices/project-structure.md',
            '/frontend-best-practices/coding-practices.md',

            '/frontend-best-practices/html-markup.md',
            '/frontend-best-practices/css-styling.md',
            '/frontend-best-practices/i18n.md',
          ],
        },
        {
          title: 'Engineering',
          collapsable: true,
          children: [
            // New landing page—now the group has a clickable index
            { title: 'Engineering (Index)', path: '/frontend-best-practices/engineering' },
            '/frontend-best-practices/component-design.md',
            '/frontend-best-practices/api-integration.md',
            '/frontend-best-practices/javascript-typescript.md',
            '/frontend-best-practices/forms-validation.md',
            '/frontend-best-practices/routing.md',
            '/frontend-best-practices/state-management.md',
            '/frontend-best-practices/security.md',
            '/frontend-best-practices/linting-code-quality.md',
            '/frontend-best-practices/git-workflow.md',
            '/frontend-best-practices/documentation-comments.md',
            '/frontend-best-practices/testing.md',
            '/frontend-best-practices/ui-theming.md',
            // '/frontend-best-practices/accessibility-responsiveness.md',
            '/frontend-best-practices/final-checklist.md',
          ],
        },
        {
          title: 'Advance',
          collapsable: true,
          children: [
            // New landing page—now the group has a clickable index
            // { title: 'Engineering (Index)', path: '/frontend-best-practices/engineering' },
            '/frontend-best-practices/advance-project-structure.md',
            '/frontend-best-practices/advance-coding-practices.md',
            '/frontend-best-practices/advance-css-styling.md',
            '/frontend-best-practices/advance-html-markup.md',
            '/frontend-best-practices/advance-i18n.md',
            '/frontend-best-practices/advance-component-design.md',
          ],
        },
      ]
      ,
      '/css/': [
        {
          title: "CSS Mastery Notes",
          collapsable: false,
          children: [
            { title: "01 — Foundations of CSS", path: "/css/01-foundations.md" },
            { title: "02 — Layout Essentials", path: "/css/02-layout-essentials.md" },
            { title: "03 — Styling Techniques", path: "/css/03-styling-techniques.md" },
            { title: "04 — Modern Responsive Design", path: "/css/04-responsive-design.md" },
            { title: "05 — CSS Variables & Architecture", path: "/css/05-variables-architecture.md" },
            { title: "06 — Animations & Transitions", path: "/css/06-animations-transitions.md" },
            { title: "07 — Advanced Layout Patterns", path: "/css/07-advanced-layouts.md" },
            { title: "08 — CSS for Components & UI", path: "/css/08-ui-components.md" },
            { title: "09 — Performance & Best Practices", path: "/css/09-performance-best-practices.md" },
            { title: "10 — Expert Topics", path: "/css/10-expert-topics.md" },
            { title: "11 — Accessible CSS Patterns", path: "/css/11-accessibility.md" },
            { title: "12 — Color Systems & Theming", path: "/css/12-color-systems-and-theming.md" },
            { title: "13 — Print Styles & Media", path: "/css/13-print-css-and-media.md" },
            { title: "14 — Real-World CSS Recipes", path: "/css/14-real-world-recipes.md" }
          ]
        }
      ],
      '/interview/': [
        {
          text: 'Brightly Interview Prep',
          collapsible: false,
          children: [
            '/interview/brightly_interview_notes.md',
            '/interview/vue_frontend_notes.md',
            '/interview/api_async_notes.md',
            '/interview/testing_devops_notes.md',
            '/interview/cs_system_design_notes.md'
          ]
        }
      ],
      '/mostasked/': [
        {
          text: 'Most Asked Questions',
          collapsible: false,
          children: [
            '/mostasked/react-100-interview.md',
            '/mostasked/css-100-interview-fresh.md',
          ]
        }
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
