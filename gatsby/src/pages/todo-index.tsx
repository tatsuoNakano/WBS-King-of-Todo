import React from "react";
import Layout from "../components/Common/Layout";

const navItems = [
    { href: "/todo", icon: "bi-check2-square", label: "todo" },
    { href: "/requirements-todo", icon: "bi-check2-square", label: "要件定義" },
    { href: "/basic-design-todo", icon: "bi-check2-square", label: "基本設計" },
    { href: "/detailed-design-todo", icon: "bi-check2-square", label: "詳細設計" },
    { href: "/dev-todo", icon: "bi-check2-square", label: "実装" },
    { href: "/test-todo", icon: "bi-check2-square", label: "テスト" },
    { href: "/build-deploy-todo", icon: "bi-check2-square", label: "ビルド・配布" },
    { href: "/ops-maint-todo", icon: "bi-check2-square", label: "運用・保守" },
    { href: "/todo-time", icon: "bi-clock-history", label: "Time todo" },
    { href: "/book-todo", icon: "bi-journal-check", label: "本ToDo" },
    { href: "/learning-todo", icon: "bi-book", label: "学習ToDo" },
    { href: "/swot-todo", icon: "bi-diagram-3-fill", label: "SWOT分析ToDo" },
];

const TodoIndex: React.FC = () => {
    return (
        <Layout>
            <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-start pt-5">
                <div className="container">
                    <h2 className="text-center mb-4">DevKitBase Todos</h2>
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

export default TodoIndex;
