import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuizQuestion from './QuizQuestion';
import SubmitQuiz from './SubmitQuiz';
import FinalDisplay from './FinalDisplay';

class QuizScroll extends Component {
	constructor(props) {
		super(props);
		this.stepRef = [];
	}

	componentDidMount(prevProps) {
		this.node = ReactDOM.findDOMNode(this);
		this.node.scrollTop = this.props.scrollTop;
	}

	componentDidUpdate(prevProps) {
		this.node.scrollTop = this.props.scrollTop;
	}

	render() {
		const questionsLength = this.props.questions.length;
		const userAnswersLength = this.props.userAnswers.length;

		return (
      <div className="Quiz-questions-holder">
        {
          this.props.questions.map((item, index) => {
            const answer = index < userAnswersLength ? this.props.userAnswers[index] : null;
            return (
              <QuizQuestion
                {...item}
                key={ index }
                userAnswerLength={ userAnswersLength }
                questionAnswered={ this.props.quizQuestionAnswered }
                questionValue={ answer }
                questionIndex={ index }
                ref={(node) => { this.stepRef[index] = node; }}
                correctCount={ this.props.correctCount } />
            );
          })
        }
        <SubmitQuiz
          ref={(node) => { this.stepRef[questionsLength] = node; }}
          userAnswerLength={ this.props.userAnswers.length }
          questionIndex={ questionsLength }
          quizSubmitted={ this.props.quizSubmitted }
          correctCount={ this.props.correctCount } />
        <FinalDisplay
          ref={(node) => { this.stepRef[questionsLength + 1] = node; }}
          userAnswerLength={ this.props.userAnswers.length }
          questionIndex={ questionsLength + 1 }
          correctCount={ this.props.correctCount }
          resetQuiz={ this.props.resetQuiz } />
			</div>
		);
	}
}

export default QuizScroll;
