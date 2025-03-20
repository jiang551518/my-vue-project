<template>
    <div class="test-list-container">
      <h1>测试列表</h1>
      <button @click="exportTestList" class="export-btn">导出测试列表</button>
      <table v-if="testList.tests.length > 0">
        <thead>
          <tr>
            <th>积分</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(test, index) in testList.tests" :key="index">
            <td>{{ test.integral }}</td>
            <td>{{ test.intTime }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>暂无测试数据</p>
      <button @click="goBack" class="back-btn">返回主页</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from '../services/api';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const testList = ref({ tests: [] });
  
  const exportTestList = async () => {
    try {
      const response = await api.get('/api/Test/GetListExport', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'test_list_export.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('测试列表导出失败:', error);
    }
  };
  
  const goBack = () => {
    router.push('/dashboard');// 根据实际主页路由调整
  };
  
  onMounted(() => {
    getTestList();
  });
  
  const getTestList = async () => {
    try {
      const response = await api.get('/api/Test/GetList');
      testList.value = response.data;
    } catch (error) {
      console.error('获取测试列表失败:', error);
    }
  };
  </script>
  
  <style scoped>
  .test-list-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 20px;
  }
  
  .export-btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    max-width: 1200px;
    margin-top: 20px;
    background: white;
  }
  
  th, td {
    border: 1px solid #dee2e6;
    padding: 12px;
    text-align: left;
    color: #495057;
  }
  
  th {
    background-color: #f8f9fa;
    color: #212529;
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