<template>
  <div class="profile-page">
    <!-- 顶部标题 -->
    <div class="page-header">
      <h1>Member Center</h1>
      <div class="header-actions">
        <el-icon class="action-icon"><Bell /></el-icon>
        <el-icon class="action-icon"><Setting /></el-icon>
      </div>
    </div>

    <!-- 用户信息卡片 -->
    <div class="user-card">
      <div class="user-main">
        <div class="user-avatar-large">
          <img src="https://picsum.photos/100/100?random=100" alt="avatar" />
          <span class="verified-badge">✓</span>
        </div>
        <div class="user-details">
          <div class="user-name-row">
            <h2>Sarah Chen</h2>
            <span class="member-badge">Enterprise Member</span>
          </div>
          <p class="user-meta">ID: GW-8472910 • Joined March 2023</p>
          <div class="user-stats">
            <div class="stat-item">
              <span class="stat-label">Trust Score</span>
              <span class="stat-value">98 <el-icon><TrendCharts /></el-icon></span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Charity Points</span>
              <span class="stat-value points">2,450</span>
            </div>
          </div>
        </div>
      </div>
      <div class="user-status">
        <span>Active Status</span>
        <el-switch v-model="isActive" active-color="#5B5FC7" />
      </div>
    </div>

    <!-- 订单与交易 -->
    <div class="section orders-section">
      <div class="section-header">
        <h3>Orders & Transactions</h3>
        <el-button type="text" class="view-all">
          View All <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>
      
      <!-- 订单状态图标 -->
      <div class="order-status-list">
        <div class="status-item" v-for="status in orderStatuses" :key="status.key">
          <div class="status-icon">
            <el-icon :size="24"><component :is="status.icon" /></el-icon>
            <span class="badge" v-if="status.count">{{ status.count }}</span>
          </div>
          <span class="status-name">{{ status.name }}</span>
        </div>
      </div>

      <!-- 最近订单 -->
      <div class="recent-order">
        <div class="order-info">
          <span class="order-status-tag">In Transit</span>
          <span class="order-id">Order: #GW-20231024-01</span>
          <span class="order-time">2023-10-24 14:30</span>
        </div>
        <div class="order-detail">
          <img class="order-thumb" src="https://picsum.photos/60/60?random=10" alt="product" />
          <div class="order-text">
            <p class="order-title">50 Assorted Winter Coats (Donation)</p>
            <p class="order-recipient">Recipient: Downtown Community Center</p>
          </div>
          <el-button type="primary" class="track-btn">Track Logistics</el-button>
        </div>
      </div>
    </div>

    <!-- 快捷服务 -->
    <div class="section services-section">
      <h3>Quick Services</h3>
      <div class="services-grid">
        <div class="service-item" v-for="service in services" :key="service.key">
          <div class="service-icon" :style="{ color: service.color }">
            <el-icon :size="24"><component :is="service.icon" /></el-icon>
          </div>
          <div class="service-info">
            <span class="service-name">{{ service.name }}</span>
            <span class="service-count">{{ service.count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Bell, Setting, TrendCharts, ArrowRight,
  Wallet, Box, Truck, CircleCheck, Service,
  StarFilled, Collection, Goods, UserFilled,
  Location, Document, Notification 
} from '@element-plus/icons-vue'

const isActive = ref(true)

const orderStatuses = [
  { key: 'pending', name: 'Pending Pay', icon: Wallet, count: 1 },
  { key: 'ship', name: 'To Ship', icon: Box, count: 0 },
  { key: 'transit', name: 'In Transit', icon: Truck, count: 3 },
  { key: 'confirm', name: 'To Confirm', icon: CircleCheck, count: 0 },
  { key: 'after', name: 'After-sales', icon: Service, count: 0 }
]

const services = [
  { key: 'wishes', name: 'My Wishes', count: '12 Active', icon: StarFilled, color: '#5B5FC7' },
  { key: 'donations', name: 'My Donations', count: '45 Items', icon: Collection, color: '#67C23A' },
  { key: 'favorites', name: 'Favorites', count: '8 Saved', icon: Goods, color: '#E6A23C' },
  { key: 'following', name: 'Following', count: '24 Orgs', icon: UserFilled, color: '#F56C6C' },
  { key: 'subscriptions', name: 'Subscriptions', count: 'Manage alerts', icon: Notification, color: '#409EFF' },
  { key: 'addresses', name: 'Addresses', count: '3 Saved', icon: Location, color: '#909399' },
  { key: 'invoices', name: 'Invoices & Certs', count: '5 Documents', icon: Document, color: '#F56C6C' }
]
</script>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
}

/* 页面标题 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.header-actions {
  display: flex;
  gap: 16px;
}

.action-icon {
  font-size: 20px;
  color: #606266;
  cursor: pointer;
}

.action-icon:hover {
  color: #5B5FC7;
}

/* 用户信息卡片 */
.user-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e8eaf6 100%);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.user-main {
  display: flex;
  gap: 20px;
  align-items: center;
}

.user-avatar-large {
  position: relative;
  width: 100px;
  height: 100px;
}

.user-avatar-large img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.verified-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  background: #5B5FC7;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border: 2px solid #fff;
}

.user-details h2 {
  font-size: 22px;
  font-weight: 600;
  color: #303133;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.member-badge {
  background: #e8f5e9;
  color: #4caf50;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.user-meta {
  color: #909399;
  font-size: 13px;
  margin-bottom: 16px;
}

.user-stats {
  display: flex;
  gap: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 12px;
  color: #909399;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-value .el-icon {
  color: #67C23A;
  font-size: 16px;
}

.stat-value.points {
  color: #5B5FC7;
}

.user-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #606266;
  font-size: 13px;
}

/* 区块通用样式 */
.section {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.view-all {
  color: #5B5FC7;
  font-size: 13px;
}

/* 订单状态 */
.order-status-list {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.status-icon {
  position: relative;
  width: 48px;
  height: 48px;
  background: #f5f7fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #606266;
}

.status-item:hover .status-icon {
  background: #ecf5ff;
  color: #5B5FC7;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  background: #f56c6c;
  color: #fff;
  border-radius: 50%;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-name {
  font-size: 12px;
  color: #606266;
}

/* 最近订单 */
.recent-order {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
}

.order-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 13px;
}

.order-status-tag {
  color: #5B5FC7;
  font-weight: 500;
}

.order-id {
  color: #606266;
  flex: 1;
}

.order-time {
  color: #909399;
}

.order-detail {
  display: flex;
  align-items: center;
  gap: 16px;
}

.order-thumb {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.order-text {
  flex: 1;
}

.order-title {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 4px;
}

.order-recipient {
  font-size: 12px;
  color: #909399;
}

.track-btn {
  background: #5B5FC7;
  border-color: #5B5FC7;
  border-radius: 8px;
}

/* 快捷服务 */
.services-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s;
}

.service-item:hover {
  background: #f0f1f2;
}

.service-icon {
  width: 48px;
  height: 48px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.service-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.service-count {
  font-size: 12px;
  color: #909399;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .user-card {
    flex-direction: column;
    gap: 20px;
  }
}
</style>