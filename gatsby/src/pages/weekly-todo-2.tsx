// pages/todo.tsx
import React, { useEffect, useState } from "react";
import TodoListWithMarkdownExport from "../components/Todo/TodoList";
import { Container, Row, Col, Form } from "react-bootstrap";
import Layout from "../components/Common/Layout";

const CATEGORY_NAME_KEY = "weekly-todo-2"; // ここもユニーク

const weeklyTodo2: React.FC = () => {　　　//ここもユニーク
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
                console.error("Failed to load category name:", e);
            }
        }
    }, []);

    const handleCategoryNameChange = (index: number, newName: string) => {
        const updated = [...categoryNames];
        updated[index] = newName;
        setCategoryNames(updated);
        localStorage.setItem(CATEGORY_NAME_KEY, JSON.stringify(updated));
    };

    const timeIndexList = [29, 30, 31, 32]; //ここもユニーク
    const todoTitle: string[] = ["Thursday", "Friday", "Saturday","Weekly "] //ここもユニーク


    return (
        <Layout>
            <Container fluid className="bg-black text-light min-vh-100 p-4">
                <Row>
                    {[0, 1, 2, 3].map((index) => (
                        <Col key={index} md={3} className="mb-4">
                            {/* storageKeyは不変にすることで内容が消えないようにする */}
                            <TodoListWithMarkdownExport
                                storageKey={`weekly2-${index + 1}`}         // ここもユニーク
                                timeIndex={timeIndexList[index]}
                                initialTitle={todoTitle[index]}
                            />

                        </Col>
                    ))}
                </Row>
            </Container>
        </Layout>
    );
};

export default weeklyTodo2;　//ここもユニーク
