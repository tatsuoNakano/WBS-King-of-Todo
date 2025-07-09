// /src/pages/memo.tsx
import React, { useRef } from "react"
import Layout from "../components/Common/Layout"
import MemoTextInput, { MemoTextInputHandle } from "../components/Memo/MemoTextInput"
import MemoFooter from "../components/Memo/MemoFooter"

const MemoPage: React.FC = () => {
    const inputRef = useRef<MemoTextInputHandle>(null)

    const handleInsert = (text: string) => {
        inputRef.current?.insertAtCursor(text)
    }

    const handleDownload = () => {
        const text = inputRef.current?.getText() || ""
        const blob = new Blob([text], { type: "text/markdown;charset=utf-8" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "memo.md"
        a.click()
        URL.revokeObjectURL(url)
    }

    const handleTitleInput = () => {
        handleInsert(`# タイトル\n\n`)
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
                onTitleInput={handleTitleInput}
                onClear={handleClear}
            />
        </Layout>
    )
}

export default MemoPage
