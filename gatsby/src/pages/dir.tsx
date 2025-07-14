import React, { useRef } from "react";
import Layout from "../components/Common/Layout";
import DirTextInput, { DirTextInputHandle } from "../components/Dir/DirTextInput";
import DirFooter from "../components/Dir/DirFooter";
import JSZip from "jszip";

const DirPage: React.FC = () => {
    const textRef = useRef<DirTextInputHandle>(null);

    const handleInsertSymbol = (symbol: string) => {
        textRef.current?.insertAtCursor(symbol);
    };

    const handleTemplateInsert = () => {
        const template = `src/\n├─ components/\n│  ├─ Header.tsx\n│  └─ Footer.tsx\n├─ pages/\n│  └─ index.tsx\n└─ App.tsx\n`;
        textRef.current?.insertAtCursor(template);
    };

    const handleReset = () => {
        textRef.current?.clearText();
    };

    const handleCopy = () => {
        const text = textRef.current?.getText() ?? "";
        navigator.clipboard.writeText(text);
    };

    const handleDownloadMarkdown = () => {
        const content = textRef.current?.getText() ?? "";
        const markdown = `\`\`\`ディレクトリ構成\n${content}\n\`\`\``;
        const blob = new Blob([markdown], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "directory.md";
        link.click();
    };

    const handleZipDownload = async () => {
        const content = textRef.current?.getText() ?? "";
        const lines = content.split("\n");
        const zip = new JSZip();

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;
            const path = line.replace(/[├└│─]+/g, "").trim();
            if (line.endsWith("/")) {
                zip.folder(path);
            } else {
                zip.file(path, "");
            }
        }

        const blob = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "directory.zip";
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
                onDownload={handleDownloadMarkdown}
                onZipDownload={handleZipDownload}
            />
        </Layout>
    );
};

export default DirPage;
