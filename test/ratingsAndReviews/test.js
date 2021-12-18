import React from 'react';
import Enzyme from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { expect } from 'chai';
import RatingsAndReviews from '../../components/RatingsAndReviews.jsx';
import sinon from 'sinon';



Enzyme.configure({ adapter: new Adapter() });


var container;

describe("Ratings and Reviews", () => {

  it("Ratings and Reviews renders successfully", () => {
    const wrapper = shallow(<RatingsAndReviews/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it("Ratings and Reviews runs component did mount", () => {
    const log = sinon.spy(console, 'log');
    const wrapper = shallow(<RatingsAndReviews/>);
    if (!log.calledOnceWith('component did mount')) {
      throw new Error('component did not mount');
    }
  });

})