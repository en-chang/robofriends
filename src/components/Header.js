import React from 'react';

class Header extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return <h1 className='f1'>{this.props.title}</h1>
  }
}

export default Header;