import React, { Component } from 'react';
import Mine from '@/pages/mine';

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
    return (
      <section>
        <div onClick={this.handleClick}>{title}</div>
        <Mine />
      </section>
    );
  }
}
export default Home;
