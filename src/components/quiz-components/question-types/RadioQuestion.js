import React, { Component } from 'react';

class RadioQuestion extends Component {
	render() {
		return (
      <div className="Quiz-question-options-holder">
      {
        this.props.questionOptions.map((item, index) => (
          <div key={`selectOption${index}`} className="Quiz-question-options-radio">
            <label className="Quiz-question-options-radio-label">
              <input type="radio" value={index} name={this.props.questionIndex} checked={this.props.questionValue == index} onChange={e => this.props.questionAnswered(e, this.props.questionIndex, e.target.value)} />
              {item.label}
            </label>
          </div>
        ))
      }
      </div>
		);
	}
}

export default RadioQuestion;
