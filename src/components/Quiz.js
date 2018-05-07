import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuizInstructions from './quiz-components/QuizInstructions';
import QuizScroll from './quiz-components/QuizScroll';
import {Motion, spring} from 'react-motion';

class Quiz extends Component {

  constructor( props ) {
    super( props );
    this.urls = ["http://localhost:9000/Constants.json", "http://localhost:9000/Constants2.json"];
    this.state = {
      error: null,
      isLoaded: false,
      questions: [],
      answers : [],
      userAnswers : [],
      correctCount : null,
      scrollTop : 0
    }
  }
  
  quizQuestionAnswered = (e, index, value) => {
    if(value !== "NOSELECT" && index <= this.state.userAnswers.length + 1){
      const newUserAnswers = this.state.userAnswers.slice(0);
      newUserAnswers[index] = value;
      const nextQuestionElem = this.nextQuestion(this.state.userAnswers.length);
      this.setState({
        userAnswers : newUserAnswers,
        scrollTop : nextQuestionElem.offsetTop
      })
    }
  }
  
  quizSubmitted = (e) => {
    
    const answers = this.state.answers.map((item, index) => {
      return (item == this.state.userAnswers[index])
    })
    const correctCounting = answers.filter((obj) => obj === true).length;
    const nextQuestionElem = this.nextQuestion(this.state.userAnswers.length + 1);
    this.setState({
      correctCount : correctCounting,
      scrollTop : nextQuestionElem.offsetTop
    })
  }
  
  nextQuestion = (i) => {
    const nextQuestionRef = this.questionScroll.stepRef[this.state.userAnswers.length + 1];
    return ReactDOM.findDOMNode(nextQuestionRef);
    
  }
  
  quizReset = (e) => {
    this.setState({
      scrollTop : 0
    })
  }
  
  quizResetCallback = () => {
    if(this.state.scrollTop === 0){
      this.quizInfo();
    }
  }
  
  componentDidMount() {
    this.quizInfo();
  }
  
  quizInfo = () => {
    fetch(this.urls[Math.floor(Math.random()*this.urls.length)])
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            questions: result.content,
            answers: result.answers,
            userAnswers : [],
            correctCount : null
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  render() {
  
    if (this.state.error) {
      return <div className="Quiz-holder message">Error: {this.state.error.message}</div>;
    }
    if (!this.state.isLoaded) {
      return <div className="Quiz-holder message">Loading...</div>;
    }
    return (
      <div className="Quiz-holder">
        <QuizInstructions />
        <Motion ref={(node) => { this.questionsHolder = node; }} style={{ scrollTop: spring(this.state.scrollTop)}} onRest={this.quizResetCallback}>
          {currentStyles => {
            return <QuizScroll
              ref={(node) => { this.questionScroll = node; }}
              questions={ this.state.questions }
              userAnswers={ this.state.userAnswers }
              quizQuestionAnswered={ this.quizQuestionAnswered }
              quizSubmitted={ this.quizSubmitted }
              scrollTop={ currentStyles.scrollTop }
              correctCount={ this.state.correctCount }
              resetQuiz={ this.quizReset } />
              
          }}
        </Motion>
      </div>
    );
  }
}

export default Quiz;
