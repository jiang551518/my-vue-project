<template>
    <div class="edit-user-container">
      <h1>编辑用户</h1>
      <input v-model="id" type="text" placeholder="用户ID" disabled />
      <input v-model="username" type="text" placeholder="用户名" />
      <input v-model="realname" type="text" placeholder="真实姓名" />
      <input v-model="password" type="password" placeholder="密码" />
      <input v-model="enabled" type="checkbox" /> 启用
      <select v-model="roleType">
        <option value="0">角色0</option>
        <option value="1">角色1</option>
        <option value="2">角色2</option>
        <option value="3">角色3</option>
      </select>
      <input v-model="excelPasswd" placeholder="Excel 导出加密密码" />
      <button @click="saveUser">保存</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from '../services/api';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const id = ref('');
  const username = ref('');
  const realname = ref('');
  const password = ref('');
  const enabled = ref(false);
  const roleType = ref(0);
  const excelPasswd = ref('');
  
  const getUserDetail = async () => {
    try {
      const response = await api.get('/api/Test/GetDetail', {
        params: {
          id: route.params.id
        }
      });
      const user = response.data;
      id.value = user.id;
      username.value = user.username;
      realname.value = user.realname;
      password.value = user.password;
      enabled.value = user.enabled;
      roleType.value = user.roleType;
      excelPasswd.value = user.excelPasswd;
    } catch (error) {
      console.error('获取用户详情失败:', error);
    }
  };
  
  const saveUser = async () => {
    try {
      await api.put('/api/Test/EditUser', {
        id: id.value,
        username: username.value,
        realname: realname.value,
        password: password.value,
        enabled: enabled.value,
        roleType: roleType.value,
        excelPasswd: excelPasswd.value
      });
      router.push('/user-list');
    } catch (error) {
      console.error('保存用户信息失败:', error);
    }
  };
  
  onMounted(() => {
    getUserDetail();
  });
  </script>
  
  <style scoped>
  .edit-user-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f9;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 300px;
  }
  
  select {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 300px;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>