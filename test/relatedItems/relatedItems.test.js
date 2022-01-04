import React from 'react';
import Enzyme from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { expect } from 'chai';
import RelatedItems from '../../components/RelatedItems.jsx';
import sinon from 'sinon';
import {ProductCard} from '../../subcomponents/relatedItems/ProductCard.jsx';
import {AddToOutfitCard} from '../../subcomponents/relatedItems/AddToOutfitCard.jsx';
import {OutfitCard} from '../../subcomponents/relatedItems/OutfitCard.jsx';
import {OutfitList} from '../../subcomponents/relatedItems/OutfitList.jsx';
import {RelatedProductList} from '../../subcomponents/relatedItems/RelatedProductList.jsx';


Enzyme.configure({ adapter: new Adapter() });



describe("RelatedItems", () => {

  test("relatedItems renders", () => {
    const wraper = shallow(<RelatedItems />);
    expect(wraper.find('div')).to.have.length(1);
  });

  test("ProductCard should have a button", () => {
    const props = {
      clickCard: () => {},
      clickStar: () => {},
      itemInfo: {
        category: {}, price: {}, rating: {}
      }
    }
    const wrapper = shallow(<ProductCard {...props}/>);
    expect(wrapper.find('button')).to.have.length(1);
  });

  test("OutfitCard should have a button", () => {
    const props = {
      add: () => {}
    };
    const wrapper = shallow(<OutfitCard {...props} />);
    expect(wrapper.find('button')).to.have.length(1);
  });

  test("OutfitList should render", () => {
    const wrapper = shallow(<RelatedItems />);
    expect(wrapper.find(OutfitList)).to.have.length(1);
  });

  test("RelatedProductList should render", () => {
    const wrapper = shallow(<RelatedItems />);
    expect(wrapper.find(RelatedProductList)).to.have.length(1);
  });

  test("AddToOutfitCard should render", () => {
    const wrapper = shallow(<RelatedItems />);
    expect(wrapper.find(OutfitList).dive().find(AddToOutfitCard)).to.have.length(1);
  })
})