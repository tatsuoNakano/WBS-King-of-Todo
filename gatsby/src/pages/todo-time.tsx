// pages/todo.tsx
import React from "react"
import TodoListWithMarkdownExport from "../components/Todo/TodoList"
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/Common/Layout";

const TimetodoPage = () => (
    <Layout>
        <Container fluid className="bg-black text-light min-vh-100 p-4">
            <Row>
                {["daily", "weekly", "monthly", "yearly"].map((key, i) => (
                    <Col key={i} md={3}>
                        <h4 className="text-info text-center">{key.toUpperCase()}</h4>
                        <TodoListWithMarkdownExport storageKey={`todotime-${key}`} />
                    </Col>
                ))}
            </Row>
        </Container>
    </Layout>
)

export default TimetodoPage