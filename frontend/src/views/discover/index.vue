<template>
  <div class="discover">
    <!-- 顶部标签 -->
    <div class="discover-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        :class="['tab', { active: currentTab === tab.key }]"
        @click="currentTab = tab.key"
      >
        <span v-if="tab.icon" class="tab-icon">{{ tab.icon }}</span>
        {{ tab.label }}
      </div>
    </div>

    <div class="discover-content">
      <!-- 左侧动态列表 -->
      <div class="feed-list">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <!-- 用户头部 -->
          <div class="post-header">
            <img :src="post.userAvatar" class="user-avatar" />
            <div class="user-info">
              <div class="user-name-row">
                <span class="user-name">{{ post.userName }}</span>
                <span v-if="post.verified" class="verified-badge">✓</span>
                <span v-if="post.orgTag" class="org-tag">{{ post.orgTag }}</span>
              </div>
              <div class="user-meta">{{ post.location }} • {{ post.mutualFriends }}</div>
            </div>
            <button class="more-btn">•••</button>
          </div>

          <!-- 内容 -->
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-desc">{{ post.desc }}</p>

          <!-- 标签 -->
          <div class="post-tags">
            <span 
              v-for="tag in post.tags" 
              :key="tag"
              :class="['tag', tag.type]"
            >
              {{ tag.name }}
            </span>
          </div>

          <!-- 图片 -->
          <div v-if="post.images" class="post-images">
            <img 
              v-for="(img, idx) in post.images" 
              :key="idx"
              :src="img" 
              :class="{ 'single-img': post.images.length === 1 }"
            />
          </div>

          <!-- 操作栏 -->
          <div class="post-actions">
            <button class="action-btn">
              <span>♡</span>
              <span>{{ post.likes }}</span>
            </button>
            <button class="action-btn">
              <span>☆</span>
              <span>Save</span>
            </button>
            <button v-if="post.canMessage" class="message-btn">
              <span>💬</span>
              <span>Message</span>
            </button>
            <button v-if="post.canClaim" class="claim-btn">
              <span>🙏</span>
              <span>Claim</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 右侧边栏 -->
      <aside class="sidebar-right">
        <!-- 信任分数 -->
        <div class="trust-card">
          <div class="trust-header">
            <span>Your Trust Score</span>
            <span class="trust-score">85/100</span>
          </div>
          <p class="trust-desc">Excellent! You've completed 12 wishes with 100% positive feedback.</p>
          <button class="view-btn">View Privileges</button>
        </div>

        <!-- 同心圆 -->
        <div class="circles-card">
          <div class="section-header">
            <h4>Concentric Circles</h4>
            <a href="#">See All</a>
          </div>
          <div class="circle-list">
            <div v-for="circle in circles" :key="circle.id" class="circle-item">
              <div class="circle-icon" :style="{ background: circle.color }">
                {{ circle.icon }}
              </div>
              <div class="circle-info">
                <div class="circle-name">{{ circle.name }}</div>
                <div class="circle-meta">{{ circle.members }} • {{ circle.status }}</div>
              </div>
              <button class="join-btn">+</button>
            </div>
          </div>
        </div>

        <!-- 找朋友 -->
        <div class="friends-card">
          <h4>Find Friends</h4>
          <div class="interest-tags">
            <span v-for="tag in interests" :key="tag" class="interest-tag">{{ tag }}</span>
          </div>
          <div class="friend-list">
            <div v-for="friend in friends" :key="friend.id" class="friend-item">
              <img :src="friend.avatar" class="friend-avatar" />
              <div class="friend-info">
                <div class="friend-name">{{ friend.name }}</div>
                <div class="friend-meta">{{ friend.reason }}</div>
              </div>
              <button class="follow-btn">Follow</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 顶部标签
const tabs = [
  { key: 'all', label: 'All' },
  { key: 'charity', label: 'Charity Needs' },
  { key: 'supply', label: 'Supply Offers' },
  { key: 'local', label: 'Local (5km)' },
  { key: 'trending', label: '🔥 Trending' },
]
const currentTab = ref('all')

// 动态数据
const posts = ref([
  {
    id: 1,
    userName: 'David Miller',
    userAvatar: 'https://picsum.photos/48/48?random=1',
    verified: true,
    orgTag: 'Organization',
    location: 'San Francisco',
    mutualFriends: '2 Mutual Friends',
    title: 'Seeking Winter Coats for Local Shelter',
    desc: 'We are organizing a drive to collect winter clothing for the upcoming cold season. Any gently used adult or children\'s coats are greatly appreciated...',
    tags: [
      { name: 'Charity Request', type: 'charity' },
      { name: 'Clothing', type: 'normal' },
      { name: 'Urgent', type: 'urgent' },
    ],
    likes: 124,
    canMessage: true,
  },
  {
    id: 2,
    userName: 'Elena Rostova',
    userAvatar: 'https://picsum.photos/48/48?random=2',
    verified: true,
    location: 'Active 2h ago',
    title: 'Offering Medical Textbooks (Like New)',
    desc: 'Graduated last year and want to pass these on to a medical student in need. Local pickup preferred.',
    tags: [],
    images: [
      'https://picsum.photos/300/200?random=10',
      'https://picsum.photos/300/200?random=11',
    ],
    likes: 89,
    canClaim: true,
  },
])

// 同心圆
const circles = ref([
  {
    id: 1,
    name: 'SF Local Volunteers',
    icon: '🌱',
    color: '#e8f5e9',
    members: '1.2k members',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Book Exchange',
    icon: '📚',
    color: '#f3e5f5',
    members: '850 members',
    status: '5 new',
  },
])

// 兴趣标签
const interests = ['Environment', 'Education', 'Animals']

// 推荐朋友
const friends = ref([
  {
    id: 1,
    name: 'Jessica Wong',
    avatar: 'https://picsum.photos/40/40?random=20',
    reason: 'Matches 2 interests',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    avatar: 'https://picsum.photos/40/40?random=21',
    reason: '3 Mutual friends',
  },
])
</script>

<style scoped>
.discover {
  max-width: 1200px;
  margin: 0 auto;
}

/* 顶部标签 */
.discover-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.tab {
  padding: 10px 20px;
  border-radius: 24px;
  background: #fff;
  border: 1px solid #e4e7ed;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab:hover {
  border-color: #409EFF;
  color: #409EFF;
}

.tab.active {
  background: #1a1a1a;
  border-color: #1a1a1a;
  color: #fff;
}

.tab-icon {
  font-size: 14px;
}

/* 内容区布局 */
.discover-content {
  display: flex;
  gap: 24px;
}

.feed-list {
  flex: 1;
}

/* 动态卡片 */
.post-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.user-name {
  font-weight: 600;
  color: #1a1a1a;
}

.verified-badge {
  width: 16px;
  height: 16px;
  background: #4f46e5;
  color: #fff;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.org-tag {
  padding: 2px 8px;
  background: #e8f5e9;
  color: #4caf50;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.user-meta {
  font-size: 13px;
  color: #909399;
}

.more-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #909399;
  font-size: 16px;
}

.post-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.post-desc {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  margin: 0 0 12px;
}

.post-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.tag.charity {
  background: #e3f2fd;
  color: #1976d2;
}

.tag.urgent {
  background: #ffebee;
  color: #d32f2f;
}

.tag.normal {
  background: #f5f5f5;
  color: #666;
}

.post-images {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.post-images img {
  width: calc(50% - 6px);
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
}

.post-images img.single-img {
  width: 100%;
}

.post-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
}

.message-btn, .claim-btn {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.message-btn {
  background: #4f46e5;
  color: #fff;
}

.claim-btn {
  background: #e3f2fd;
  color: #1976d2;
}

/* 右侧边栏 */
.sidebar-right {
  width: 320px;
  flex-shrink: 0;
}

.trust-card, .circles-card, .friends-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.trust-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.trust-header span:first-child {
  font-size: 14px;
  color: #606266;
}

.trust-score {
  font-size: 20px;
  font-weight: 700;
  color: #4caf50;
}

.trust-desc {
  font-size: 13px;
  color: #909399;
  line-height: 1.5;
  margin: 0 0 16px;
}

.view-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid #e4e7ed;
  background: #fff;
  border-radius: 8px;
  color: #4f46e5;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.section-header a {
  font-size: 13px;
  color: #4f46e5;
  text-decoration: none;
}

.circle-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.circle-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.circle-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.circle-info {
  flex: 1;
}

.circle-name {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.circle-meta {
  font-size: 12px;
  color: #909399;
}

.join-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e4e7ed;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  color: #4f46e5;
}

.friends-card h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px;
}

.interest-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.interest-tag {
  padding: 6px 12px;
  background: #f5f5f5;
  border-radius: 16px;
  font-size: 12px;
  color: #606266;
}

.interest-tag:nth-child(2) {
  background: #e3f2fd;
  color: #1976d2;
}

.friend-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.friend-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.friend-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.friend-info {
  flex: 1;
}

.friend-name {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.friend-meta {
  font-size: 12px;
  color: #909399;
}

.follow-btn {
  padding: 6px 16px;
  border: 1px solid #4f46e5;
  background: #fff;
  border-radius: 16px;
  color: #4f46e5;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
</style>