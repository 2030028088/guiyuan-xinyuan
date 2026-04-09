<template>
  <div class="auth-layout">
    <slot />    <!-- 只显示页面内容，没有导航栏 -->
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>