import React from 'react';
import QuestionAnswerItem from './QuestionAnswerItem.jsx';

class QuestionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {}
    }
  }
  componentDidMount() {
    var oneAnswer = Object.values(this.props.question.answers)[0];
    this.setState({
      answers: oneAnswer
    })
  }
  render() {
    return (
      <div className='questionItem' >
        <div className='question'> Q: {this.props.question.question_body}</div>
        {
          Object.values(this.state).map((answer, key) => {
            return <QuestionAnswerItem answer={answer} key={key} />
          })
        }
        <div>Helpful?
          <div className='yesButton'>Yes({this.props.question.question_helpfulness}) </div>
        </div>
      </div>
    )
  }
}

export default QuestionItem;