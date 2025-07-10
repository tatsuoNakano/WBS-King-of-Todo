const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')
const path = require('path')
const { dialog } = require('@electron/remote') // ← @electron/remote を使う場合

contextBridge.exposeInMainWorld('fileAPI', {
    saveMarkdown: async (content) => {
        try {
            const { filePath, canceled } = await dialog.showSaveDialog({
                title: 'Markdown を保存',
                defaultPath: 'todo.md',
                filters: [{ name: 'Markdown', extensions: ['md'] }],
            })

            if (canceled || !filePath) {
                return null
            }

            fs.writeFileSync(filePath, content, 'utf8')
            return filePath
        } catch (e) {
            console.error('ファイル保存エラー:', e)
            throw e
        }
    }
})
