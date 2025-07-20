import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";

// ✅ ヘッダー右のアイコンとして表示したいページのみ
const navIconItems = [
    { href: "/", icon: "bi-house-door", label: "index" },
    { href: "/daily-todo-index", icon: "bi-calendar-day", label: "Daily ToDo" },
    { href: "/weekly-todo-index", icon: "bi-calendar-week", label: "Weekly ToDo" },
    { href: "/monthly-todo-index", icon: "bi-calendar-month", label: "Monthly ToDo" },
    { href: "/yearly-todo-index", icon: "bi-calendar3", label: "Yearly ToDo" },
    { href: "/todo", icon: "bi-card-checklist", label: "ToDo" },
    { href: "/todo-list", icon: "bi-card-checklist", label: "Visual ToDo Timeline" },
    { href: "/todo-graph", icon: "bi-bar-chart-line", label: "Progress Overview" },
    { href: "/memo", icon: "bi-journal-text", label: "Memo" },
    { href: "/time-manager", icon: "bi-clock-history", label: "Time Manager" },
    { href: "/gantt", icon: "bi-kanban", label: "Gantt Chart" },
    { href: "/calendar", icon: "bi-calendar2-range", label: "Calendar" },
    { href: "/settings", icon: "bi-gear", label: "Settings" },


];

// ✅ タイトル表示に使用する全ページ
const navTitleItems = [
    ...navIconItems,
    { href: "/daily-todo-1", icon: "bi-calendar-day", label: "00:00~04:00 Todo" },
    { href: "/daily-todo-2", icon: "bi-calendar-day", label: "04:00~08:00 Todo" },
    { href: "/daily-todo-3", icon: "bi-calendar-day", label: "08:00~12:00 Todo" },
    { href: "/daily-todo-4", icon: "bi-calendar-day", label: "12:00~16:00 Todo" },
    { href: "/daily-todo-5", icon: "bi-calendar-day", label: "16:00~20:00 Todo" },
    { href: "/daily-todo-6", icon: "bi-calendar-day", label: "20:00~24:00 Todo" },

    { href: "/weekly-todo-1", icon: "bi-calendar-week", label: "(01–04) Monday – Thursday Todo" },
    { href: "/weekly-todo-2", icon: "bi-calendar-week", label: "(05–07) Friday – Sunday Todo" },

    { href: "/monthly-todo-1", icon: "bi-calendar-month", label: "(01–03) January – March Todo" },
    { href: "/monthly-todo-2", icon: "bi-calendar-month", label: "(04–06) April – June Todo" },
    { href: "/monthly-todo-3", icon: "bi-calendar-month", label: "(07–09) July – September Todo" },
    { href: "/monthly-todo-4", icon: "bi-calendar-month", label: "(10–12) October – December Todo" },

    { href: "/yearly-todo-1", icon: "bi-calendar", label: "Year 0 – Year 4 Todo" },
    { href: "/yearly-todo-2", icon: "bi-calendar", label: "Year 4 – Year 8 Todo" },









];

// ✅ オフキャンバスに表示する全ページ
const navDrawerItems = [
    ...navIconItems,


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
                    <h1 className="ms-3 mb-0 fs-4">WBS King of Todo</h1>
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
