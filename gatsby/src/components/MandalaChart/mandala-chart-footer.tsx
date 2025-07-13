// /src/components/Mandala/MandalaChartFooter.tsx

import React from "react";
import { Container, Button, Form } from "react-bootstrap";

type Props = {
    onDownload: () => void;
    onClear: () => void;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MandalaChartFooter: React.FC<Props> = ({
                                                 onDownload,
                                                 onClear,
                                                 onUpload,
                                             }) => {
    return (
        <div
            className="w-100 bg-dark text-light d-flex align-items-center"
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                height: "100px",
                zIndex: 1040,
                boxShadow: "0 -2px 4px rgba(0,0,0,0.4)",
                padding: "1rem 2rem",
            }}
        >
            <Container className="d-flex justify-content-center align-items-center flex-wrap gap-2">
                <Button variant="outline-light" size="sm" onClick={onDownload}>
                    JSON保存
                </Button>

                <Form.Label className="btn btn-outline-light btn-sm m-0">
                    JSON読込
                    <Form.Control
                        type="file"
                        accept=".json"
                        onChange={onUpload}
                        className="d-none"
                    />
                </Form.Label>

                <Button variant="outline-danger" size="sm" onClick={onClear}>
                    リセット
                </Button>
            </Container>
        </div>
    );
};

export default MandalaChartFooter;
