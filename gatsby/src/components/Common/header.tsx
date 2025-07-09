import React, { useState } from "react"
import { Button, Offcanvas } from "react-bootstrap"

const Header: React.FC = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            {/* ヘッダー全体 */}
            <div
                className="w-100 bg-dark text-light d-flex align-items-center p-3"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 1040,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.4)"
                }}
            >
                <Button variant="outline-light" onClick={handleShow}>
                    <i className="bi bi-list" />
                </Button>
                <h1 className="ms-3 mb-0 fs-4">DevKitBase</h1>
            </div>

            {/* サイドメニュー */}
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="start"
                className="bg-dark text-light"
            >
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>ナビゲーション</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="list-unstyled">
                        <li><a href="/" className="text-light text-decoration-none"><i className="bi bi-house-door" /> ホーム</a></li>
                        <li><a href="/gantt" className="text-light text-decoration-none"><i className="bi bi-calendar3" /> ガントチャート</a></li>
                        <li><a href="/todo" className="text-light text-decoration-none"><i className="bi bi-check2-square" /> 4WD ToDo</a></li>
                        <li><a href="/time" className="text-light text-decoration-none"><i className="bi bi-clock-history" /> 4WD Time ToDo</a></li>
                        <li><a href="/manager" className="text-light text-decoration-none"><i className="bi bi-alarm" /> タイムマネージャー</a></li>
                        <li><a href="/memo" className="text-light text-decoration-none"><i className="bi bi-pencil-square" /> メモ</a></li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header
