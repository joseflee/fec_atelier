import React from 'react';
import QuestionItem from './QuestionItem.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.data.results.map((question, key) => {
          return <QuestionItem question={question} key={key} />
        })}
      </div>
    )
  }
}

export default QuestionList;