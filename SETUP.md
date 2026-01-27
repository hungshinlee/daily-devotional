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

**方法一：使用本專案提供的工具（推薦）**

#### 步驟 1：安裝依賴套件

在專案目錄下執行：
```bash
npm install
```

**預期結果：**
```
added 77 packages, and audited 78 packages in 4s
found 0 vulnerabilities
```

#### 步驟 2：啟動 Group ID 取得工具

```bash
npm run get-group-id
```

**預期結果：** 會看到以下畫面
```
===========================================
LINE Group ID 取得工具
===========================================

步驟：
1. 確保此腳本正在運行
2. 使用 ngrok 建立公開 URL：ngrok http 3000
3. 將 ngrok URL 設定到 LINE Developers Console 的 Webhook URL
4. 在 LINE 群組中傳送任何訊息
5. Group ID 將顯示在下方

===========================================

本地伺服器運行於: http://localhost:3000
等待 Webhook 事件...

準備就緒！
```

⚠️ **保持此終端機視窗運行，不要關閉！**

#### 步驟 3：啟動 ngrok（開啟新的終端機視窗）

**💡 如何在 MacBook 開啟新的終端機視窗：**
- **方法 A（推薦）：** 按 `⌘ Command + T` 開啟新分頁
- **方法 B：** 按 `⌘ Command + N` 開啟新視窗
- **方法 C：** 點選選單「Shell」→「新增視窗」或「新增分頁」

**3.1 安裝 ngrok（如果尚未安裝）**

使用 Homebrew 安裝（macOS 推薦方式）：
```bash
brew install ngrok
```

> 💡 **提示：** 如果還沒安裝 Homebrew，請先前往 https://brew.sh/ 安裝。

**3.2 啟動 ngrok**
```bash
ngrok http 3000
```

**預期結果：** 會看到類似以下畫面
```
ngrok

Session Status                online
Account                       your-account
Version                       3.x.x
Region                        Japan (jp)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**3.3 複製 HTTPS URL**
- 找到 `Forwarding` 那一行
- 複製 **HTTPS** 的 URL（例如：`https://abc123.ngrok.io`）
  - 💡 **Mac 複製技巧：** 用滑鼠選取文字後，按 `⌘ Command + C` 複製
- ⚠️ 注意：每次啟動 ngrok，URL 都會不同

⚠️ **保持此終端機視窗運行，不要關閉！**

#### 步驟 4：設定 LINE Webhook URL

**4.1 前往 LINE Developers Console**
- 網址：https://developers.line.biz/
- 登入你的帳號
- 選擇你建立的 Bot Channel

**4.2 進入 Messaging API 設定**
- 點選「**Messaging API**」標籤
- 向下捲動找到「**Webhook settings**」區塊

**4.3 設定 Webhook URL**
- 點選 Webhook URL 旁的「**Edit**」按鈕
- 輸入：`https://你的ngrok網址.ngrok.io/webhook`
  - 例如：`https://abc123.ngrok.io/webhook`
  - ⚠️ 注意：網址結尾必須加上 `/webhook`
- 點選「**Update**」

**4.4 啟用 Webhook**
- 找到「**Use webhook**」開關
- 將開關切換為**啟用**（綠色）

**4.5 測試 Webhook（選用）**
- 點選「**Verify**」按鈕測試連線
- 如果成功，會顯示「Success」

#### 步驟 5：在 LINE 群組中傳送訊息

- 打開已加入 Bot 的 LINE 群組
- 傳送任何訊息，例如：`測試` 或 `hello`

#### 步驟 6：查看 Group ID

回到**步驟 2 的終端機視窗**（執行 `npm run get-group-id` 的那個），你會看到：

```
===========================================
收到新事件！
===========================================
事件類型: message
來源類型: group

✅ 找到 Group ID！
-------------------------------------------
Group ID: C1234567890abcdef1234567890abcdef
-------------------------------------------

請將此 Group ID 設定到 GitHub Secrets 中：
LINE_GROUP_ID = C1234567890abcdef1234567890abcdef
===========================================
```

**複製顯示的 Group ID**（C 開頭的長字串），稍後會用到。
- 💡 **Mac 複製技巧：** 用滑鼠選取 Group ID 後，按 `⌘ Command + C` 複製

#### 步驟 7：停止服務

取得 Group ID 後，可以停止服務：
- 在兩個終端機視窗中按 `⌃ Control + C` 停止程式
- 或直接關閉終端機視窗/分頁

**方法二：使用 LINE Bot Designer**
1. 前往 [LINE Bot Designer](https://line-bot-designer.vercel.app/)
2. 輸入你的 Channel Access Token
3. 在群組中傳送訊息
4. 查看 webhook 事件中的 `groupId`

**方法三：使用 webhook.site**
1. 前往 [webhook.site](https://webhook.site/)
2. 複製提供的 Unique URL
3. 在 LINE Developers Console 設定此 URL 為 Webhook URL
4. 在群組中傳送訊息
5. 回到 webhook.site 查看收到的事件中的 `source.groupId`

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
