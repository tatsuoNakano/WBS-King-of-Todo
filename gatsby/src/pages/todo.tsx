import React, { useEffect, useState } from "react";
import TodoListWithMarkdownExport from "../components/Todo/TodoList";
import { Container, Row, Col, Form } from "react-bootstrap";
import Layout from "../components/Common/Layout";

const CATEGORY_STORAGE_KEY = "todo-categories";

const TodoPage: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);

    // 初回ロード：localStorageからカテゴリを読み込む
    useEffect(() => {
        const stored = localStorage.getItem(CATEGORY_STORAGE_KEY);
        if (stored) {
            setCategories(JSON.parse(stored));
        } else {
            setCategories(["", "", "", ""]); // 空の初期カテゴリ（プレースホルダー表示用）
        }
    }, []);

    // カテゴリ名の変更 → state更新 + 保存
    const handleCategoryChange = (index: number, newName: string) => {
        const updated = [...categories];
        updated[index] = newName;
        setCategories(updated);
        localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(updated));
    };

    return (
        <Layout>
            <Container fluid className="bg-black text-light min-vh-100 p-4">
                <Row>
                    {categories.map((key, i) => (
                        <Col key={i} md={3} className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder={`${i + 1}`}
                                value={key}
                                onChange={(e) => handleCategoryChange(i, e.target.value)}
                                className="text-center mb-2 bg-dark text-info border-info"
                            />
                            <TodoListWithMarkdownExport storageKey={`todo-${key || i + 1}`} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Layout>
    );
};

export default TodoPage;
