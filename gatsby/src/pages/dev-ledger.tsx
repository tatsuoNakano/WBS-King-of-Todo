import React, { useState, useEffect } from "react";
import {
    Container,
    Tabs,
    Tab,
    Form,
    Button,
    Table,
    Row,
    Col,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Layout from "../components/Common/Layout";

export type Transaction = {
    id: string;
    date: string;
    type: "支出" | "収入";
    category: string;
    amount: number;
    memo?: string;
};

export type ProjectRecord = {
    projectName: string;
    transactions: Transaction[];
};

export type BudgetData = {
    projects: ProjectRecord[];
};

const STORAGE_KEY = "dev-budget-data-v1";

const DevLedger: React.FC = () => {
    const [data, setData] = useState<BudgetData>({
        projects: [
            { projectName: "プロジェクト1", transactions: [] },
            { projectName: "プロジェクト2", transactions: [] },
            { projectName: "プロジェクト3", transactions: [] },
        ],
    });

    const [activeTab, setActiveTab] = useState<number>(0);
    const [form, setForm] = useState({
        date: new Date().toISOString().slice(0, 10),
        type: "支出" as "支出" | "収入",
        category: "",
        amount: "",
        memo: "",
    });

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setData(JSON.parse(stored));
        }
    }, []);

    const saveData = (newData: BudgetData) => {
        setData(newData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) return;

        const newEntry: Transaction = {
            id: uuidv4(),
            date: form.date,
            type: form.type,
            category: form.category.trim() || "未分類",
            amount: Number(form.amount),
            memo: form.memo,
        };

        const updated = [...data.projects];
        updated[activeTab].transactions.push(newEntry);
        updated[activeTab].transactions.sort((a, b) => a.date.localeCompare(b.date));
        saveData({ projects: updated });
        setForm({ ...form, amount: "", memo: "" });
    };

    const handleDelete = (id: string) => {
        if (!window.confirm("この記録を削除しますか？")) return;
        const updated = [...data.projects];
        updated[activeTab].transactions = updated[activeTab].transactions.filter(
            (t) => t.id !== id
        );
        saveData({ projects: updated });
    };

    const handleProjectRename = (index: number, newName: string) => {
        const updated = [...data.projects];
        updated[index].projectName = newName;
        saveData({ projects: updated });
    };

    const renderSummary = () => {
        const list = data.projects[activeTab].transactions;
        const totalExpense = list
            .filter((t) => t.type === "支出")
            .reduce((sum, t) => sum + t.amount, 0);
        const totalIncome = list
            .filter((t) => t.type === "収入")
            .reduce((sum, t) => sum + t.amount, 0);
        const balance = totalIncome - totalExpense;

        return (
            <div className="d-flex justify-content-end align-items-center mt-3">
                <Button variant="outline-light" className="me-2" disabled>
                    支出: {totalExpense.toLocaleString()}円
                </Button>
                <Button variant="outline-light" className="me-2" disabled>
                    収入: {totalIncome.toLocaleString()}円
                </Button>
                <Button variant="outline-light" disabled>
                    差額: {balance.toLocaleString()}円
                </Button>
            </div>
        );
    };

    return (
        <Layout>
            <Container className="py-4 text-light">
                <h3>開発家計簿</h3>

                <Tabs
                    activeKey={activeTab.toString()}
                    onSelect={(k) => setActiveTab(Number(k))}
                    className="mb-3"
                >
                    {data.projects.map((proj, i) => (
                        <Tab key={i} eventKey={i.toString()} title={proj.projectName}>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Label>プロジェクト名</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={proj.projectName}
                                    onChange={(e) => handleProjectRename(i, e.target.value)}
                                />
                            </Form.Group>

                            {/* 入力フォーム */}
                            <Form className="mb-3">
                                <Row>
                                    <Col md={2}>
                                        <Form.Label>日付</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={form.date}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Label>区分</Form.Label>
                                        <div className="d-flex">
                                            <Form.Check
                                                type="radio"
                                                label="支出"
                                                name="type"
                                                value="支出"
                                                checked={form.type === "支出"}
                                                onChange={handleChange}
                                                className="me-2"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="収入"
                                                name="type"
                                                value="収入"
                                                checked={form.type === "収入"}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Label>金額</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="amount"
                                            value={form.amount}
                                            onChange={handleChange}
                                            min={1}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>カテゴリ</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                            placeholder="カテゴリ名（例: サーバー）"
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>メモ</Form.Label>
                                        <Form.Control
                                            name="memo"
                                            value={form.memo}
                                            onChange={handleChange}
                                            placeholder="任意で記入"
                                        />
                                    </Col>
                                </Row>

                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <Button onClick={handleSubmit} variant="primary">
                                        登録
                                    </Button>
                                    {renderSummary()}
                                </div>
                            </Form>

                            {/* 履歴表示 */}
                            <Table bordered striped hover size="sm" className="text-light">
                                <thead>
                                <tr>
                                    <th>日付</th>
                                    <th>区分</th>
                                    <th>金額</th>
                                    <th>カテゴリ</th>
                                    <th>メモ</th>
                                    <th>削除</th>
                                </tr>
                                </thead>
                                <tbody>
                                {proj.transactions.map((t) => (
                                    <tr key={t.id}>
                                        <td>{t.date}</td>
                                        <td>{t.type}</td>
                                        <td>{t.amount.toLocaleString()}円</td>
                                        <td>{t.category}</td>
                                        <td>{t.memo}</td>
                                        <td>
                                            <Button size="sm" variant="danger" onClick={() => handleDelete(t.id)}>
                                                削除
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Tab>
                    ))}
                </Tabs>
            </Container>
        </Layout>
    );
};

export default DevLedger;
