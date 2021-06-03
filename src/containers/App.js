import React from 'react';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import ErrorBoundry from '../components/ErrorBoundry';
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
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        {!robots.length
          ? <h1>Loading</h1>
          : <Scroll>
              <ErrorBoundry>
                <CardList robots={filteredRobots} />
              </ErrorBoundry>
            </Scroll>
        }
      </div>
    );
  }
}

export default App;