import React, { useState } from "react";
import { Container, Form, Dropdown, Button, Alert } from "react-bootstrap";
import GraphRenderer from "../components/GraphGeneratar/GraphRenderer";
import {GraphType} from "../components/GraphGeneratar/types";
import Layout from "../components/Common/Layout";

const graphOptions: { label: string; value: GraphType }[] = [
    { label: "棒グラフ", value: "bar" },
    { label: "折れ線グラフ", value: "line" },
    { label: "エリアチャート", value: "area" },
    { label: "円グラフ", value: "pie" },
    { label: "ドーナツグラフ", value: "donut" },
];

const GraphGenerator: React.FC = () => {
    const [input, setInput] = useState("[10, 20, 15, 30]");
    const [data, setData] = useState<number[]>([10, 20, 15, 30]);
    const [graphType, setGraphType] = useState<GraphType>("bar");
    const [error, setError] = useState("");

    const handleInputChange = (val: string) => {
        setInput(val);
        try {
            const parsed = JSON.parse(val);
            if (!Array.isArray(parsed)) throw new Error("配列形式で入力してください");
            if (parsed.length === 0) throw new Error("1つ以上の値を入力してください");
            if (!parsed.every((v: any) => typeof v === "number")) {
                throw new Error("すべて数値である必要があります");
            }
            setData(parsed);
            setError("");
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <Layout>
        <Container className="bg-dark text-light p-4 rounded">

            <Form.Group className="mb-3">
                <Form.Label>数値配列を入力</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={input}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="bg-secondary text-light border-0"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>グラフの種類</Form.Label>
                <Form.Select
                    className="bg-secondary text-light border-0"
                    value={graphType}
                    onChange={(e) => setGraphType(e.target.value as GraphType)}
                >
                    {graphOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <div
                className="bg-black p-3 rounded"
                style={{ height: "700px", width: "100%", maxWidth: "100%", overflow: "auto" }}
            >
                <GraphRenderer data={data} type={graphType} />
            </div>


        </Container>
        </Layout>
    );
};

export default GraphGenerator;
