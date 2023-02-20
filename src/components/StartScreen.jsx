import React from "react"

export default function StartScreen(props) {
    const [difficultyState, setDifficultyState] = React.useState(props.difficulty)

    function handleChange(event) {
        setDifficultyState(event.target.value)
    }

    return (
        <div className="start-screen">
            <h1 className="start-title">Quizzical</h1>
            <p className="start-description">Prove your knowledge of the world!</p>
            <form className="difficulty-form">
                <p>Choose difficulty:</p>
                <label>
                    <input
                        type="radio"
                        name="difficulty"
                        value="easy"
                        checked={difficultyState === "easy"}
                        onChange={handleChange}
                    />
                    Easy
                </label>
                <label>
                    <input
                        type="radio"
                        name="difficulty"
                        value="medium"
                        checked={difficultyState === "medium"}
                        onChange={handleChange}
                    />
                    Medium
                </label>
                <label>
                    <input
                        type="radio"
                        name="difficulty"
                        value="hard"
                        checked={difficultyState === "hard"}
                        onChange={handleChange}
                    />
                    Hard
                </label>
            </form>
            <button 
                className="btn hvr-wobble-horizontal" 
                onClick={() => props.handleStartClick(difficultyState)}
            >Start quiz</button>
        </div>
    )
}