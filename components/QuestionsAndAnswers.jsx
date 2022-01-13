import React from 'react';
import QuestionSearch from '../subcomponents/questionsAndAnswers/QuestionSearch.jsx';
import QuestionList from '../subcomponents/questionsAndAnswers/QuestionList.jsx';
import sampleData from '../database/questionsAndAnswers';
import AddQuestion from '../subcomponents/questionsAndAnswers/AddQuestion.jsx';
import MoreQuestions from '../subcomponents/questionsAndAnswers/MoreQuestions.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>Questions And Answers</h4>
        <QuestionSearch />
        <QuestionList data={sampleData}/>
        <MoreQuestions />
        <AddQuestion />
      </div>
    )
  }
}

export default QuestionsAndAnswers;
