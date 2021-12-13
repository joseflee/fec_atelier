import React from 'react';
import Enzyme from 'enzyme';
import { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { expect } from 'chai';
import Overview from '../../components/Overview.jsx';




Enzyme.configure({ adapter: new Adapter() });

//configure({ adapter: new Adapter() });

var container;

// beforeEach(() => {
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   document.body.removeChild(container);
//   container = null;
// });

describe("app component test", () => {

  it("Renders successfully", () => {
    const wrapper = shallow(<Overview/>);
    expect(wrapper.find('div')).to.have.length(1);
  })

})