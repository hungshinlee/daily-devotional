# 如何取得 LINE 群組 ID（MacBook 版）

> 💻 本指南專為 **MacBook** 使用者設計，包含 macOS 專用的指令和快捷鍵說明。

## 問題說明

當您使用 SETUP.md 中的舊方法一（broadcast API）時，只會看到 `{}`，這是因為：
- `broadcast` API 只用於發送訊息，不會返回任何 Group ID
- 返回 `{}` 表示訊息發送成功，但無法從中取得 Group ID

## 解決方案

請使用以下任一方法來取得 Group ID：

### 方法 1：使用本專案提供的工具（最簡單，推薦）

#### 1. 安裝依賴

在終端機（Terminal）中，進入專案目錄並執行：
```bash
npm install
```

#### 2. 啟動 Group ID 取得工具

```bash
npm run get-group-id
```

**預期結果：** 會看到「準備就緒！」的訊息，伺服器開始運行。

⚠️ **重要：保持此終端機視窗運行，不要關閉！**

#### 3. 開啟新的終端機視窗

**方法 A：使用快捷鍵（推薦）**
- 按 `⌘ Command + T` 開啟新分頁
- 或按 `⌘ Command + N` 開啟新視窗

**方法 B：使用選單**
- 點選「Shell」→「新增視窗」或「新增分頁」

#### 4. 安裝並啟動 ngrok

**4.1 安裝 ngrok（如果尚未安裝）**

使用 Homebrew 安裝（macOS 推薦方式）：
```bash
brew install ngrok
```

> 💡 **提示：** 如果還沒安裝 Homebrew，請先前往 https://brew.sh/ 安裝。

**4.2 啟動 ngrok**
```bash
ngrok http 3000
```

**4.3 複製 HTTPS URL**
- 在 ngrok 的輸出中找到 `Forwarding` 那一行
- 複製 **HTTPS** 的 URL（例如：`https://abc123.ngrok.io`）
- 💡 **Mac 複製技巧：** 用滑鼠選取文字後，按 `⌘ Command + C` 複製

⚠️ **重要：保持此終端機視窗運行，不要關閉！**

#### 5. 設定 LINE Webhook

- 複製 ngrok 提供的 HTTPS URL（例如：`https://abc123.ngrok.io`）
- 前往 [LINE Developers Console](https://developers.line.biz/)
- 選擇你的 Bot → Messaging API 標籤
- 在 Webhook settings 中設定：`https://abc123.ngrok.io/webhook`
  - ⚠️ **注意：** 網址結尾必須加上 `/webhook`
- 啟用「Use webhook」（開關變成綠色）

#### 6. 在 LINE 群組中傳送訊息

- 在已加入 Bot 的群組中傳送任何訊息（例如：`測試`）
- 回到**第一個終端機視窗**（執行 `npm run get-group-id` 的那個）
- 會顯示 Group ID（格式：`C` 開頭的長字串）

#### 7. 複製 Group ID

- 用滑鼠選取 Group ID
- 按 `⌘ Command + C` 複製
- 將此 ID 儲存起來，稍後設定到 GitHub Secrets

#### 8. 停止服務

取得 Group ID 後，可以停止兩個終端機程式：
- 在兩個終端機視窗中按 `⌃ Control + C` 停止程式
- 或直接關閉終端機視窗

### 方法 2：使用 webhook.site（不需要安裝）

1. 前往 https://webhook.site/
2. 複製頁面上的 Unique URL
3. 在 LINE Developers Console 設定此 URL 為 Webhook URL
4. 在 LINE 群組中傳送訊息
5. 回到 webhook.site 查看收到的 JSON 資料
6. 找到 `source.groupId` 欄位

### 方法 3：使用 LINE Bot Designer

1. 前往 https://line-bot-designer.vercel.app/
2. 輸入你的 Channel Access Token
3. 在群組中傳送訊息
4. 查看 webhook 事件中的 `groupId`

## 下一步

取得 Group ID 後：
1. 前往 GitHub Repository → Settings → Secrets and variables → Actions
2. 新增 Secret：
   - Name: `LINE_GROUP_ID`
   - Value: 你的 Group ID（C 開頭的字串）
3. 測試發送訊息

## 需要協助？

如有問題，請參考 SETUP.md 或在 GitHub Issues 提問。
