// pages/todo.tsx
import React, { useEffect, useState } from "react";
import TodoListWithMarkdownExport from "../components/Todo/TodoList";
import { Container, Row, Col, Form } from "react-bootstrap";
import Layout from "../components/Common/Layout";

const CATEGORY_NAME_KEY = "daily-todo-2"; // ここもユニーク

const DailyTodo2: React.FC = () => {　　　//ここもユニーク
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

    const timeIndexList = [5, 6, 7, 8]; //ここもユニーク
    const todoTitle: string[] = ["04:00", "05:00", "06:00","07:00"] //ここもユニーク


    return (
        <Layout>
            <Container fluid className="bg-black text-light min-vh-100 p-4">
                <Row>
                    {[0, 1, 2, 3].map((index) => (
                        <Col key={index} md={3} className="mb-4">
                            {/* storageKeyは不変にすることで内容が消えないようにする */}
                            <TodoListWithMarkdownExport
                                storageKey={`day2-${index + 1}`}         // ここもユニーク
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

export default DailyTodo2;　//ここもユニーク
