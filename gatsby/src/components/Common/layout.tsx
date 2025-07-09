import React, { ReactNode } from "react"
import Header from "./Header"

type Props = {
    children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <main
                className="bg-dark text-light"
                style={{
                    marginTop: "60px",
                    padding: "1rem",
                    minHeight: "100vh",
                }}
            >
                {children}
            </main>
        </>
    )
}

export default Layout
