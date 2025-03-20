<template>
    <div class="register-container">
        <h1>注册</h1>
        <form @submit.prevent="register">
            <input v-model="username" type="text" placeholder="用户名" required />
            <input v-model="realname" type="text" placeholder="真实姓名" />
            <input v-model="password" type="password" placeholder="登录密码" required />
            <input v-model="enabled" type="checkbox" /> 是否启用
            <select v-model="roleType">
                <option value="1">访客</option>
                <option value="2">员工</option>
                <option value="3">管理员</option>
            </select>
            <input v-model="excelPasswd" type="text" placeholder="Excel 导出加密密码" />
            <button type="submit">注册</button>
        </form>
        <p>已有账号？<router-link to="/login">登录</router-link></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const realname = ref('');
const password = ref('');
const enabled = ref(true); // 默认启用
const roleType = ref(1); // 默认选择访客
const excelPasswd = ref('');

const register = async () => {
    try {
        await api.post('/api/Login/Sign', {
            Username: username.value,
            Realname: realname.value,
            Pwd: password.value,
            Enabled: enabled.value,
            RoleType: parseInt(roleType.value),
            ExcelPasswd: excelPasswd.value
        });
        router.push('/login');
    } catch (error) {
        console.error('注册失败', error);
    }
};
</script>

<style scoped>
.register-container {
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

form {
    display: flex;
    flex-direction: column;
    width: 300px;
}

input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}

p {
    margin-top: 20px;
}

router-link {
    color: #007bff;
    text-decoration: none;
}

router-link:hover {
    text-decoration: underline;
}
</style>