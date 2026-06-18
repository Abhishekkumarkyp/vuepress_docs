module.exports = {
  title: 'Doodle Press',
  description: 'A learning hub for frontend, backend, and JavaScript guides',

  // Applies the saved (or system) theme before the page renders, so there
  // is no flash of light mode on load.
  head: [
    ['script', {}, `
      (function () {
        try {
          var saved = localStorage.getItem('theme');
          var prefersDark = window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (saved === 'dark' || (!saved && prefersDark)) {
            document.documentElement.classList.add('dark');
          }
        } catch (e) {}
      })();
    `],
  ],

  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/register-components',
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
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'JavaScript', link: '/JavaScript/' },
      { text: 'Documentation', link: '/documentation' },
      { text: 'About', link: '/about' },
    ],

    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'frontend',
            'backend',
          ],
        },
      ],
      '/JavaScript/': [
        {
          title: 'JavaScript',
          collapsable: false,
          children: [
            '',
            'intermediate',
            'advance',
            'traps',
          ],
        },
      ],
    },
  },
}
