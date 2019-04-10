import React, { Component } from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";
import Scroll from "./Scroll";

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
    const filteredKittys = findMatches(
      this.state.searchfield,
      this.state.kittys
    );

    if (this.state.kittys.length === 0) {
      return <h1 className="tc">Loading Kittens</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">Kitty Social</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList kittys={filteredKittys} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
