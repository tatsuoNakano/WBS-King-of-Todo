import React, { useEffect, useState } from "react"

interface Todo {
    id: string
    title: string
    completed: boolean
    timeIndex: number
    storageKey: string
}

interface TodoWithMeta extends Todo {
    storageTitle?: string
}

interface Props {
    minTimeIndex: number
    maxTimeIndex: number
}

const getGradientColor = (timeIndex: number): string => {
    const gradients = {
        day: ["#B3D4FC", "#7DA7E3", "#4C85D0", "#2C66B8"],
        week: ["#B9F6CA", "#66DC96", "#35AD5D", "#1B5E20"],
        month: ["#F8CBA3", "#F09B5F", "#DE7A30", "#C56200"],
        year: ["#E1C8F5", "#B68DD9", "#8D5CBF", "#6A1B9A"],
    }

    if (timeIndex >= 1 && timeIndex <= 24)
        return gradients.day[Math.floor((timeIndex - 1) / 6)]
    if (timeIndex >= 25 && timeIndex <= 32)
        return gradients.week[Math.floor((timeIndex - 25) / 2)]
    if (timeIndex >= 33 && timeIndex <= 44)
        return gradients.month[Math.floor((timeIndex - 33) / 3)]
    if (timeIndex >= 45 && timeIndex <= 52)
        return gradients.year[Math.floor((timeIndex - 45) / 2)]

    return "#666"
}

const getCategoryLabel = (timeIndex: number): string => {
    if (timeIndex >= 1 && timeIndex <= 24) return "Day"
    if (timeIndex >= 25 && timeIndex <= 32) return "Week"
    if (timeIndex >= 33 && timeIndex <= 44) return "Month"
    if (timeIndex >= 45 && timeIndex <= 52) return "Year"
    return "Other"
}

const FilteredTodoList: React.FC<Props> = ({ minTimeIndex, maxTimeIndex }) => {
    const [todos, setTodos] = useState<TodoWithMeta[]>([])

    useEffect(() => {
        const all: TodoWithMeta[] = []

        for (const key in localStorage) {
            if (key.endsWith("-title")) continue

            try {
                const value = localStorage.getItem(key)
                if (!value) continue
                const parsed = JSON.parse(value)

                if (Array.isArray(parsed)) {
                    const title = localStorage.getItem(`${key}-title`) || undefined

                    for (const item of parsed) {
                        if (
                            typeof item === "object" &&
                            item !== null &&
                            "id" in item &&
                            "title" in item &&
                            "timeIndex" in item &&
                            "completed" in item
                        ) {
                            const todo = item as Todo
                            if (todo.timeIndex >= minTimeIndex && todo.timeIndex <= maxTimeIndex) {
                                all.push({
                                    ...todo,
                                    storageKey: key,
                                    storageTitle: title,
                                })
                            }
                        }
                    }
                }
            } catch {
                continue
            }
        }

        all.sort((a, b) => a.timeIndex - b.timeIndex)
        setTodos(all)
    }, [minTimeIndex, maxTimeIndex])

    return (
        <ul className="list-group bg-dark">
            {todos.map((todo) => {
                const color = getGradientColor(todo.timeIndex)
                const label = getCategoryLabel(todo.timeIndex)

                return (
                    <li
                        key={todo.id}
                        className="list-group-item d-flex flex-column align-items-start border-secondary bg-dark text-light"
                    >
                        <div className="d-flex align-items-center mb-1">
              <span
                  style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      display: "inline-block",
                      marginRight: "10px",
                  }}
              />
                            <strong>{label} /</strong>
                            <span
                                className={`ms-2 text-light ${
                                    todo.completed ? "text-decoration-line-through" : ""
                                }`}
                            >
                {todo.storageTitle} / {todo.title}
              </span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default FilteredTodoList
