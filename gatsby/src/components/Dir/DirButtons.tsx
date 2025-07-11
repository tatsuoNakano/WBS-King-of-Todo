import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Clipboard, Download, FileEarmarkText, ArrowCounterclockwise } from "react-bootstrap-icons";

interface Props {
    onTemplateInsert: () => void;
    onReset: () => void;
    onCopy: () => void;
    onDownload: () => void;
    onInsertSymbol: (symbol: string) => void;
}

const DirButton: React.FC<Props> = ({ onTemplateInsert, onReset, onCopy, onDownload, onInsertSymbol }) => {
    const symbols = ["├─", "└─", "│  ", "    "];

    return (
        <div className="d-flex flex-wrap gap-2">
            <Button variant="outline-light" onClick={onTemplateInsert}>
                <FileEarmarkText className="me-1" />
                テンプレート
            </Button>
            <ButtonGroup>
                {symbols.map((s, idx) => (
                    <Button
                        key={idx}
                        variant="secondary"
                        onClick={() => onInsertSymbol(s)}
                        className="px-2"
                    >
                        {s}
                    </Button>
                ))}
            </ButtonGroup>

            <Button variant="outline-light" onClick={onReset}>
                <ArrowCounterclockwise className="me-1" />
                リセット
            </Button>
            <Button variant="outline-light" onClick={onCopy}>
                <Clipboard className="me-1" />
                コピー
            </Button>
            <Button variant="outline-light" onClick={onDownload}>
                <Download className="me-1" />
                DL
            </Button>


        </div>
    );
};

export default DirButton;
