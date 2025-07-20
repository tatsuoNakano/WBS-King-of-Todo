// components/ProgressBarByTimeIndex.tsx
import React, { useEffect, useRef } from "react"
import * as d3 from "d3"

interface Todo {
    id: string
    title: string
    completed: boolean
    timeIndex: number
}

interface Props {
    minTimeIndex: number
    maxTimeIndex: number
    width?: number
    height?: number
    color?: string // 外部から受け取る色
}

const ProgressBarByTimeIndex: React.FC<Props> = ({
                                                     minTimeIndex,
                                                     maxTimeIndex,
                                                     width = 300,
                                                     height = 20,
                                                     color = "#0dcaf0", // text-info 相当
                                                 }) => {
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const allTodos: Todo[] = []

        // localStorage全体を走査
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (!key) continue

            try {
                const item = JSON.parse(localStorage.getItem(key) || "[]")

                if (Array.isArray(item)) {
                    const validTodos = item.filter(
                        (todo) =>
                            todo &&
                            typeof todo === "object" &&
                            "timeIndex" in todo &&
                            typeof todo.timeIndex === "number" &&
                            typeof todo.completed === "boolean"
                    ) as Todo[]

                    allTodos.push(...validTodos)
                }
            } catch (e) {
                console.warn(`Error reading localStorage key: ${key}`, e)
            }
        }

        const filtered = allTodos.filter(
            (todo) =>
                todo.timeIndex >= minTimeIndex &&
                todo.timeIndex <= maxTimeIndex
        )

        const completedCount = filtered.filter((t) => t.completed).length
        const totalCount = filtered.length
        const completionRate = totalCount === 0 ? 0 : completedCount / totalCount

        const svg = d3.select(svgRef.current)
        svg.selectAll("*").remove()

        const barWidth = width
        const barHeight = height

        svg
            .append("rect")
            .attr("width", barWidth)
            .attr("height", barHeight)
            .attr("fill", "#eee")
            .attr("rx", 5)

        svg
            .append("rect")
            .attr("width", barWidth * completionRate)
            .attr("height", barHeight)
            .attr("fill", color) // ← ここを変更
            .attr("rx", 5)

        // ↓ 元のテキストを以下に差し替え
        svg
            .append("text")
            .text(`${completedCount} / ${totalCount}`)
            .attr("x", barWidth / 2)
            .attr("y", barHeight / 2 + 5)
            .attr("text-anchor", "middle")
            .attr("fill", "#333")
            .attr("font-size", "16px")
            .attr("font-weight", "bold")

        svg
            .append("title")
            .text(`Completed: ${completedCount} / ${totalCount} (${(completionRate * 100).toFixed(1)}%)`)

    }, [minTimeIndex, maxTimeIndex, color])

    return (
        <div className="d-flex justify-content-center my-4">
            <svg ref={svgRef} width={width} height={height} />
        </div>
    )
}

export default ProgressBarByTimeIndex
