<template>
    <div>
      <MyDocument :title="'Posts from JSONPlaceholder'" :data="posts" />
    </div>
  </template>
  
  <script>
  import MyDocument from '@components/MyDocument.vue'
  
  export default {
    components: {
      MyDocument
    },
    data() {
      return {
        posts: []  // Store the fetched data here
      }
    },
    mounted() {
      this.fetchPosts();
    },
    methods: {
      async fetchPosts() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          const data = await response.json();
          this.posts = data;  // Store the posts data in the `posts` array
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    }
  }
  </script>
  