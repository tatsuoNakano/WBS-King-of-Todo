import React, { useState } from "react"
import plantumlEncoder from "plantuml-encoder"

const PlantUMLEditor: React.FC = () => {
    const [source, setSource] = useState(`@startuml
Alice -> Bob: Hello
@enduml`)

    const encoded = plantumlEncoder.encode(source)
    const imageUrl = `https://www.plantuml.com/plantuml/svg/${encoded}`

    return (
        <div>
      <textarea
          className="form-control mb-3"
          value={source}
          rows={6}
          onChange={(e) => setSource(e.target.value)}
      />
            <img src={imageUrl} alt="UML preview" />
        </div>
    )
}

export default PlantUMLEditor
