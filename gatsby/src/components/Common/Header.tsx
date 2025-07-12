import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";

// ✅ ヘッダー右のアイコンとして表示したいページのみ
const navIconItems = [
    { href: "/", icon: "bi-house-door", label: "ホーム" },
    { href: "/gantt", icon: "bi-calendar3", label: "ガントチャート" },
    { href: "/dir", icon: "bi-folder", label: "ディレクトリ構成図" },
    { href: "/time-manager", icon: "bi-alarm", label: "タイムマネージャー" },
    { href: "/memo", icon: "bi-pencil-square", label: "メモ" },
    { href: "/maindmap", icon: "bi-diagram-3", label: "マインドマップ" },
    { href: "/i18n", icon: "bi-globe", label: "i18nJson" },
    { href: "/plant-uml", icon: "bi-diagram-3-fill", label: "PlantUML" },
    { href: "/dice", icon: "bi-dice-6", label: "ダイスロール" },
    { href: "/todo-index", icon: "bi-check2-square", label: "ToDo" },
];

// ✅ タイトル表示に使用する全ページ
const navTitleItems = [
    ...navIconItems,
    { href: "/todo-time", label: "ToDo Time" },
    { href: "/todo", label: "ToDo" },
    { href: "/requirements-todo", label: "要件定義 Todo" },
    { href: "/basic-design-todo", icon: "bi-check2-square", label: "基本設計 Todo" },
    { href: "/detailed-design-todo", icon: "bi-check2-square", label: "詳細設計 Todo" },
    { href: "/dev-todo", icon: "bi-check2-square", label: "実装 Todo" },
    { href: "/test-todo", icon: "bi-check2-square", label: "テスト Todo" },
    { href: "/build-deploy-todo", icon: "bi-check2-square", label: "ビルド・配布 Todo" },
    { href: "/ops-maint-todo", icon: "bi-check2-square", label: "運用・保守 Todo" },

];

// ✅ オフキャンバスに表示する全ページ
const navDrawerItems = [
    ...navIconItems,
    { href: "/todo-time", icon: "bi-clock-history", label: "Time Todo" },
    { href: "/requirements-todo", icon: "bi-check2-square", label: "要件定義 Todo" },
    { href: "/basic-design-todo", icon: "bi-check2-square", label: "基本設計 Todo" },
    { href: "/detailed-design-todo", icon: "bi-check2-square", label: "詳細設計 Todo" },
    { href: "/dev-todo", icon: "bi-check2-square", label: "実装 Todo" },
    { href: "/test-todo", icon: "bi-check2-square", label: "テスト Todo" },
    { href: "/build-deploy-todo", icon: "bi-check2-square", label: "ビルド・配布 Todo" },
    { href: "/ops-maint-todo", icon: "bi-check2-square", label: "運用・保守 Todo" },

];

const Header: React.FC = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "/";

    // 最長一致するタイトルを探す
    const sortedTitleItems = [...navTitleItems].sort(
        (a, b) => b.href.length - a.href.length
    );
    const currentPage =
        sortedTitleItems.find((item) => currentPath.startsWith(item.href))
            ?.label ?? "";

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
                    boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
                }}
            >
                {/* 左：メニュー＋アプリ名 */}
                <div className="d-flex align-items-center">
                    <Button variant="outline-light" onClick={handleShow}>
                        <i className="bi bi-list" />
                    </Button>
                    <h1 className="ms-3 mb-0 fs-4">DevKitBase</h1>
                </div>

                {/* 中央：ページタイトル */}
                <div className="text-center fs-5 fw-bold text-light">{currentPage}</div>

                {/* 右：リンクアイコン（navIconItemsのみ） */}
                <div className="d-flex align-items-center gap-3">
                    {navIconItems.map((item) => (
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
                        {navDrawerItems.map((item) => (
                            <li key={item.href} className="mb-2">
                                <a
                                    href={item.href}
                                    className="text-light text-decoration-none d-flex align-items-center"
                                >
                                    {item.icon && <i className={`bi ${item.icon} me-2`} />}
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Header;
