import React, { Component } from 'react';
import Mine from '@/pages/mine';

class Home extends Component {
  state = {
    title: 12,
    name: 23
  };

  handleClick = (): void => {
    const b: P = {
      name: 123
    };
    const a = 23;
    if (a === 23) {
      this.setState({ title: 88, ...b });
    }
  };

  render(): JSX.Element {
    const { title, name } = this.state;
    return (
      <section>
        <div onClick={this.handleClick}>{title}</div>
        <div>{name}</div>
        <Mine />
      </section>
    );
  }
}
export default Home;
