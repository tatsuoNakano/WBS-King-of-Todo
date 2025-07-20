import React from "react"

interface Props {
    minTimeIndex: number
    maxTimeIndex: number
    label?: string
}

const ClearRangeButton: React.FC<Props> = ({ minTimeIndex, maxTimeIndex, label = "Clear This Range" }) => {
    const handleClear = () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete all ToDo items with timeIndex between ${minTimeIndex} and ${maxTimeIndex}?`
        )
        if (!confirmed) return

        // すべてのキーを事前に取得（インデックスのズレ防止）
        const allKeys = Object.keys(localStorage)

        for (const key of allKeys) {
            try {
                const raw = localStorage.getItem(key)
                const items = JSON.parse(raw || "[]")

                if (!Array.isArray(items)) continue

                // 指定範囲以外を残す
                const filtered = items.filter((item: any) => {
                    return (
                        typeof item.timeIndex !== "number" ||
                        item.timeIndex < minTimeIndex ||
                        item.timeIndex > maxTimeIndex
                    )
                })

                if (filtered.length !== items.length) {
                    if (filtered.length === 0) {
                        localStorage.removeItem(key)
                    } else {
                        localStorage.setItem(key, JSON.stringify(filtered))
                    }
                }
            } catch (e) {
                console.warn(`Failed to parse or filter localStorage item: ${key}`, e)
            }
        }

        alert("ToDo items in the selected range have been deleted.")
        window.location.reload()
    }

    return (
        <button onClick={handleClear} className="btn btn-outline-danger text-white mt-3">
            {label}
        </button>
    )
}

export default ClearRangeButton
