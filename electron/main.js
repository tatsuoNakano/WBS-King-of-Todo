const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const fs = require('fs');

const PORT = 3001; // ← ポートを一元管理（3000が使われていたら3001以上が無難）

function createWindow() {
    const servePath = path.join(__dirname, '../dist');
    if (!fs.existsSync(servePath)) {
        console.error('❌ dist フォルダが存在しません:', servePath);
        return;
    }

    const serverApp = express();

    // 静的ファイルを提供（例: app-xxxxx.js など）
    serverApp.use(express.static(servePath));

    // すべてのルートに対して index.html を返す（GatsbyのSPA対応）
    serverApp.get(/.*/, (_, res) => {
        res.sendFile(path.join(servePath, 'index.html'));
    });

    // サーバー起動
    const server = serverApp.listen(PORT, () => {
        console.log(`✅ ローカルサーバー起動: http://localhost:${PORT}`);

        const win = new BrowserWindow({
            width: 1000,
            height: 800,
            webPreferences: {
                zoomFactor: 1.25,
                contextIsolation: false,
                enableRemoteModule: false,
                preload: path.join(__dirname, 'preload.js'),
            },
        });

        win.loadURL(`http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
        console.error('❌ サーバーエラー:', err);
    });
}

// アプリ初期化
app.whenReady().then(createWindow);

// Mac以外はウィンドウすべて閉じたら終了
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
