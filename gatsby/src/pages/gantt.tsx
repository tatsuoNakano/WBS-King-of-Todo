import React from "react"
import DailyGanttChart from "../components/gantt/DailyGanttChart"
import Layout from "../components/Common/Layout"
import WeeklyGanttChart from "../components/gantt/WeeklyGanttChart"
import MonthlyGanttChart from "../components/gantt/MonthlyGanttChart"
import YearlyGanttChart from "../components/gantt/YearlyGanttChart"
import Card from "react-bootstrap/Card"

const DailyGanttChartPage: React.FC = () => {
    return (
        <Layout>
            <div style={{ padding: "2rem", backgroundColor: "#121212", color: "#f8f9fa" }}>
                <Card bg="dark" text="light" className="mb-4 border border-secondary shadow-sm">
                    <Card.Header className="bg-secondary fw-bold">Daily Gantt Chart</Card.Header>
                    <Card.Body>
                        <DailyGanttChart />
                    </Card.Body>
                </Card>

                <Card bg="dark" text="light" className="mb-4 border border-secondary shadow-sm">
                    <Card.Header className="bg-secondary fw-bold">Weekly Gantt Chart</Card.Header>
                    <Card.Body>
                        <WeeklyGanttChart />
                    </Card.Body>
                </Card>

                <Card bg="dark" text="light" className="mb-4 border border-secondary shadow-sm">
                    <Card.Header className="bg-secondary fw-bold">Monthly Gantt Chart</Card.Header>
                    <Card.Body>
                        <MonthlyGanttChart />
                    </Card.Body>
                </Card>

                <Card bg="dark" text="light" className="mb-4 border border-secondary shadow-sm">
                    <Card.Header className="bg-secondary fw-bold">Yearly Gantt Chart</Card.Header>
                    <Card.Body>
                        <YearlyGanttChart />
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default DailyGanttChartPage
