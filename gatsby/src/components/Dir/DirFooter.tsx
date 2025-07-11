// /src/components/Dir/DirFooter.tsx
import React from "react";
import { Container } from "react-bootstrap";
import DirButton from "./DirButtons";

type Props = {
    onTemplateInsert: () => void;
    onReset: () => void;
    onCopy: () => void;
    onDownload: () => void;
    onInsertSymbol: (symbol: string) => void;
};

const DirFooter: React.FC<Props> = ({
                                        onTemplateInsert,
                                        onReset,
                                        onCopy,
                                        onDownload,
                                        onInsertSymbol,
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
                <DirButton
                    onTemplateInsert={onTemplateInsert}
                    onReset={onReset}
                    onCopy={onCopy}
                    onDownload={onDownload}
                    onInsertSymbol={onInsertSymbol}
                />
            </Container>
        </div>
    );
};

export default DirFooter;
