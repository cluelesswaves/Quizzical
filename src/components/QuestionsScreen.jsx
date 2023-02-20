import React from "react"
import Question from "./Question.jsx"

export default function QuestionsScreen(props) {
    const [isChecking, setIsChecking] = React.useState(false)
    const [questionsData, setQuestionsData] = React.useState([])
    const [totalPoints, setTotalPoints] = React.useState(0)
    
    // Get data from API
    React.useEffect(() => {
        const link = `https://opentdb.com/api.php?amount=5&difficulty=${props.dif}`
        console.log(link)
        if (!isChecking) {
            fetch(link)
                .then(res => res.json())
                .then(data => setQuestionsData(data.results.map(res => ({...res, point: 0}))))
        }
        
    }, [isChecking])
    
    // create Question components
    const questionsComponents = questionsData.map(q => (
    <Question 
        key={q.question} 
        question={q.question} 
        correctAnswer={q.correct_answer} 
        incorrectAnswers={q.incorrect_answers}
        countPoint={countPoint}
        isChecking={isChecking}
    />) )

    // Get point score from components
    function countPoint(val, point) {
        setQuestionsData(prevData => prevData.map(question => {
            return val === question.question ? 
                {...question, point: point} :
                question
        }))
    }
    // Count total ammount of correct answers
    React.useEffect(() => {
        setTotalPoints(questionsData.reduce((total, question) => (total + question.point), 0))
    }, [questionsData])

    function handleClick() {
        setIsChecking(prevState => !prevState)
    }
    
    return (
        <div className="questions-screen">
            {questionsComponents}
            <div className="bottom-section">
                {isChecking && <span>You scored {totalPoints}/5 correct answers</span>}
                <button className="btn btn-small hvr-wobble-horizontal" onClick={handleClick}>{isChecking ? "Play again" : "Check answers"}</button>
            </div>         
        </div>
    )
}