import React, { useRef, useState } from "react";
import "../styles/Dice.css"
import Layout from "../components/Common/Layout";

const Dice: React.FC = () => {
    const cubeRef = useRef<HTMLDivElement>(null);
    const [rollCount, setRollCount] = useState(0);

    const baseRotations: Record<number, [number, number]> = {
        1: [0, 0],
        2: [-90, 0],
        3: [0, -90],
        4: [0, 90],
        5: [90, 0],
        6: [0, 180],
    };

    const [currentRotation, setCurrentRotation] = useState<[number, number]>([0, 0]);

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        const [baseX, baseY] = baseRotations[roll];
        const extraX = 360 * (Math.floor(Math.random() * 3) + 1);
        const extraY = 360 * (Math.floor(Math.random() * 3) + 1);
        const newX = currentRotation[0] + extraX + baseX;
        const newY = currentRotation[1] + extraY + baseY;

        if (cubeRef.current) {
            cubeRef.current.style.transform = `rotateX(${newX}deg) rotateY(${newY}deg)`;
        }

        setCurrentRotation([newX, newY]);
        setRollCount((prev) => prev + 1);
    };

    return (
        <Layout>
        <div className="dice-container">
            <div className="roll-count pb-5">振った回数: {rollCount}</div>
            <div className="scene mt-8">
                <div className="cube" ref={cubeRef} onClick={rollDice}>
                    {/* 1 */}
                    <div className="face front">
                        <div className="pip red" style={{ top: "50%", left: "50%" }} />
                    </div>
                    {/* 6 */}
                    <div className="face back">
                        {[25, 25, 25, 75, 75, 75].map((top, idx) => {
                            const left = [25, 50, 75, 25, 50, 75][idx];
                            return (
                                <div key={`6-${idx}`} className="pip" style={{ top: `${top}%`, left: `${left}%` }} />
                            );
                        })}
                    </div>
                    {/* 3 */}
                    <div className="face right">
                        <div className="pip" style={{ top: "25%", left: "25%" }} />
                        <div className="pip" style={{ top: "50%", left: "50%" }} />
                        <div className="pip" style={{ top: "75%", left: "75%" }} />
                    </div>
                    {/* 4 */}
                    <div className="face left">
                        <div className="pip" style={{ top: "25%", left: "25%" }} />
                        <div className="pip" style={{ top: "25%", left: "75%" }} />
                        <div className="pip" style={{ top: "75%", left: "25%" }} />
                        <div className="pip" style={{ top: "75%", left: "75%" }} />
                    </div>
                    {/* 5 */}
                    <div className="face top">
                        <div className="pip" style={{ top: "25%", left: "25%" }} />
                        <div className="pip" style={{ top: "25%", left: "75%" }} />
                        <div className="pip" style={{ top: "50%", left: "50%" }} />
                        <div className="pip" style={{ top: "75%", left: "25%" }} />
                        <div className="pip" style={{ top: "75%", left: "75%" }} />
                    </div>
                    {/* 2 */}
                    <div className="face bottom">
                        <div className="pip" style={{ top: "25%", left: "25%" }} />
                        <div className="pip" style={{ top: "75%", left: "75%" }} />
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default Dice;
