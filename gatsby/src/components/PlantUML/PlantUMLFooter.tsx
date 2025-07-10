import React from "react";
import { Container, Button } from "react-bootstrap";

type Props = {
    text: string;
    setText: (newText: string) => void;
    onDownloadPng: () => void;
    onClearDiagram: () => void;
};

const PlantUMLFooter: React.FC<Props> = ({ text, setText, onDownloadPng, onClearDiagram }) => {
    // スニペット挿入ヘルパー
    const insertSnippet = (snippet: string) => {
        const prefix = text.trim() ? text + "\n" : "";
        setText(prefix + snippet);
    };

    // .pu ファイルダウンロード
    const downloadPu = () => {
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "diagram.pu";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // よく使う PlantUML スニペット例
    const seqSnippet = `@startuml
Alice -> Bob: Hello Bob!
Bob --> Alice: Hi Alice!
@enduml`;
    const classSnippet = `@startuml
class User {
  +String name
  +login()
}
@enduml`;
    const packageSnippet = `@startuml
package "Auth" {
  class User
}
@enduml`;
    const noteSnippet = `note right of Alice: This is a note`;

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
                <Button variant="outline-light" size="sm" onClick={() => insertSnippet(seqSnippet)}>
                    Sequence
                </Button>
                <Button variant="outline-light" size="sm" onClick={() => insertSnippet(classSnippet)}>
                    Class
                </Button>
                <Button variant="outline-light" size="sm" onClick={() => insertSnippet(packageSnippet)}>
                    Package
                </Button>
                <Button variant="outline-light" size="sm" onClick={() => insertSnippet(noteSnippet)}>
                    Note
                </Button>
                <Button variant="outline-light" size="sm" onClick={downloadPu}>
                    Download .pu
                </Button>
                <Button variant="outline-light" size="sm" onClick={onDownloadPng}>
                    Download PNG
                </Button>
                <Button variant="outline-light" size="sm" onClick={onClearDiagram}>
                    Clear
                </Button>
            </Container>
        </div>
    );
};

export default PlantUMLFooter;