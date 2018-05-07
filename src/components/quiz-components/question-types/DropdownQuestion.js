import React, { Component } from 'react';

class DropdownQuestion extends Component {
	render() {
		const questionValue = this.props.questionValue == null ? 'NOSELECT' : this.props.questionValue;

		return (
  <div className="Quiz-question-options-holder">
  <select className="Quiz-question-options-dropdown" value={questionValue} onChange={e => this.props.questionAnswered(e, this.props.questionIndex, e.target.value)} >
      <option value="NOSELECT">--- Select ---</option>
      {
						this.props.questionOptions.map((item, index) => (
							<option key={`selectOption${index}`} value={index}>{item.label}</option>
						))
					}
				</select>
			</div>
		);
	}
}

export default DropdownQuestion;
