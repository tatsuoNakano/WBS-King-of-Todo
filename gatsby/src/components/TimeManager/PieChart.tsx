import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Props {
    workSeconds: number;
    breakSeconds: number;
}

const PieChart: React.FC<Props> = ({ workSeconds, breakSeconds }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const totalSeconds = 86400; // 24時間 = 60 * 60 * 24
    const otherSeconds = Math.max(0, totalSeconds - workSeconds - breakSeconds);

    const data = [
        { label: "作業時間", value: workSeconds, color: "#0d6efd" }, // Bootstrap Blue
        { label: "休憩時間", value: breakSeconds, color: "#20c997" }, // Bootstrap Teal
        { label: "その他", value: otherSeconds, color: "#6c757d" },   // Bootstrap Gray
    ];

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // 初期化

        const width = 320;
        const height = 320;
        const radius = Math.min(width, height) / 2 - 10;

        const pie = d3
            .pie<{ label: string; value: number }>()
            .value((d) => d.value)
            .sort(null);

        const arc = d3
            .arc<d3.PieArcDatum<{ label: string; value: number }>>()
            .innerRadius(60)
            .outerRadius(radius);

        const g = svg
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        g.selectAll("path")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc as any)
            .attr("fill", (d, i) => data[i].color)
            .attr("stroke", "#111")
            .attr("stroke-width", "1");

        // ラベル
        g.selectAll("text")
            .data(pie(data))
            .enter()
            .append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .attr("fill", "#fff")
            .attr("font-size", "10px")
            .text(d => `${d.data.label}`);

    }, [workSeconds, breakSeconds]);

    return (
        <svg ref={svgRef} width={320} height={320} />
    );
};

export default PieChart;
