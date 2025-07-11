// /src/pages/memo.tsx
import React, { useRef, useState } from "react"
import Layout from "../components/Common/Layout"
import MemoTextInput, { MemoTextInputHandle } from "../components/Memo/MemoTextInput"
import MemoFooter from "../components/Memo/MemoFooter"

const MemoPage: React.FC = () => {
    const inputRef = useRef<MemoTextInputHandle>(null)
    const [title, setTitle] = useState("memo") // 初期タイトル

    const handleInsert = (text: string) => {
        inputRef.current?.insertAtCursor(text)
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
    }

    return (
        <Layout>
            <div className="container mt-4 mb-5">
                <MemoTextInput ref={inputRef} />
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
