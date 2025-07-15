import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { GraphType } from "./types";

type Props = {
    data: number[];
    type: GraphType;
};

const GraphRenderer: React.FC<Props> = ({ data, type }) => {
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!ref.current || data.length === 0) return;

        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        const container = ref.current.parentElement;
        const width = container?.clientWidth ?? 600;
        const height = container?.clientHeight ?? 400;

        const margin = { top: 20, right: 20, bottom: 40, left: 40 };

        // Tooltip divを作成
        const tooltip = d3
            .select(container)
            .append("div")
            .style("position", "absolute")
            .style("background", "#333")
            .style("color", "#fff")
            .style("padding", "6px 10px")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("font-size", "14px")
            .style("opacity", 0);

        const showTooltip = (event: MouseEvent, value: number, index: number) => {
            tooltip
                .html(`Index: ${index}<br/>Value: ${value}`)
                .style("left", `${event.offsetX + 10}px`)
                .style("top", `${event.offsetY - 30}px`)
                .style("opacity", 1);
        };

        const hideTooltip = () => {
            tooltip.style("opacity", 0);
        };

        if (type === "bar" || type === "line" || type === "area") {
            const x =
                type === "bar"
                    ? d3
                        .scaleBand()
                        .domain(data.map((_, i) => i.toString()))
                        .range([margin.left, width - margin.right])
                        .padding(0.2)
                    : d3
                        .scaleLinear()
                        .domain([0, data.length - 1])
                        .range([margin.left, width - margin.right]);

            const y = d3
                .scaleLinear()
                .domain([0, d3.max(data)!])
                .nice()
                .range([height - margin.bottom, margin.top]);

            if (type === "bar") {
                svg
                    .append("g")
                    .attr("fill", "#66b0ff")
                    .selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", (_, i) => (x as d3.ScaleBand<string>)(i.toString())!)
                    .attr("y", d => y(d))
                    .attr("width", (x as d3.ScaleBand<string>).bandwidth())
                    .attr("height", d => y(0) - y(d))
                    .on("mouseover", function (_, d, i) {
                        d3.select(this).attr("fill", "#88ccff");
                    })
                    .on("mousemove", (event, d, i) => showTooltip(event, d, i))
                    .on("mouseout", function () {
                        d3.select(this).attr("fill", "#66b0ff");
                        hideTooltip();
                    });
            }

            if (type === "line" || type === "area") {
                const line = d3
                    .line<number>()
                    .x((_, i) => (x as d3.ScaleLinear<number, number>)(i))
                    .y(d => y(d))
                    .curve(d3.curveMonotoneX);

                if (type === "area") {
                    const area = d3
                        .area<number>()
                        .x((_, i) => (x as d3.ScaleLinear<number, number>)(i))
                        .y0(y(0))
                        .y1(d => y(d))
                        .curve(d3.curveMonotoneX);

                    svg
                        .append("path")
                        .datum(data)
                        .attr("fill", "#88ccff")
                        .attr("d", area as any);
                }

                svg
                    .append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "#ffffff")
                    .attr("stroke-width", 2)
                    .attr("d", line as any);

                // 点にツールチップ
                svg
                    .selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", (_, i) => (x as d3.ScaleLinear<number, number>)(i))
                    .attr("cy", d => y(d))
                    .attr("r", 4)
                    .attr("fill", "#ffffff")
                    .on("mousemove", (event, d, i) => showTooltip(event, d, i))
                    .on("mouseout", hideTooltip);
            }

            svg
                .append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(
                    d3
                        .axisBottom(x)
                        .ticks(data.length)
                        .tickFormat((_, i) => `#${i}`)
                );

            svg
                .append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y));
        }

        if (type === "pie" || type === "donut") {
            const pieMargin = { top: 20, right: 20, bottom: 20, left: 20 };
            const adjustedWidth = width - pieMargin.left - pieMargin.right;
            const adjustedHeight = height - pieMargin.top - pieMargin.bottom;
            const radius = Math.min(adjustedWidth, adjustedHeight) / 2 * 0.9;

            const pieGroup = svg
                .append("g")
                .attr(
                    "transform",
                    `translate(${pieMargin.left + adjustedWidth / 2},${pieMargin.top + adjustedHeight / 2})`
                );

            const pie = d3.pie<number>().value(d => d);
            const arc = d3
                .arc<d3.PieArcDatum<number>>()
                .innerRadius(type === "donut" ? radius * 0.5 : 0)
                .outerRadius(radius);

            const color = d3.scaleOrdinal(d3.schemeCategory10);

            pieGroup
                .selectAll("path")
                .data(pie(data))
                .enter()
                .append("path")
                .attr("d", arc as any)
                .attr("fill", (_, i) => color(i.toString()) as string)
                .attr("stroke", "#222")
                .attr("stroke-width", "1px")
                .on("mousemove", (event, d, i) => showTooltip(event, d.data, i))
                .on("mouseout", hideTooltip);
        }

        return () => {
            tooltip.remove();
        };
    }, [data, type]);

    return <svg ref={ref} width="100%" height="100%" />;
};

export default GraphRenderer;
