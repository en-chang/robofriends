import React, { useEffect } from 'react';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import ErrorBoundry from '../components/ErrorBoundry';
import './MainPage.css';

function MainPage(props) {
  const { onRequestRobots, robots, isPending, searchField, onSearchChange } = props;

  useEffect(() => {
    onRequestRobots();
  }, [onRequestRobots])

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  })
  return (
    <div className='tc'>
      <Header title={'Robofriends'} />
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

export default MainPage;