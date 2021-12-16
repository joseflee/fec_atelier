import React from 'react';
import QuestionSearch from '../subcomponents/QuestionsAndAnswers/QuestionSearch.jsx';
import QuestionCard from '../subcomponents/QuestionsAndAnswers/QuestionCard.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <h4>Questions And Answers</h4>
        <QuestionSearch />
        <QuestionCard />
      </div>
    )
  }
}

export default QuestionsAndAnswers;