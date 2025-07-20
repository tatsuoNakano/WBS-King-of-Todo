import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface Todo {
    id: string
    title: string
    completed: boolean
    timeIndex: number
}

const WIDTH = 800
const HEIGHT = 500
const MARGIN = { top: 40, right: 20, bottom: 40, left: 150 }

const dayLabels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Weekly",
]

const WeeklyGanttChart: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null)
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        const allTodos: Todo[] = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (!key) continue
            try {
                const value = JSON.parse(localStorage.getItem(key) || "[]")
                if (Array.isArray(value)) {
                    value.forEach((item: any) => {
                        if (
                            typeof item.timeIndex === "number" &&
                            item.timeIndex >= 25 &&
                            item.timeIndex <= 32
                        ) {
                            allTodos.push(item)
                        }
                    })
                }
            } catch (e) {
                console.warn(`Invalid item: ${key}`, e)
            }
        }

        // timeIndex昇順
        const sorted = allTodos.sort((a, b) => a.timeIndex - b.timeIndex)
        setTodos(sorted)
    }, [])

    useEffect(() => {
        if (!svgRef.current) return

        const svg = d3.select(svgRef.current)
        svg.selectAll("*").remove()

        const innerWidth = WIDTH - MARGIN.left - MARGIN.right
        const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom

        // 横軸：25〜32 を dayLabels にマッピング
        const xScale = d3
            .scaleBand<number>()
            .domain(d3.range(25, 33))
            .range([0, innerWidth])
            .padding(0.1)

        // 縦軸：ToDoごとの連番
        const yScale = d3
            .scaleBand<Todo>()
            .domain(todos)
            .range([0, innerHeight])
            .padding(0.2)

        const chart = svg
            .append("g")
            .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`)

        // 横軸（曜日）
        const xAxis = d3
            .axisBottom(xScale)
            .tickFormat(d => dayLabels[d - 25])

        chart
            .append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "12px")

        // 縦軸（連番）
        const yAxis = d3
            .axisLeft(yScale)
            .tickFormat((_, i) => String(i + 1))
        chart.append("g").call(yAxis)

        // ツールチップ
        const tooltip = d3
            .select("body")
            .append("div")
            .style("position", "absolute")
            .style("background", "#333")
            .style("color", "#fff")
            .style("padding", "6px 10px")
            .style("border-radius", "4px")
            .style("font-size", "12px")
            .style("display", "none")
            .style("pointer-events", "none")

        // ガントバー描画
        chart
            .selectAll("rect")
            .data(todos)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.timeIndex)!)
            .attr("y", d => yScale(d)!)
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            // .attr("fill", d => (d.completed ? "#fd7e14" : "#ffe5d0"))
            .attr("fill", d => (d.completed ? "#198754" : "#d1e7dd"))
            .on("mouseover", (event, d) => {
                tooltip
                    .html(d.title)
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 28 + "px")
                    .style("display", "block")
            })
            .on("mouseout", () => {
                tooltip.style("display", "none")
            })
    }, [todos])

    return <svg ref={svgRef} width={WIDTH} height={HEIGHT} />
}

export default WeeklyGanttChart
