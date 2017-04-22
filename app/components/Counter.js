// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import './Counter.css';

class Counter extends Component {
  props: {
    increment: () => void,
    incrementIfOdd: () => void,
    incrementAsync: () => void,
    decrement: () => void,
    counter: number
  };

  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <div>
        <div data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={`counter`} data-tid="counter">
          {counter}
        </div>
        <div>
          <button onClick={increment} data-tclass="btn">
            <i className="fa fa-plus" />
          </button>
          <button onClick={decrement} data-tclass="btn">
            <i className="fa fa-minus" />
          </button>
          <button onClick={incrementIfOdd} data-tclass="btn">odd</button>
          <button onClick={() => incrementAsync()} data-tclass="btn">async</button>
        </div>
      </div>
    );
  }
}

export default Counter;
