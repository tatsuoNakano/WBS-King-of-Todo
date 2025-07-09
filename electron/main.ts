const { app, BrowserWindow } = require("electron")
const path = require("path")

const isDev = !app.isPackaged

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            contextIsolation: true,
        },
    })

    if (isDev) {
        win.loadURL("http://localhost:8001")
    } else {
        win.loadFile(path.join(__dirname, "../dist/index.html"))
    }
}

app.whenReady().then(createWindow)
