import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      index: 0,
      wpm: 50,
    };

    this.text = "Эти методы не являются частью спецификации JavaScript. Но большинство сред выполнения JS-кода имеют внутренний планировщик и предоставляют доступ к этим методам. В частности, они поддерживаются во всех браузерах и Node.js.".repeat(
      1000
    );
    this.arrOfWords = this.text.split(" ");
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      play: !state.play,
    }));
  }
  handleKeyPress(event) {
    if (event.key === "ArrowUp") {
      clearTimeout(this.timerId);
      this.setState({
        wpm: this.state.wpm + 50,
      });
    }
    if (event.key === "ArrowDown" && this.state.wpm > 50) {
      clearTimeout(this.timerId);
      this.setState({
        wpm: this.state.wpm - 50,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.play === true) {
      window.addEventListener("keydown", this.handleKeyPress);
      console.log("true");
      this.timerId = setTimeout(() => this.nextIndex(), 60000 / this.state.wpm);
      console.log(this.state.wpm);
    }
  }

  componentWillUnmount() {
    if (this.state.play === false) {
      window.removeEventListener("keydown", this.handleKeyPress);
      clearTimeout(this.timerID);
    }
  }

  nextIndex() {
    this.setState({
      index: this.state.index + 1,
    });
  }
  render() {
    return (
      <div className="menu">
        <button type="button" className="Begin" onClick={this.handleClick}>
          {this.state.play ? "Остановить" : "Начать"}
        </button>
        <div className="Words">{this.arrOfWords[this.state.index]}</div>
      </div>
    );
  }
}
export default App;
