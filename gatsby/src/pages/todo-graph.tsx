// pages/todo-graph.tsx
import React from "react"
import Layout from "../components/Common/Layout";
import ProgressBarByTimeIndex from "../components/Todo/TodoProgressBar";


const TodoGraphPage: React.FC = () => {
    return (
        <Layout>
            <div className="container py-4">
                <h2 className="text-center mb-4">Progress Overview</h2>

                {/* プログレスバー4本 */}
                <div className="mb-5">
                    <div className="card mb-3 bg-dark text-white shadow-sm rounded border border-white">
                        <div className="card-body">
                            <h5 className="card-title">Daily</h5>
                            <ProgressBarByTimeIndex minTimeIndex={1} maxTimeIndex={24} color="#0dcaf0" />
                        </div>
                    </div>

                    <div className="card mb-3 bg-dark text-white shadow-sm rounded border border-white">
                        <div className="card-body">
                            <h5 className="card-title">Weekly</h5>
                            <ProgressBarByTimeIndex minTimeIndex={25} maxTimeIndex={32} color="#28a745" />
                        </div>
                    </div>

                    <div className="card mb-3 bg-dark text-white shadow-sm rounded border border-white">

                    <div className="card-body">
                            <h5 className="card-title">Monthly</h5>
                            <ProgressBarByTimeIndex minTimeIndex={33} maxTimeIndex={44} color="#fd7e14" />
                        </div>
                    </div>

                    <div className="card mb-3 bg-dark text-white shadow-sm rounded border border-white">

                    <div className="card-body">
                            <h5 className="card-title">Yearly</h5>
                            <ProgressBarByTimeIndex minTimeIndex={45} maxTimeIndex={52} color="#6f42c1" />
                        </div>
                    </div>

                    <div className="card mb-3 bg-dark text-white shadow-sm rounded border border-white">

                    <div className="card-body">
                            <h5 className="card-title">Todo (Other)</h5>
                            <ProgressBarByTimeIndex minTimeIndex={53} maxTimeIndex={56} color="#6c757d" />
                        </div>
                    </div>

                    <div className="card mb-3 bg-dark text-white shadow-sm rounded border border-white">

                    <div className="card-body">
                            <h5 className="card-title">All</h5>
                            <ProgressBarByTimeIndex minTimeIndex={1} maxTimeIndex={56} color="#dc3545" />
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default TodoGraphPage
