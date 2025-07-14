import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form, Row, Col, Table } from "react-bootstrap";
import Layout from "../components/Common/Layout";

const dbTypeOptions: Record<string, string[]> = {    sqlite: [
        "NULL", "INTEGER", "REAL", "TEXT", "BLOB", "NUMERIC"
    ],
    mysql: [
        "TINYINT", "SMALLINT", "INT", "BIGINT", "DECIMAL", "FLOAT", "DOUBLE",
        "CHAR", "VARCHAR", "TEXT", "DATE", "DATETIME", "TIMESTAMP",
        "TIME", "YEAR", "BOOLEAN", "ENUM"
    ],
    postgres: [
        "SMALLINT", "INTEGER", "BIGINT", "DECIMAL", "NUMERIC", "REAL", "DOUBLE PRECISION",
        "BOOLEAN", "CHAR", "VARCHAR", "TEXT", "DATE", "TIME", "TIMESTAMP",
        "UUID", "JSON", "JSONB", "BYTEA", "SERIAL"
    ],
    mongodb: [
        "String", "Number", "Double", "Int32", "Int64", "Decimal128",
        "Boolean", "Date", "Timestamp", "ObjectId", "Binary", "Array", "Object"
    ]
};

type Column = {
    name: string;
    type: string;
    isPrimaryKey: boolean;
    isNotNull: boolean;
    isUnique: boolean;
    defaultValue?: string;
    comment?: string;
};

type TableData = {
    id: string;
    name: string;
    columns: Column[];
};

const STORAGE_KEY = "db-designer-tables";

const DbDesigner: React.FC = () => {
    const [dbType, setDbType] = useState("sqlite");
    const [tables, setTables] = useState<TableData[]>([]);
    const [newTableName, setNewTableName] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setTables(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tables));
    }, [tables]);

    const addTable = () => {
        if (!newTableName.trim()) return;
        const newTable: TableData = {
            id: crypto.randomUUID(),
            name: newTableName.trim(),
            columns: []
        };
        setTables([...tables, newTable]);
        setNewTableName("");
    };

    const deleteTable = (id: string) => {
        setTables(tables.filter((t) => t.id !== id));
    };

    const addColumn = (tableId: string) => {
        const updated = tables.map((table) =>
            table.id === tableId
                ? {
                    ...table,
                    columns: [
                        ...table.columns,
                        {
                            name: "",
                            type: dbTypeOptions[dbType][0],
                            isPrimaryKey: false,
                            isNotNull: false,
                            isUnique: false,
                            defaultValue: "",
                            comment: ""
                        }
                    ]
                }
                : table
        );
        setTables(updated);
    };

    const updateColumn = (
        tableId: string,
        index: number,
        key: keyof Column,
        value: any
    ) => {
        const updated = tables.map((table) => {
            if (table.id === tableId) {
                const newCols = [...table.columns];
                newCols[index][key] = value;
                return { ...table, columns: newCols };
            }
            return table;
        });
        setTables(updated);
    };

    const exportSQL = () => {
        const ddlStatements = tables.map(table => {
            const columns = table.columns.map(col => {
                const parts = [`\`${col.name}\` ${col.type}`];
                if (col.isNotNull) parts.push("NOT NULL");
                if (col.isUnique) parts.push("UNIQUE");
                if (col.defaultValue) parts.push(`DEFAULT ${col.defaultValue}`);
                return parts.join(" ");
            });

            // 複合主キー対応
            const pkCols = table.columns
                .filter(col => col.isPrimaryKey)
                .map(col => `\`${col.name}\``);
            if (pkCols.length > 0) {
                columns.push(`PRIMARY KEY (${pkCols.join(", ")})`);
            }

            return `CREATE TABLE \`${table.name}\` (\n  ${columns.join(",\n  ")}\n);\n`;
        });

        const blob = new Blob([ddlStatements.join("\n")], { type: "text/sql" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "database-schema.sql";
        a.click();
        URL.revokeObjectURL(url);
    };


    const deleteColumn = (tableId: string, index: number) => {
        const updated = tables.map((table) => {
            if (table.id === tableId) {
                const newCols = [...table.columns];
                newCols.splice(index, 1);
                return { ...table, columns: newCols };
            }
            return table;
        });
        setTables(updated);
    };

    return (
        <Layout>
            <Container className="py-4 text-light">
                <Button variant="outline-success mb-3" onClick={exportSQL}>
                    SQLダウンロード
                </Button>


                <Form.Group className="mb-4">
                    <Form.Label>データベースの種類</Form.Label>
                    <Form.Select
                        value={dbType}
                        onChange={(e) => setDbType(e.target.value)}
                        className="bg-secondary text-light"
                    >
                        <option value="sqlite">SQLite</option>
                        <option value="mysql">MySQL</option>
                        <option value="postgres">PostgreSQL</option>
                        <option value="mongodb">MongoDB</option>
                    </Form.Select>
                </Form.Group>

                <Form className="d-flex mb-4 gap-2">
                    <Form.Control
                        type="text"
                        placeholder="テーブル名を入力"
                        value={newTableName}
                        onChange={(e) => setNewTableName(e.target.value)}
                        className="bg-secondary text-light"
                    />
                    <Button variant="outline-light" onClick={addTable}>テーブル追加</Button>
                </Form>

                {tables.map((table) => (
                    <Card key={table.id} bg="dark" text="light" className="mb-4">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <strong>{table.name}</strong>
                            <Button size="sm" variant="outline-danger" onClick={() => deleteTable(table.id)}>削除</Button>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                <tr>
                                    <th>カラム名</th>
                                    <th>型</th>
                                    <th>PK</th>
                                    <th>NOT NULL</th>
                                    <th>UNIQUE</th>
                                    <th>Default</th>
                                    <th>コメント</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {table.columns.map((col, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                value={col.name}
                                                onChange={(e) => updateColumn(table.id, index, "name", e.target.value)}
                                                className="bg-secondary text-light"
                                            />
                                        </td>
                                        <td>
                                            <Form.Select
                                                value={col.type}
                                                onChange={(e) => updateColumn(table.id, index, "type", e.target.value)}
                                                className="bg-secondary text-light"
                                            >
                                                {dbTypeOptions[dbType].map((typeOption) => (
                                                    <option key={typeOption} value={typeOption}>{typeOption}</option>
                                                ))}
                                            </Form.Select>
                                        </td>
                                        <td className="text-center">
                                            <Form.Check
                                                type="checkbox"
                                                checked={col.isPrimaryKey}
                                                onChange={(e) => updateColumn(table.id, index, "isPrimaryKey", e.target.checked)}
                                            />
                                        </td>
                                        <td className="text-center">
                                            <Form.Check
                                                type="checkbox"
                                                checked={col.isNotNull}
                                                onChange={(e) => updateColumn(table.id, index, "isNotNull", e.target.checked)}
                                            />
                                        </td>
                                        <td className="text-center">
                                            <Form.Check
                                                type="checkbox"
                                                checked={col.isUnique}
                                                onChange={(e) => updateColumn(table.id, index, "isUnique", e.target.checked)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                value={col.defaultValue}
                                                onChange={(e) => updateColumn(table.id, index, "defaultValue", e.target.value)}
                                                className="bg-secondary text-light"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                value={col.comment}
                                                onChange={(e) => updateColumn(table.id, index, "comment", e.target.value)}
                                                className="bg-secondary text-light"
                                            />
                                        </td>
                                        <td>
                                            <Button variant="outline-danger" size="sm" onClick={() => deleteColumn(table.id, index)}>削除</Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <Button variant="outline-light" onClick={() => addColumn(table.id)}>カラム追加</Button>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </Layout>
    );
};

export default DbDesigner;
