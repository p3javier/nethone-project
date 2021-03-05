/*
  Below you will find exemplary component that does nothing until window resize.
  On window resize it:
  - asynchronously fetches window dimensions,
  - informs parent about calculated total of even indexed dimensions,
  - shows multiplied entries on the screen.

  Fix errors and improve code quality (remove or add code if needed).
  Use TypeScript.
  entries are null initially until data is fetched.

  React version 17
*/

import * as React from "react";

type Props = {
  multiplier?: number;
  onNewTotal: (total: number) => void;
};

type State = {
  isVisible: boolean;
  entries: number[];
};

class MultiplierComponent extends React.PureComponent<Props, State> {
  state: State = {
    isVisible: false,
    entries: null,
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize());
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.multiplier !== nextProps.multiplier) {
      this.notify(nextProps.multiplier);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.multiplier !== this.props.multiplier ||
      nextProps.onNewTotal !== this.props.onNewTotal ||
      nextState.entries !== this.state.entries
    );
  }

  onResize() {
    this.setState({ isVisible: true });
    this.fetch();
  }
  async fetch() {
    const entries = this.loadData();
    this.setState({ entries: entries });
    this.notify();
  }
  loadData(): Promise<number[]> {
    return new Promise((resolve) =>
      window.setTimeout(
        () =>
          resolve([
            window.innerWidth,
            window.innerHeight,
            window.outerWidth,
            window.outerHeight,
            window.screen.width,
          ]),
        1500
      )
    );
  }
  notify(multiplier = this.props.multiplier) {
    const totalEven = 0;
    for (i = 0; i < this.state.entries.length; i++) {
      if (i % 2 === 0) {
        totalEven += this.state.entries[i] * multiplier;
      }
    }

    this.props.onNewTotal(totalEven);
  }

  render() {
    const entries = this.state.entries;
    const isVisible = this.state.isVisible;

    if (isVisible === false) {
      return <div>Resize window to see make component visible!</div>;
    }

    return (
      <div>
        <p>
          Multiplied entries:
          <ul>
            {entries.forEach((entry) => (
              <li>{entry * this.props.multiplier}</li>
            ))}
          </ul>
        </p>
        <span>Window width = {entries[0]}</span>
      </div>
    );
  }
}

export default MultiplierComponent;
