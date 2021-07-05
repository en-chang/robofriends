import React from 'react';
import { connect } from 'react-redux';
import { requestRobots, setSearchField } from '../actions';
import MainPage from '../components/MainPage';

function App(props) {
  return (
    <MainPage { ...props } />
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