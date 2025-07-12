import React from "react";
import { Button, Container } from "react-bootstrap";

type Props = {
    onInsert: (text: string) => void;
    onDownload: () => void;
    onEditExtension: () => void;
    onReset: () => void;
    onExtractValues: () => void;
    onCheckStructure: () => void; // ✅ 追加
};

const I18nFooter: React.FC<Props> = ({
                                         onInsert,
                                         onDownload,
                                         onEditExtension,
                                         onReset,
                                         onExtractValues,
                                         onCheckStructure, // ✅ 追加
                                     }) => {
    return (
        <div
            className="w-100 bg-dark text-light d-flex align-items-center"
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                height: "100px",
                zIndex: 1040,
                boxShadow: "0 -2px 4px rgba(0,0,0,0.4)",
                padding: "1rem 2rem",
            }}
        >
            <Container className="d-flex justify-content-center align-items-center flex-wrap gap-2">
                <Button variant="outline-light" onClick={() => onInsert("structure")}>
                    構造をコピー
                </Button>
                <Button variant="outline-light" onClick={onCheckStructure}>
                    構造を比較
                </Button>
                <Button variant="outline-light" onClick={onExtractValues}>
                    値を抽出
                </Button>
                <Button variant="outline-light" onClick={onDownload}>
                    JSONをダウンロード
                </Button>
                <Button variant="outline-light" onClick={onEditExtension}>
                    拡張子を編集
                </Button>
                <Button variant="outline-danger" onClick={onReset}>
                    リセット
                </Button>
            </Container>
        </div>
    );
};

export default I18nFooter;
