import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";

import SearchBox from "../components/SearchBox";
import ErrorBoundry from "../components/ErrorBoundry";
import Scroll from "../components/Scroll";
import { setSearchField } from "../actions";

import "./app.css";

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: e => dispatch(setSearchField(e.target.value))
  };
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      kittys: []
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ kittys: users }));
  }

  render() {
    const { kittys } = this.state;
    const { searchField, onSearchChange } = this.props;
    const findMatches = (wordToMatch, kittys) => {
      return kittys.filter(kittys => {
        const regex = new RegExp(wordToMatch, "gi");
        return (
          kittys.name.match(regex) ||
          kittys.address.city.match(regex) ||
          kittys.email.match(regex)
        );
      });
    };
    const filteredKittys = findMatches(searchField, kittys);

    return !kittys.length ? (
      <h1 className="tc">Loading Kittens</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">Kitty Social</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList kittys={filteredKittys} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
