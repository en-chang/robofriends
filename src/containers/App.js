import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { requestRobots, setSearchField } from '../actions';

function App(props) {
  const { onRequestRobots, robots, isPending, searchField, onSearchChange } = props;

  useEffect(() => {
    onRequestRobots();
  }, [onRequestRobots])

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  })
  return (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      {isPending
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
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
    searchField: state.searchRobots.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestRobots: () => dispatch(requestRobots()),
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);