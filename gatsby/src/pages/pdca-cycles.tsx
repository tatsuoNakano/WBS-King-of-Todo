import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Layout from "../components/Common/Layout";

const cycleGrids = [
    {
        key: "pdca",
        title: "PDCA (計画・実行・確認・改善)",
        steps: [["Plan", "Do"], ["Check", "Act"]]
    },
    {
        key: "ooda",
        title: "OODA (観察・状況判断・意思決定・行動)",
        steps: [["Observe", "Orient"], ["Decide", "Act"]]
    },
    {
        key: "stpd",
        title: "STPD (見る・考える・計画・実行)",
        steps: [["See", "Think"], ["Plan", "Do"]]
    },
    {
        key: "dcap",
        title: "DCAP (設計・作成・評価・普及)",
        steps: [["Design", "Create"], ["Assess", "Promote"]]
    }
];

const STORAGE_KEY = "cycle-grid-data";

const PdcaCycles: React.FC = () => {
    const [data, setData] = useState<Record<string, Record<string, string>>>({});

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setData(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const handleChange = (cycleKey: string, step: string, value: string) => {
        setData(prev => ({
            ...prev,
            [cycleKey]: {
                ...prev[cycleKey],
                [step]: value
            }
        }));
    };

    const handleReset = () => {
        setData({});
        localStorage.removeItem(STORAGE_KEY);
    };

    const handleDownloadMarkdown = () => {
        let md = "";
        for (const cycle of cycleGrids) {
            md += `## ${cycle.title}\n\n`;
            for (const row of cycle.steps) {
                for (const step of row) {
                    const content = data[cycle.key]?.[step] || "";
                    md += `### ${step}\n\n${content}\n\n`;
                }
            }
        }
        const blob = new Blob([md], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "cycles.md";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Layout>
            <Container className="py-4 text-light">

                <div className="d-flex gap-2 mb-4">
                    <Button variant="outline-light" onClick={handleDownloadMarkdown}>MarkdownでDL</Button>
                    <Button variant="outline-danger" onClick={handleReset}>リセット</Button>
                </div>

                {cycleGrids.map(({ title, steps, key }, index) => (
                    <div key={index} className="mb-5">
                        <h4 className="mb-3">{title}</h4>
                        {steps.map((row, rowIndex) => (
                            <Row key={rowIndex} className="mb-2">
                                {row.map((label, colIndex) => (
                                    <Col key={colIndex} xs={6}>
                                        <Card bg="dark" text="light">
                                            <Card.Body>
                                                <Card.Title>{label}</Card.Title>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={6}
                                                    value={data[key]?.[label] || ""}
                                                    onChange={(e) => handleChange(key, label, e.target.value)}
                                                    className="bg-secondary text-light"
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ))}
                    </div>
                ))}
            </Container>
        </Layout>
    );
};

export default PdcaCycles;
