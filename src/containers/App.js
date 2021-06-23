import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField } from '../actions';

function App(props) {
  const [robots, setRobots] = useState([])
  const { searchField, onSearchChange } = props;

  useEffect(() => {
    fetch('https://jsonplaceholder.cypress.io/users')
      .then(response => response.json())
      .then(users => {setRobots(users)});
  }, [])

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  })
  return (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
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

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);