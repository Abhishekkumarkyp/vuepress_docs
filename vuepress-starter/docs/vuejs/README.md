# Vue.js Cheatsheet

## Table of Contents
1. [Initialization](#initialization)
2. [Directives](#directives)
3. [Event Handling](#event-handling)
4. [Computed Properties](#computed-properties)
5. [Watchers](#watchers)
6. [Class and Style Bindings](#class-and-style-bindings)
7. [Conditional Rendering](#conditional-rendering)
8. [List Rendering](#list-rendering)
9. [Forms](#forms)
10. [Lifecycle Hooks](#lifecycle-hooks)
11. [Components](#components)
12. [Vue Router](#vue-router)
13. [Vuex](#vuex)
14. [Mixins](#mixins)
15. [Slots](#slots)
16. [Custom Directives](#custom-directives)
17. [Vue CLI](#vue-cli)
18. [Vue 3 Composition API](#vue-3-composition-api)

## Initialization
```js
// Initializing a Vue instance
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
});
```

## Directives

```html
<!-- v-bind: Bind an attribute -->
<img v-bind:src="imageSrc">

<!-- Shorthand -->
<img :src="imageSrc">

<!-- v-if: Conditional rendering -->
<p v-if="seen">Now you see me</p>

<!-- v-show: Toggle visibility -->
<p v-show="seen">Now you see me</p>

<!-- v-for: List rendering -->
<li v-for="item in items" :key="item.id">{{ item.text }}</li>

<!-- v-model: Two-way binding -->
<input v-model="message">
```

## Event Handling

## Computed Properties

```js
new Vue({
  el: '#app',
  data: {
    firstName: 'John',
    lastName: 'Doe'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName;
    }
  }
});

```
## Watchers
```js
new Vue({
  el: '#app',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...';
      this.getAnswer();
    }
  }
});

```
## Class and Style Bindings

```html
<!-- Object Syntax -->
<div :class="{ active: isActive }"></div>

<!-- Array Syntax -->
<div :class="[activeClass, errorClass]"></div>

<!-- Inline Styles -->
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

```

## Conditional Rendering
```html
<!-- v-if -->
<h1 v-if="awesome">Vue is awesome!</h1>

<!-- v-else -->
<h1 v-else>Oh no 😢</h1>

<!-- v-else-if -->
<h1 v-else-if="soSo">Vue is okay...</h1>

<!-- v-show -->
<h1 v-show="awesome">Vue is awesome!</h1>

```
## List Rendering

```html
<!-- v-for -->
<ul>
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }} - {{ item.text }}
  </li>
</ul>

```
## Forms
```html
<!-- Text input -->
<input v-model="message">

<!-- Checkbox -->
<input type="checkbox" v-model="checked">

<!-- Radio -->
<input type="radio" v-model="picked" value="One">
<input type="radio" v-model="picked" value="Two">

<!-- Select -->
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<!-- Textarea -->
<textarea v-model="message"></textarea>

```
## Lifecycle Hooks
```js
new Vue({
  data() {
    return { count: 0 }
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  }
});
```
## Components
```js
Vue.component('my-component', {
  props: ['message'],
  template: '<p>{{ message }}</p>'
});

new Vue({
  el: '#app'
});

```
```html
<my-component message="Hello, World!"></my-component>
```
## Vue Router
```js
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About }
];

const router = new VueRouter({
  routes
});

new Vue({
  router
}).$mount('#app');

```
```html
<p>
  <router-link to="/home">Go to Home</router-link>
  <router-link to="/about">Go to About</router-link>
</p>
<router-view></router-view>

```
## Vuex
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});

new Vue({
  el: '#app',
  store,
  computed: {
    count () {
      return this.$store.state.count;
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment');
    }
  }
});

```
## Mixins

```js
const myMixin = {
  created: function () {
    this.hello();
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!');
    }
  }
};

new Vue({
  mixins: [myMixin],
  created: function () {
    console.log('hello from component!');
  }
});
```
## Slots
```html
<slot></slot>
```
```html
<slot name="header"></slot>
<slot name="default"></slot>
<slot name="footer"></slot>

```

```html
<my-component>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</my-component>

```
## Custom Directives
```js
Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
});

new Vue({
  el: '#app'
});

```
```html
<input v-focus>

```
## Vue CLI
```bash
# Install Vue CLI
npm install -g @vue/cli

# Create a new project
vue create my-project

# Run the development server
npm run serve
```
### Vue 3 Composition API

```js
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };
    
    onMounted(() => {
      console.log('Component mounted');
    });

    return {
      count,
      increment
    };
  }
};

```
```html
<div>{{ count }}</div>
<button @click="increment">Increment</button>

```