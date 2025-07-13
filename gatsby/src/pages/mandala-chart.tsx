import React, { useState, useEffect } from "react";
import { Container, Card, Form } from "react-bootstrap";
import Layout from "../components/Common/Layout";
import MandalaChartFooter from "../components/MandalaChart/mandala-chart-footer";

const MandalaChart: React.FC = () => {
    const GRID_SIZE = 9;
    const LOCAL_STORAGE_KEY = "mandala-chart";

    const [cells, setCells] = useState<string[]>(
        Array.from({ length: GRID_SIZE * GRID_SIZE }, () => "")
    );

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                setCells(JSON.parse(saved));
            } catch {
                console.warn("Invalid saved data for mandala chart");
            }
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        const updated = [...cells];
        updated[index] = value;
        setCells(updated);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    };

    const handleDownload = () => {
        const data = JSON.stringify({ cells }, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "mandala-chart.json";
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                if (Array.isArray(json.cells) && json.cells.length === 81) {
                    setCells(json.cells);
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.cells));
                } else {
                    alert("不正なJSON形式です。");
                }
            } catch {
                alert("JSONの読み込みに失敗しました。");
            }
        };
        reader.readAsText(file);
    };

    const handleClear = () => {
        const cleared = Array.from({ length: GRID_SIZE * GRID_SIZE }, () => "");
        setCells(cleared);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleared));
    };

    const centerIndices = [10, 13, 16, 37, 40, 43, 64, 67, 70];
    const colorClasses = [
        "border-primary",
        "border-success",
        "border-warning",
        "border-info",
        "border-danger",
        "border-secondary",
        "border-warning-subtle",
        "border-danger-subtle",
        "border-info-subtle"
    ];

    return (
        <Layout>
            <Container className="py-4 text-center">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                        gap: "2px",
                        marginBottom: "120px"
                    }}
                >
                    {cells.map((value, index) => (
                        <Card
                            key={index}
                            className={`bg-dark text-light border ${
                                centerIndices.includes(index)
                                    ? colorClasses[centerIndices.indexOf(index) % colorClasses.length]
                                    : "border-secondary"
                            }`}
                            style={{ height: "100px" }} // 高さを拡大
                        >
                            <Card.Body className="p-1 d-flex align-items-center justify-content-center">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={value}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    className="bg-dark text-light text-center border-0 p-1"
                                    style={{
                                        fontSize: "0.8rem",
                                        width: "100%",
                                        height: "100%",
                                        resize: "none", // ユーザーによるサイズ変更を無効化
                                        overflowY: "auto",
                                        lineHeight: "1.2",
                                    }}
                                />

                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
            <MandalaChartFooter
                onInsert={(text) => console.log("Insert:", text)}
                onDownload={handleDownload}
                onTitleInput={() => console.log("Title input")}
                onClear={handleClear}
                onUpload={handleUpload}
            />
        </Layout>
    );
};

export default MandalaChart;
