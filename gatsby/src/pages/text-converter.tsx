import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../components/Common/Layout";

const STORAGE_KEY = "textConverterInput";

const convert = (input: string, mode: string): string => {
    const lines = input.split("\n").map(l => l.trim()).filter(l => l !== "");
    switch (mode) {
        case "li":
            return lines.map(l => `  <li>${l}</li>`).join("\n");
        case "markdown":
            return lines.map(l => `- ${l}`).join("\n");
        case "map":
            return `{
  ${lines.map(l => `"${l}": ""`).join(",\n  ")}
}`;
        case "comma":
            return lines.join(", ");
        case "json":
            return JSON.stringify(lines, null, 2);
        case "sql-in":
            return `(
  ${lines.map(l => `'${l}'`).join(",\n  ")}
)`;
        case "regex-or":
            return lines.join("|"); // ✅ 1行出力に修正
        default:
            return input;
    }
};

const TextConverter: React.FC = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState("li");
    const [autoConvert, setAutoConvert] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setInput(saved);
    }, []);

    useEffect(() => {
        if (autoConvert) setOutput(convert(input, mode));
    }, [input, mode, autoConvert]);

    const handleConvert = () => {
        setOutput(convert(input, mode));
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(output);
        alert("コピーしました");
    };

    const handleDownload = () => {
        const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        setInput("");
        setOutput("");
        localStorage.removeItem(STORAGE_KEY);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        localStorage.setItem(STORAGE_KEY, value);
    };

    return (
        <Layout>
            <Container className="bg-dark text-light py-4" fluid>
                <Row>
                    <Col md={6}>
                        <Form.Label>入力欄</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            value={input}
                            onChange={handleInputChange}
                            placeholder="1行ごとに変換したいテキストを入力"
                            className="bg-secondary text-light"
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label>出力欄</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            value={output}
                            readOnly
                            className="bg-secondary text-light"
                        />
                    </Col>
                </Row>

                <Row className="mt-3 align-items-center">
                    <Col md={3}>
                        <Form.Select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="bg-dark text-light"
                        >
                            <option value="li">&lt;li&gt;タグ形式</option>
                            <option value="markdown">Markdownリスト</option>
                            <option value="map">Map形式</option>
                            <option value="comma">カンマ区切り</option>
                            <option value="json">JSON配列</option>
                            <option value="sql-in">SQL IN句</option>
                            <option value="regex-or">正規表現 (OR)</option>
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Form.Check
                            type="switch"
                            id="auto-convert"
                            label="自動変換"
                            checked={autoConvert}
                            onChange={(e) => setAutoConvert(e.target.checked)}
                        />
                    </Col>
                    <Col md={6} className="text-end">
                        <Button variant="outline-light" className="me-2" onClick={handleCopy}>
                            コピー
                        </Button>
                        <Button variant="outline-light" className="me-2" onClick={handleDownload}>
                            DL
                        </Button>
                        <Button variant="outline-danger" onClick={handleReset}>
                            リセット
                        </Button>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <p className="text-muted small">
                            改行されたテキストを指定形式に変換します。形式を選んで、コピーまたは保存できます。
                        </p>
                    </Col>
                </Row>
            </Container>
            <p>　改行されたテキストを指定形式に変換します。形式を選んで、コピーまたは保存できます。</p>
        </Layout>
    );
};

export default TextConverter;
