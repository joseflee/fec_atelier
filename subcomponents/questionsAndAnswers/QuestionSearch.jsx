import React from 'react';

class QuestionSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
        <div>
          <input type="search" placeholder="Have A Question? Search For Answers..." id="search" ></input>
        </div>
    )
  }
};

export default QuestionSearch;