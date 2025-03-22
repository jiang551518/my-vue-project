<template>
  <div class="edit-user-container">
    <h1>编辑用户</h1>
    <input v-model="username" type="text" placeholder="用户名" />
    <!-- 设置 readonly 属性让真实姓名不可编辑 -->
    <input v-model="realname" type="text" placeholder="真实姓名" readonly />
    <input v-model="password" type="password" placeholder="密码" />
    <select v-model="isEnable">
      <option value="true">启用</option>
      <option value="false">禁用</option>
    </select>
    <select v-model="roleType">
      <option value="1">访客</option>
      <option value="2">员工</option>
      <option value="3">管理员</option>
    </select>
    <input v-model="excelPasswd" placeholder="Excel 导出加密密码" />
    <div class="button-group">
      <button @click="saveUser">保存</button>
      <button @click="goBackToList">返回</button>
    </div>
    <!-- 错误提示 -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
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
const isEnable = ref('');
const roleType = ref('');
const excelPasswd = ref('');
const errorMessage = ref('');

// 获取用户详情
const getUserDetail = async () => {
  try {
    const response = await api.get('/api/Test/GetDetail', {
      params: { id: route.params.id }
    });
    const userData = response.data;
    id.value = userData.id;
    username.value = userData.username;
    realname.value = userData.realname;
    password.value = userData.pwd || '';
    // 确保将 enabled 转换为字符串 'true' 或 'false'
    if (typeof userData.enabled === 'boolean') {
      isEnable.value = userData.enabled.toString();
    } else {
      isEnable.value = String(userData.enabled || 'true');
    }
    roleType.value = String(userData.roleType || '1');
    excelPasswd.value = userData.excelPasswd || '';
  } catch (error) {
    console.error('获取用户详情失败:', error);
    isEnable.value = 'true';
  }
};

// 保存用户
const saveUser = async () => {
  try {
    await api.put('/api/Test/EditUser', null, {
      params: {
        id: id.value,
        username: username.value,
        // 不传递 realname 字段
        pwd: password.value,
        isEnable: isEnable.value === 'true',
        roleType: Number(roleType.value),
        excelPasswd: excelPasswd.value
      }
    });
    router.push('/user-list');
  } catch (error) {
    if (error.response && error.response.status === 500) {
      errorMessage.value = '用户名已存在';
    } else {
      console.error('保存用户信息失败:', error);
    }
  }
};

// 返回用户列表页面
const goBackToList = () => {
  router.push('/user-list');
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

input,
select {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>