import React, { useEffect, useRef, useState } from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";

const STORAGE_KEY = "pomodoro-timer";

const PomodoroTimer: React.FC = () => {
    const [seconds, setSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const notifyLabelRef = useRef<string>("");

    const formatTime = (sec: number) =>
        `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

    const updateProgress = () => {
        if (!totalSeconds) return 0;
        return ((totalSeconds - seconds) / totalSeconds) * 100;
    };

    const notifyUser = (label: string) => {
        if ((window as any).safeAPI) {
            (window as any).safeAPI.notify(label, "時間になりました！");
        }
        if ("Notification" in window) {
            if (Notification.permission === "granted") {
                new Notification(label, {
                    body: "時間になりました！",
                    icon: "assets/icon.png",
                });
            } else {
                Notification.requestPermission().then((perm) => {
                    if (perm === "granted") {
                        new Notification(label, {
                            body: "時間になりました！",
                            icon: "assets/icon.png",
                        });
                    }
                });
            }
        }
        alert("時間です！");
    };

    const saveToStorage = (data: any) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const startInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setSeconds((prev) => {
                const next = prev - 1;
                if (next <= 0) {
                    clearInterval(intervalRef.current!);
                    setIsRunning(false);
                    notifyUser(notifyLabelRef.current);
                    if (notifyLabelRef.current === "Pomodoro 完了") {
                        setCompletedSessions((c) => Math.min(c + 1, 12));
                    }
                    localStorage.removeItem(STORAGE_KEY);
                    return 0;
                }
                return next;
            });
        }, 1000);
    };

    const initializeTimer = (duration: number, label: string) => {
        const startedAt = Date.now();
        setSeconds(duration);
        setTotalSeconds(duration);
        setIsRunning(true);
        setIsPaused(false);
        notifyLabelRef.current = label;

        saveToStorage({
            startedAt,
            totalSeconds: duration,
            isPaused: false,
            isRunning: true,
            label,
            completedSessions,
        });

        startInterval();
    };

    const handleStart = () => {
        const minutes = parseInt(
            (document.getElementById("work-minutes") as HTMLInputElement)?.value || "25"
        );
        if (!isNaN(minutes)) {
            initializeTimer(minutes * 60, "Pomodoro 完了");
        }
    };

    const handleBreak = () => {
        initializeTimer(5 * 60, "休憩終了");
    };

    const handlePause = () => {
        if (!isRunning) return;
        setIsPaused((prev) => {
            const newPaused = !prev;
            if (newPaused) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            } else {
                const startedAt = Date.now() - (totalSeconds - seconds) * 1000;
                saveToStorage({
                    startedAt,
                    totalSeconds,
                    isPaused: false,
                    isRunning,
                    label: notifyLabelRef.current,
                    completedSessions,
                });
                startInterval();
            }
            return newPaused;
        });
    };

    const restoreFromStorage = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;
        const {
            startedAt,
            totalSeconds,
            isPaused,
            isRunning,
            label,
            completedSessions,
        } = JSON.parse(saved);

        const elapsed = Math.floor((Date.now() - startedAt) / 1000);
        const remaining = Math.max(totalSeconds - elapsed, 0);

        setSeconds(remaining);
        setTotalSeconds(totalSeconds);
        setIsPaused(isPaused);
        setIsRunning(isRunning);
        setCompletedSessions(completedSessions || 0);
        notifyLabelRef.current = label;

        if (isRunning && !isPaused && remaining > 0) {
            startInterval();
        }
    };

    const handleDropdownToggle = () => {
        setDropdownVisible((prev) => !prev);
    };

    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".dropdown-button")) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener("click", closeDropdown);
        return () => document.removeEventListener("click", closeDropdown);
    }, []);

    useEffect(() => {
        restoreFromStorage();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div>
            <Form.Group controlId="work-minutes">
                <Form.Label>作業時間（分）</Form.Label>
                <Form.Control
                    type="number"
                    defaultValue={25}
                    className="bg-dark text-info border-info fs-3"
                />
            </Form.Group>

            <h3 className="mt-3 fs-1 text-info" id="timer-display">
                {formatTime(seconds)}
            </h3>

            <ProgressBar
                now={updateProgress()}
                variant="info"
                className="mb-3"
                id="progress-bar"
            />

            <div className="d-flex gap-2">
                <Button id="start-timer" variant="outline-info" onClick={handleStart}>
                    ▶ 作業開始
                </Button>
                <Button id="break-timer" variant="outline-info" onClick={handleBreak}>
                    休憩
                </Button>
                <Button
                    id="stop-timer"
                    variant="outline-info"
                    onClick={handlePause}
                >
                    {isPaused ? "▶ 再開" : "一時停止"}
                </Button>
            </div>

            <div id="indicator-container" className="mt-3">
                {[...Array(12)].map((_, i) => (
                    <span
                        key={i}
                        className="dot mx-1"
                        style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: i < completedSessions ? "#0dcaf0" : "#6c757d",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PomodoroTimer;
