<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="top-header">
      <div class="header-left">
        <div class="logo">
          <div class="logo-icon">🙏</div>
          <div class="logo-text">
            <div class="en">Guiyuan Wishes</div>
            <div class="cn">归元心愿</div>
          </div>
        </div>
      </div>
      
      <div class="header-center">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search wishes, goods, or people... 搜索心愿、物品或人..." />
          <span class="mic-icon"></span>
        </div>
      </div>
      
      <div class="header-right">
        <button class="filter-btn">
          <span>Filters</span>
          <span>筛选</span>
        </button>
        <button class="nearby-btn">
          <span>📍 Nearby</span>
          <span>附近</span>
        </button>
        <button class="post-btn">
          <span>Post Wish</span>
          <span>发布心愿</span>
        </button>
      </div>
    </header>

    <!-- 左侧边栏 -->
    <aside class="sidebar">
      <nav class="nav-menu">
        <router-link to="/" class="nav-item active">
          <span class="nav-icon">☰</span>
          <div class="nav-text">
            <span class="en">Home</span>
            <span class="cn">首页</span>
          </div>
        </router-link>
        <router-link to="/discover" class="nav-item">
          <span class="nav-icon">🌐</span>
          <div class="nav-text">
            <span class="en">Discover</span>
            <span class="cn">发现</span>
          </div>
        </router-link>
        <router-link to="/publish" class="nav-item">
          <span class="nav-icon">➕</span>
          <div class="nav-text">
            <span class="en">Post</span>
            <span class="cn">发布</span>
          </div>
        </router-link>
        <router-link to="/message" class="nav-item">
          <span class="nav-icon">💬</span>
          <div class="nav-text">
            <span class="en">Messages</span>
            <span class="cn">消息</span>
          </div>
        </router-link>
        <router-link to="/profile" class="nav-item">
          <span class="nav-icon">👤</span>
          <div class="nav-text">
            <span class="en">Me</span>
            <span class="cn">我的</span>
          </div>
        </router-link>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 子栏目标签 -->
      <div class="sub-tabs">
        <div 
          v-for="tab in tabs" 
          :key="tab.key"
          :class="['tab', { active: currentTab === tab.key }]"
          @click="switchTab(tab.key)"
        >
          <span class="tab-cn">{{ tab.labelCn }}</span>
          <span class="tab-en">({{ tab.labelEn }})</span>
        </div>
      </div>

      <!-- 特邀创作者 -->
      <section class="creators-section">
        <div class="section-header">
          <div class="section-title">
            <h2>Featured Creators</h2>
            <span class="subtitle">特邀创作者</span>
          </div>
          <a href="#" class="see-all">
            <span>See all</span>
            <span>查看全部</span>
          </a>
        </div>
        <div class="creators-list">
          <div v-for="creator in creators" :key="creator.id" class="creator-card">
            <div class="creator-avatar">
              <img :src="creator.avatar" />
              <span v-if="creator.verified" class="verified">✓</span>
            </div>
            <h4 class="creator-name">{{ creator.name }}</h4>
            <p class="creator-desc">{{ creator.desc }}</p>
            <button :class="['subscribe-btn', { subscribed: creator.subscribed }]">
              {{ creator.subscribed ? 'Subscribed 已订阅 ✓' : 'Subscribe 订阅' }}
            </button>
          </div>
          <div class="discover-more">
            <div class="arrow">→</div>
            <span>Discover</span>
            <span>发现</span>
            <span>More</span>
            <span>更多</span>
          </div>
        </div>
      </section>

      <!-- 最新动态 -->
      <section class="wishes-section">
        <div class="section-header">
          <div class="section-title">
            <h2>Latest in Open sea</h2>
            <span class="subtitle">公海最新动态</span>
          </div>
        </div>
        
        <div class="wishes-list">
          <div v-for="wish in wishes" :key="wish.id" class="wish-card-large">
            <div class="wish-image">
              <img :src="wish.image" />
              <span class="wish-type-tag">{{ wish.typeCn }} {{ wish.typeEn }}</span>
              <button class="wish-like">♡</button>
            </div>
            <div class="wish-content">
              <h3 class="wish-title">{{ wish.titleEn }}</h3>
              <p class="wish-title-cn">{{ wish.titleCn }}</p>
              <p class="wish-desc">{{ wish.descEn }}</p>
              <p class="wish-desc-cn">{{ wish.descCn }}</p>
              
              <div class="wish-tags">
                <span v-for="tag in wish.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              
              <div class="wish-meta">
                <div class="location">
                  <span>📍</span>
                  <span>{{ wish.distance }}</span>
                </div>
                <div class="time">{{ wish.time }}</div>
              </div>
              
              <div class="wish-author">
                <img :src="wish.authorAvatar" class="author-avatar" />
                <div class="author-info">
                  <div class="author-name">{{ wish.authorName }}</div>
                  <div class="author-status">{{ wish.authorStatus }}</div>
                </div>
                <button v-if="wish.canHelp" class="help-btn">
                  Help (Dana)
                  <span>助 (布施)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 加载更多 -->
        <div class="load-more">
          <button v-if="canLoadMore" @click="loadMore" :disabled="loading" class="load-btn">
            {{ loading ? 'Loading... 加载中...' : 'Load More 加载更多' }}
          </button>
          <div v-else class="no-more">No more 没有更多了</div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 子栏目
const tabs = [
  { key: 'ocean', labelCn: '公海', labelEn: 'Open Sea' },
  { key: 'wishpool', labelCn: '许愿池', labelEn: 'Wish Pool' },
  { key: 'material', labelCn: '免费物', labelEn: 'Free Goods' },
  { key: 'read', labelCn: '免费读', labelEn: 'Free Reads' },
  { key: 'food', labelCn: '免费吃', labelEn: 'Free Food' },
  { key: 'lodging', labelCn: '免费住', labelEn: 'Free Stay' },
]
const currentTab = ref('ocean')

// 创作者
const creators = ref([
  {
    id: 1,
    name: 'Master Li 李师傅',
    desc: 'Meditation & Wellness 冥想与健康',
    avatar: 'https://picsum.photos/80/80?random=1',
    verified: true,
    subscribed: false,
  },
  {
    id: 2,
    name: "Emma's Kitchen 艾玛的厨房",
    desc: 'Free Recipes & Tips 免费食谱和技巧',
    avatar: 'https://picsum.photos/80/80?random=2',
    verified: true,
    subscribed: true,
  },
  {
    id: 3,
    name: 'Tech Giveaways 科技产品赠送',
    desc: 'Weekly Free Hardware 每周免费硬件',
    avatar: 'https://picsum.photos/80/80?random=3',
    verified: false,
    subscribed: false,
  },
])

// 心愿数据
const allWishes = ref([
  {
    id: 1,
    typeCn: '免费物品',
    typeEn: 'Free Good',
    titleEn: 'Giving away my old study laptop for a student',
    titleCn: '把我的旧笔记本电脑送给学生',
    descEn: "I'm upgrading to a new device and would love to give my...",
    descCn: '我正在升级到新设备，想把旧的送给有需要的学生...',
    image: 'https://picsum.photos/400/300?random=10',
    tags: ['Electronics 电子', 'Education 教育'],
    distance: '2.5km away 距离2.5公里',
    time: '2h ago 2小时前',
    authorAvatar: 'https://picsum.photos/40/40?random=20',
    authorName: 'Sarah Chen',
    authorStatus: 'Verified Member 已认证会员',
    canHelp: false,
  },
  {
    id: 2,
    typeCn: '许愿池',
    typeEn: 'Wish Pool',
    titleEn: 'Need help moving some furniture this weekend',
    titleCn: '这周末需要帮忙搬些家具',
    descEn: "I'm a senior citizen living alone and need to move a couch...",
    descCn: '我是一名独居老人，需要把沙发和书架搬到另一个房间...',
    image: 'https://picsum.photos/400/300?random=11',
    tags: ['Labor 劳动', 'Weekend 周末'],
    distance: '5km away 距离5公里',
    time: '5h ago 5小时前',
    authorAvatar: 'https://picsum.photos/40/40?random=21',
    authorName: 'Mrs. Smith 史密斯夫人',
    authorStatus: 'Senior 长者',
    canHelp: true,
  },
])

const pageSize = 4
const currentPage = ref(1)
const loading = ref(false)
const hasMore = ref(true)

const wishes = computed(() => {
  return allWishes.value.slice(0, currentPage.value * pageSize)
})

const canLoadMore = computed(() => {
  return allWishes.value.length > wishes.value.length || hasMore.value
})

const loadMore = () => {
  if (loading.value) return
  loading.value = true
  setTimeout(() => {
    // 模拟加载更多
    const newWishes = allWishes.value.map(w => ({...w, id: w.id + allWishes.value.length}))
    allWishes.value.push(...newWishes.slice(0, 2))
    currentPage.value++
    loading.value = false
  }, 500)
}

const switchTab = (key) => {
  currentTab.value = key
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding-top: 64px;
  padding-left: 240px;
}

/* 顶部导航 */
.top-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-text .en {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
}

.logo-text .cn {
  font-size: 12px;
  color: #666;
  line-height: 1.2;
}

.header-center {
  flex: 1;
  max-width: 600px;
  margin: 0 24px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 24px;
  padding: 10px 16px;
  gap: 10px;
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
  color: #333;
}

.search-icon, .mic-icon {
  font-size: 16px;
  color: #999;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-btn, .nearby-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  color: #666;
}

.filter-btn span:first-child, .nearby-btn span:first-child {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.post-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 20px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
}

.post-btn span:first-child {
  font-size: 14px;
  font-weight: 600;
}

/* 左侧边栏 */
.sidebar {
  position: fixed;
  left: 0;
  top: 64px;
  bottom: 0;
  width: 240px;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  padding: 16px 0;
}

.nav-menu {
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  text-decoration: none;
  color: #666;
  transition: all 0.3s;
}

.nav-item:hover, .nav-item.active {
  background: #f0f7ff;
  color: #4f46e5;
}

.nav-item.active {
  border-right: 3px solid #4f46e5;
}

.nav-icon {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.nav-text {
  display: flex;
  flex-direction: column;
}

.nav-text .en {
  font-size: 14px;
  font-weight: 500;
}

.nav-text .cn {
  font-size: 12px;
}

/* 主内容区 */
.main-content {
  padding: 24px;
  max-width: 1200px;
}

/* 子栏目 */
.sub-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.tab {
  padding: 8px 16px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 13px;
}

.tab-cn {
  font-weight: 500;
  color: #333;
}

.tab-en {
  color: #999;
  margin-left: 4px;
}

.tab:hover {
  border-color: #4f46e5;
  color: #4f46e5;
}

.tab.active {
  background: #4f46e5;
  border-color: #4f46e5;
  color: #fff;
}

.tab.active .tab-cn, .tab.active .tab-en {
  color: #fff;
}

/* 区块标题 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.section-title .subtitle {
  font-size: 14px;
  color: #999;
  margin-left: 8px;
}

.see-all {
  color: #4f46e5;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* 创作者 */
.creators-section {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.creators-list {
  display: flex;
  gap: 16px;
  overflow-x: auto;
}

.creator-card {
  flex-shrink: 0;
  width: 160px;
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  background: #f9fafb;
  transition: all 0.3s;
}

.creator-card:hover {
  background: #f0f7ff;
}

.creator-avatar {
  position: relative;
  width: 64px;
  height: 64px;
  margin: 0 auto 12px;
}

.creator-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.verified {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background: #4f46e5;
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.creator-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.creator-desc {
  font-size: 12px;
  color: #999;
  margin: 0 0 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.subscribe-btn {
  width: 100%;
  padding: 8px;
  border: 1px solid #4f46e5;
  background: #fff;
  color: #4f46e5;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.subscribe-btn.subscribed {
  background: #4f46e5;
  color: #fff;
}

.discover-more {
  flex-shrink: 0;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 12px;
}

.discover-more .arrow {
  width: 40px;
  height: 40px;
  border: 2px solid #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 8px;
}

/* 心愿列表 */
.wishes-section {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
}

.wishes-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wish-card-large {
  display: flex;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  background: #f9fafb;
  transition: all 0.3s;
}

.wish-card-large:hover {
  background: #f0f7ff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.wish-image {
  position: relative;
  width: 280px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
}

.wish-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wish-type-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #4f46e5;
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.wish-like {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(255,255,255,0.9);
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wish-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.wish-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px;
}

.wish-title-cn {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px;
}

.wish-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 4px;
}

.wish-desc-cn {
  font-size: 13px;
  color: #999;
  line-height: 1.6;
  margin: 0 0 16px;
}

.wish-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  padding: 4px 12px;
  background: #e8e8e8;
  border-radius: 16px;
  font-size: 12px;
  color: #666;
}

.wish-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #999;
}

.wish-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.author-status {
  font-size: 12px;
  color: #999;
}

.help-btn {
  padding: 10px 20px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.help-btn span {
  font-size: 11px;
  opacity: 0.9;
}

/* 加载更多 */
.load-more {
  text-align: center;
  margin-top: 32px;
}

.load-btn {
  padding: 12px 40px;
  background: #fff;
  border: 2px solid #4f46e5;
  color: #4f46e5;
  border-radius: 24px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.load-btn:hover {
  background: #4f46e5;
  color: #fff;
}

.no-more {
  color: #999;
  font-size: 14px;
}
</style>