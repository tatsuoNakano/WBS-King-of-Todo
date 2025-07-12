// pages/todo.tsx
import React, { useEffect, useState } from "react";
import TodoListWithMarkdownExport from "../components/Todo/TodoList";
import { Container, Row, Col, Form } from "react-bootstrap";
import Layout from "../components/Common/Layout";

const CATEGORY_NAME_KEY = "operation-maintenance-category-names"; // 表示名用

const OpsMaintTodo: React.FC = () => {
    const [categoryNames, setCategoryNames] = useState<string[]>(["", "", "", ""]);

    useEffect(() => {
        const stored = localStorage.getItem(CATEGORY_NAME_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length === 4) {
                    setCategoryNames(parsed);
                }
            } catch (e) {
                console.error("カテゴリ名の読み込み失敗:", e);
            }
        }
    }, []);

    const handleCategoryNameChange = (index: number, newName: string) => {
        const updated = [...categoryNames];
        updated[index] = newName;
        setCategoryNames(updated);
        localStorage.setItem(CATEGORY_NAME_KEY, JSON.stringify(updated));
    };

    return (
        <Layout>
            <Container fluid className="bg-black text-light min-vh-100 p-4">
                <Row>
                    {[0, 1, 2, 3].map((index) => (
                        <Col key={index} md={3} className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder={`カテゴリ ${index + 1}`}
                                value={categoryNames[index]}
                                onChange={(e) => handleCategoryNameChange(index, e.target.value)}
                                className="text-center mb-2 bg-dark text-light border-light"
                            />
                            {/* storageKeyは不変にすることで内容が消えないようにする */}
                            <TodoListWithMarkdownExport storageKey={`ops-${index + 1}`} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Layout>
    );
};

export default OpsMaintTodo;
