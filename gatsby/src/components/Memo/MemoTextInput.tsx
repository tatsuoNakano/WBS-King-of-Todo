// /src/components/Memo/MemoTextInput.tsx
import React, { useImperativeHandle, useRef, useState, forwardRef } from "react"
import { Form, Container, Row, Col } from "react-bootstrap"

export type MemoTextInputHandle = {
    insertAtCursor: (text: string) => void
    getText: () => string
    clearText: () => void
}

const MemoTextInput = forwardRef<MemoTextInputHandle>((_, ref) => {
    const [text, setText] = useState("")
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => ({
        insertAtCursor: (insertText: string) => {
            const textarea = textAreaRef.current
            if (!textarea) return
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const updated = text.substring(0, start) + insertText + text.substring(end)
            setText(updated)
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + insertText.length
                textarea.focus()
            }, 0)
        },
        getText: () => text,
        clearText: () => setText(""),
    }))

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={12}>
                    <Form>
                        <Form.Group controlId="memoTextArea">
                            <Form.Label className="text-light">メモを入力</Form.Label>
                            <Form.Control
                                ref={textAreaRef}
                                as="textarea"
                                rows={20}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
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
})

export default MemoTextInput
