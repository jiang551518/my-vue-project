<template>
    <div class="login-container">
        <h1>登录</h1>
        <form @submit.prevent="login">
            <input v-model="username" type="text" placeholder="用户名" />
            <input v-model="password" type="password" placeholder="密码" />
            <button type="submit">登录</button>
        </form>
        <p>没有账号？<router-link to="/register">注册</router-link></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');

const login = async () => {
    try {
        const response = await api.post('/api/Login/Login', {
            Username: username.value,
            Pwd: password.value
        });
        // 从响应中提取 jwtToken 并存储到 localStorage
        const token = response.data.jwtToken;
        localStorage.setItem('token', token);
        router.push('/dashboard');
    } catch (error) {
        console.error('登录失败', error);
    }
};
</script>

<style scoped>
.login-container {
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
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
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