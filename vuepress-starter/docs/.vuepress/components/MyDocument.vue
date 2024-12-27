<template>
    <div>
        from MyDocument
      <h2>{{ title }}</h2>
      <ul>
        <li v-for="(item, index) in data" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyDocument',
    props: {
      title: {
        type: String,
        required: true
      },
      data: {
        type: Array,
        default:['hello','how', 'are', 'you']
        // required: true
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add styles if needed */
  </style>
  