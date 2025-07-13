import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PlantUMLFooter from "../components/PlantUML/PlantUMLFooter";
import plantumlEncoder from "plantuml-encoder";
import Layout from "../components/Common/Layout";

const PlantUMLPage: React.FC = () => {
    const [text, setText] = useState<string>("<Paste PlantUML here>");

    // 初回ロード時に localStorage から読み込み
    useEffect(() => {
        const saved = localStorage.getItem("plantuml");
        if (saved) setText(saved);
    }, []);

    // テキスト変更時に localStorage へ保存
    useEffect(() => {
        localStorage.setItem("plantuml", text);
    }, [text]);

    // プレビュー用（PNG）のURL
    const previewUrl = text
        ? `https://www.plantuml.com/plantuml/png/${plantumlEncoder.encode(text)}`
        : null;

    // PNGダウンロード：新しいタブで開く
    const handleDownloadPng = () => {
        if (previewUrl) window.open(previewUrl, "_blank");
    };

    // SVGダウンロード：fetch → Blob → a[download]
    const handleDownloadSvg = async () => {
        const svgUrl = `https://www.plantuml.com/plantuml/svg/${plantumlEncoder.encode(text)}`;
        try {
            const response = await fetch(svgUrl);
            if (!response.ok) throw new Error(`SVG取得に失敗: ${response.status}`);

            const svgData = await response.text();
            const blob = new Blob([svgData], { type: "image/svg+xml" });
            const objectUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = "diagram.svg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);
        } catch (err) {
            alert("SVGのダウンロードに失敗しました。ネットワーク状態を確認してください。");
            console.error(err);
        }
    };

    // テキストクリア
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
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
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
                    onDownloadPng={handleDownloadPng}
                    onDownloadSvg={handleDownloadSvg}
                    onClearDiagram={handleClear}
                />
            </div>
        </Layout>
    );
};

export default PlantUMLPage;
