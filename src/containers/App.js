import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";

import SearchBox from "../components/SearchBox";
import ErrorBoundry from "../components/ErrorBoundry";
import Scroll from "../components/Scroll";
import { setSearchField, requestKittys } from "../actions";

import "./app.css";

const mapStateToProps = state => {
  return {
    searchField: state.searchKittys.searchField,
    kittys: state.requestKittys.kittys,
    isPending: state.requestKittys.isPending,
    error: state.requestKittys.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: e => dispatch(setSearchField(e.target.value)),
    onRequestKittys: () => dispatch(requestKittys())
  };
};

class App extends Component {
  componentDidMount() {
    this.props.onRequestKittys();
  }

  render() {
    const { searchField, onSearchChange, kittys, isPending } = this.props;
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

    return isPending ? (
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
