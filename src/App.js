import React from 'react';
import SearchBox from './SearchBox';
import CardList from './CardList';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.cypress.io/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users}));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }
  
  render() {
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        {this.state.robots.length === 0
          ? <h1>Loading</h1>
          : <CardList robots={filteredRobots} />
        }
      </div>
    );
  }
}

export default App;