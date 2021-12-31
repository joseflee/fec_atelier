import React from 'react';
import Enzyme from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { expect } from 'chai';
import RelatedItems from '../../components/RelatedItems.jsx';
import sinon from 'sinon';
import {ProductCard} from '../../subcomponents/relatedItems/ProductCard.jsx';



Enzyme.configure({ adapter: new Adapter() });


var container;

describe("RelatedItems", () => {

  it("Related Items renders successfully", () => {
    const wrapper = shallow(<RelatedItems/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it("Should have a button", () => {
    const props = {
      clickCard: () => {},
      clickStar: () => {},
      itemInfo: {
        picture: {}, category: {}, price: {}, rating: {}
      }

    }
    const wrapp = shallow(<ProductCard {...props}/>);
    expect(wrapp.find('button')).to.have.length(1);
  });


  // it("Overview runs component did mount", () => {
  //   const log = sinon.spy(console, 'log');
  //   const wrapper = shallow(<Overview/>);
  //   if (!log.calledOnceWith('component did mount')) {
  //     throw new Error('component did not mount');
  //   }
  // });

})