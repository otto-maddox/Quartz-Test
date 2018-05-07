import React, { Component } from 'react';

class SubmitQuiz extends Component {
	get renderClasses() {
		const animate = this.props.correctCount !== null ? 'active freeze' : this.props.questionIndex <= this.props.userAnswerLength ? 'active' : this.props.questionIndex == this.props.userAnswerLength + 1 ? 'next' : '';

		return `Quiz-submit ${animate}`;
	}

	render() {
		return (
  <div className={this.renderClasses}>
  <div className="quiz-section-holder">
      <p className="Quiz-question-text">
            Submit your quiz and see how you did!
					</p>
      <button onClick={e => this.props.quizSubmitted(e)} className="Quiz-submit-button">Submit</button>
				</div>
			</div>
		);
	}
}

export default SubmitQuiz;
