 // 導航到創建帳號頁面
    function goToRegister() {
        window.location.href = '../createAct/createAct.html';
    }

    // 處理登入表單提交
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        // 獲取表單資料
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // 驗證帳號和密碼不為空
        if (!username || !password) {
            alert('帳號和密碼不能為空！');
            return;
        }

        // 準備發送的資料
        const loginData = {
            username: username,
            password: password
        };

        try {
            console.log('正在發送登入請求...');
            console.log('帳號:', username);
            
            // 調用登入 API
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            console.log('回應狀態:', response.status);

            if (!response.ok) {
                try {
                    const errorData = await response.json();
                    console.error('後端錯誤回應:', errorData);
                    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
                } catch (e) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            }

            const result = await response.json();
            console.log('登入成功:', result);

            // 保存 token (如果後端返回)
            if (result.token) {
                localStorage.setItem('token', result.token);
                console.log('Token 已保存');
            }

            // 保存用戶信息
            if (result.user) {
                localStorage.setItem('user', JSON.stringify(result.user));
                console.log('用戶信息已保存');
            }

            alert('登入成功！');
            
            // 登入成功後導向首頁或儀表板
            // 你可以修改這個 URL 為你的實際首頁
            window.location.href = '../createAct/createAct.html';
            
        } catch (error) {
            console.error('登入錯誤:', error);
            const errorMsg = error.message;
            
            if (errorMsg.includes('401')) {
                alert('登入失敗: 帳號或密碼錯誤\n\n請確認:\n✓ 帳號和密碼是否正確\n✓ 是否已創建過此帳號');
            } else if (errorMsg.includes('Failed to fetch')) {
                alert('連接失敗: 無法連接到後端伺服器\n\n請確認:\n✓ 後端伺服器是否運行在 http://localhost:3000\n✓ 網絡連接是否正常');
            } else {
                alert('登入失敗: ' + errorMsg);
            }
        }
    });