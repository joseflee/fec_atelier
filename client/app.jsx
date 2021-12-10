import React from 'react';
import ReactDOM from 'react-dom';
import Overview from '../components/Overview.jsx';
import QuestionsAndAnswers from '../components/QuestionsAndAnswers.jsx';
import RatingsAndReviews from '../components/RatingsAndReviews.jsx';
import RelatedItems from '../components/RelatedItems.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <div>ATELIER</div>
        <Overview />
        <RelatedItems />
        <QuestionsAndAnswers />
        <RatingsAndReviews />
      </div>
    )

  }


}

export default App;