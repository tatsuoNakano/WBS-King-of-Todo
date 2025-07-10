// src/pages/mermaid.tsx
import React from "react"
import Layout from "../components/Common/Layout"

const MermaidPage: React.FC = () => {
    return (
        <Layout>
            <div className="p-4 text-light bg-black min-vh-100">
                <h1 className="text-info">Mermaid</h1>
                {/* Mermaid.js グラフはここに追加されます */}
            </div>
        </Layout>
    )
}

export default MermaidPage
