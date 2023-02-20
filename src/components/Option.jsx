import React from "react"

export default function Option(props) {
    let style = {}
    if (props.isChecking) {
        if (props.isCorrect) {
            style = {background: "#94D7A2", border: "none", cursor: "not-allowed"}
        } else if (props.isChecked && !props.isCorrect) {
            style = {background: "#F8BCBC", border: "none", color: "#9ca1b9", cursor: "not-allowed"}
        } else {
            style = {color: "#9ca1b9", cursor: "not-allowed"}
        }
    } else {
        style = props.isChecked ? {background: "#D6DBF5", border: "none"} : {}
    }
    
    return <button className="btn-choice" style={style} onClick={props.handleClick}>{props.value}</button>
}