<template>
    <div class="user-list-container">
      <div class="search-container">
        <input v-model="username" type="text" placeholder="用户名" class="search-input" />
        <div class="checkbox-container">
          <input v-model="enabled" type="checkbox" /> 启用
        </div>
        <button @click="getUserList" class="search-btn">查询</button>
        <button @click="clearSearch" class="clear-btn">清除条件</button>
      </div>
      <table v-if="userList.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>真实姓名</th>
            <th>是否启用</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.realname }}</td>
            <td>{{ user.enabled ? '是' : '否' }}</td>
            <td>
              <button @click="editUser(user.id)" class="action-btn">编辑</button>
              <button @click="deleteUser(user.id)" class="action-btn">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>暂无用户数据</p>
      <!-- 添加返回主页按钮 -->
      <button @click="goBack" class="back-btn">返回主页</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from '../services/api';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const username = ref('');
  const enabled = ref(true);
  const userList = ref([]);
  
  // 获取用户列表
  const getUserList = async () => {
    try {
      const response = await api.get('/api/Test/GetUserList', {
        params: {
          username: username.value,
          enabled: enabled.value
        }
      });
      userList.value = response.data;
    } catch (error) {
      console.error('获取用户列表失败', error);
    }
  };
  
  // 清除查询条件
  const clearSearch = () => {
    username.value = '';
    enabled.value = true;
    getUserList();
  };
  
  // 返回主页
  const goBack = () => {
    router.push('/dashboard'); // 根据实际主页路由调整，这里假设主页路由是/dashboard
  };
  
  // 编辑用户
  const editUser = (id) => {
    router.push({ name: 'EditUser', params: { id } });
  };
  
  // 删除用户
  const deleteUser = async (id) => {
    if (confirm('确定要删除该用户吗？')) {
      try {
        await api.delete('/api/Test/UpdateIsDelete', { params: { id } });
        getUserList();
      } catch (error) {
        console.error('删除用户失败', error);
      }
    }
  };
  
  onMounted(() => {
    getUserList();
  });
  </script>
  
  <style scoped>
  .user-list-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 20px;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 8px 16px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    width: 200px;
  }
  
  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .search-btn,
  .clear-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-btn {
    background-color: #007bff;
    color: white;
  }
  
  .clear-btn {
    background-color: #ff4444;
    color: white;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    max-width: 1200px;
    margin-top: 20px;
    background: white;
  }
  
  th,
  td {
    border: 1px solid #dee2e6;
    padding: 12px;
    text-align: left;
    color: #495057;
  }
  
  th {
    background-color: #f8f9fa;
    color: #212529;
  }
  
  .action-btn {
    padding: 4px 8px;
    margin: 2px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }
  
  .back-btn {
    position: absolute;
    bottom: 20px;
    left: 20px;
    padding: 8px 30px;
    background-color: #ff4444;
    color: white;
    border: 1px solid #ff4444;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .back-btn:hover {
    background-color: white;
    color: #ff4444;
  }
  </style>