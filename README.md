# 每日靈修 LINE Bot (Daily Devotional)

這是一個自動化的 LINE Bot，專為每天早上發送靈修內容而設計。它使用 GitHub Actions 定時觸發，完全免費且無需維護伺服器。

> 🌍 **全平台支援**：本專案文件適用於 macOS 與 Windows 環境。

## ✨ 功能特色

- ⏰ **自動排程**：每天早上 09:00 (臺北時間) 自動發送。
- 📝 **Markdown 支援**：支援 Frontmatter 格式，寫作就像寫部落格一樣簡單。
- 🔗 **自動連結**：訊息內自動附帶 GitHub Pages 好讀版連結。
- 🆓 **完全免費**：利用 GitHub Actions 與 LINE Messaging API 免費額度。

## 🚀 快速開始

### 1. 環境準備

請根據你的作業系統選擇安裝方式：

#### 🍎 macOS 使用者
打開終端機 (Terminal) 並使用 Homebrew 安裝：

```bash
# 1. 安裝 Homebrew (如果還沒安裝)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. 安裝 Node.js (本專案核心環境)
brew install node
```

#### 🪟 Windows 使用者
1. **安裝 Node.js**：前往 [Node.js 官網](https://nodejs.org/) 下載並安裝 **LTS** 版本。
2. **安裝 Git** (推薦)：前往 [Git for Windows](https://git-scm.com/download/win) 下載並安裝，這會提供好用的 Git Bash 終端機。
3. **驗證安裝**：打開 PowerShell 或命令提示字元 (cmd)，輸入 `node -v` 確認有顯示版本號 (例如 `v18.x.x`)。

### 2. 下載並安裝依賴

```bash
# 進入專案資料夾 (請依實際路徑調整)
cd daily-devotional

# 安裝專案依賴
npm install
```

### 3. 設定 LINE Bot

這是最關鍵的一步，你需要申請 LINE Bot 並取得權限。

👉 **請閱讀詳細指南：[LINE Bot 設定步驟指南 (SETUP.md)](SETUP.md)**

如果卡在「取得群組 ID」這一步，請參考：
👉 **請參考：[SETUP.md 中的「取得 Group ID」章節](SETUP.md#3-取得-group-id)**

## 🛠 本地開發與測試

### 模擬發送 (不包含 LINE)

你可以直接執行腳本來測試程式邏輯是否正常（不會真的發送到 LINE，除非你設定了環境變數）：

```bash
npm test
```


## 📂 專案結構

```
daily-devotional/
├── .github/
│   └── workflows/daily-post.yml  # 設定每天幾點發送 (Cron Job)
├── devotionals/                  # 這裡是放靈修文章的地方
│   ├── 2026-01-26.md
│   └── ...
├── scripts/
│   └── post-to-line.js           # 發送訊息的主程式
├── SETUP.md                      # 詳細設定指南 (含如何取得 Group ID)
└── package.json
```

## 📝 如何新增靈修文章

1. 在 `devotionals/` 資料夾中，確認是否有**當月月份**的資料夾（格式 `YYYY-MM`，如 `2026-01`）。如果沒有，請先建立。
2. 在該月份資料夾內建立新的 `.md` 檔案，檔名必須是日期格式：`YYYY-MM-DD.md` (例如 `2026-01-27.md`)。
   - 📌 **正確路徑範例**：`devotionals/2026-01/2026-01-27.md`
3. 內容範例：

```markdown
---
title: 主的恩典夠用
verse: 哥林多後書 12:9
date: 2026-01-27
theme: 恩典與軟弱
---

## 經文內容
「他對我說：『我的恩典夠你用的...』」

## 靈修分享
這裡是你的分享內容...
```

4. **Commit & Push** 到 GitHub，機器人會在當天自動讀取並發送。

## ❓ 常見問題

**Q: 為什麼顯示 `Command not found: npm`？**
A: 請確認你有安裝 Node.js。
- **macOS**: 執行 `brew install node`
- **Windows**: 前往 [Node.js 官網](https://nodejs.org/) 下載並安裝 LTS 版本。安裝後請重啟終端機。

**Q: 訊息沒有發送？**
A: 請檢查 GitHub Repository 的 **Actions** 分頁，看看執行的 Log 有什麼錯誤。通常是 Token 過期或 Group ID 設定錯誤。

**Q: 時間不對？**
A: GitHub Actions 使用 UTC 時間。台灣是 UTC+8。
- 台灣 08:00 = UTC 00:00
- 設定檔在 `.github/workflows/daily-post.yml`

## 📄 授權

MIT License
