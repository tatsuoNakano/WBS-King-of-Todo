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
                    <ul className="list-unstyled fs-5">
                        <li className="mb-2">
                            <a href="/" className="text-light text-decoration-none d-flex align-items-center">
                                <i className="bi bi-house-door me-2" /> ホーム
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/gantt" className="text-light text-decoration-none d-flex align-items-center">
                                <i className="bi bi-calendar3 me-2" /> ガントチャート
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/todo" className="text-light text-decoration-none d-flex align-items-center">
                                <i className="bi bi-check2-square me-2" /> ToDo
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/time" className="text-light text-decoration-none d-flex align-items-center">
                                <i className="bi bi-clock-history me-2" />Time ToDo
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/time-manager" className="text-light text-decoration-none d-flex align-items-center">
                                <i className="bi bi-alarm me-2" /> タイムマネージャー
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/memo" className="text-light text-decoration-none d-flex align-items-center">
                                <i className="bi bi-pencil-square me-2" /> メモ
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/mindmap" className="text-light text-decoration-none d-flex align-items-center">
                                <i className="bi bi-diagram-3 me-2" /> マインドマップ
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/mermaid" className="text-light text-decoration-none d-flex align-items-center">
                                <i className="bi bi-diagram-2 me-2" /> Mermaid
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/plant-uml" className="text-light text-decoration-none d-flex align-items-center">
                                <i className="bi bi-diagram-3-fill me-2" />PlantUML
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/dice" className="text-light text-decoration-none d-flex align-items-center">
                                <i className="bi bi-dice-6 me-2" /> ダイスロール
                            </a>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header

