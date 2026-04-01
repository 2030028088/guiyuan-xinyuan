<template>
  <div class="app">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="logo">归元心愿</div>
      <nav class="nav">
        <router-link to="/" :class="{ active: $route.path === '/' }">首页</router-link>
        <router-link to="/discover" :class="{ active: $route.path === '/discover' }">发现</router-link>
        <router-link to="/publish" class="publish-btn">发布</router-link>
        <router-link to="/message" :class="{ active: $route.path === '/message' }">消息</router-link>
        <router-link to="/profile" :class="{ active: $route.path === '/profile' }">我的</router-link>
      </nav>
    </header>

    <!-- 页面内容 -->
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 100;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #409EFF;
}

.nav {
  display: flex;
  gap: 30px;
}

.nav a {
  text-decoration: none;
  color: #666;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s;
}

.nav a:hover, .nav a.active {
  color: #409EFF;
  background: #ecf5ff;
}

.publish-btn {
  background: #409EFF !important;
  color: #fff !important;
}

.main {
  padding-top: 80px;
  min-height: 100vh;
}
</style>