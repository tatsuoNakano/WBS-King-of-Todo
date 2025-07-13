import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PlantUMLFooter from "../components/PlantUML/PlantUMLFooter";
import plantumlEncoder from "plantuml-encoder";
import Layout from "../components/Common/Layout";

const PlantUMLPage: React.FC = () => {
    const [text, setText] = useState<string>("<Paste PlantUML here>");

    // localStorage からロード
    useEffect(() => {
        const saved = localStorage.getItem("plantuml");
        if (saved) setText(saved);
    }, []);

    // localStorage に保存
    useEffect(() => {
        localStorage.setItem("plantuml", text);
    }, [text]);

    // プレビュー URL
    const diagramUrl = text
        ? `https://www.plantuml.com/plantuml/png/${plantumlEncoder.encode(text)}`
        : null;

    // PNG ダウンロード
    const handleDownload = () => {
        if (diagramUrl) window.open(diagramUrl, "_blank");
    };

    const handleDownloadSvg = () => {
        const svgUrl = `https://www.plantuml.com/plantuml/svg/${plantumlEncoder.encode(text)}`;
        const link = document.createElement("a");
        link.href = svgUrl;
        link.download = "diagram.svg";
        link.click();
    };

    // クリア
    const handleClear = () => setText("");

    return (
        <Layout>
        <div className="vh-100 bg-dark text-light d-flex flex-column">
            <Container
                fluid
                className="flex-grow-1 p-0"
                style={{ height: "calc(100vh - 100px)", overflow: "hidden" }}
            >
                <Row className="g-0" style={{ height: "100%" }}>
                    <Col md={6} className="pe-2" style={{ height: "100%" }}>
            <textarea
                className="form-control bg-dark text-light border-secondary"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="ここにPlantUML記法を入力"
                style={{ width: "100%", height: "100%", resize: "none" }}
            />
                    </Col>

                    <Col
                        md={6}
                        className="ps-2 bg-dark d-flex justify-content-center align-items-center"
                        style={{ height: "100%", overflow: "auto" }}
                    >
                        {diagramUrl ? (
                            <img
                                src={diagramUrl}
                                alt="PlantUML Diagram"
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                            />
                        ) : (
                            <div className="text-muted">PlantUMLプレビューがここに表示されます</div>
                        )}
                    </Col>
                </Row>
            </Container>

            <PlantUMLFooter
                text={text}
                setText={setText}
                onDownloadPng={handleDownload}
                onDownloadSvg={handleDownloadSvg}  // ← これを追加
                onClearDiagram={handleClear}
            />

        </div>
        </Layout>
    );
};

export default PlantUMLPage;
