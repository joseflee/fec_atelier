
import React from 'react';
import Enzyme from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { expect } from 'chai';
import sinon from 'sinon';

import Overview from '../../components/Overview.jsx';
import AddToCart from '../../subcomponents/overview/AddToCart.jsx';
import ImageGallery from '../../subcomponents/overview/ImageGallery.jsx';
import ProductInfo from '../../subcomponents/overview/ProductInfo.jsx';
import StyleSelector from '../../subcomponents/overview/StyleSelector.jsx';
import Style from '../../subcomponents/overview/Style.jsx';

import mockProduct from '../../mock_api/mock_product.js';
import mockStyles from '../../mock_api/mock_styles.js';

Enzyme.configure({ adapter: new Adapter() });


test('Overview renders properly', () => {
    const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
    expect(wrapper.find('div')).to.have.length(1);
});

test("Add To Cart renders successfully", () => {
      const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
      expect(wrapper.find(AddToCart)).to.have.length(1);
});

test("Image Gallery renders successfully", () => {
      const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
      expect(wrapper.find(ImageGallery)).to.have.length(1);
});

test("Style Selector renders successfully", () => {
      const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
      expect(wrapper.find(StyleSelector)).to.have.length(1);
});

test("Product Info renders successfully", () => {
      const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
      expect(wrapper.find(ProductInfo)).to.have.length(1);
});

describe('full DOM test', () => {

  it('renders child components', () => {
    const wrapper = mount(<Overview product={mockProduct} styles={mockStyles}/>);
    expect(wrapper.find(AddToCart).length).to.equal(1);
    expect(wrapper.find(ProductInfo).length).to.equal(1);
    expect(wrapper.find(StyleSelector).length).to.equal(1);
    expect(wrapper.find(ImageGallery).length).to.equal(1);
    expect(wrapper.find(Style).length).to.equal(1);
  })

})





