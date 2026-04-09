<template>
  <div class="message-page">
    <!-- 左侧消息列表 -->
    <div class="message-sidebar">
      <div class="sidebar-header">
        <h2>Messages</h2>
        <button class="new-msg-btn">✎</button>
      </div>
      
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search messages..." />
      </div>

      <!-- 标签切换 -->
      <div class="msg-tabs">
        <div 
          v-for="tab in tabs" 
          :key="tab.key"
          :class="['tab', { active: currentTab === tab.key }]"
          @click="currentTab = tab.key"
        >
          {{ tab.label }}
          <span v-if="tab.badge" class="badge">{{ tab.badge }}</span>
        </div>
      </div>

      <!-- 会话列表 -->
      <div class="conversation-list">
        <div 
          v-for="chat in conversations" 
          :key="chat.id"
          :class="['conversation-item', { active: selectedChat?.id === chat.id }]"
          @click="selectChat(chat)"
        >
          <div class="avatar-wrap">
            <img :src="chat.avatar" class="avatar" />
            <span v-if="chat.online" class="online-dot"></span>
          </div>
          <div class="chat-info">
            <div class="chat-header">
              <span class="chat-name">{{ chat.name }}</span>
              <span class="chat-time">{{ chat.time }}</span>
            </div>
            <p class="chat-preview">{{ chat.preview }}</p>
          </div>
          <span v-if="chat.unread" class="unread-badge">{{ chat.unread }}</span>
        </div>
      </div>
    </div>

    <!-- 中间聊天窗口 -->
    <div class="chat-window" v-if="selectedChat">
      <!-- 聊天头部 -->
      <div class="chat-header-bar">
        <div class="chat-user">
          <img :src="selectedChat.avatar" class="header-avatar" />
          <div class="user-status">
            <div class="status-name">
              {{ selectedChat.name }}
              <span v-if="selectedChat.verified" class="verify-icon">✓</span>
            </div>
            <div class="status-text">
              <span class="online-badge">●</span>
              {{ selectedChat.status }}
            </div>
          </div>
        </div>
        <div class="chat-actions">
          <button class="action-btn">
            <span>+</span>
            <span>Add Friend</span>
          </button>
          <button class="more-btn">•••</button>
        </div>
      </div>

      <!-- 消息记录 -->
      <div class="message-list">
        <div class="time-divider">Today, 9:41 AM</div>
        
        <div 
          v-for="msg in messages" 
          :key="msg.id"
          :class="['message-item', { self: msg.isSelf }]"
        >
          <img v-if="!msg.isSelf" :src="msg.avatar" class="msg-avatar" />
          
          <div class="msg-content">
            <!-- 文本消息 -->
            <div v-if="msg.type === 'text'" class="text-bubble">
              {{ msg.content }}
            </div>
            
            <!-- 心愿卡片消息 -->
            <div v-if="msg.type === 'wish'" class="wish-bubble">
              <div class="wish-header">
                <span class="wish-tag">Supply Offer</span>
              </div>
              <img :src="msg.wishImage" class="wish-img" />
              <h4>{{ msg.wishTitle }}</h4>
              <button class="view-details">View Details</button>
            </div>
            
            <!-- 地图消息 -->
            <div v-if="msg.type === 'location'" class="location-bubble">
              <div class="map-placeholder">
                <span>📍</span>
              </div>
              <div class="location-info">
                <div class="location-name">{{ msg.locationName }}</div>
                <div class="location-address">{{ msg.locationAddress }}</div>
              </div>
            </div>
            
            <div class="msg-time">{{ msg.time }}</div>
          </div>
        </div>
      </div>

      <!-- 输入框 -->
      <div class="input-area">
        <div class="input-tools">
          <button class="tool-btn">📷</button>
          <button class="tool-btn">🎤</button>
          <button class="tool-btn">📍</button>
          <button class="tool-btn">🎁</button>
        </div>
        <div class="input-box">
          <input type="text" placeholder="Type a message..." />
          <button class="send-btn">➤</button>
        </div>
      </div>
    </div>

    <!-- 右侧用户详情 -->
    <div class="user-detail" v-if="selectedChat">
      <div class="detail-header">
        <img :src="selectedChat.avatar" class="detail-avatar" />
        <h3 class="detail-name">
          {{ selectedChat.name }}
          <span v-if="selectedChat.verified" class="verify-badge">✓</span>
        </h3>
        <p class="join-date">Joined {{ selectedChat.joinDate }}</p>
        <div class="detail-actions">
          <button class="profile-btn">Profile</button>
          <button class="block-btn">Block</button>
        </div>
      </div>

      <!-- 共享心愿 -->
      <div class="shared-section">
        <div class="section-title">
          <h4>Shared Wishes</h4>
          <a href="#">View All</a>
        </div>
        <div class="shared-item">
          <img src="https://picsum.photos/60/60?random=30" class="shared-img" />
          <div class="shared-info">
            <div class="shared-name">Winter Coats Drive</div>
            <div class="shared-status">Completed • Oct 12</div>
          </div>
        </div>
      </div>

      <!-- 媒体链接 -->
      <div class="media-section">
        <div class="section-title">
          <h4>Media & Links</h4>
          <span>→</span>
        </div>
        <div class="media-grid">
          <img src="https://picsum.photos/80/80?random=31" />
          <img src="https://picsum.photos/80/80?random=32" />
          <div class="more-media">+12</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 标签
const tabs = [
  { key: 'all', label: 'All', badge: null },
  { key: 'private', label: 'Private', badge: 2 },
  { key: 'groups', label: 'Groups', badge: null },
  { key: 'system', label: 'System', badge: null },
]
const currentTab = ref('all')

// 会话列表
const conversations = ref([
  {
    id: 1,
    name: 'David Miller',
    avatar: 'https://picsum.photos/48/48?random=1',
    preview: 'Thanks for coordinating the coat drive!',
    time: '10:42 AM',
    unread: 0,
    online: true,
    verified: true,
    status: 'Online • Local Organization',
    joinDate: 'March 2023',
  },
  {
    id: 2,
    name: 'SF Local Volunteers',
    avatar: 'https://picsum.photos/48/48?random=2',
    preview: 'Sarah: We need 3 more volunteers for...',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Elena Rostova',
    avatar: 'https://picsum.photos/48/48?random=3',
    preview: "I'll drop off the medical textbooks tom...",
    time: 'Tue',
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: 'System Updates',
    avatar: 'https://picsum.photos/48/48?random=4',
    preview: 'Your trust score has increased to 98!',
    time: 'Mon',
    unread: 0,
    online: false,
  },
])

// 选中聊天
const selectedChat = ref(conversations.value[0])

const selectChat = (chat) => {
  selectedChat.value = chat
}

// 消息记录
const messages = ref([
  {
    id: 1,
    type: 'text',
    content: 'Hi there! I saw your organization is helping with the winter coat drive. We have about 50 gently used coats collected from our office.',
    isSelf: false,
    avatar: 'https://picsum.photos/40/40?random=1',
    time: '9:41 AM',
  },
  {
    id: 2,
    type: 'wish',
    wishTitle: '50 Assorted Winter Coats (Adult & Kids)',
    wishImage: 'https://picsum.photos/200/120?random=10',
    isSelf: false,
    avatar: 'https://picsum.photos/40/40?random=1',
    time: '9:42 AM',
  },
  {
    id: 3,
    type: 'text',
    content: "That's incredible! Thank you so much. We are currently sorting donations at the main community center.",
    isSelf: true,
    time: '10:30 AM',
  },
  {
    id: 4,
    type: 'location',
    locationName: 'Downtown Community Center',
    locationAddress: '123 Charity Ave, San Francisco',
    isSelf: true,
    time: '10:31 AM',
  },
])
</script>

<style scoped>
.message-page {
  display: flex;
  height: calc(100vh - 48px);
  background: #f5f7fa;
}

/* 左侧消息列表 */
.message-sidebar {
  width: 320px;
  background: #fff;
  border-right: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.sidebar-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.new-msg-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px 12px;
}

.search-box input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e4e7ed;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
}

.msg-tabs {
  display: flex;
  gap: 8px;
  padding: 0 16px 12px;
  border-bottom: 1px solid #f0f0f0;
}

.tab {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  color: #606266;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.tab:hover {
  background: #f5f5f5;
}

.tab.active {
  background: #1a1a1a;
  color: #fff;
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background: #f56c6c;
  color: #fff;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.conversation-list {
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.conversation-item:hover, .conversation-item.active {
  background: #f5f7fa;
}

.avatar-wrap {
  position: relative;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.online-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #67c23a;
  border: 2px solid #fff;
  border-radius: 50%;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.chat-name {
  font-weight: 500;
  color: #1a1a1a;
}

.chat-time {
  font-size: 12px;
  color: #909399;
}

.chat-preview {
  font-size: 13px;
  color: #606266;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unread-badge {
  width: 20px;
  height: 20px;
  background: #f56c6c;
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 中间聊天窗口 */
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.chat-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.chat-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.user-status {
  display: flex;
  flex-direction: column;
}

.status-name {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #1a1a1a;
}

.verify-icon {
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

.status-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #67c23a;
}

.online-badge {
  font-size: 8px;
}

.chat-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #e4e7ed;
  background: #fff;
  border-radius: 8px;
  color: #4f46e5;
  font-size: 14px;
  cursor: pointer;
}

.more-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  color: #909399;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f8f9fa;
}

.time-divider {
  text-align: center;
  color: #909399;
  font-size: 12px;
  margin-bottom: 20px;
}

.message-item {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.message-item.self {
  flex-direction: row-reverse;
}

.msg-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.msg-content {
  max-width: 70%;
}

.text-bubble {
  padding: 12px 16px;
  background: #fff;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  color: #1a1a1a;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.message-item.self .text-bubble {
  background: #4f46e5;
  color: #fff;
}

.wish-bubble {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  width: 280px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.wish-header {
  margin-bottom: 8px;
}

.wish-tag {
  padding: 4px 10px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 12px;
  font-size: 11px;
}

.wish-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}

.wish-bubble h4 {
  font-size: 14px;
  margin: 0 0 8px;
  color: #1a1a1a;
}

.view-details {
  width: 100%;
  padding: 8px;
  border: 1px solid #e4e7ed;
  background: #fff;
  border-radius: 8px;
  color: #606266;
  font-size: 13px;
  cursor: pointer;
}

.location-bubble {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  width: 280px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.map-placeholder {
  height: 120px;
  background: #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.location-info {
  padding: 12px;
}

.location-name {
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.location-address {
  font-size: 13px;
  color: #909399;
}

.msg-time {
  font-size: 11px;
  color: #909399;
  margin-top: 4px;
  text-align: right;
}

.input-area {
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
}

.input-tools {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.tool-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  color: #909399;
}

.input-box {
  display: flex;
  gap: 12px;
}

.input-box input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e4e7ed;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
}

.send-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: #4f46e5;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 右侧用户详情 */
.user-detail {
  width: 280px;
  background: #fff;
  border-left: 1px solid #e4e7ed;
  padding: 24px;
}

.detail-header {
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}

.detail-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.verify-badge {
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

.join-date {
  font-size: 13px;
  color: #909399;
  margin: 0 0 16px;
}

.detail-actions {
  display: flex;
  gap: 12px;
}

.profile-btn, .block-btn {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.profile-btn {
  border: 1px solid #e4e7ed;
  background: #fff;
  color: #606266;
}

.block-btn {
  border: 1px solid #ffebee;
  background: #ffebee;
  color: #d32f2f;
}

.shared-section, .media-section {
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title h4 {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.section-title a {
  font-size: 13px;
  color: #4f46e5;
  text-decoration: none;
}

.shared-item {
  display: flex;
  gap: 12px;
  align-items: center;
}

.shared-img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.shared-name {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.shared-status {
  font-size: 12px;
  color: #909399;
}

.media-grid {
  display: flex;
  gap: 8px;
}

.media-grid img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.more-media {
  width: 80px;
  height: 80px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #606266;
}
</style>