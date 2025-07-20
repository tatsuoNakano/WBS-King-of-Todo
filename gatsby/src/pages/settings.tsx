import React from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import Layout from "../components/Common/Layout";

const SETTINGS_KEY = "wbs-king-of-todo-settings-data";

const SettingsPage: React.FC = () => {
    const handleDownload = () => {
        const allKeys = Object.keys(localStorage);
        const data: Record<string, any> = {};
        allKeys.forEach((key) => {
            try {
                data[key] = JSON.parse(localStorage.getItem(key) || "null");
            } catch {
                data[key] = localStorage.getItem(key);
            }
        });

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "wbs_king_of_todo_data_backup.json";
        a.click();

        URL.revokeObjectURL(url);
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const json = JSON.parse(reader.result as string);

                if (!window.confirm("All data will be overwritten. Continue?")) return;
                localStorage.clear();

                Object.keys(json).forEach((key) => {
                    const value = json[key];

                    if (typeof value === "string") {
                        const fixedValue = value.replace(/\\n/g, "\n");
                        localStorage.setItem(key, fixedValue);
                    } else {
                        localStorage.setItem(key, JSON.stringify(value));
                    }
                });

                alert("Import completed. Please reload the page.");
                window.location.reload();
            } catch (error) {
                console.error("JSON parse error:", error);
                alert("Invalid JSON file.");
            }
        };

        reader.readAsText(file);
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to delete all local data? This action cannot be undone.")) {
            localStorage.clear();
            alert("Local storage has been reset. Please reload the page.");
        }
    };

    return (
        <Layout>
            <Container className="py-5">
                <Card className="bg-dark text-light border-secondary shadow-lg mb-4">
                    <Card.Body>
                        <h4 className="mb-3">Data Management</h4>

                        <div className="d-flex flex-column align-items-start gap-3">
                            <Button variant="outline-success" onClick={handleDownload}>
                                Export all data as JSON
                            </Button>

                            <Form.Label className="btn btn-outline-info m-0">
                                Import saved JSON data
                                <Form.Control
                                    type="file"
                                    accept=".json"
                                    onChange={handleUpload}
                                    className="d-none"
                                />
                            </Form.Label>

                            <Button variant="outline-danger" onClick={handleReset}>
                                Delete all local data
                            </Button>
                        </div>

                        <p className="mt-3 text-muted fs-6">
                            Stored data includes all ToDos, memos, and chart information.
                        </p>
                    </Card.Body>
                </Card>

            </Container>
        </Layout>
    );
};

export default SettingsPage;
