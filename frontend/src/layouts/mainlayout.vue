<template>
  <div class="layout">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <!-- Logo -->
      <div class="logo">
        <div class="logo-icon">
          <el-icon><Sunny /></el-icon>
        </div>
        <div class="logo-text">
          <div class="title">归元心愿</div>
          <div class="subtitle">Guiyuan Wishes</div>
        </div>
      </div>
      
      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <router-link
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          :class="['nav-item', { active: $route.path === route.path }]"
        >
          <el-icon class="nav-icon">
            <component :is="route.meta.icon" />
          </el-icon>
          <span class="nav-title">{{ route.meta.title }}</span>
        </router-link>
      </nav>

      <!-- 底部用户信息 -->
      <div class="user-info" @click="goToProfile">
        <div class="user-avatar">
          <img src="https://picsum.photos/40/40?random=100" alt="头像" />
          <span class="online-status"></span>
        </div>
        <div class="user-detail">
          <div class="user-name">Sarah Chen</div>
          <div class="user-status">已认证会员</div>
        </div>
        <el-icon class="arrow-icon"><ArrowRight /></el-icon>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Sunny, HomeFilled, Compass, Plus, ChatDotRound, User, ArrowRight } from '@element-plus/icons-vue'

const currentRoute = useRoute()
const router = useRouter()

const routes = computed(() => {
  return currentRoute.matched[0]?.children || []
})

const goToProfile = () => {
  router.push('/profile')
}
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

/* 左侧边栏 */
.sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid #e4e7ed;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

/* Logo */
.logo {
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-text .title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  line-height: 1.2;
}

.logo-text .subtitle {
  font-size: 12px;
  color: #909399;
  line-height: 1.2;
}

/* 导航菜单 */
.nav-menu {
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: #606266;
  transition: all 0.3s;
}

.nav-item:hover {
  background: #f5f7fa;
  color: #409EFF;
}

.nav-item.active {
  background: #ecf5ff;
  color: #409EFF;
}

.nav-icon {
  font-size: 20px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  font-size: 15px;
  font-weight: 500;
}

/* 底部用户信息 */
.user-info {
  margin: 12px;
  padding: 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #e4e7ed;
}

.user-info:hover {
  background: #f5f7fa;
  border-color: #d0d7de;
}

.user-avatar {
  position: relative;
  width: 40px;
  height: 40px;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.online-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #67c23a;
  border: 2px solid #fff;
  border-radius: 50%;
}

.user-detail {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-status {
  font-size: 12px;
  color: #909399;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow-icon {
  color: #c0c4cc;
  font-size: 14px;
}

/* 主内容区 */
.main-content {
  flex: 1;
  margin-left: 240px;
  padding: 24px;
  min-height: 100vh;
}
</style>