# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
# nuxt3-study

# 小知识
## 优化
1. 使用了NuxtLink标签导航的路由页面，只要链接出现在视口，就会预取对应的页面，所以在点击链接之前，就在后台加载了，所以非常慢
2. 官方的ClientOnly组件，可以用于需要注水的场景，插槽的内容交由客户端渲染
# 注水
## gpt解释
在 Web 开发中，SSR（Server-Side Rendering，服务器端渲染）的“注水”（hydration）指的是在服务器端生成的 HTML 内容中，将客户端需要的 JavaScript 代码和数据“注入”到页面中，以便客户端接管页面后能够继续交互和渲染。

具体来说，SSR 的注水原理如下：
1. **服务器端渲染**：首先，服务器端会根据请求动态生成页面的 HTML 内容，包括页面结构、样式和部分交互逻辑。
2. **客户端接管**：当客户端收到服务器返回的 HTML 页面后，浏览器会解析并展示页面内容。同时，浏览器会下载客户端需要的 JavaScript 代码。
3. **注水**：在客户端下载并执行 JavaScript 代码时，这些代码会“注入”到服务器端生成的 HTML 中，以便客户端能够接管页面的交互和渲染。
4. **激活**：一旦客户端 JavaScript 代码被注入到页面中，它会接管页面的交互逻辑，重新渲染页面，并绑定事件处理程序等。

通过注水的方式，SSR 实现了在服务器端生成页面的同时，让客户端能够接管页面并继续交互。这样可以结合服务器端渲染和客户端渲染的优势，提供更好的性能和用户体验。

需要注意的是，注水过程中需要确保客户端 JavaScript 代码的正确性和安全性，以及确保客户端和服务器端渲染的一致性，避免出现页面内容闪烁或其他问题。
## 白话解释
众所周知ssr服务端渲染，页面所有的样式\ui都是在服务端生成，然后发送回客户端渲染。

但有时候有些数据是保存在客户端的，以客户端为主，这时候客户端接收到页面html，这个html渲染了服务端的数据，使某组件状态为false，但客户端本地存储的数据为true，它真实的结果是需要渲染为true状态。

这时候就需要“注水”，把组件交给客户端读取数据渲染，以确保渲染正确的状态。

可以使用ClientOnly组件，或者在需要注水的组件添加后缀.client.vue，把此组件交给客户端渲染。

