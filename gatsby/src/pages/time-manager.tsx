// /src/pages/time-manager.tsx
import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/Common/Layout"
import PomodoroTimer from "../components/TimeManager/PomodoroTimer";
import WorkTimer from "../components/TimeManager/WorkTimer";
import PieChart from "../components/TimeManager/PieChart";
// ここに PomodoroTimer, WorkTimer, PieChart, BarChart を import（仮名）

const TimeManager: React.FC = () => {
    return (
        <Layout>
            <Container fluid className="text-light py-4">
                <Row>
                    {/* Left Column: タイマーエリア */}
                    <Col md={6} className="mb-4">
                        <div className="bg-dark p-3 rounded shadow">

                            <h4 className=" mb-3">作業タイマー</h4>
                             <WorkTimer />
                        </div>
                    </Col>

                    {/* Right Column: 円グラフエリア */}
                    <Col md={6} className="mb-4">
                        <div className="bg-dark p-3 rounded shadow">
                            <h4 className="mb-3">ポモドーロタイマー</h4>
                            <PomodoroTimer />

                        </div>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )
}

export default TimeManager
