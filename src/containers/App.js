import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import ErrorBoundry from "../components/ErrorBoundry";
import Scroll from "../components/Scroll";

import "./app.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      kittys: [],
      searchfield: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ kittys: users }));
  }

  onSearchChange = e => {
    this.setState({ searchfield: e.target.value });
  };

  render() {
    const { kittys, searchfield } = this.state;
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
    const filteredKittys = findMatches(searchfield, kittys);

    return !kittys.length ? (
      <h1 className="tc">Loading Kittens</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">Kitty Social</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList kittys={filteredKittys} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
