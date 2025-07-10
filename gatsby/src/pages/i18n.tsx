import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import I18nFooter from "../components/I18nJson/I18nFooter";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import Layout from "../components/Common/Layout";

const LOCAL_STORAGE_LEFT_KEY = "i18nEditor_left";
const LOCAL_STORAGE_RIGHT_KEY = "i18nEditor_right";

const I18nEditor: React.FC = () => {
    const [leftValue, setLeftValue] = useState<string>('');
    const [rightValue, setRightValue] = useState<string>('');
    const [leftError, setLeftError] = useState<string>('');
    const [rightError, setRightError] = useState<string>('');
    const [fileExtension, setFileExtension] = useState<string>("en");

    useEffect(() => {
        const storedLeft = localStorage.getItem(LOCAL_STORAGE_LEFT_KEY);
        const storedRight = localStorage.getItem(LOCAL_STORAGE_RIGHT_KEY);
        if (storedLeft) setLeftValue(storedLeft);
        if (storedRight) setRightValue(storedRight);
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_LEFT_KEY, leftValue);
    }, [leftValue]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_RIGHT_KEY, rightValue);
    }, [rightValue]);

    const validateJson = (value: string, setError: (e: string) => void) => {
        try {
            JSON.parse(value);
            setError('');
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleInsertStructure = () => {
        try {
            const source = JSON.parse(leftValue);
            const result: Record<string, string> = {};
            Object.keys(source).forEach((key) => {
                result[key] = "";
            });
            const formatted = JSON.stringify(result, null, 2);
            setRightValue(formatted);
            validateJson(formatted, setRightError);
        } catch {
            alert("左側のJSONが不正です");
        }
    };

    const handleDownload = () => {
        try {
            const validated = JSON.parse(rightValue);
            const content = JSON.stringify(validated, null, 2);
            const suffix = fileExtension.replace(/^\./, "");
            const filename = `${suffix}.json`;
            const blob = new Blob([content], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
        } catch {
            alert("右側のJSONが不正です");
        }
    };

    const handleEditExtension = () => {
        const newExt = prompt("ファイルの拡張語を入力してください（例: en, fr, ja）", fileExtension);
        if (newExt !== null && newExt.trim()) {
            setFileExtension(newExt.trim());
        }
    };

    const handleReset = () => {
        if (confirm("翻訳JSONをすべて消去し、ローカルストレージも初期化しますか？")) {
            setRightValue("");
            localStorage.removeItem(LOCAL_STORAGE_RIGHT_KEY);
        }
    };

    return (
        <Layout>
            <Container fluid className="p-4 bg-dark text-light" style={{ minHeight: '100vh' }}>
                <Row className="mb-3">
                    <Col>
                        <h4 className="text-info">
                            翻訳ファイル名：{fileExtension}.json
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h5>原文 JSON（例: ja.json）</h5>
                        {leftError && (
                            <Alert variant="danger" className="mb-2">構文エラー: {leftError}</Alert>
                        )}
                        <AceEditor
                            mode="json"
                            theme="tomorrow_night"
                            value={leftValue}
                            onChange={(value) => {
                                setLeftValue(value);
                                validateJson(value, setLeftError);
                            }}
                            name="leftEditor"
                            editorProps={{ $blockScrolling: true }}
                            width="100%"
                            height="500px"
                            fontSize={14}
                            setOptions={{
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <h5>翻訳 JSON（例: en.json）</h5>
                        {rightError && (
                            <Alert variant="danger" className="mb-2">構文エラー: {rightError}</Alert>
                        )}
                        <AceEditor
                            mode="json"
                            theme="tomorrow_night"
                            value={rightValue}
                            onChange={(value) => {
                                setRightValue(value);
                                validateJson(value, setRightError);
                            }}
                            name="rightEditor"
                            editorProps={{ $blockScrolling: true }}
                            width="100%"
                            height="500px"
                            fontSize={14}
                            setOptions={{
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                        />
                    </Col>
                </Row>
            </Container>

            <I18nFooter
                onInsert={handleInsertStructure}
                onDownload={handleDownload}
                onEditExtension={handleEditExtension}
                onReset={handleReset}
            />
        </Layout>
    );
};

export default I18nEditor;
