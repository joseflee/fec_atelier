import React from 'react';
import Enzyme from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { expect } from 'chai';
import sinon from 'sinon';

import App from '../../client/app.jsx';
import Overview from '../../components/Overview.jsx';
import AddToCart from '../../subcomponents/overview/AddToCart.jsx';
import ImageGallery from '../../subcomponents/overview/ImageGallery.jsx';
import ProductInfo from '../../subcomponents/overview/ProductInfo.jsx';
import StyleSelector from '../../subcomponents/overview/StyleSelector.jsx';

import mockProduct from '../../mock_api/mock_product.js';
import mockStyles from '../../mock_api/mock_styles.js';



Enzyme.configure({ adapter: new Adapter() });


var container;

describe("Overview", () => {

  it("Overview renders successfully", () => {
    const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it("Overview runs component did mount", () => {
    const log = sinon.spy(console, 'log');
    const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
    if (!log.calledOnceWith('component did mount')) {
      throw new Error('component did not mount');
    }
  });

})

describe("Add To Cart", () => {

  it("Add To Cart renders successfully", () => {
    const wrapper = mount(<App />);
    console.log('this is the wrapper', wrapper)
    //expect(wrapper.find('div')).to.have.length(1);
  });

})

// describe("Image Gallery", () => {

//   it("ImageGallery renders successfully", () => {
//     const wrapper = shallow(<ImageGallery />);
//     expect(wrapper.find('div')).to.have.length(1);
//   });

// })

// describe("Product Info", () => {

//   it("ProductInfo renders successfully", () => {
//     const wrapper = shallow(<ProductInfo />);
//     expect(wrapper.find('div')).to.have.length(1);
//   });

// })

// describe("Style Selector", () => {

//   it("StyleSelector renders successfully", () => {
//     const wrapper = shallow(<StyleSelector />);
//     expect(wrapper.find('div')).to.have.length(1);
//   });

// })