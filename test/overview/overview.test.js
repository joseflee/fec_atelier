import 'regenerator-runtime/runtime';
import React from 'react';
import Enzyme from 'enzyme';
//import { mount, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
//import { expect } from 'chai';
//import sinon from 'sinon';

// React App Tests additions
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import camoOnesie from '../../mock_api/mockCamoOnesie';
import camoOnesieStyles from '../../mock_api/mockCamoOnesieStyles';
import camoOnesieStyleNames from '../../mock_api/camoOnesieStyleNames'

import App from '../../client/App.jsx';
import Overview from '../../components/Overview.jsx';
import AddToCart from '../../subcomponents/overview/AddToCart.jsx';
import ImageGallery from '../../subcomponents/overview/ImageGallery.jsx';
import ImageInsert from '../../subcomponents/overview/ImageInsert.jsx';
import ProductInfo from '../../subcomponents/overview/ProductInfo.jsx';
import StyleSelector from '../../subcomponents/overview/StyleSelector.jsx';
import Style from '../../subcomponents/overview/Style.jsx';

import mockProduct from '../../mock_api/mock_product.js';
import mockStyles from '../../mock_api/mock_styles.js';

//Enzyme.configure({ adapter: new Adapter() });

var addToCart_state = {

            product: camoOnesie,
            styles: camoOnesieStyles,
            selectedStyle: 0

}


const server = setupServer(
      rest.get('/products/59553', (req, res, ctx) => {
            return res(ctx.json({ result: camoOnesie }))
      }),

      rest.get('/styles/59553', (req, res, ctx) => {
            return res(ctx.json({ result: camoOnesieStyles }))
      })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('App renders', async () => {

      render(<App />)

      expect(screen.getByText('ATELIER')).toBeTruthy();

    })

test('Product info displays all text', async () => {

  render(<ProductInfo product={camoOnesie} rating={3.5} />)

  expect(screen.getByText('Camo Onesie')).toBeTruthy();
  expect(screen.getByText('Jackets')).toBeTruthy();
  expect(screen.getByText('read all reviews')).toBeTruthy();

})

test('Add to cart displays buttons', async () => {

      render(<AddToCart state={addToCart_state} />)

      expect(screen.getByText('ADD TO BAG')).toBeTruthy();
      expect(screen.getByText('SELECT SIZE')).toBeTruthy();

})

test('Image Gallery renders', async () => {

      render(<ImageGallery styleIndex={camoOnesieStyles.results[0]} styles={camoOnesieStyles} index={0} style={camoOnesieStyles.results[0]} />)

      expect(screen.getByAltText('Atelier main clothing image')).toBeTruthy();

})

test('Thumbnails render', async () => {

      render(<ImageGallery styleIndex={camoOnesieStyles.results[0]} styles={camoOnesieStyles} index={0} style={camoOnesieStyles.results[0]} />)

      expect(screen.findAllByText('Atelier image thumbnail')).toBeTruthy();

})

test('ImageInsert renders', async () => {

      render(<ImageInsert featureImage={0} selectedStyle={camoOnesieStyles.results[0]} cb={() => {}}  />)

      expect(screen.findAllByText('imageInsert')).toBeTruthy();

})






test('Style Selector renders', async () => {

      render(<StyleSelector styles={camoOnesieStyles} changeStyle={() => {}} />)

      expect(screen.getByAltText('Atelier style image')).toBeTruthy();

})

test('Style Unit renders', async () => {

      render(<Style styles={camoOnesieStyles.results} styleNames={camoOnesieStyleNames} featuredIndex={0} changeStyle={() => {}} />)

      expect(screen.getByAltText('Atelier style image')).toBeTruthy();

})



// test('Overview renders properly', () => {
//     const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
//     expect(wrapper.find('div')).to.have.length(1);
// });

// test("Add To Cart renders successfully", () => {
//       const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
//       expect(wrapper.find(AddToCart)).to.have.length(1);
// });

// test("Image Gallery renders successfully", () => {
//       const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
//       expect(wrapper.find(ImageGallery)).to.have.length(1);
// });

// test("Style Selector renders successfully", () => {
//       const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
//       expect(wrapper.find(StyleSelector)).to.have.length(1);
// });

// test("Product Info renders successfully", () => {
//       const wrapper = shallow(<Overview product={mockProduct} styles={mockStyles}/>);
//       expect(wrapper.find(ProductInfo)).to.have.length(1);
// });

// describe('full DOM test', () => {

//   it('renders child components', () => {
//     const wrapper = mount(<Overview product={mockProduct} styles={mockStyles}/>);
//     expect(wrapper.find(AddToCart).length).to.equal(1);
//     expect(wrapper.find(ProductInfo).length).to.equal(1);
//     expect(wrapper.find(StyleSelector).length).to.equal(1);
//     expect(wrapper.find(ImageGallery).length).to.equal(1);
//     expect(wrapper.find(Style).length).to.equal(1);
//   })

// })





