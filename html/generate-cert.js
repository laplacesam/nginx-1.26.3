// 使用 selfsigned 包生成自簽憑證
const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

console.log('正在生成自簽憑證...\n');

try {
    // 定義憑證屬性
    const attrs = [
        { name: 'commonName', value: 'localhost' },
        { name: 'organizationName', value: 'Test' },
        { name: 'countryName', value: 'TW' }
    ];

    // 生成自簽憑證
    const pems = selfsigned.generate(attrs, {
        algorithm: 'sha256',
        days: 365,
        keySize: 2048
    });

    // 寫入證書文件
    fs.writeFileSync(path.join(__dirname, 'cert.pem'), pems.cert);
    fs.writeFileSync(path.join(__dirname, 'key.pem'), pems.private);

    console.log('✅ 憑證生成成功！\n');
    console.log('📁 證書文件: cert.pem');
    console.log('🔑 私鑰文件: key.pem');
    console.log('⏰ 有效期: 365 天');
    console.log('🔐 主機名: localhost');
    console.log('\n💡 使用方式:');
    console.log('   const https = require("https");');
    console.log('   const fs = require("fs");');
    console.log('   ');
    console.log('   const options = {');
    console.log('       key: fs.readFileSync("./key.pem"),');
    console.log('       cert: fs.readFileSync("./cert.pem")');
    console.log('   };');
    console.log('   ');
    console.log('   https.createServer(options, app).listen(443);');
    
} catch (error) {
    console.error('❌ 憑證生成失敗:', error.message);
    process.exit(1);
}
