import React, { useEffect, useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import Layout from "../components/Common/Layout";

const labels = [
    "What（何が？）",
    "Why（なぜ？）",
    "When（いつ？）",
    "Where（どこで？）",
    "Who（誰が？）",
    "How（どのように？）"
];

const STORAGE_KEY = "five-w-one-h";

const FiveWOneH: React.FC = () => {
    const [answers, setAnswers] = useState<string[]>(Array(6).fill(""));

    // 初期読み込み
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setAnswers(JSON.parse(saved));
            } catch {
                console.warn("Invalid saved data for 5W1H");
            }
        }
    }, []);

    // 入力変更時
    const handleChange = (index: number, value: string) => {
        const updated = [...answers];
        updated[index] = value;
        setAnswers(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    // Markdown ダウンロード処理
    const handleDownloadMarkdown = () => {
        const content = labels
            .map((label, i) => `## ${label}\n${answers[i] || "(未入力)"}\n`)
            .join("\n");

        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "five-w-one-h.md";
        a.click();

        URL.revokeObjectURL(url);
    };

    // リセット処理
    const handleReset = () => {
        const cleared = Array(6).fill("");
        setAnswers(cleared);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleared));
    };

    return (
        <Layout>
            <Container className="py-4 text-light">

                {labels.map((label, i) => (
                    <Card key={label} className="bg-dark text-light mb-3 fs-4 border-secondary">
                        <Card.Body>
                            <Form.Label>{label}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={answers[i]}
                                onChange={(e) => handleChange(i, e.target.value)}
                                className="bg-dark text-light"
                            />
                        </Card.Body>
                    </Card>
                ))}

                <div className="text-center mt-4 d-flex justify-content-center gap-3">
                    <Button variant="outline-light" onClick={handleDownloadMarkdown}>
                        Markdownで保存
                    </Button>
                    <Button variant="outline-danger" onClick={handleReset}>
                        リセット
                    </Button>
                </div>
            </Container>
        </Layout>
    );
};

export default FiveWOneH;
