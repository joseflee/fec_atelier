import React from 'react';
import { FaSistrix } from 'react-icons/fa';



class Search extends React.Component {

  // props.handleSearch

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    }

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.submitSearch = this.submitSearch.bind(this);

  }

  updateSearchTerm(e) {

    var value = e.target.value;
    this.setState({
      ...this.state,
      searchTerm: value
    })

  }

  submitSearch() {
    var searchValue = this.state.searchTerm;
    this.props.handleSearch(searchValue);
  }

  render() {
    return (

      <form className={'search'} name={'search'}>
        <label htmlFor={'search'}><span id={'invisibleSearch'}>Search</span>
          <input type={'text'} name={'search'} onChange={this.updateSearchTerm} className={'searchInput'}></input>
        </label>
        <FaSistrix className={'searchIcon'} onClick={this.submitSearch} />
      </form>

    )
  }

}

export default Search;