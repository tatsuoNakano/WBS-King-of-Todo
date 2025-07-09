// /src/components/Memo/FooterButtons.tsx
import React from "react"
import { Button, ButtonGroup } from "react-bootstrap"

type FooterButtonsProps = {
    onInsert: (syntax: string) => void
    onDownload: () => void
    onTitleInput: () => void
    onClear: () => void
}

const FooterButtons: React.FC<FooterButtonsProps> = ({
                                                         onInsert,
                                                         onDownload,
                                                         onTitleInput,
                                                         onClear,
                                                     }) => {
    const buttonStyle = { minWidth: "70px", marginRight: "4px" }

    return (
        <ButtonGroup>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("# ")}>#</Button>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("## ")}>##</Button>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("### ")}>###</Button>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("* ")}>*</Button>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("[リンクテキスト](URL)")}>
                <i className="bi bi-link-45deg" />
            </Button>
            <Button variant="outline-light" style={buttonStyle} onClick={() => onInsert("```\nコード\n```")}>```</Button>
            <Button variant="outline-light" style={buttonStyle} onClick={onTitleInput}>タイトルを入力</Button>
            <Button variant="outline-light" style={buttonStyle} onClick={onDownload}>
                <i className="bi bi-download" />ダウンロード
            </Button>
            <Button variant="outline-light" style={buttonStyle} onClick={onClear}>
                <i className="bi bi-trash3" />削除
            </Button>
        </ButtonGroup>
    )
}

export default FooterButtons
