import React from "react";
import Layout from "../components/Common/Layout";
import FilteredTodoList from "../components/Todo/FilteredTodoList";
import ProgressBarByTimeIndex from "../components/Todo/TodoProgressBar";
import ClearRangeButton from "../components/Todo/TodoResetBtn";

const navItems = [

        { href: "/monthly-todo-1", icon: "bi-check2-square", label: "(01–04) January – April" },
        { href: "/monthly-todo-2", icon: "bi-check2-square", label: "(05–08) May – August" },
        { href: "/monthly-todo-3", icon: "bi-check2-square", label: "(09–12) September – December" },


];

const ManthlyTodoIndex: React.FC = () => {
    return (
        <Layout>
            <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-start pt-5">
                <div className="container">
                    <h2 className="text-center mb-4">Monthly Todos</h2>
                    <ProgressBarByTimeIndex
                        minTimeIndex={33}
                        maxTimeIndex={44}
                        color="#ffc107" // Bootstrap 5 の text-warning 色（オレンジ）
                    />

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
                    <FilteredTodoList minTimeIndex={33} maxTimeIndex={44} />
                    <ClearRangeButton minTimeIndex={33} maxTimeIndex={44} label="Clear Manthly ToDos" />
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

export default ManthlyTodoIndex;
