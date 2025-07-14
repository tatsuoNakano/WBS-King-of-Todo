import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Common/Layout";
import MemoTextInput, { MemoTextInputHandle } from "../components/Memo/MemoTextInput";
import MemoFooter from "../components/Memo/MemoFooter";
import { Nav } from "react-bootstrap";

const getStorageKey = (index: number) => `memoText_${index}`;

const MemoPage: React.FC = () => {
    const inputRef = useRef<MemoTextInputHandle>(null);
    const [currentTab, setCurrentTab] = useState(1);
    const [initialText, setInitialText] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem(getStorageKey(currentTab));
        setInitialText(saved ?? "");
    }, [currentTab]);

    const handleAutoSave = (newText?: string) => {
        const text = newText ?? inputRef.current?.getText() ?? "";
        localStorage.setItem(getStorageKey(currentTab), text);
    };

    const handleInsert = (text: string) => {
        inputRef.current?.insertAtCursor(text);
        setTimeout(() => handleAutoSave(), 0);
    };

    const handleDownload = () => {
        const text = inputRef.current?.getText() || "";
        const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `memo_${currentTab}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        inputRef.current?.clearText();
        localStorage.removeItem(getStorageKey(currentTab));
    };

    const handleTabSelect = (tabIndex: number) => {
        handleAutoSave();
        setCurrentTab(tabIndex);
    };

    return (
        <Layout>
            <div className="container mt-4 mb-3">
                <Nav variant="tabs" activeKey={currentTab} onSelect={(key) => handleTabSelect(Number(key))}>
                    <Nav.Item><Nav.Link eventKey={1}>メモ1</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey={2}>メモ2</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey={3}>メモ3</Nav.Link></Nav.Item>
                </Nav>
            </div>

            <div className="container mb-3">
                <MemoTextInput
                    key={currentTab}
                    ref={inputRef}
                    defaultValue={initialText}
                    onChange={(text) => handleAutoSave(text)}
                />
            </div>

            <div className="d-flex justify-content-center mb-5">
                <div style={{ width: "100%", maxWidth: "800px" }}>
                    <MemoFooter
                        onInsert={handleInsert}
                        onDownload={handleDownload}
                        onClear={handleClear}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default MemoPage;
