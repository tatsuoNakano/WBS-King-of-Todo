import React, { useEffect, useRef, useState } from "react"
import Sortable from "sortablejs"

interface Todo {
    id: string
    title: string
    completed: boolean
    timeIndex: number
}

interface Props {
    storageKey: string
    timeIndex: number
    initialTitle?: string
}

const TodoListWithMarkdownExport: React.FC<Props> = ({ storageKey, timeIndex, initialTitle }) => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [input, setInput] = useState("")
    const [title, setTitle] = useState(initialTitle || "")
    const listRef = useRef<HTMLUListElement>(null)
    const todosRef = useRef<Todo[]>([])

    const titleStorageKey = `${storageKey}-title`

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(storageKey) || "[]")
            setTodos(Array.isArray(stored) ? stored : [])
            todosRef.current = Array.isArray(stored) ? stored : []
        } catch (e) {
            console.error("Failed to parse todos:", e)
        }

        // タイトルも読み込む
        const savedTitle = localStorage.getItem(titleStorageKey)
        if (savedTitle) setTitle(savedTitle)
    }, [storageKey])

    useEffect(() => {
        if (listRef.current) {
            Sortable.create(listRef.current, {
                animation: 150,
                onEnd: () => {
                    const newOrder: Todo[] = []
                    listRef.current!.querySelectorAll("li").forEach(li => {
                        const id = li.getAttribute("data-id")!
                        const task = todosRef.current.find(t => t.id === id)
                        if (task) newOrder.push(task)
                    })
                    setTodos(newOrder)
                    todosRef.current = newOrder
                    localStorage.setItem(storageKey, JSON.stringify(newOrder))
                }
            })
        }
    }, [])

    useEffect(() => {
        todosRef.current = todos
        localStorage.setItem(storageKey, JSON.stringify(todos))
    }, [todos, storageKey])

    useEffect(() => {
        localStorage.setItem(titleStorageKey, title)
    }, [title])

    const addTodo = () => {
        const items = input
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "")

        if (items.length === 0) return

        const newTasks: Todo[] = items.map((item, i) => ({
            id: `${storageKey}-${Date.now()}-${i}`,
            title: item,
            completed: false,
            timeIndex
        }))

        const updated = [...todos, ...newTasks]
        setTodos(updated)
        setInput("")
    }

    const toggleComplete = (id: string) => {
        setTodos(prev =>
            prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
        )
    }

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(t => t.id !== id))
    }

    const exportMarkdown = async () => {
        const lines = todos.map(t => `${t.completed ? "- [x]" : "- [ ]"} ${t.title}`)
        const markdown = `# ${title || "ToDo list"}\n\n${lines.join("\n")}\n`
        try {
            const fileAPI = (window as any).fileAPI
            if (fileAPI?.saveMarkdown) {
                const filePath = await fileAPI.saveMarkdown(markdown)
                if (filePath) alert(`Saved:\n${filePath}`)
            } else {
                const blob = new Blob([markdown], { type: "text/markdown" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "todo.md"
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
            }
        } catch (e) {
            console.error("Markdown save error:", e)
            alert("Markdown Failed to save")
        }
    }

    return (
        <div className="p-3 bg-dark text-light rounded">
            <input
                type="text"
                className="form-control mb-3 bg-dark text-light border-light text-center"
                placeholder="タイトルを入力"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <div className="d-flex gap-2 mb-3">
                <input
                    type="text"
                    className="form-control bg-dark text-light border-light"
                    placeholder="New ToDo"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addTodo()}
                />
                <button className="btn btn-outline-info" onClick={addTodo}>add</button>
                <button className="btn btn-outline-light" onClick={exportMarkdown}>
                    DL
                </button>
            </div>

            <ul ref={listRef} className="list-group bg-dark">
                {todos.map(task => (
                    <li
                        key={task.id}
                        data-id={task.id}
                        className="list-group-item d-flex justify-content-between align-items-center bg-dark border-secondary"
                    >
                        <div className="d-flex align-items-center">
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                checked={task.completed}
                                onChange={() => toggleComplete(task.id)}
                            />
                            <span
                                className={`ms-2 text-light ${task.completed ? "text-decoration-line-through" : ""}`}
                            >
                {task.title}
              </span>
                        </div>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteTodo(task.id)}
                        >
                            🗑
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoListWithMarkdownExport
