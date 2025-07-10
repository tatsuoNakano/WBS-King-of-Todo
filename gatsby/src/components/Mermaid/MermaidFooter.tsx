// /src/components/Mermaid/MermaidFooter.tsx
import React from "react";
import { Container } from "react-bootstrap";
import FooterButtons from "../Memo/FooterButtons"; // 共通パーツとして使う想定

type Props = {
    onInsertSample: () => void;
    onDownloadSvg: () => void;
    onClearDiagram: () => void;
};

const MermaidFooter: React.FC<Props> = ({
                                            onInsertSample,
                                            onDownloadSvg,
                                            onClearDiagram,
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
                <FooterButtons
                    onInsert={onInsertSample}
                    onDownload={onDownloadSvg}
                    onTitleInput={() => {}} // Mermaidには不要なら空関数
                    onClear={onClearDiagram}
                />
            </Container>
        </div>
    );
};

export default MermaidFooter;
