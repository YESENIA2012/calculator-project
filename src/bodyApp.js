import React from "react";
import CalculatorComponent from "./calculator";

class BodyContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="body-container">
        Yesenia
        <CalculatorComponent />
      </div>
    );
  }
}

export default BodyContainer;
