// /src/components/Memo/MemoFooter.tsx
import React from "react"
import { Container } from "react-bootstrap"
import FooterButtons from "./FooterButtons"

type Props = {
    onInsert: (text: string) => void
    onDownload: () => void
    onTitleInput: () => void
    onClear: () => void
}

const MemoFooter: React.FC<Props> = ({ onInsert, onDownload, onTitleInput, onClear }) => {
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
                <FooterButtons
                    onInsert={onInsert}
                    onDownload={onDownload}
                    onTitleInput={onTitleInput}
                    onClear={onClear}
                />
            </Container>
        </div>
    )
}

export default MemoFooter
