# LINE Bot 設定步驟指南（MacBook 版）

> 💻 本指南專為 **MacBook** 使用者設計，包含 macOS 專用的指令和快捷鍵說明。

## 第一步：建立 LINE Bot

### 1. 註冊 LINE Developers 帳號
1. 前往 [LINE Developers Console](https://developers.line.biz/)
2. 使用你的 LINE 帳號登入
3. 同意開發者條款

### 2. 建立 Provider
1. 點選「Create」建立新的 Provider
2. Provider name：輸入你的名稱（例如：每日靈修）
3. 點選「Create」

### 3. 建立 Messaging API Channel
1. 在 Provider 頁面點選「Create a Messaging API channel」
2. 填寫以下資訊：
   - Channel name：每日靈修 Bot
   - Channel description：自動發送每日靈修內容
   - Category：選擇適合的類別（如：Education）
   - Subcategory：選擇子類別
3. 同意條款並建立

### 4. 取得 Channel Access Token
1. 進入你建立的 Channel
2. 點選「Messaging API」標籤
3. 找到「Channel access token」區域
4. 點選「Issue」發行 Token
5. **複製並妥善保存這個 Token**

### 5. 設定 Webhook（可選）
如果需要接收使用者訊息，才需要設定。對於單向發送的機器人，可以跳過此步驟。

## 第二步：將 Bot 加入群組

### 1. 加入 Bot 為好友
1. 在 LINE Developers Console 找到你的 Bot
2. 掃描 QR Code 或搜尋 Bot ID
3. 加入為好友

### 2. 將 Bot 加入群組
1. 建立或選擇一個 LINE 群組
2. 點選群組設定 → 邀請
3. 搜尋並邀請你的 Bot

### 3. 取得 Group ID

**⚠️ 重要說明：**
- 方法一的 broadcast API 只會返回 `{}`，**無法取得 Group ID**
- 建議使用方法二或方法三來取得 Group ID

**方法一：使用 Webhook.site（最簡單，推薦 🚀）**

這是最快的方法，不需要安裝任何東西。

1. **取得 Webhook URL**
   - 開啟 [https://webhook.site/](https://webhook.site/)
   - 複製畫面上的 `Unique URL`（點選 Copy to clipboard）

2. **設定 LINE Console**
   - 回到 [LINE Developers Console](https://developers.line.biz/)
   - 進入 Messaging API 頁面，找到 Webhook settings
   - 貼上剛剛複製的網址（**不需要**加 `/webhook`）
   - 按下 Update，並確保 **Use webhook** 已開啟

3. **取得 ID**
   - 在 LINE 群組中傳送隨意訊息
   - 回到 webhook.site，左側點擊新收到的請求
   - 在內容中找到 `source` -> `groupId`
   - 複製以 `C` 開頭的字串（例如 `C1234567890...`）

**方法二：使用本專案工具（進階）**

如果你希望在本地執行伺服器來接收 Event：

1. **安裝與啟動**
   ```bash
   npm install
   npm run get-group-id
   ```
2. **設定 ngrok**
   - 另開終端機，確保已[註冊 ngrok](https://dashboard.ngrok.com/) 並設定 authtoken
   - 執行 `ngrok http 3000`
   - 複製 HTTPS 網址
3. **設定 Webhook**
   - 在 LINE Console 設定 Webhook URL 為 `https://你的ngrok.io/webhook` (**需加上 /webhook**)
4. **觸發**
   - 在群組傳送訊息，終端機即會顯示 ID

## 第三步：設定 GitHub Secrets

1. 前往你的 GitHub Repository
2. 點選「Settings」→「Secrets and variables」→「Actions」
3. 點選「New repository secret」
4. 新增以下三個 secrets：

### LINE_CHANNEL_ACCESS_TOKEN
- Name: `LINE_CHANNEL_ACCESS_TOKEN`
- Secret: 貼上你從 LINE Developers Console 取得的 Channel Access Token

### LINE_GROUP_ID
- Name: `LINE_GROUP_ID`
- Secret: 貼上你的群組 ID（格式：C開頭的長字串）

### GITHUB_PAGES_URL（選填）
- Name: `GITHUB_PAGES_URL`
- Secret: `https://hungshinlee.github.io/daily-devotional`
- 如果不設定，會使用預設值

## 第四步：啟用 GitHub Pages

1. 前往 Repository Settings
2. 點選「Pages」
3. Source 選擇「Deploy from a branch」
4. Branch 選擇「main」
5. 資料夾選擇「/ (root)」或「/devotionals」
6. 點選「Save」
7. 等待幾分鐘，訪問 `https://hungshinlee.github.io/daily-devotional/` 確認部署成功

## 第五步：測試

### 手動觸發測試
1. 前往 GitHub Actions
2. 點選「Daily Devotional Post」workflow
3. 點選「Run workflow」
4. 選擇 branch 並執行
5. 檢查執行結果和 LINE 群組是否收到訊息

### 檢查清單
- [ ] LINE Bot 已建立並取得 Channel Access Token
- [ ] Bot 已加入目標群組
- [ ] 取得群組 ID
- [ ] GitHub Secrets 已正確設定
- [ ] GitHub Pages 已啟用
- [ ] 測試執行成功
- [ ] LINE 群組收到測試訊息

## 常見問題

### Q: 找不到 Group ID 怎麼辦？
A: 最簡單的方法是在群組中與 Bot 互動，然後查看 webhook 事件。可以使用 [webhook.site](https://webhook.site/) 等服務來接收測試事件。

### Q: 訊息沒有發送？
A: 檢查 GitHub Actions 的執行記錄，確認是否有錯誤訊息。常見問題包括：
- Token 或 Group ID 錯誤
- Bot 不在群組中
- 當天的文章檔案不存在

### Q: 如何更改發送時間？
A: 修改 `.github/workflows/daily-post.yml` 中的 cron 表達式。注意 GitHub Actions 使用 UTC 時間。

## 需要協助？

如有問題，歡迎在 GitHub Issues 中提問！
