import React from "react";

class CalculatorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.addNumberElements = this.addNumberElements.bind(this);
  }

  addNumberElements() {
    for (let counter = 0; counter < 10; counter++) {
      return <div className={`element- ${counter}`}>{counter}</div>;
    }
  }

  render() {
    const addNumber = this.addNumberElements();

    return (
      <div className="calculator-container">
        <div className="num-container">{addNumber}</div>
      </div>
    );
  }
}

export default CalculatorComponent;
