import React from "react";
import Layout from "../components/Common/Layout";

const navItems = [
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

const IndexPage: React.FC = () => {
    return (
        <Layout>
        <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-start pt-5">
            <div className="container">
                <h2 className="text-center mb-4">WBS King of Todo</h2>
                <div className="row g-4 justify-content-center">
                    {navItems.map(({ href, icon, label }) => (
                        <div key={href} className="col-6 col-md-4">
                            <a
                                href={href}
                                className="text-decoration-none text-light"
                            >
                                <div className="border rounded text-center p-4 h-100 hover-effect">
                                    <i className={`bi ${icon} fs-1 d-block mb-2`} />
                                    <span className="fw-bold">{label}</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* ホバーエフェクト用スタイル */}
            <style>{`
        .hover-effect {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-effect:hover {
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(255,255,255,0.2);
        }
      `}</style>
        </div>
        </Layout>
    );
};

export default IndexPage;
