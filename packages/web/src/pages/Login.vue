<template>
  <div class="login-container">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="glass-orb orb-1"></div>
      <div class="glass-orb orb-2"></div>
      <div class="glass-orb orb-3"></div>
    </div>

    <!-- 主登录卡片 -->
    <div class="login-card">
      <div class="card-header">
        <h1 class="title">{{ isLogin ? '登录' : '注册' }}</h1>
        <p class="subtitle">{{ isLogin ? '欢迎回来' : '创建新账户' }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="login-form">
        <!-- 姓名输入框（仅注册时显示） -->
        <div v-if="!isLogin" class="input-group">
          <div class="input-wrapper">
            <input
              v-model="form.name"
              type="text"
              placeholder="姓名"
              class="glass-input"
              required
            />
            <div class="input-border"></div>
          </div>
        </div>

        <!-- 邮箱输入框 -->
        <div class="input-group">
          <div class="input-wrapper">
            <input
              v-model="form.email"
              type="email"
              placeholder="邮箱地址"
              class="glass-input"
              required
            />
            <div class="input-border"></div>
          </div>
        </div>

        <!-- 密码输入框 -->
        <div class="input-group">
          <div class="input-wrapper">
            <input
              v-model="form.password"
              type="password"
              placeholder="密码"
              class="glass-input"
              required
            />
            <div class="input-border"></div>
          </div>
        </div>

        <!-- 确认密码输入框（仅注册时显示） -->
        <div v-if="!isLogin" class="input-group">
          <div class="input-wrapper">
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="确认密码"
              class="glass-input"
              required
            />
            <div class="input-border"></div>
          </div>
        </div>

        <!-- 错误信息 -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <!-- 提交按钮 -->
        <button
          type="submit"
          class="glass-button"
          :disabled="loading"
        >
          <span v-if="loading" class="loading-spinner"></span>
          {{ loading ? '处理中...' : (isLogin ? '登录' : '注册') }}
        </button>
      </form>

      <!-- 切换登录/注册 -->
      <div class="form-footer">
        <p class="switch-text">
          {{ isLogin ? '还没有账户？' : '已有账户？' }}
          <button
            type="button"
            @click="toggleMode"
            class="switch-button"
          >
            {{ isLogin ? '立即注册' : '立即登录' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authClient } from '../lib/auth'

const router = useRouter()

// 响应式数据
const isLogin = ref(true)
const loading = ref(false)
const error = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 切换登录/注册模式
const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  // 清空表单
  Object.keys(form).forEach(key => {
    form[key as keyof typeof form] = ''
  })
}

// 表单验证
const validateForm = () => {
  if (!form.email || !form.password) {
    error.value = '请填写所有必填字段'
    return false
  }

  if (!isLogin.value) {
    if (!form.name) {
      error.value = '请输入姓名'
      return false
    }
    if (form.password !== form.confirmPassword) {
      error.value = '两次输入的密码不一致'
      return false
    }
    if (form.password.length < 6) {
      error.value = '密码长度至少6位'
      return false
    }
  }

  return true
}

// 处理表单提交
const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  error.value = ''

  try {
    if (isLogin.value) {
      // 登录
      const result = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      })
      
      if (result.error) {
        error.value = result.error.message || '登录失败'
      } else {
        // 登录成功，跳转到主页
        console.log('登录成功:', result.data)
        router.push('/home')
      }
    } else {
      // 注册
      const result = await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
      })
      
      if (result.error) {
        error.value = result.error.message || '注册失败'
      } else {
        // 注册成功
        console.log('注册成功:', result.data)
        // 可以自动切换到登录模式或直接登录
        isLogin.value = true
        form.password = ''
        form.confirmPassword = ''
        error.value = ''
      }
    }
  } catch (err: any) {
    error.value = err.message || '操作失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.glass-orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.orb-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* 主登录卡片 */
.login-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* 卡片头部 */
.card-header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* 表单样式 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  position: relative;
}

.input-wrapper {
  position: relative;
}

.glass-input {
  width: 100%;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.glass-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.glass-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 1px;
}

.glass-input:focus + .input-border {
  width: 100%;
}

/* 错误信息 */
.error-message {
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
  background: rgba(255, 107, 107, 0.1);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 107, 0.2);
}

/* 提交按钮 */
.glass-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.glass-button:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.glass-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 加载动画 */
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 表单底部 */
.form-footer {
  margin-top: 20px;
  text-align: center;
}

.switch-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin: 0;
}

.switch-button {
  background: none;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.3s ease;
}

.switch-button:hover {
  color: rgba(255, 255, 255, 0.8);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
    margin: 10px;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .glass-input {
    padding: 14px 16px;
  }
  
  .glass-button {
    padding: 14px;
  }
}
</style>
