const { app, BrowserWindow } = require('electron')
require('@electron/remote/main').initialize()

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: true, // 必須
            nodeIntegration: false,
        }
    })

    require('@electron/remote/main').enable(win.webContents)

    win.loadURL(/* your URL */)
}
