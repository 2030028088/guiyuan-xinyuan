<template>
  <div class="home">
    <!-- 顶部搜索栏（仅首页显示） -->
    <header class="home-header">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search wishes, goods, or people... 搜索心愿、物品或人..."
          v-model="searchQuery"
        />
        <span class="mic-icon"></span>
      </div>
      
      <div class="header-actions">
        <button class="action-btn">
          <span>Filters</span>
          <span>筛选</span>
        </button>
        <button class="action-btn">
          <span>📍 Nearby</span>
          <span>附近</span>
        </button>
        <button class="post-btn" @click="$router.push('/publish')">
          <span>Post Wish</span>
          <span>发布心愿</span>
        </button>
      </div>
    </header>
    <!-- 子栏目标签 -->
    <div class="sub-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        :class="['tab', { active: currentTab === tab.key }]"
        @click="switchTab(tab.key)"
      >
        <span class="tab-cn">{{ tab.labelCn }}</span>
        <span class="tab-en">{{ tab.labelEn }}</span>
      </div>
    </div>

    <!-- 特邀创作者 -->
    <section class="creators-section">
      <div class="section-header">
        <div class="title-group">
          <h2>Featured Creators</h2>
          <span class="subtitle">特邀创作者</span>
        </div>
        <a href="#" class="see-all">See all 查看全部</a>
      </div>
      
      <div class="creators-list">
        <div v-for="creator in creators" :key="creator.id" class="creator-card">
          <div class="creator-avatar">
            <img :src="creator.avatar" />
            <span v-if="creator.verified" class="verified-badge">✓</span>
          </div>
          <h4 class="creator-name">{{ creator.name }}</h4>
          <p class="creator-desc">{{ creator.desc }}</p>
          <button :class="['subscribe-btn', { subscribed: creator.subscribed }]">
            {{ creator.subscribed ? 'Subscribed 已订阅 ✓' : 'Subscribe 订阅' }}
          </button>
        </div>
        
        <div class="discover-more">
          <div class="arrow-btn">→</div>
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
        <div class="title-group">
          <h2>Latest in Open Pool</h2>
          <span class="subtitle">公海最新动态</span>
        </div>
      </div>
      
      <div class="wishes-grid">
        <div v-for="wish in wishes" :key="wish.id" class="wish-card">
          <div class="wish-image">
            <img :src="wish.image" />
            <span class="type-tag">{{ wish.typeEn }} {{ wish.typeCn }}</span>
            <button class="like-btn">♡</button>
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
              <span class="distance">📍 {{ wish.distance }}</span>
              <span class="time">⏱ {{ wish.time }}</span>
            </div>
            
            <div class="wish-author">
              <img :src="wish.authorAvatar" class="author-avatar" />
              <div class="author-info">
                <span class="author-name">{{ wish.authorName }}</span>
                <span v-if="wish.authorVerified" class="verified-icon">✓</span>
              </div>
              <button v-if="wish.canHelp" class="help-btn">
                Help (Dana) 助 (布施)
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
        <div v-else class="no-more">
          <span class="line"></span>
          <span>没有更多了</span>
          <span class="line"></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// 子栏目
const tabs = [
  { key: 'ocean', labelCn: '公海', labelEn: '(open sea)' },
  { key: 'wishpool', labelCn: '许愿池', labelEn: '(Wish Pool)' },
  { key: 'material', labelCn: '免费物', labelEn: '(Free Goods)' },
  { key: 'read', labelCn: '免费读', labelEn: '(Free Reads)' },
  { key: 'food', labelCn: '免费吃', labelEn: '(Free Food)' },
  { key: 'lodging', labelCn: '免费住', labelEn: '(Free Stay)' },
]
const currentTab = ref('ocean')

// 创作者
const creators = ref([
  {
    id: 1,
    name: 'Master Li',
    desc: 'Meditation & Wellness',
    avatar: 'https://picsum.photos/80/80?random=1',
    verified: true,
    subscribed: false,
  },
  {
    id: 2,
    name: "Emma's Kitchen",
    desc: 'Free Recipes & Tips',
    avatar: 'https://picsum.photos/80/80?random=2',
    verified: true,
    subscribed: true,
  },
  {
    id: 3,
    name: 'Tech Giveaways',
    desc: 'Weekly Free Hardware',
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
    descEn: "I'm upgrading to a new device and would love to give my old laptop to a student in need. It's a 2019 MacBook Pro, still in great condition.",
    descCn: '我正在升级到新设备，想把旧笔记本电脑送给有需要的学生。这是2019款MacBook Pro，状况良好。',
    image: 'https://picsum.photos/400/300?random=10',
    tags: ['Electronics 电子', 'Education 教育'],
    distance: '2.5km away',
    time: '2h ago',
    authorAvatar: 'https://picsum.photos/40/40?random=20',
    authorName: 'Sarah Chen',
    authorVerified: true,
    canHelp: false,
  },
  {
    id: 2,
    typeCn: '许愿池',
    typeEn: 'Wish Pool',
    titleEn: 'Need help moving some furniture this weekend',
    titleCn: '这周末需要帮忙搬些家具',
    descEn: "I'm a senior citizen living alone and need to move a couch and a small bookshelf to a different room. Would appreciate any help!",
    descCn: '我是一名独居老人，需要把沙发和小书架搬到另一个房间。非常感谢任何帮助！',
    image: 'https://picsum.photos/400/300?random=11',
    tags: ['Labor 劳动', 'Weekend 周末'],
    distance: '5km away',
    time: '5h ago',
    authorAvatar: 'https://picsum.photos/40/40?random=21',
    authorName: 'Mrs. Smith',
    authorVerified: true,
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
    const newWishes = allWishes.value.map(w => ({...w, id: w.id + allWishes.value.length}))
    allWishes.value.push(...newWishes.slice(0, 2))
    currentPage.value++
    loading.value = false
  }, 600)
}

const switchTab = (key) => {
  currentTab.value = key
}
</script>

<style scoped>

.home {
  padding: 0;
}

/* 添加搜索栏样式 */
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e4e7ed;
}

.search-box {
  flex: 1;
  max-width: 600px;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  padding: 12px 16px;
  gap: 12px;
  border: 1px solid #e4e7ed;
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
  color: #303133;
}

.search-icon, .mic-icon {
  font-size: 16px;
  color: #909399;
  cursor: pointer;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  color: #606266;
}

.action-btn span:first-child {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
}

.post-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
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


/* 子栏目 */
.sub-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 24px;
  background: #fff;
  border: 1px solid #e4e7ed;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-cn {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.tab-en {
  font-size: 12px;
  color: #909399;
}

.tab:hover {
  border-color: #409EFF;
  color: #409EFF;
}

.tab.active {
  background: #4f46e5;
  border-color: #4f46e5;
}

.tab.active .tab-cn,
.tab.active .tab-en {
  color: #fff;
}

/* 区块通用样式 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title-group {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.title-group h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.subtitle {
  font-size: 14px;
  color: #909399;
}

.see-all {
  color: #4f46e5;
  text-decoration: none;
  font-size: 14px;
}

/* 特邀创作者 */
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
  padding-bottom: 8px;
}

.creator-card {
  flex-shrink: 0;
  width: 180px;
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

.verified-badge {
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
  border: 2px solid #fff;
}

.creator-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px;
}

.creator-desc {
  font-size: 12px;
  color: #909399;
  margin: 0 0 12px;
  line-height: 1.4;
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
  color: #909399;
  font-size: 12px;
  gap: 4px;
}

.arrow-btn {
  width: 48px;
  height: 48px;
  border: 2px solid #e4e7ed;
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

.wishes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.wish-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  background: #f9fafb;
  transition: all 0.3s;
}

.wish-card:hover {
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

.type-tag {
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

.like-btn {
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
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px;
  line-height: 1.4;
}

.wish-title-cn {
  font-size: 14px;
  color: #606266;
  margin: 0 0 8px;
}

.wish-desc {
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
  margin: 0 0 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wish-desc-cn {
  font-size: 12px;
  color: #909399;
  line-height: 1.6;
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wish-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.tag {
  padding: 4px 10px;
  background: #e8e8e8;
  border-radius: 12px;
  font-size: 12px;
  color: #606266;
}

.wish-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #909399;
}

.wish-author {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
}

.author-name {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
}

.verified-icon {
  width: 16px;
  height: 16px;
  background: #67c23a;
  color: #fff;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.help-btn {
  padding: 8px 16px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #909399;
  font-size: 14px;
}

.no-more .line {
  width: 100px;
  height: 1px;
  background: #e4e7ed;
}
</style>