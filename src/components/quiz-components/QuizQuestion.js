import React, { Component } from 'react';
import RadioQuestion from './question-types/RadioQuestion';
import DropdownQuestion from './question-types/DropdownQuestion';

class QuizQuestion extends Component {
	get renderClasses() {
		const animate = this.props.correctCount !== null ? 'active freeze' : this.props.questionIndex <= this.props.userAnswerLength ? 'active' : this.props.questionIndex == this.props.userAnswerLength + 1 ? 'next' : '';

		return `Quiz-question ${animate}`;
	}

	render() {
		const optionRender = this.props.type === 'radio' ? (
      <RadioQuestion questionOptions={this.props.options} questionValue={this.props.questionValue} questionAnswered={this.props.questionAnswered} questionIndex={this.props.questionIndex} />
		) : (
      <DropdownQuestion questionOptions={this.props.options} questionValue={this.props.questionValue} questionAnswered={this.props.questionAnswered} questionIndex={this.props.questionIndex} />
		);

		return (
      <div ref={(node) => { this.fadeIn = node; }} className={this.renderClasses}>
        <div className="Quiz-section-holder">
          <h3 className="Quiz-question-title">
            {this.props.title}
          </h3>
          <p className="Quiz-question-text">
            {this.props.text}
          </p>
          {optionRender}
				</div>
			</div>
		);
	}
}

export default QuizQuestion;
