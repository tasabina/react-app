import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results:{},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'What color of the sky',
                rightAnswerId: 2,
                id:1,
                answers: [
                    {text: 'Black', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'Red', id: 3},
                    {text: 'Green', id: 4}
                ]
            },
            {
                question: 'What color of the sun',
                rightAnswerId: 1,
                id:2,
                answers: [
                    {text: 'Yellow', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'Green', id: 3},
                    {text: 'Red', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if(question.rightAnswerId === answerId) {

            if(!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {
                    [answerId] : 'success'
                },
                results
            })
            const timeout = window.setTimeout(()=>{
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                    console.log(this.state)
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {
                    [answerId] : 'error'
                },
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length ? true : false
    }

    retryHandler = () => {
        this.setState({
            activeQuestion:0,
            answerState:null,
            isFinished: false,
            results: {}
        })
    }

    componentDidMount() {
        console.log('Quiz ID', this.props.match.params.id);
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Quiz</h1>

                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        : <ActiveQuiz
                            answers={ this.state.quiz[this.state.activeQuestion].answers }
                            question={ this.state.quiz[this.state.activeQuestion].question }
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                            onAnswerClick = {this.onAnswerClickHandler}
                        />
                    }
                </div>
            </div>
        )
    }
}
export default Quiz