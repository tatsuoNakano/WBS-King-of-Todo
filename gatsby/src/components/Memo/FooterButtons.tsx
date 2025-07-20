// /src/components/Memo/FooterButtons.tsx
import React from "react"
import { Button, ButtonGroup } from "react-bootstrap"

type FooterButtonsProps = {
    onInsert: (syntax: string) => void
    onDownload: () => void
    onClear: () => void
}

const FooterButtons: React.FC<FooterButtonsProps> = ({
                                                         onInsert,
                                                         onDownload,
                                                         onClear,
                                                     }) => {
    const buttonStyle = { minWidth: "70px", marginRight: "4px" }

    return (
        <ButtonGroup>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("# ")}>#</Button>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("## ")}>##</Button>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("### ")}>###</Button>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("* ")}>*</Button>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("[LinkText](URL)")}>
                <i className="bi bi-link-45deg" />
            </Button>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("```\nコード\n```")}>```</Button>
            <Button variant="outline-light" style={buttonStyle} onClick={onDownload}>
                DL
            </Button>
            <Button variant="outline-danger" style={buttonStyle} onClick={onClear}>
                <i className="bi bi-trash3" />reset
            </Button>
        </ButtonGroup>
    )
}

export default FooterButtons
