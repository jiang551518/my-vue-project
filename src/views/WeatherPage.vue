<template>
    <div class="weather-container">
      <h1 class="title">天气模块</h1>
      <div class="search-section">
        <input v-model="city" placeholder="请输入城市名称" class="input-city" @keyup.enter="checkCityAndGetWeather" />
        <button @click="checkCityAndGetWeather" class="btn-query">查看天气</button>
      </div>
      <div v-if="weatherInfo" class="weather-card">
        <h2 class="city-name">{{ weatherInfo.result.city }}</h2>
        <div class="weather-info-list">
          <p>日期: {{ weatherInfo.result.date }}</p>
          <p>星期: {{ weekMap[weatherInfo.result.week] }}</p>
          <p>天气状况: {{ weatherInfo.result.weather }}</p>
          <p>当前温度: {{ weatherInfo.result.temp }}°C</p>
          <p>最高温度: {{ weatherInfo.result.temphigh }}°C</p>
          <p>最低温度: {{ weatherInfo.result.templow }}°C</p>
          <p>更新时间: {{ weatherInfo.result.updatetime }}</p>
        </div>
        <img :src="weatherInfo.result.img" alt="天气图标" class="weather-icon" />
      </div>
      <p v-if="errorMessage" class="error-tip">{{ errorMessage }}</p>
      <p v-else-if="!weatherInfo" class="no-data-tip">请输入城市名称并查询天气</p>
      <button @click="goBack" class="back-btn">返回主页</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import api from '../services/api';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const city = ref('');
  const weatherInfo = ref(null);
  const errorMessage = ref('');
  const weekMap = { Thursday: '星期四' };
  
  const checkCityAndGetWeather = () => {
    if (!city.value.trim()) {
      errorMessage.value = '请填写城市名';
      return;
    }
    errorMessage.value = '';
    getWeather();
  };
  
  const getWeather = async () => {
    try {
      const response = await api.get('/api/Test/GetWeather', { params: { city: city.value } });
      weatherInfo.value = response.data;
    } catch (error) {
      console.error('获取天气信息失败:', error);
      errorMessage.value = '请输入准确的城市名';
    }
  };
  
  const goBack = () => {
    router.push('/dashboard');// 根据实际主页路由调整
  };
  </script>
  
  <style scoped>
  .weather-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #e6f2ff, #f5faff);
    padding: 20px;
  }
  
  .title {
    font-size: 28px;
    color: #1a1a1a;
    margin-bottom: 30px;
  }
  
  .search-section {
    display: flex;
    gap: 10px;
    margin-bottom: 40px;
  }
  
  .input-city {
    padding: 12px 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 300px;
    font-size: 16px;
  }
  
  .btn-query {
    padding: 12px 24px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .btn-query:hover {
    background: #357abd;
  }
  
  .weather-card {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .city-name {
    font-size: 24px;
    color: #1a1a1a;
    margin-bottom: 20px;
  }
  
  .weather-info-list {
    margin-bottom: 20px;
  }
  
  .weather-info-list p {
    margin: 12px 0;
    color: #333;
    font-size: 16px;
  }
  
  .weather-icon {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }
  
  .error-tip {
    color: red;
    margin-top: 10px;
  }
  
  .no-data-tip {
    color: #666;
    font-size: 16px;
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