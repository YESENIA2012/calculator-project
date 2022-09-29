import React from "react";
import CalculatorComponent from "./calculator";

class BodyContainer extends React.Component {


  render() {
    return (
      <div className="body-container">
        <CalculatorComponent />
      </div>
    );
  }
}

export default BodyContainer;
