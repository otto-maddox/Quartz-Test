import React, { Component } from 'react';

class FinalDisplay extends Component {
	get renderClasses() {
		const animate = this.props.correctCount !== null ? 'active' : this.props.questionIndex == this.props.userAnswerLength + 1 ? 'next' : this.props.questionIndex < this.props.userAnswerLength ? 'active' : '';

		return `Quiz-final ${animate}`;
	}

	render() {
		return (
  <div className={this.renderClasses}>
  <div className="quiz-section-holder">
      <p className="Quiz-question-text">
            You got <span>{this.props.correctCount}</span> questions right!
					</p>
      <button onClick={e => this.props.resetQuiz(e)} className="Quiz-reset-button">Try again?</button>
				</div>
			</div>
		);
	}
}

export default FinalDisplay;
