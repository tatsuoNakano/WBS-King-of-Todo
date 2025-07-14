import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import Layout from "../components/Common/Layout";

const STORAGE_KEY = "clipboard-grid-values";

const ClipboardGrid: React.FC = () => {
    const [values, setValues] = useState<string[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : Array(12).fill("");
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    }, [values]);

    const handleChange = (index: number, newValue: string) => {
        const updated = [...values];
        updated[index] = newValue;
        setValues(updated);
    };

    const handleCopy = (index: number) => {
        navigator.clipboard.writeText(values[index])
            .then(() => console.log(`Copied: ${values[index]}`))
            .catch((err) => console.error("Copy failed", err));
    };

    const handleReset = (index: number) => {
        const updated = [...values];
        updated[index] = "";
        setValues(updated);
    };

    return (
        <Layout>
            <Container className="py-4 text-light">
                <Row>
                    {values.map((val, i) => (
                        <Col key={i} xs={12} md={3} className="mb-4">
                            <Card bg="dark" text="light" className="h-100">
                                <Card.Body>
                                    <Form.Control
                                        as="textarea"
                                        rows={6}
                                        style={{ minHeight: "150px" }}
                                        value={val}
                                        onChange={(e) => handleChange(i, e.target.value)}
                                        className="mb-2 bg-secondary text-light"
                                    />
                                    <div className="d-flex justify-content-between gap-2">
                                        <Button
                                            variant="outline-light"
                                            size="sm"
                                            className="w-50"
                                            onClick={() => handleCopy(i)}
                                        >
                                            <i className="bi bi-clipboard me-1"></i>
                                            コピー
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            className="w-50"
                                            onClick={() => handleReset(i)}
                                        >
                                            <i className="bi bi-x-circle me-1"></i>
                                            リセット
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Layout>
    );
};

export default ClipboardGrid;
