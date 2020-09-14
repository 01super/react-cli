import React, { Component } from 'react';

class Home extends Component {
  state = {
    title: 12
  };

  handleClick = (): void => {
    const a = 23;
    if (a === 23) {
      this.setState({ title: 88 });
    }
  };

  render(): JSX.Element {
    const { title } = this.state;
    return <div onClick={this.handleClick}>{title}</div>;
  }
}
export default Home;
