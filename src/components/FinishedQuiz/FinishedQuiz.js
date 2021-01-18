import React from 'react'
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                <li>
                    <strong>1. </strong>
                    How are you
                    <i className={'fa fa-times ' + classes.error}/>
                </li>
                <li>
                    <strong>1. </strong>
                    How are you
                    <i className={'fa fa-check ' + classes.success}/>
                </li>
            </ul>
            <p>Right answers 4 / 10</p>
            <div>
                <button>Retry</button>
            </div>
        </div>
    )
}

export default FinishedQuiz