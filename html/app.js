document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // 防止表單自動刷新頁面

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://0.0.0.0:8081/login', {  // Go API port
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });

        const data = await res.json();

        // 根據 API 回傳結果顯示訊息
        const resultDiv = document.getElementById('result');
        if(data.success){
            resultDiv.style.color = 'green';
            resultDiv.innerText = "Login successful!";
        } else {
            resultDiv.style.color = 'red';
            resultDiv.innerText = "Login failed: " + data.message;
        }
    } catch(err) {
        console.error(err);
        document.getElementById('result').style.color = 'red';
        document.getElementById('result').innerText = "Error connecting to server";
    }
});






// // API 基礎設定
// const API_BASE_URL = 'http://localhost:3000/api'; // 修改為你的後端 URL

// /**
//  * 發送 HTTP 請求的通用函數
//  * @param {string} endpoint - API 端點
//  * @param {string} method - HTTP 方法 (GET, POST, PUT, DELETE)
//  * @param {object} data - 請求的資料 (可選)
//  * @returns {Promise} 返回 Promise
//  */
// async function apiRequest(endpoint, method = 'GET', data = null) {
//   try {
//     const options = {
//       method: method,
//       headers: {
//         'Content-Type': 'application/json',
//         // 如果需要認證，可以在這裡添加 token
//         // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     };

//     // 如果有請求資料，添加到 body
//     if (data && (method === 'POST' || method === 'PUT')) {
//       options.body = JSON.stringify(data);
//     }

//     const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

//     // 檢查回應狀態
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(`HTTP Error: ${response.status} - ${errorData.message || response.statusText}`);
//     }

//     // 解析 JSON 回應
//     const result = await response.json();
//     return result;

//   } catch (error) {
//     console.error('API 請求錯誤:', error.message);
//     throw error;
//   }
// }

// /**
//  * GET 請求
//  * @param {string} endpoint - API 端點
//  * @returns {Promise}
//  */
// function getRequest(endpoint) {
//   return apiRequest(endpoint, 'GET');
// }

// /**
//  * POST 請求
//  * @param {string} endpoint - API 端點
//  * @param {object} data - 請求資料
//  * @returns {Promise}
//  */
// function postRequest(endpoint, data) {
//   return apiRequest(endpoint, 'POST', data);
// }

// /**
//  * PUT 請求
//  * @param {string} endpoint - API 端點
//  * @param {object} data - 請求資料
//  * @returns {Promise}
//  */
// function putRequest(endpoint, data) {
//   return apiRequest(endpoint, 'PUT', data);
// }

// /**
//  * DELETE 請求
//  * @param {string} endpoint - API 端點
//  * @returns {Promise}
//  */
// function deleteRequest(endpoint) {
//   return apiRequest(endpoint, 'DELETE');
// }

// // ========== 使用範例 ==========

// /**
//  * 獲取所有用戶
//  */
// async function getAllUsers() {
//   try {
//     const users = await getRequest('/users');
//     console.log('所有用戶:', users);
//     return users;
//   } catch (error) {
//     console.error('獲取用戶失敗:', error);
//   }
// }

// /**
//  * 獲取單個用戶
//  * @param {number} userId - 用戶 ID
//  */
// async function getUserById(userId) {
//   try {
//     const user = await getRequest(`/users/${userId}`);
//     console.log('用戶資訊:', user);
//     return user;
//   } catch (error) {
//     console.error('獲取用戶失敗:', error);
//   }
// }

// /**
//  * 創建新用戶
//  * @param {object} userData - 用戶資料
//  */
// async function createUser(userData) {
//   try {
//     const newUser = await postRequest('/users', userData);
//     console.log('新用戶已創建:', newUser);
//     return newUser;
//   } catch (error) {
//     console.error('創建用戶失敗:', error);
//   }
// }

// /**
//  * 更新用戶資訊
//  * @param {number} userId - 用戶 ID
//  * @param {object} updateData - 更新的資料
//  */
// async function updateUser(userId, updateData) {
//   try {
//     const updatedUser = await putRequest(`/users/${userId}`, updateData);
//     console.log('用戶已更新:', updatedUser);
//     return updatedUser;
//   } catch (error) {
//     console.error('更新用戶失敗:', error);
//   }
// }

// /**
//  * 刪除用戶
//  * @param {number} userId - 用戶 ID
//  */
// async function deleteUser(userId) {
//   try {
//     const result = await deleteRequest(`/users/${userId}`);
//     console.log('用戶已刪除:', result);
//     return result;
//   } catch (error) {
//     console.error('刪除用戶失敗:', error);
//   }
// }

// // ========== 在 HTML 中使用的範例 ==========

// // 頁面加載時獲取資料
// document.addEventListener('DOMContentLoaded', () => {
//   // 獲取所有用戶
//   // getAllUsers();
// });

// // 表單提交範例
// function handleFormSubmit(event) {
//   event.preventDefault();
  
//   const formData = {
//     name: document.getElementById('name').value,
//     email: document.getElementById('email').value,
//     age: document.getElementById('age').value
//   };

//   createUser(formData).then(response => {
//     alert('用戶創建成功！');
//     // 清空表單
//     event.target.reset();
//   });
// }
