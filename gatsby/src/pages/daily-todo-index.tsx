import React from "react";
import Layout from "../components/Common/Layout";
import FilteredTodoList from "../components/Todo/FilteredTodoList";

const navItems = [
    { href: "/daily-todo-1", icon: "bi-check2-square", label: "00:00~04:00" },
    { href: "/daily-todo-2", icon: "bi-check2-square", label: "04:00~08:00" },
    { href: "/daily-todo-3", icon: "bi-check2-square", label: "08:00~12:00" },
    { href: "/daily-todo-4", icon: "bi-check2-square", label: "12:00~16:00" },
    { href: "/daily-todo-5", icon: "bi-check2-square", label: "16:00~20:00" },
    { href: "/daily-todo-6", icon: "bi-check2-square", label: "20:00~24:00" },
];

const DailyTodoIndex: React.FC = () => {
    return (
        <Layout>
            <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-start pt-5">
                <div className="container">
                    <h2 className="text-center mb-4">Daily Todos</h2>
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
            <FilteredTodoList minTimeIndex={1} maxTimeIndex={24} />
        </Layout>
    );
};

export default DailyTodoIndex;
