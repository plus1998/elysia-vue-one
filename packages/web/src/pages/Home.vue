<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authClient } from '../lib/auth'

import rpc from '@frontend/rpc'

const welcomMsg = ref('')

rpc.home.hi.get().then((res) => {
  console.log(res)
  welcomMsg.value = res.data || 'welcome to your new project'
})

rpc.demo.get({ query: { name: 'demo' } }).then((res) => {
  console.log(res)
})
// 定义用户类型
interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
  image?: string | null
}

const router = useRouter()
const user = ref<User | null>(null)

// 获取用户信息
onMounted(async () => {
  try {
    const session = await authClient.getSession()
    if (session.data) {
      user.value = session.data.user as User
    } else {
      // 如果没有登录，跳转到登录页
      router.push('/login')
    }
  } catch (error) {
    console.log('获取用户会话失败:', error)
    router.push('/login')
  }
})

// 退出登录
const handleLogout = async () => {
  try {
    await authClient.signOut()
    router.push('/login')
  } catch (error) {
    console.error('退出登录失败:', error)
  }
}
</script>

<template>
  <div class="home-container">
    <header class="app-header">
      <div class="header-content">
        <h1>欢迎回来，{{ user?.name }}！</h1>
        <button @click="handleLogout" class="logout-button">
          退出登录
        </button>
      </div>
    </header>
    
    <main class="app-main">
      <div class="welcome-card">
        <h2>应用主页</h2>
        <p>{{ welcomMsg }}</p>
        <div class="user-info" v-if="user">
          <p><strong>邮箱:</strong> {{ user.email }}</p>
          <p><strong>用户ID:</strong> {{ user.id }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.app-header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.logout-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.welcome-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.welcome-card h2 {
  color: #333;
  margin-bottom: 16px;
  font-size: 1.8rem;
}

.welcome-card p {
  color: #666;
  margin-bottom: 24px;
  font-size: 1.1rem;
}

.user-info {
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.user-info p {
  margin-bottom: 8px;
  color: #333;
}

.user-info p:last-child {
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .header-content h1 {
    font-size: 1.3rem;
  }
  
  .welcome-card {
    padding: 24px;
  }
  
  .welcome-card h2 {
    font-size: 1.5rem;
  }
  
  .app-main {
    padding: 20px 16px;
  }
}
</style>
