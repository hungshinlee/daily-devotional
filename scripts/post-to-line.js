const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 取得環境變數
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const GROUP_ID = process.env.LINE_GROUP_ID;
const GITHUB_PAGES_URL = process.env.GITHUB_PAGES_URL || 'https://hungshinlee.github.io/daily-devotional';

// 檢查必要的環境變數
if (!CHANNEL_ACCESS_TOKEN || !GROUP_ID) {
  console.error('❌ 錯誤：缺少必要的環境變數');
  console.error('請確保已設定 LINE_CHANNEL_ACCESS_TOKEN 和 LINE_GROUP_ID');
  process.exit(1);
}

// 取得今天的日期 (YYYY-MM-DD)
const today = new Date().toISOString().split('T')[0];
const monthDir = today.substring(0, 7); // 取得 YYYY-MM
const filePath = path.join(__dirname, '..', 'devotionals', monthDir, `${today}.md`);

console.log(`📅 今天日期：${today}`);
console.log(`📂 月份目錄：${monthDir}`);
console.log(`📄 檢查檔案：${filePath}`);

// 檢查檔案是否存在
if (!fs.existsSync(filePath)) {
  console.log('⚠️  今日靈修文章尚未準備，跳過發送');
  process.exit(0);
}

// 讀取並解析 Markdown 文件
function parseMarkdown(content) {
  const lines = content.split('\n');
  let inFrontmatter = false;
  let frontmatter = {};
  let bodyStartIndex = 0;

  // 解析 frontmatter
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
        bodyStartIndex = i + 1;
      } else {
        bodyStartIndex = i + 1;
        break;
      }
    } else if (inFrontmatter) {
      const match = lines[i].match(/^(\w+):\s*(.+)$/);
      if (match) {
        frontmatter[match[1]] = match[2].trim();
      }
    }
  }

  // 如果沒有 frontmatter，嘗試從內容提取
  if (Object.keys(frontmatter).length === 0) {
    const titleLine = lines.find(l => l.startsWith('# '));
    const verseLine = lines.find(l => l.includes('經文：') || l.includes('經文:'));
    
    frontmatter.title = titleLine ? titleLine.replace('# ', '').trim() : '每日靈修';
    frontmatter.verse = verseLine ? verseLine.split(/[：:]/)[1].trim() : '';
  }

  return frontmatter;
}

// 讀取檔案內容
const content = fs.readFileSync(filePath, 'utf-8');
const devotional = parseMarkdown(content);

// 建立 LINE 訊息
const articleUrl = `${GITHUB_PAGES_URL}/devotionals/${monthDir}/${today}`;
const message = {
  type: 'text',
  text: `📖 ${devotional.title || '每日靈修'}\n\n📜 ${devotional.verse || ''}\n\n🔗 完整內容：\n${articleUrl}`
};

console.log('📨 準備發送訊息：');
console.log(message.text);

// 發送到 LINE
axios.post('https://api.line.me/v2/bot/message/push', {
  to: GROUP_ID,
  messages: [message]
}, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
  }
})
.then(response => {
  console.log('✅ 訊息已成功發送到 LINE 群組');
  console.log('📊 狀態：', response.status);
})
.catch(error => {
  console.error('❌ 發送失敗：', error.response?.data || error.message);
  process.exit(1);
});
