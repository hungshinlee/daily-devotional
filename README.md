# 每日靈修 LINE Bot

自動發送每日靈修內容到 LINE 群組的機器人，使用 GitHub Actions 定時執行。

## 功能特色

- ✅ 每天早上 8:00（台灣時間）自動發送
- ✅ 支援 Markdown frontmatter 格式
- ✅ 自動連結到 GitHub Pages 完整文章
- ✅ 完全免費（使用 GitHub Actions）

## 專案結構

```
daily-devotional/
├── .github/
│   └── workflows/
│       └── daily-post.yml          # GitHub Actions 定時任務
├── scripts/
│   └── post-to-line.js             # LINE 訊息發送腳本
├── devotionals/
│   ├── 2026-01-26.md               # 每日靈修文章
│   ├── 2026-01-27.md
│   └── ...
├── package.json
└── README.md
```

## 設定步驟

### 1. LINE Bot 設定

1. 前往 [LINE Developers Console](https://developers.line.biz/)
2. 建立新的 Provider 和 Messaging API Channel
3. 取得 **Channel Access Token**
4. 將 LINE Bot 加入你的群組
5. 取得 **Group ID**（可使用 [LINE Bot Designer](https://line-bot-designer.vercel.app/) 工具）

### 2. GitHub Secrets 設定

在 GitHub Repository 的 Settings → Secrets and variables → Actions 中新增：

- `LINE_CHANNEL_ACCESS_TOKEN`：你的 LINE Channel Access Token
- `LINE_GROUP_ID`：你的 LINE 群組 ID
- `GITHUB_PAGES_URL`：（選填）你的 GitHub Pages 網址，預設為 `https://hungshinlee.github.io/daily-devotional`

### 3. GitHub Pages 設定

1. 在 Repository Settings → Pages
2. Source 選擇 `Deploy from a branch`
3. Branch 選擇 `main` 和 `/devotionals` 資料夾
4. 儲存後等待部署完成

## 文章格式

### 使用 Frontmatter（推薦）

```markdown
---
title: 主的恩典夠用
verse: 哥林多後書 12:9
date: 2026-01-26
theme: 恩典與軟弱
---

## 經文內容

「他對我說：『我的恩典夠你用的，因為我的能力是在人的軟弱上顯得完全。』」

## 靈修分享

（你的靈修內容...）
```

### 簡單格式

```markdown
# 主的恩典夠用

經文：哥林多後書 12:9

## 經文內容

「他對我說：『我的恩典夠你用的，因為我的能力是在人的軟弱上顯得完全。』」

## 靈修分享

（你的靈修內容...）
```

## 使用方式

### 新增每日靈修

1. 在 `devotionals/` 資料夾建立新的 Markdown 檔案
2. 檔名格式：`YYYY-MM-DD.md`（例如：`2026-01-26.md`）
3. 提交並推送到 GitHub

### 手動測試

在 GitHub Actions 頁面：

1. 點選 "Daily Devotional Post" workflow
2. 點選 "Run workflow" 按鈕
3. 選擇 branch 並執行

### 本地測試

```bash
# 安裝依賴
npm install

# 設定環境變數（測試用）
export LINE_CHANNEL_ACCESS_TOKEN="your_token"
export LINE_GROUP_ID="your_group_id"
export GITHUB_PAGES_URL="https://hungshinlee.github.io/daily-devotional"

# 執行腳本
npm test
```

## 排程說明

- **執行時間**：每天 UTC 00:00（台灣時間早上 08:00）
- **時區轉換**：GitHub Actions 使用 UTC 時間，台灣時間需 +8 小時
- **調整時間**：修改 `.github/workflows/daily-post.yml` 中的 cron 表達式

### Cron 時間對照表

| 台灣時間 | UTC 時間 | Cron 表達式 |
|---------|---------|-----------|
| 07:00   | 23:00 (前一天) | `0 23 * * *` |
| 08:00   | 00:00   | `0 0 * * *` |
| 09:00   | 01:00   | `0 1 * * *` |

## 常見問題

### Q: 訊息沒有發送？

1. 檢查 GitHub Actions 執行記錄
2. 確認 Secrets 設定正確
3. 確認當天的檔案存在且格式正確
4. 檢查 LINE Bot 是否在群組中

### Q: 如何更改發送時間？

修改 `.github/workflows/daily-post.yml` 中的 cron 時間。

### Q: 可以發送到多個群組嗎？

可以，修改 `scripts/post-to-line.js`，將 `GROUP_ID` 改為陣列並迴圈發送。

## 授權

MIT License

## 聯絡方式

如有問題或建議，歡迎開 Issue 或 Pull Request！
