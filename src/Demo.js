import React, { useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(1);
  const [counter2, setCounter2] = useState(0);
  console.log("App render");
  return (
    <div>
      <h1 style={{ color: "green" }} onClick={() => setCounter((x) => x + 1)}>
        {counter}
      </h1>
      <h1 style={{ color: "red" }}>
        <button onClick={() => setCounter2((x) => x - 1)}>-</button>
        {counter2}
        <button onClick={() => setCounter2((x) => x + 1)}>+</button>
      </h1>
      {counter2 < 0 && <Inner counter={counter} />}
    </div>
  );
}

class Inner extends React.Component {
  constructor(props) {
    super();
    this.state = {
      counter: props.counter,
      text: "",
    };

    this.divRef = React.createRef();
  }

  fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.counter}/`)
      .then((resp) => resp.json())
      .then((data) => data.name)
      .then(console.log);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      counter: props.counter,
    };
  }

  // shouldComponentUpdate(nextProps) {
  //   console.log("shouldComponentUpdate", nextProps, this.props);
  //   return nextProps.counter !== this.props.counter;
  // }

  resizeHandler = () => {
    this.setState({
      background:
        "#" +
        Math.floor(0x1000000 * Math.random())
          .toString(16)
          .padStart(6, 0),
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);

    console.log("componentDidMount", this.divRef);
    this.fetchPokemon();
    console.log("cdm", this.shouldComponentUpdate);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    window.removeEventListener("resize", this.resizeHandler);
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate");
    if (prevProps.counter !== this.props.counter) {
      this.fetchPokemon();
    }
  }

  render() {
    console.log("Inner render");
    console.log("divref", this.divRef);

    return (
      <div ref={this.divRef} style={{ background: this.state.background }}>
        <p>Counter: {this.state.counter}</p>
        <p>Text: {this.state.text}</p>
        <input onChange={(e) => this.setState({ text: e.target.value })} />
      </div>
    );
  }
}
