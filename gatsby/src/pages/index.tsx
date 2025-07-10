import React from "react";
import Layout from "../components/Common/Layout";

const navItems = [
    { href: "/gantt", icon: "bi-calendar3", label: "ガントチャート" },
    { href: "/todo", icon: "bi-check2-square", label: "ToDo" },
    { href: "/todo-time", icon: "bi-clock-history", label: "Time ToDo" },
    { href: "/time-manager", icon: "bi-alarm", label: "タイムマネージャー" },
    { href: "/memo", icon: "bi-pencil-square", label: "メモ" },
    { href: "/maindmap", icon: "bi-diagram-3", label: "マインドマップ" },
    { href: "/i18n", icon: "bi-globe", label: "i18nJson" },
    { href: "/plant-uml", icon: "bi-diagram-3-fill", label: "PlantUML" },
    { href: "/dice", icon: "bi-dice-6", label: "ダイスロール" },
];

const IndexPage: React.FC = () => {
    return (
        <Layout>
        <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-start pt-5">
            <div className="container">
                <h2 className="text-center mb-4">DevKitBase</h2>
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
