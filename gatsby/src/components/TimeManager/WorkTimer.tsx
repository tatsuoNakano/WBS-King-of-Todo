import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import PieChart from "./PieChart";

type Mode = "work" | "break" | null;

interface DailyTime {
    work: number;
    break: number;
}

interface StoredState {
    isRunning: boolean;
    mode: Mode;
    startedAt: number | null;
    work: number;
    break: number;
}

const getTodayKey = () => {
    const now = new Date();
    return now.toISOString().split("T")[0];
};

const WorkTimer: React.FC = () => {
    const [mode, setMode] = useState<Mode>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [dailyTime, setDailyTime] = useState<DailyTime>({ work: 0, break: 0 });

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // 初期読み込みと復元
    useEffect(() => {
        const key = `worktimer-${getTodayKey()}`;
        const saved = localStorage.getItem(key);
        if (saved) {
            const parsed: StoredState = JSON.parse(saved);
            const now = Date.now();

            let additional = 0;
            if (parsed.isRunning && parsed.startedAt) {
                additional = Math.floor((now - parsed.startedAt) / 1000);
            }

            const updated = {
                work: parsed.work + (parsed.mode === "work" ? additional : 0),
                break: parsed.break + (parsed.mode === "break" ? additional : 0),
            };

            setDailyTime(updated);
            setIsRunning(parsed.isRunning);
            setMode(parsed.mode);
        }
    }, []);

    // タイマー実行
    useEffect(() => {
        if (isRunning && mode) {
            intervalRef.current = setInterval(() => {
                setDailyTime((prev) => {
                    const updated = {
                        ...prev,
                        [mode]: prev[mode] + 1,
                    };

                    localStorage.setItem(`worktimer-${getTodayKey()}`, JSON.stringify({
                        isRunning: true,
                        mode: mode,
                        startedAt: Date.now(),
                        work: updated.work,
                        break: updated.break,
                    }));

                    return updated;
                });
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, mode]);

    const startTimer = (newMode: Mode) => {
        setMode(newMode);
        setIsRunning(true);

        localStorage.setItem(`worktimer-${getTodayKey()}`, JSON.stringify({
            isRunning: true,
            mode: newMode,
            startedAt: Date.now(),
            work: dailyTime.work,
            break: dailyTime.break,
        }));
    };

    return (
        <div className="d-flex justify-content-center bg-dark text-white">
            <div className="text-center py-4">
                <h5 className="mb-3">今日の作業タイマー</h5>

                <ButtonGroup className="mb-3">
                    <Button
                        variant={mode === "work" ? "primary" : "outline-light"}
                        onClick={() => startTimer("work")}
                    >
                        作業開始
                    </Button>
                    <Button
                        variant={mode === "break" ? "success" : "outline-light"}
                        onClick={() => startTimer("break")}
                    >
                        休憩開始
                    </Button>
                    <Button
                        variant="outline-light"
                        onClick={() => setIsRunning(!isRunning)}
                    >
                        {isRunning ? "一時停止" : "再開"}
                    </Button>
                    <Button
                        variant="outline-light"
                        onClick={() => {
                            setIsRunning(false);
                            setMode(null);
                            localStorage.setItem(`worktimer-${getTodayKey()}`, JSON.stringify({
                                isRunning: false,
                                mode: null,
                                startedAt: null,
                                work: dailyTime.work,
                                break: dailyTime.break,
                            }));
                        }}
                    >
                        停止
                    </Button>
                </ButtonGroup>

                <div className="mb-3">
                    <p className="fs-1 mb-1">作業時間: {(dailyTime.work / 60).toFixed(1)} 分</p>
                    <p className="fs-1">休憩時間: {(dailyTime.break / 60).toFixed(1)} 分</p>
                </div>

                <PieChart
                    workSeconds={dailyTime.work}
                    breakSeconds={dailyTime.break}
                />
            </div>
        </div>
    );
};

export default WorkTimer;
