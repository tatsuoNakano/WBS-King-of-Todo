import React, { useState } from "react";
import { Container, Button, Form, Table, Spinner, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import Layout from "../components/Common/Layout";

interface DependencyInfo {
    name: string;
    version: string;
    license: string;
    url: string;             // unpkgのURL
    repositoryUrl?: string;  // GitHubなど
}


const LicenseChecker: React.FC = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<DependencyInfo[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchLicenseInfo = async (name: string, version: string): Promise<DependencyInfo> => {
        const cleanedVersion = version.replace(/^[^\d]*/, "") || "latest";
        const url = `https://unpkg.com/${name}@${cleanedVersion}/package.json`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();

            // GitHubリンクをきれいに整形（例：git+https://github.com/xxx.git → https://github.com/xxx）
            let repoUrl = data.repository?.url || "";
            if (repoUrl.startsWith("git+")) repoUrl = repoUrl.replace(/^git\+/, "");
            if (repoUrl.endsWith(".git")) repoUrl = repoUrl.replace(/\.git$/, "");

            return {
                name,
                version: data.version || cleanedVersion,
                license: data.license || "UNKNOWN",
                url,
                repositoryUrl: repoUrl || undefined,
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

    // 色を判定する関数
    const getLicenseColor = (license: string): string => {
        const lower = license.toLowerCase();
        if (
            lower.includes("gpl") ||
            lower.includes("agpl") ||
            lower.includes("lgpl") ||
            lower.includes("wtfpl") ||
            lower === "unknown" ||
            lower.includes("failed")
        ) {
            return "red";
        }
        if (
            lower.includes("mit") ||
            lower.includes("apache") ||
            lower.includes("bsd") ||
            lower.includes("isc")
        ) {
            return "lightgreen";
        }
        return "gold"; // 要確認ライセンス
    };

    const renderLicenseCell = (license: string) => {
        const color = getLicenseColor(license);

        if (license === "FETCH FAILED") {
            return (
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="tooltip-failed">
                            パッケージが存在しないか、unpkgに公開されていません。
                        </Tooltip>
                    }
                >
                    <span style={{ color, cursor: "help" }}>{license}</span>
                </OverlayTrigger>
            );
        }

        return <span style={{ color }}>{license}</span>;
    };

    return (
        <Layout>
        <Container className="py-4 text-light">


            <Form.Group controlId="jsonInput">
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
                        <th>unpkg</th>
                        <th>GitHub</th> {/* New */}
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((dep) => (
                        <tr key={dep.name}>
                            <td>{dep.name}</td>
                            <td>{dep.version}</td>
                            <td>{renderLicenseCell(dep.license)}</td>
                            <td>
                                <a href={dep.url} target="_blank" rel="noopener noreferrer" className="text-info">
                                    unpkg
                                </a>
                            </td>
                            <td>
                                {dep.repositoryUrl ? (
                                    <a
                                        href={dep.repositoryUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-info"
                                    >
                                        GitHub
                                    </a>
                                ) : (
                                    <span className="text-muted">—</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

            )}
        </Container>
            <div className="mt-4 p-3 bg-warning text-dark rounded">
                <h5 className="fw-bold">
                    ⚠️ このツールは簡易スクリーニング目的です。最終的なライセンス確認・法的判断は必ずご自身でご確認ください。
                </h5>
            </div>
        </Layout>
    );
};

export default LicenseChecker;
