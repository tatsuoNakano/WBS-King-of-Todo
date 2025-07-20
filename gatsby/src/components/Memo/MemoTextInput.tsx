import React, {
    useImperativeHandle,
    useRef,
    useState,
    useEffect,
    forwardRef,
} from "react"
import { Form, Container, Row, Col } from "react-bootstrap"

export type MemoTextInputHandle = {
    insertAtCursor: (text: string) => void
    getText: () => string
    clearText: () => void
    setText: (text: string) => void
}

interface MemoTextInputProps {
    defaultValue?: string
    onChange?: (text: string) => void
}
const MemoTextInput = forwardRef<MemoTextInputHandle, MemoTextInputProps>(
    ({ defaultValue = "", onChange }, ref) => {
        const [text, setText] = useState(defaultValue)
        const textAreaRef = useRef<HTMLTextAreaElement>(null)

        useEffect(() => {
            setText(defaultValue)
        }, [defaultValue])

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const newText = e.target.value
            setText(newText)
            onChange?.(newText)
        }

        useImperativeHandle(ref, () => ({
            insertAtCursor: (insertText: string) => {
                const textarea = textAreaRef.current
                if (!textarea) return
                const start = textarea.selectionStart
                const end = textarea.selectionEnd
                const updated = text.slice(0, start) + insertText + text.slice(end)
                setText(updated)
                onChange?.(updated)
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + insertText.length
                    textarea.focus()
                }, 0)
            },
            getText: () => text,
            clearText: () => {
                setText("")
                onChange?.("")
            },
            setText: (newText: string) => {
                setText(newText)
                onChange?.(newText)
            },
        }))

        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={12}>
                        <Form>
                            <Form.Group controlId="memoTextArea">
                                <Form.Label className="text-light">memo !!</Form.Label>
                                <Form.Control
                                    ref={textAreaRef}
                                    as="textarea"
                                    rows={20}
                                    value={text}
                                    onChange={handleChange}
                                    placeholder="Markdown形式でメモを記述..."
                                    className="bg-dark text-light border-secondary"
                                    style={{ resize: "none", height: "calc(100vh - 200px)" }}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
)


export default MemoTextInput
