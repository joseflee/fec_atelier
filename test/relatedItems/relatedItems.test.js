import React from 'react';
import Enzyme from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
//import { expect } from 'chai';
import RelatedItems from '../../components/RelatedItems.jsx';
import { ProductCard } from '../../subcomponents/relatedItems/ProductCard.jsx';
import { AddToOutfitCard } from '../../subcomponents/relatedItems/AddToOutfitCard.jsx';
import { OutfitCard } from '../../subcomponents/relatedItems/OutfitCard.jsx';
import { OutfitList } from '../../subcomponents/relatedItems/OutfitList.jsx';
import { RelatedProductList } from '../../subcomponents/relatedItems/RelatedProductList.jsx';
import { Stars } from '../../subcomponents/relatedItems/StarRating.jsx';
import { ComparisonModal } from '../../subcomponents/relatedItems/ComparisonModal.jsx';

Enzyme.configure( { adapter: new Adapter() } );



describe( "RelatedItems", () => {

  test( "relatedItems renders", () => {
    const wrapper = shallow( <RelatedItems /> );
    expect( wrapper.find( 'div' ) ).toHaveLength( 1 );
  });

  test( "ProductCard should have a star rating", () => {
    const props = {
      clickCard: () => {},
      clickStar: () => {},
      itemInfo: {
        results: [
          {
            photos: [
              {
                url: ''
              }
            ]
          }
        ]
      }
    }
    const wrapper = shallow( <ProductCard { ...props } />);
    expect( wrapper.find( Stars ) ).toHaveLength( 1 );
  });

  test( "ProductCard should have a div with className RIprice", () => {
    const props = {
      clickCard: () => {},
      clickStar: () => {},
      itemInfo: {
        results: [
          {
            photos: [
              {
                url: ''
              }
            ]
          }
        ]
      }
    }
    const wrapper = shallow( <ProductCard { ...props } />);
    expect( wrapper.find( '.RIprice' ) ).toHaveLength( 1 );
  });

  test("ProductCard should have a div with className cardImage", () => {
    const props = {
      clickCard: () => {},
      clickStar: () => {},
      itemInfo: {
        results: [
          {
            photos: [
              {
                url: ''
              }
            ]
          }
        ]
      }
    }
    const wrapper = shallow( <ProductCard { ...props } />);
    expect( wrapper.find( '.cardImage' ) ).toHaveLength( 1 );
  });





  test("OutfitCard should have a star rating", () => {
    const props = {
      add: () => {},
      itemInfo: {id: '', results: [{photos: [{url: ''}]}]}
    };
    const wrapper = shallow(<OutfitCard {...props} />);
    expect(wrapper.find(Stars)).toHaveLength(1);
  });

  test("OutfitList should render", () => {
    const wrapper = shallow(<RelatedItems />);
    expect(wrapper.find(OutfitList)).toHaveLength(1);
  });

  test("RelatedProductList should render", () => {
    const wrapper = shallow(<RelatedItems />);
    expect(wrapper.find(RelatedProductList)).toHaveLength(1);
  });

  // test("AddToOutfitCard should render", () => {
  //   const wrapper = shallow(<RelatedItems />);
  //   expect(wrapper.find(OutfitList).dive().find(AddToOutfitCard)).toHaveLength(1);
  // });

  test("AddToOutfitCard should renders", () => {
    const props = {
      outfits: [],
      add: () => {},
      remove: () => {},
      right: () => {},
      left: () => {},
    }
    const wrapper = shallow(<OutfitList {...props}/>);
    expect(wrapper.find(AddToOutfitCard)).toHaveLength(1);
  });

  test("OutfitList should have a title of Your Outfit", () => {

    const wrapper = shallow(<OutfitList outfits={[]} />);
    const h3 = wrapper.find('h3');
    const result = h3.text();
    expect(result).toBe('Your Outfit');
  });

  test("RelatedProductList should have a ProductCard", () => {
    const props = {
      all: []
    }
    const wrapper = shallow(<RelatedProductList {...props}/>);
    expect(wrapper.find(ProductCard)).toHaveLength(1);

  });


  test("ComparisonModal component should have a table", () => {
    const props = {
      all: [],
      name: {features: []},
      relatedFeatures: {features: [], value: ''}
    }
    const wrapper = shallow(<ComparisonModal {...props}/>);
    expect(wrapper.find('table')).toHaveLength(1);

  })

  const mockItem = {
    "id": 59553,
    "campus": "hr-rpp",
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140.00",
  }

  describe("props passed down", () => {

    const props1 = {outfits: [], all: [], mockItem: mockItem};

    it("accepts props", () => {
      const wrapper = mount( <RelatedItems {...props1}/> );
      expect( wrapper.instance().props.mockItem ).toEqual( mockItem );
    });

    it("Clicking on the card should call handleRelatedCardClick", () => {
      const spy = jest.fn();
      const props = {
        itemInfo: {
          results: [
            {
              photos: [
                {
                  url: ''
                }
              ]
            }
          ]
        },
      }
      const wrapper = mount( <ProductCard clickCard={spy}  {...props}/> );
      wrapper.find('.card').simulate('click');
      expect(spy).toHaveBeenCalled();
    })

    it("Clicking on the star should call handleRelatedStarClick", () => {
      const spy = jest.fn();
      const props = {
        itemInfo: {
          results: [ { photos: [ { url: '' } ] } ]
        },
      }
      const wrapper = mount( <ProductCard clickStar={spy} {...props} /> );
      wrapper.find('BiStar').simulate('click');
      expect(spy).toHaveBeenCalled();
    })

    it("Changes state if the star is clicked", () => {

      const propsForCard = {
        itemInfo: {
          results: [ { photos: [ { url: '' } ] } ]
        },
      };
      const propsForModal = {
        relatedFeatures: { features:[], name: 'Camo' },
        name: { features: [], name: 'Camo'},
      }
      const parentWrapper = mount( <RelatedItems { ...props1 }/> );
      const spy = jest.spyOn( parentWrapper.instance(), 'handleRelatedStarClick' );
      const spy2 = jest.spyOn( parentWrapper.instance(), 'closeModal' );
      const childWrapper = mount( <ProductCard clickStar={ spy } { ...propsForCard } /> );
      const modalWrapper = mount( <ComparisonModal close={ spy2 } { ...propsForModal } /> );
      expect( parentWrapper.state().modal ).toEqual( false );
      childWrapper.find( 'BiStar' ).simulate( 'click' );
      expect( parentWrapper.state().modal ).toEqual( true );
      modalWrapper.find( '.comparisonModal' ).simulate( 'click' );
      expect( parentWrapper.state().modal ).toEqual( false );
    })
  })

})