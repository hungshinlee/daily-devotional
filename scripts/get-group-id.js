#!/usr/bin/env node

/**
 * 取得 LINE 群組 ID 的簡易工具
 * 
 * 使用方法：
 * 1. 安裝依賴：npm install
 * 2. 執行腳本：node scripts/get-group-id.js
 * 3. 在 LINE 群組中傳送任何訊息給 Bot
 * 4. 查看終端機顯示的 Group ID
 */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

console.log('\n===========================================');
console.log('LINE Group ID 取得工具');
console.log('===========================================\n');
console.log('步驟：');
console.log('1. 確保此腳本正在運行');
console.log('2. 使用 ngrok 建立公開 URL：ngrok http 3000');
console.log('3. 將 ngrok URL 設定到 LINE Developers Console 的 Webhook URL');
console.log('4. 在 LINE 群組中傳送任何訊息');
console.log('5. Group ID 將顯示在下方\n');
console.log('===========================================\n');
console.log(`本地伺服器運行於: http://localhost:${PORT}`);
console.log('等待 Webhook 事件...\n');

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const events = req.body.events;
  
  if (!events || events.length === 0) {
    res.status(200).send('OK');
    return;
  }

  events.forEach(event => {
    console.log('\n===========================================');
    console.log('收到新事件！');
    console.log('===========================================');
    console.log('事件類型:', event.type);
    console.log('來源類型:', event.source.type);
    
    if (event.source.type === 'group') {
      console.log('\n✅ 找到 Group ID！');
      console.log('-------------------------------------------');
      console.log('Group ID:', event.source.groupId);
      console.log('-------------------------------------------');
      console.log('\n請將此 Group ID 設定到 GitHub Secrets 中：');
      console.log(`LINE_GROUP_ID = ${event.source.groupId}`);
      console.log('===========================================\n');
    } else if (event.source.type === 'user') {
      console.log('\n⚠️  這是來自個人的訊息，不是群組訊息');
      console.log('User ID:', event.source.userId);
      console.log('請在群組中傳送訊息以取得 Group ID\n');
    }
    
    if (event.message) {
      console.log('訊息內容:', event.message.text || event.message.type);
    }
    
    console.log('\n完整事件資料:');
    console.log(JSON.stringify(event, null, 2));
    console.log('\n');
  });

  res.status(200).send('OK');
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('LINE Webhook Server is running!');
});

app.listen(PORT, () => {
  console.log('準備就緒！\n');
});
