// src/components/seo.tsx

import * as React from "react"

type Props = {
    title?: string
}

const Seo: React.FC<Props> = ({ title }) => {
    React.useEffect(() => {
        if (title) document.title = title
    }, [title])

    return null
}

export default Seo
