import React, { useEffect, useRef, useState } from "react"
import Layout from "../components/Common/Layout"
import MemoTextInput, { MemoTextInputHandle } from "../components/Memo/MemoTextInput"
import MemoFooter from "../components/Memo/MemoFooter"

const LOCAL_STORAGE_KEY = "memoText"

const MemoPage: React.FC = () => {
    const inputRef = useRef<MemoTextInputHandle>(null)
    const [title, setTitle] = useState("memo")
    const [initialText, setInitialText] = useState("")

    // 初期化：localStorageから取得（1度だけ）
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (saved) {
            setInitialText(saved)
        }
    }, [])

    // 自動保存処理（変更時に常に保存）
    const handleAutoSave = (newText?: string) => {
        const text = newText ?? inputRef.current?.getText() ?? ""
        localStorage.setItem(LOCAL_STORAGE_KEY, text)
    }

    const handleInsert = (text: string) => {
        inputRef.current?.insertAtCursor(text)
        // insertAtCursor は非同期で setText → 保存は一歩遅らせる
        setTimeout(() => handleAutoSave(), 0)
    }

    const handleDownload = () => {
        const text = inputRef.current?.getText() || ""
        const blob = new Blob([text], { type: "text/markdown;charset=utf-8" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${title || "memo"}.md`
        a.click()
        URL.revokeObjectURL(url)
    }

    const handleClear = () => {
        inputRef.current?.clearText()
        localStorage.removeItem(LOCAL_STORAGE_KEY)
    }

    return (
        <Layout>
            <div className="container mt-4 mb-5">
                <MemoTextInput
                    ref={inputRef}
                    defaultValue={initialText}
                    onChange={(text) => handleAutoSave(text)}
                />
            </div>
            <MemoFooter
                onInsert={handleInsert}
                onDownload={handleDownload}
                onClear={handleClear}
            />
        </Layout>
    )
}

export default MemoPage
