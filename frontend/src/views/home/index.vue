<template>
  <div class="home">
    <!-- 视频轮播区 -->
    <section class="video-section" v-if="videos.length > 0">
      <div class="section-header">
        <h3>📺 订阅频道</h3>
        <a href="#">管理订阅 ></a>
      </div>
      <div class="video-list">
        <div v-for="video in videos" :key="video.id" class="video-item">
          <div class="video-cover">
            <img :src="video.cover" />
            <span class="play-btn">▶</span>
          </div>
          <p>{{ video.title }}</p>
        </div>
      </div>
    </section>

    <!-- 子栏目切换 -->
    <section class="sub-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        :class="['tab', { active: currentTab === tab.key }]"
        @click="currentTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </section>

    <!-- 筛选栏 -->
    <section class="filter-bar">
      <select v-model="filters.location">
        <option value="">发货地</option>
        <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
      </select>
      
      <select v-model="filters.brand">
        <option value="">品牌</option>
        <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
      </select>
      
      <select v-model="filters.sort">
        <option value="newest">最新发布</option>
        <option value="points_desc">积分从高到低</option>
        <option value="points_asc">积分从低到高</option>
        <option value="wish_count">许愿量</option>
      </select>
    </section>

    <!-- 心愿列表 -->
    <section class="wish-list">
      <div v-for="item in wishes" :key="item.id" class="wish-card">
        <div class="card-image">
          <img :src="item.image || '/default.png'" />
          <span class="tag">{{ item.type }}</span>
        </div>
        <div class="card-info">
          <h4>{{ item.title }}</h4>
          <p class="desc">{{ item.desc }}</p>
          <div class="meta">
            <span class="points">{{ item.points }} 积分</span>
            <span class="count">{{ item.count }} 人许愿</span>
          </div>
          <div class="location">📍 {{ item.location }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// 视频数据（不变）
const videos = ref([
  { id: 1, title: '佛法讲座', cover: 'https://picsum.photos/200/120?random=1' },
  { id: 2, title: 'meditation', cover: 'https://picsum.photos/200/120?random=2' },
  { id: 3, title: '素食烹饪', cover: 'https://picsum.photos/200/120?random=3' },
])

// 子栏目
const tabs = [
  { key: 'ocean', label: '公海' },
  { key: 'wishpool', label: '许愿池' },
  { key: 'material', label: '免费物' },
  { key: 'read', label: '免费读' },
  { key: 'food', label: '免费吃' },
  { key: 'lodging', label: '免费住' },
]
const currentTab = ref('ocean')

// 筛选
const filters = reactive({
  location: '',
  brand: '',
  sort: 'newest',
})
const locations = ['北京', '上海', '广州', '深圳', '杭州']
const brands = ['品牌A', '品牌B', '品牌C']

// 所有心愿数据
const allWishes = ref([
  {
    id: 1,
    title: '免费赠送闲置书籍',
    desc: '有几本佛学书籍，免费赠送给有缘人',
    points: 0,
    count: 12,
    location: '北京',
    type: '免费物',
    category: 'material',
    image: 'https://picsum.photos/280/180?random=4',
  },
  {
    id: 2,
    title: '提供免费素食',
    desc: '周末提供免费素食，欢迎品尝',
    points: 0,
    count: 28,
    location: '上海',
    type: '免费吃',
    category: 'food',
    image: 'https://picsum.photos/280/180?random=5',
  },
  {
    id: 3,
    title: '寻找工作机会',
    desc: '有编程经验，寻找远程工作',
    points: 100,
    count: 5,
    location: '深圳',
    type: '许愿池',
    category: 'wishpool',
    image: 'https://picsum.photos/280/180?random=6',
  },
  {
    id: 4,
    title: '免费住宿 - 禅修中心',
    desc: '提供7天免费住宿，适合修行者',
    points: 0,
    count: 8,
    location: '杭州',
    type: '免费住',
    category: 'lodging',
    image: 'https://picsum.photos/280/180?random=7',
  },
  {
    id: 5,
    title: '佛经电子版分享',
    desc: '金刚经、心经等PDF版本',
    points: 0,
    count: 156,
    location: '北京',
    type: '免费读',
    category: 'read',
    image: 'https://picsum.photos/280/180?random=8',
  },
  {
    id: 6,
    title: '招聘前端工程师',
    desc: '互联网公司招聘Vue3前端',
    points: 500,
    count: 3,
    location: '广州',
    type: '许愿池',
    category: 'wishpool',
    image: 'https://picsum.photos/280/180?random=9',
  },
])

// 根据当前栏目筛选心愿
const wishes = computed(() => {
  if (currentTab.value === 'ocean') {
    // 公海显示全部
    return allWishes.value
  }
  // 其他栏目按 category 筛选
  return allWishes.value.filter(item => item.category === currentTab.value)
})
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 视频区 */
.video-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header a {
  color: #409EFF;
  text-decoration: none;
}

.video-list {
  display: flex;
  gap: 15px;
  overflow-x: auto;
}

.video-item {
  flex-shrink: 0;
  width: 200px;
  cursor: pointer;
}

.video-cover {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.video-cover img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: rgba(0,0,0,0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

/* 子栏目 */
.sub-tabs {
  display: flex;
  gap: 10px;
  background: #fff;
  padding: 15px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.tab {
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.tab:hover {
  background: #f0f0f0;
}

.tab.active {
  background: #409EFF;
  color: #fff;
}

/* 筛选栏 */
.filter-bar {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.filter-bar select {
  padding: 8px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
}

/* 心愿列表 */
.wish-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.wish-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.wish-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.card-image {
  position: relative;
  height: 180px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #409EFF;
  color: #fff;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.card-info {
  padding: 15px;
}

.card-info h4 {
  margin: 0 0 8px;
  font-size: 16px;
}

.desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.points {
  color: #f56c6c;
  font-weight: bold;
}

.count {
  color: #909399;
  font-size: 13px;
}

.location {
  color: #909399;
  font-size: 13px;
}
</style>