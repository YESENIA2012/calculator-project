import React from "react";
import numbersAndSymbols from "./arrayData"

class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayNumClicked: "",
      displayNumAndOperations: ""
    }
    this.handleElementsClick = this.handleElementsClick.bind(this)
    this.arrayNumberAndSigns = [] 
    this.arrayNumber = []
    this.newArrayStrings = []
  }

  handleElementsClick(e){
    let textDisplay = ""
    let buttonClicked = e.target.innerHTML 
    this.addNumberAndOperationsToArray(buttonClicked, this.arrayNumberAndSigns)

    switch(buttonClicked){
      case 'AC':
        textDisplay = ''
        this.arrayNumber = []
        break;
      case Number(buttonClicked):
        let numClicked = Number(buttonClicked)
        let number = this.addNumberToArray(numClicked, this.arrayNumber)
        number = number.join('')
        textDisplay = number
        break;
      case '=':
        textDisplay = this.makeOperation(this.newArrayStrings)
        this.arrayNumber = []
        this.arrayNumberAndSigns = []
        break;
      default:
        textDisplay = buttonClicked
        this.arrayNumber = []
        break
    }

    this.setState({
      displayNumClicked: textDisplay
    })
  }

  addNumberToArray(numClicked, arrayNumber){
    //it adds the number I clicked to the array and displays it on the screen into display-number element 
    arrayNumber.push(numClicked)
    return arrayNumber
  }

  addNumberAndOperationsToArray(buttonClicked, arrayNumberAndSigns){
    //in this function i add all clicked numbers and signs to arrayNumberAndSigns array
    if(buttonClicked !== "AC"){
      arrayNumberAndSigns.push(buttonClicked)
    } else {
      arrayNumberAndSigns = []
    }

    this.setState({
      displayNumAndOperations: arrayNumberAndSigns.join("")
    })
    this.organizeInformation(arrayNumberAndSigns)
  }

  organizeInformation(arrayNumberAndSigns ){
    this.newArrayStrings = [...arrayNumberAndSigns]

    for(let counter = 0; counter < this.newArrayStrings.length; counter++){

      let currentSymbol = this.newArrayStrings[counter]
      let nextSymbol = this.newArrayStrings[counter + 1]
  
      if((Number(currentSymbol) &&  Number(nextSymbol)) || (nextSymbol === '0')){
        this.newArrayStrings[counter] = currentSymbol + nextSymbol
        nextSymbol = this.newArrayStrings[counter + 2]
      }
    }
  }

  makeOperation(newArrayStrings){
    let newArrayNumbersAndSigns = [newArrayStrings[0]]

    for(let counter = 1; counter < newArrayStrings.length; counter++){
      let element = newArrayStrings[counter]
      
      if((element !== newArrayStrings[counter - 1])){
        newArrayNumbersAndSigns.push(element)
      }
    }

    for(let counter = 0; counter < newArrayNumbersAndSigns.length; counter++){
  
      if(counter % 2 === 0){
        newArrayNumbersAndSigns[counter] = Number(newArrayNumbersAndSigns[counter])
      }
    }

    let result = newArrayNumbersAndSigns[0]

    for(let counter2 = 0; counter2 < newArrayNumbersAndSigns.length; counter2++){

      if(counter2 % 2 === 1){
        
        if(newArrayNumbersAndSigns[counter2] === '+'){
          result = result + newArrayNumbersAndSigns[counter2 + 1]
        }
        if(newArrayNumbersAndSigns[counter2] === '-'){
          result = result - newArrayNumbersAndSigns[counter2 + 1]
        }
        if(newArrayNumbersAndSigns[counter2] === '*'){
          result = result * newArrayNumbersAndSigns[counter2 + 1]
        }
        if (newArrayNumbersAndSigns[counter2] === '/'){
          result = result / newArrayNumbersAndSigns[counter2 + 1]
        }
      }
    }
  
    let resultDisplay 

    if(result !== null){
      resultDisplay = this.arrayNumberAndSigns.join("").concat(result)
    }

    this.setState({
      displayNumAndOperations: resultDisplay
    })

    return result
  }
  
  render() {
    const {displayNumClicked, displayNumAndOperations} = this.state

    const items = numbersAndSymbols.map((element, index) => {
      return <div key={index} className={`element-${index} element`} onClick={this.handleElementsClick}>{element}</div>
    });

    return (
    <div className="body-container">
      <div className="calculator-container">
        <div className="display-operation">{displayNumAndOperations}</div>
        <div className="display-number">{displayNumClicked}</div>
        <div className="num-container">{items}</div>
      </div>
    </div>
    );
  }
}

export default Calculator;
