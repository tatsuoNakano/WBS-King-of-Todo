import React, { useEffect, useRef, useState } from "react"
import { Button, Form, ProgressBar } from "react-bootstrap"

const PomodoroTimer: React.FC = () => {
    const [seconds, setSeconds] = useState(0)
    const [totalSeconds, setTotalSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [completedSessions, setCompletedSessions] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const startTimeRef = useRef<number | null>(null)
    const labelRef = useRef<string>("")

    const formatTime = (sec: number): string =>
        `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`

    const notifyUser = (title: string) => {
        if ("Notification" in window) {
            if (Notification.permission === "granted") {
                new Notification(title, { body: "時間になりました！" })
            } else {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification(title, { body: "時間になりました！" })
                    }
                })
            }
        }
        alert("時間です！")
    }

    const updateRemainingTime = () => {
        if (!startTimeRef.current || !totalSeconds || isPaused || !isRunning) return
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        const remaining = Math.max(totalSeconds - elapsed, 0)
        setSeconds(remaining)
        if (remaining === 0) {
            clearInterval(intervalRef.current!)
            setIsRunning(false)
            setIsPaused(false)
            notifyUser(labelRef.current)
            setCompletedSessions(c => Math.min(c + 1, 12))
        }
    }

    const startInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(updateRemainingTime, 1000)
    }

    const initializeTimer = (duration: number, label: string) => {
        startTimeRef.current = Date.now()
        setTotalSeconds(duration)
        setIsRunning(true)
        setIsPaused(false)
        setSeconds(duration)
        labelRef.current = label
        startInterval()
    }

    const handleStart = () => {
        const minutes = parseInt((document.getElementById("work-minutes") as HTMLInputElement).value || "25")
        if (!isNaN(minutes)) {
            initializeTimer(minutes * 60, "Pomodoro 完了")
        }
    }

    const handleBreak = () => {
        initializeTimer(5 * 60, "休憩終了")
    }

    const handlePause = () => {
        if (!isRunning) return
        setIsPaused(prev => {
            if (prev) {
                startTimeRef.current = Date.now() - ((totalSeconds - seconds) * 1000)
                startInterval()
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current)
            }
            return !prev
        })
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    const progressPercent = totalSeconds > 0 ? ((totalSeconds - seconds) / totalSeconds) * 100 : 0

    return (
        <div>
            <Form.Group controlId="work-minutes">
                <Form.Label>作業時間（分）</Form.Label>
                <Form.Control type="number" defaultValue={25} className="bg-dark text-info border-info fs-3" />
            </Form.Group>

            <h3 className="mt-3 fs-1 text-info">{formatTime(seconds)}</h3>
            <ProgressBar now={progressPercent} variant="info" className="mb-3" />

            <div className="d-flex gap-2">
                <Button variant="outline-info" onClick={handleStart}>▶ 作業開始</Button>
                <Button variant="outline-info" onClick={handleBreak}>休憩</Button>
                <Button variant="outline-info" onClick={handlePause}>
                    {isPaused ? "▶ 再開" : "一時停止"}
                </Button>
            </div>

            <div className="mt-3">
                <span>完了済セッション: </span>
                {[...Array(12)].map((_, i) => (
                    <span
                        key={i}
                        className={`dot mx-1`}
                        style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: i < completedSessions ? "#0dcaf0" : "#6c757d"
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default PomodoroTimer
