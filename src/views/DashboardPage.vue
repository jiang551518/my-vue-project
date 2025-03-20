<template>
    <div class="dashboard-container">
      <div class="header-card">
        <h1>欢迎来到管理系统</h1>
        <div class="nav-links">
          <router-link to="/test-list" class="nav-item">
            📊 测试列表
          </router-link>
          <router-link to="/weather" class="nav-item">
            🌤️ 查看天气
          </router-link>
          <router-link to="/user-list" class="nav-item">
            👥 用户列表
          </router-link>
        </div>
        <button @click="logout" class="logout-btn">退出登录</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #86E8FF, #007AFF);
    margin: 0;
    padding: 20px;
  }
  
  .header-card {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h1 {
    margin: 0 0 30px 0;
    color: #1a1a1a;
    font-size: 28px;
  }
  
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .nav-item {
    color: #007AFF;
    text-decoration: none;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.3s;
  }
  
  .nav-item:hover {
    color: #0056b3;
  }
  
  .logout-btn {
    padding: 12px 24px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
  }
  
  .logout-btn:hover {
    background: #cc0000;
  }
  </style>