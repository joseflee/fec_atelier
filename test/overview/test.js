import { expect } from 'chai';
//import { mount } from 'enyzme';
import React from 'react';
import Overview from '../../components/Overview.jsx';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

//configure({ adapter: new Adapter() });

var container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("app component test", () => {

  // it("Renders successfully", () => {
  //   act(() => {
  //     ReactDOM.render(overview, container);
  //   });
  //   expect(document.getElementsByClassName('overview')).to.exist;
  // })

})