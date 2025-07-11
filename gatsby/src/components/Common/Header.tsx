import React, { useState } from "react"
import { Button, Offcanvas } from "react-bootstrap"

const navItems = [
    { href: "/", icon: "bi-house-door", label: "ホーム" },
    { href: "/gantt", icon: "bi-calendar3", label: "ガントチャート" },
    { href: "/todo-index", icon: "bi-check2-square", label: "ToDo" },
    { href: "/dir", icon: "bi-folder", label: "ディレクトリ構成図" },
    { href: "/time-manager", icon: "bi-alarm", label: "タイムマネージャー" },
    { href: "/memo", icon: "bi-pencil-square", label: "メモ" },
    { href: "/maindmap", icon: "bi-diagram-3", label: "マインドマップ" },
    { href: "/i18n", icon: "bi-globe", label: "i18nJson" },
    { href: "/plant-uml", icon: "bi-diagram-3-fill", label: "PlantUML" },
    { href: "/dice", icon: "bi-dice-6", label: "ダイスロール" },
]

const Header: React.FC = () => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            {/* ヘッダー */}
            <div
                className="w-100 bg-dark text-light d-flex align-items-center justify-content-between px-3 p-3"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 1040,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.4)"
                }}
            >
                {/* 左：メニュー＋タイトル */}
                <div className="d-flex align-items-center">
                    <Button variant="outline-light" onClick={handleShow}>
                        <i className="bi bi-list" />
                    </Button>
                    <h1 className="ms-3 mb-0 fs-4">DevKitBase</h1>
                </div>

                {/* 右：アイコンだけのリンク一覧 */}
                <div className="d-flex align-items-center gap-3">
                    {navItems.map(item => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-light text-decoration-none fs-5"
                            title={item.label}
                        >
                            <i className={`bi ${item.icon}`} />
                        </a>
                    ))}
                </div>
            </div>

            {/* オフキャンバス */}
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
                        {navItems.map(item => (
                            <li key={item.href} className="mb-2">
                                <a
                                    href={item.href}
                                    className="text-light text-decoration-none d-flex align-items-center"
                                >
                                    <i className={`bi ${item.icon} me-2`} />
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header
