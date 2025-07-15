import React, { useState } from "react";
import { Container, Button, Form, Table, Spinner, Alert } from "react-bootstrap";

interface DependencyInfo {
    name: string;
    version: string;
    license: string;
    url: string;
}

const LicenseViewer: React.FC = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<DependencyInfo[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchLicenseInfo = async (name: string, version: string): Promise<DependencyInfo> => {
        const cleanedVersion = version.replace(/^[^\d]*/, "") || "latest";
        const url = `https://unpkg.com/${name}@${cleanedVersion}/package.json`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("fetch failed");
            const data = await res.json();

            return {
                name,
                version: data.version || cleanedVersion,
                license: data.license || "UNKNOWN",
                url,
            };
        } catch {
            return {
                name,
                version: cleanedVersion,
                license: "FETCH FAILED",
                url,
            };
        }
    };

    const handleCheck = async () => {
        setError(null);
        setLoading(true);
        setResults([]);

        try {
            const parsed = JSON.parse(input);
            const deps = parsed.dependencies || {};
            const entries = Object.entries(deps) as [string, string][];

            const fetched = await Promise.all(entries.map(([name, version]) =>
                fetchLicenseInfo(name, version)
            ));

            setResults(fetched);
        } catch (e) {
            setError("JSON構文エラー：正しい package.json を貼り付けてください。");
        }

        setLoading(false);
    };

    return (
        <Container className="py-4 text-light">
            <h2 className="mb-4">License Viewer</h2>

            <Form.Group controlId="packageJsonInput">
                <Form.Label>package.json の内容を貼り付け</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`{\n  "dependencies": {\n    "react": "^18.2.0",\n    "axios": "^1.6.7"\n  }\n}`}
                    className="bg-dark text-light"
                />
            </Form.Group>

            <Button onClick={handleCheck} disabled={loading} className="my-3">
                {loading ? <Spinner animation="border" size="sm" /> : "ライセンス検索"}
            </Button>

            {error && <Alert variant="danger">{error}</Alert>}

            {results.length > 0 && (
                <Table striped bordered hover variant="dark" responsive>
                    <thead>
                    <tr>
                        <th>パッケージ名</th>
                        <th>バージョン</th>
                        <th>ライセンス</th>
                        <th>ソース</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((dep) => (
                        <tr key={dep.name}>
                            <td>{dep.name}</td>
                            <td>{dep.version}</td>
                            <td style={{ color: dep.license.match(/GPL|UNKNOWN|FAILED/i) ? "red" : "lightgreen" }}>
                                {dep.license}
                            </td>
                            <td>
                                <a href={dep.url} target="_blank" rel="noopener noreferrer" className="text-info">
                                    unpkg
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default LicenseViewer;
