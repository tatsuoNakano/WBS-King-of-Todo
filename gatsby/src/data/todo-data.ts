// src/data/todo-data.ts

export type TodoCategoryType = "day" | "week" | "month" | "year";

export interface TodoCategoryMeta {
    idRange: [number, number];       // ID range
    label: string;                   // Display label (i18n optional)
    gradientFrom: string;           // Gradient start color
    gradientTo: string;             // Gradient end color
    sections: number;               // Number of sub-sections
}

export const TODO_CATEGORIES: Record<TodoCategoryType, TodoCategoryMeta> = {
    day: {
        idRange: [1, 24],
        label: "Daily",
        gradientFrom: "#B3D4FC",
        gradientTo: "#2C66B8",
        sections: 4, // 6-hour × 4
    },
    week: {
        idRange: [25, 32],
        label: "Weekly",
        gradientFrom: "#B9F6CA",
        gradientTo: "#1B5E20",
        sections: 4, // 2-day × 4
    },
    month: {
        idRange: [33, 44],
        label: "Monthly",
        gradientFrom: "#F8CBA3",
        gradientTo: "#C56200",
        sections: 4, // 3-month × 4
    },
    year: {
        idRange: [45, 52],
        label: "Yearly",
        gradientFrom: "#E1C8F5",
        gradientTo: "#6A1B9A",
        sections: 4, // 2-year × 4
    },
};
