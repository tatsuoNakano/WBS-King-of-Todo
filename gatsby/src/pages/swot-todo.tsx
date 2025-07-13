// pages/todo.tsx
import React from "react"
import TodoListWithMarkdownExport from "../components/Todo/TodoList"
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/Common/Layout";

const SwotTodo = () => (
    <Layout>
        <Container fluid className="bg-black text-light min-vh-100 p-4">
            <Row>
                {["Strength（強み）", "Weakness（弱み）", "Opportunity（機会）", "Threat（脅威）"].map((key, i) => (
                    <Col key={i} md={3}>
                        <h4 className="text-light text-center">{key.toUpperCase()}</h4>
                        <TodoListWithMarkdownExport storageKey={`swottodo-${key}`} />
                    </Col>
                ))}
            </Row>
        </Container>
    </Layout>
)

export default SwotTodo