import React from "react";

class QuestionSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="questionSearch">
        <div>
          <input type="search" placeholder="Have A Question? Search For Answers..." ></input>
        </div>
      </div>
    )
  }
};

export default QuestionSearch;