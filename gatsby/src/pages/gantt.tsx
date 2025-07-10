import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Button, Form } from "react-bootstrap";
import Layout from "../components/Common/Layout";

type Task = {
    id: string;
    name: string;
    start: string;
    end: string;
};

const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 55%)`;
};

const GanttChart: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ name: "", start: "", end: "" });
    const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const stored = localStorage.getItem("ganttTasks");
        if (stored) {
            setTasks(JSON.parse(stored));
        } else {
            setTasks([
                { id: "1", name: "要件定義", start: "2025-07-08", end: "2025-07-10" },
                { id: "2", name: "設計", start: "2025-07-11", end: "2025-07-14" },
                { id: "3", name: "実装", start: "2025-07-15", end: "2025-07-20" }
            ]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("ganttTasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setChartSize({
                    width: containerRef.current.offsetWidth,
                    height: window.innerHeight - 200
                });
            }
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const renderChart = () => {
        if (!svgRef.current || chartSize.width === 0) return;

        d3.selectAll(".d3-tooltip").remove();

        const margin = { top: 40, right: 80, bottom: 40, left: 80 };
        const width = chartSize.width - margin.left - margin.right;
        const height = Math.max(tasks.length * 30, chartSize.height - margin.top - margin.bottom);

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const chart = svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const parseDate = d3.timeParse("%Y-%m-%d");
        const taskData = tasks.map(task => ({
            ...task,
            startDate: parseDate(task.start)!,
            endDate: parseDate(task.end)!,
            color: getRandomColor()
        }));

        const xScale = d3
            .scaleTime()
            .domain([
                d3.min(taskData, d => d.startDate)!,
                d3.max(taskData, d => d.endDate)!
            ])
            .range([0, width]);

        const yScale = d3
            .scaleBand()
            .domain(taskData.map(d => d.name))
            .range([0, height])
            .padding(0.2);

        chart.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).ticks(d3.timeDay.every(1)).tickFormat(d3.timeFormat("%m/%d")))
            .selectAll("text").attr("fill", "#ccc");

        chart.append("g")
            .call(d3.axisLeft(yScale))
            .selectAll("text").attr("fill", "#ccc");

        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "d3-tooltip")
            .style("position", "absolute")
            .style("background", "#212529")
            .style("color", "#fff")
            .style("padding", "6px 12px")
            .style("border", "1px solid #444")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("font-size", "0.9rem")
            .style("z-index", "9999")
            .style("opacity", 0);

        chart
            .selectAll("rect")
            .data(taskData)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.startDate))
            .attr("y", d => yScale(d.name)!)
            .attr("width", d => xScale(d.endDate) - xScale(d.startDate))
            .attr("height", yScale.bandwidth())
            .attr("fill", d => d.color)
            .on("mouseover", (event, d) => {
                tooltip
                    .html(`<strong>${d.name}</strong><br>${d.start} ～ ${d.end}`)
                    .style("opacity", 1);
            })
            .on("mousemove", event => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 28 + "px");
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            });
    };

    useEffect(() => {
        renderChart();
    }, [tasks, chartSize]);

    const addTask = () => {
        if (!newTask.name || !newTask.start || !newTask.end) return;
        const newId = Date.now().toString();
        setTasks([...tasks, { id: newId, ...newTask }]);
        setNewTask({ name: "", start: "", end: "" });
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <Layout>
            <div ref={containerRef} className="bg-dark text-white p-4 rounded" style={{ overflow: "hidden" }}>
                <h4 className="mb-3">ガントチャート</h4>
                <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />

                <div className="mt-4">
                    <h5>タスク追加</h5>
                    <Form className="row g-2">
                        <div className="col-md-4">
                            <Form.Control
                                type="text"
                                placeholder="タスク名"
                                value={newTask.name}
                                onChange={e => setNewTask({ ...newTask, name: e.target.value })}
                            />
                        </div>
                        <div className="col-md-3">
                            <Form.Control
                                type="date"
                                value={newTask.start}
                                onChange={e => setNewTask({ ...newTask, start: e.target.value })}
                            />
                        </div>
                        <div className="col-md-3">
                            <Form.Control
                                type="date"
                                value={newTask.end}
                                onChange={e => setNewTask({ ...newTask, end: e.target.value })}
                            />
                        </div>
                        <div className="col-md-2">
                            <Button variant="info" onClick={addTask} className="w-100">
                                追加
                            </Button>
                        </div>
                    </Form>
                </div>

                <div className="mt-3">
                    <h5>登録済みタスク</h5>
                    <ul className="list-group list-group-flush">
                        {tasks.map(task => (
                            <li
                                key={task.id}
                                className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white border-secondary"
                            >
                                <div>
                                    {task.name}（{task.start} ～ {task.end}）
                                </div>
                                <Button variant="outline-danger" size="sm" onClick={() => deleteTask(task.id)}>
                                    削除
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default GanttChart;
