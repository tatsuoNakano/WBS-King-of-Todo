// /src/components/Dir/DirTextInput.tsx
import React, {
    useImperativeHandle,
    useRef,
    useState,
    forwardRef,
    useEffect,
} from "react";
import { Form, Container, Row, Col } from "react-bootstrap";

export type DirTextInputHandle = {
    insertAtCursor: (text: string) => void;
    getText: () => string;
    clearText: () => void;
};

const LOCAL_STORAGE_KEY = "dirTextContent";

const DirTextInput = forwardRef<DirTextInputHandle>((_, ref) => {
    const [text, setText] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // 初回読み込み時にローカルストレージから復元
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) setText(saved);
    }, []);

    // テキスト変更時にローカルストレージに保存
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, text);
    }, [text]);

    useImperativeHandle(ref, () => ({
        insertAtCursor: (insertText: string) => {
            const textarea = textAreaRef.current;
            if (!textarea) return;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const updated =
                text.substring(0, start) +
                insertText +
                text.substring(end);
            setText(updated);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd =
                    start + insertText.length;
                textarea.focus();
            }, 0);
        },
        getText: () => text,
        clearText: () => {
            setText("");
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        },
    }));

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={12}>
                    <Form>
                        <Form.Group controlId="dirTextArea">
                            <Form.Label className="text-light">ディレクトリ構成を入力</Form.Label>
                            <Form.Control
                                ref={textAreaRef}
                                as="textarea"
                                rows={20}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder={`例:\nsrc/\n├─ components/\n│  ├─ Header.tsx\n└─ App.tsx`}
                                className="bg-dark text-light border-secondary"
                                style={{ resize: "none", height: "calc(100vh - 200px)" }}
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
});

export default DirTextInput;
