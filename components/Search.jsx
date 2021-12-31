import React from 'react';


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

  updateSearchTerm() {

  }

  submitSearch() {

  }

  render() {
    return (

      <form className={'search'} name={'search'}>
        <input type={'text'} name={'search'} onChange={this.updateSearchTerm} className={'searchInput'}></input>
      </form>

    )
  }

}

export default Search;