// 返回登入頁面
document.getElementById('btnBack').addEventListener('click', function () {
    window.location.href = '../login/login.html';
});

// 處理表單提交
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // 獲取表單資料
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // 驗證密碼是否一致
    if (password !== confirmPassword) {
        alert('密碼與確認密碼不一致！');
        return;
    }

    // 驗證密碼長度
    if (password.length < 6) {
        alert('密碼長度至少為 6 個字符！');
        return;
    }

    // 準備發送的資料
    const userData = {
        username: username,
        password: password,
        email: email,
        gender: gender
    };

    try {
        console.log('正在發送請求到: http://localhost:3000/register');
        console.log('發送的資料:', userData);

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        console.log('回應狀態:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`伺服器錯誤: ${errorData.message || response.statusText}`);
        }

        const result = await response.json();
        console.log('成功回應:', result);
        alert('帳號創建成功！');

        window.location.href = '../login/login.html';
    } catch (error) {
        console.error('錯誤詳情:', error);
        alert('創建帳號失敗: ' + error.message + '\n\n請檢查:\n1. 後端伺服器是否運行\n2. 伺服器地址是否正確 (http://localhost:3000)\n3. 開啟瀏覽器開發工具 (F12) 查看詳細錯誤');
    }
});
