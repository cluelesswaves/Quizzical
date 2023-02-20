import React from "react"
import StartScreen from "./components/StartScreen.jsx"
import QuestionsScreen from "./components/QuestionsScreen.jsx"
import "./App.css"

export default function App() {
    const [isStart, setIsStart] = React.useState(true)
    const [difficulty, setDifficulty] = React.useState("easy")
       
    function handleStartClick(dif) {
        setIsStart(false)
        setDifficulty(dif)
    }
    
    return (
        <main>
            <div className="top-blob"></div>
            {isStart ? <StartScreen difficulty={difficulty} handleStartClick={handleStartClick}/> : <QuestionsScreen dif={difficulty}/>}
            <div className="bottom-blob"></div>
        </main>
    )
}