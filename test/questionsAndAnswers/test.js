import React from 'react';
import Enzyme from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { expect } from 'chai';
import QuestionsAndAnswers from '../../components/QuestionsAndAnswers.jsx';
import sinon from 'sinon';



Enzyme.configure({ adapter: new Adapter() });


var container;

describe("Question and Answers", () => {

  it("Question and Answers renders successfully", () => {
    const wrapper = shallow(<QuestionsAndAnswers/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

})