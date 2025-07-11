import React, { useRef } from "react";
import Layout from "../components/Common/Layout";
import DirTextInput, { DirTextInputHandle } from "../components/Dir/DirTextInput";
import DirFooter from "../components/Dir/DirFooter";

const DirPage: React.FC = () => {
    const textRef = useRef<DirTextInputHandle>(null);

    // 記号挿入
    const handleInsertSymbol = (symbol: string) => {
        textRef.current?.insertAtCursor(symbol);
    };

    // テンプレート挿入
    const handleTemplateInsert = () => {
        const template = `src/\n├─ components/\n│  ├─ Header.tsx\n│  └─ Footer.tsx\n├─ pages/\n│  └─ index.tsx\n└─ App.tsx\n`;
        textRef.current?.insertAtCursor(template);
    };

    // リセット
    const handleReset = () => {
        textRef.current?.clearText();
    };

    // クリップボードコピー
    const handleCopy = () => {
        const text = textRef.current?.getText() ?? "";
        navigator.clipboard.writeText(text);
    };

    const handleDownload = () => {
        const content = textRef.current?.getText() ?? "";
        const markdown = `\`\`\`ディレクトリ構成\n${content}\n\`\`\``;
        const blob = new Blob([markdown], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "directory.md";
        link.click();
    };


    return (
        <Layout>
            <div className="pt-4 pb-5">
                <DirTextInput ref={textRef} />
            </div>
            <DirFooter
                onInsertSymbol={handleInsertSymbol}
                onTemplateInsert={handleTemplateInsert}
                onReset={handleReset}
                onCopy={handleCopy}
                onDownload={handleDownload}
            />
        </Layout>
    );
};

export default DirPage;
