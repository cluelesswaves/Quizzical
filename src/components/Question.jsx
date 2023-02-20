import React from "react"
import Option from "./Option.jsx"
import {nanoid} from "nanoid"


export default function Question(props) {
    const optionsArray = []
    // Put option objects into array
    props.incorrectAnswers.forEach(answer => optionsArray.push({isCorrect: false, isChecked: false, value: answer, id: nanoid()}))
    optionsArray.push({isCorrect: true, isChecked: false, value: props.correctAnswer, id: nanoid()})
    // Replace with correct symbols
    for (let i = 0; i < optionsArray.length; i++) {
        optionsArray[i].value = optionsArray[i].value.replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'").replace(/&amp;/g, "&")
                .replace(/&eacute;/g, "é").replace(/&Eacute;/g, "É")
    }
    //Sort array in alphabetic order 
    optionsArray.sort((a,b) => a.value.localeCompare(b.value))
    
    const [optionsState, setOptionsState] = React.useState(optionsArray)

    // Handle click for option button
    function handleClick(id) {
        if (props.isChecking === false) {
            setOptionsState(prevState => {
                return prevState.map(option => (
                    {...option, 
                    isChecked: id === option.id ? !option.isChecked : false}
                    ))
            })
        }
   

    }

    // Check if clicked option is correct and pass data to parent component
    React.useEffect(() => {
        const hasPoint = optionsState.filter(option => option.isChecked && option.isCorrect).length === 1
        props.countPoint(props.question, hasPoint ? 1 : 0)
    },[optionsState])
    
    // Create options components
    const optionsComponents = optionsState.map(option => (
        <Option 
            key={option.id}
            id={option.id}
            isCorrect={option.isCorrect} 
            isChecked={option.isChecked}
            isChecking={props.isChecking}
            value={option.value}
            handleClick={() => handleClick(option.id)}
        />)
    )
    
    return (
        <div className="question">
            <h3 className="question-title">{props.question.replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'").replace(/&amp;/g, "&")
                .replace(/&eacute;/g, "é").replace(/&Eacute;/g, "É")}</h3>
            <div className="choices-container">
                {optionsComponents}
            </div>         
        </div>
    )
}