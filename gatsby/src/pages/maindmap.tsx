import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import Layout from "../components/Common/Layout";

interface NodeData {
    id: string;
    name: string;
    parent: string | null;
}

const LOCAL_STORAGE_KEY = "mindmap-nodes";

const MaindMap: React.FC = () => {
    const [nodes, setNodes] = useState<NodeData[]>([{
        id: "root", name: "Root", parent: null
    }]);
    const [name, setName] = useState("");
    const [parent, setParent] = useState("root");
    const svgRef = useRef<SVGSVGElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setNodes(parsed);
                }
            } catch (e) {
                console.error("Failed to parse localStorage data", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nodes));
    }, [nodes]);

    const addNode = () => {
        if (!name.trim()) return;
        const newNode: NodeData = {
            id: `${Date.now()}`,
            name,
            parent,
        };
        setNodes([...nodes, newNode]);
        setName("");
    };

    const deleteNode = (id: string) => {
        const filtered = nodes.filter(
            (node) => node.id !== id && node.parent !== id
        );
        setNodes(filtered);
    };

    const reset = () => {
        setNodes([{ id: "root", name: "Root", parent: null }]);
    };

    useEffect(() => {
        if (!svgRef.current || !tooltipRef.current) return;

        const width = window.innerWidth;
        const height = 800;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const tooltip = d3.select(tooltipRef.current);

        const safeNodes = nodes.filter(
            (node) => node.parent === null || nodes.find((n) => n.id === node.parent)
        );

        try {
            const stratify = d3
                .stratify<NodeData>()
                .id((d) => d.id)
                .parentId((d) => d.parent || undefined);

            const root = stratify(safeNodes);
            const treeLayout = d3.tree<NodeData>().size([width - 100, height - 100]);
            treeLayout(root);

            const g = svg.append("g").attr("transform", "translate(50,50)");

            g.selectAll("line")
                .data(root.links())
                .join("line")
                .attr("stroke", "#aaa")
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            const node = g
                .selectAll("g.node")
                .data(root.descendants())
                .join("g")
                .attr("transform", (d) => `translate(${d.x},${d.y})`);

            node
                .append("circle")
                .attr("r", 20)
                .attr("fill", "#0d6efd")
                .on("mouseenter", (event, d) => {
                    tooltip.style("display", "block").text(d.data.name);
                })
                .on("mousemove", (event) => {
                    tooltip
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY + 10 + "px");
                })
                .on("mouseleave", () => {
                    tooltip.style("display", "none");
                });

            node
                .append("text")
                .text((d) => d.data.name)
                .attr("dy", 5)
                .attr("x", 0)
                .attr("text-anchor", "middle")
                .attr("fill", "white");
        } catch (error) {
            console.error("stratify error:", error);
        }
    }, [nodes]);

    return (
        <Layout>
            <div style={{ backgroundColor: "#121212", color: "#ffffff", paddingBottom: "2rem" }}>
                <div
                    ref={tooltipRef}
                    style={{
                        position: "absolute",
                        background: "#333",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        pointerEvents: "none",
                        fontSize: "0.9rem",
                        display: "none",
                        zIndex: 1000,
                    }}
                />

                <div className="my-3">
                    <svg
                        ref={svgRef}
                        width="100%"
                        height="800"
                        style={{ backgroundColor: "#1e1e1e", border: "1px solid #444" }}
                    />
                </div>

                <Container>
                    <Row>
                        <Col md={6}>
                            <Card bg="dark" text="light" className="mb-3">
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-2">
                                            <Form.Label>ノード名</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="例：アイデアA"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-2">
                                            <Form.Label>親ノード</Form.Label>
                                            <Form.Select
                                                value={parent}
                                                onChange={(e) => setParent(e.target.value)}
                                            >
                                                {nodes.map((node) => (
                                                    <option key={node.id} value={node.id}>
                                                        {node.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <div className="d-flex gap-2">
                                            <Button variant="primary" onClick={addNode}>
                                                追加
                                            </Button>
                                            <Button variant="danger" onClick={reset}>
                                                オールリセット
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <h5>ノード一覧</h5>
                            <ul className="list-group">
                                {nodes
                                    .filter((node) => node.id !== "root")
                                    .map((node) => (
                                        <li
                                            key={node.id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            {node.name}
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => deleteNode(node.id)}
                                            >
                                                削除
                                            </Button>
                                        </li>
                                    ))}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
};

export default MaindMap;
