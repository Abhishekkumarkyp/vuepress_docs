---
title: Intermediate javascript
---
![An image](./public/image.png)
<BasePosts title="Hello" content="This is custom component content." />
<BasePosts_back title="Hello back file" content="This is custom component content. back file" />

{{ 1 + 1 }}

<span v-for="i in 3">{{ i }} </span>

{{ $page }}

::: v-pre
`{{ This will be displayed as-is }}`
:::
::: v-pre
` This will be displayed as-is `
:::

 this is a <OutboundLink/>

# text <Tag/>

# text `<Tag/>`

 <!-- <Content/> -->

### Badge <Badge text="beta" type="warning"/> <Badge text="default theme"/>

[Home](/) <!-- Sends the user to the root README.md -->
[foo](/foo/) <!-- Sends the user to index.html of directory foo -->
[foo heading](./#heading) <!-- Anchors user to a heading in the foo README file -->
[bar - three](../bar/three.md) <!-- You can append .md (recommended) -->
[bar - four](../bar/four.html) <!-- Or you can append .html -->

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

:tada: :100:

[[toc]]

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in IE / Edge
:::

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code

```js
console.log('Hello, VuePress!')
```

:::

``` js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```
<code-group>
<code-block title="YARN">
```bash
yarn create vuepress-site [optionalDirectoryName]
```
</code-block>

<code-block title="NPM">
```bash
npx create-vuepress-site [optionalDirectoryName]
```
</code-block>
</code-group>
