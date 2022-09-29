import React from "react";


const numbersAndSymbols = ["AC","/","*",7,8,9, "-",4,5,6,"+",1,2,3,  "=",0,"."] 
let arrayNumber = []
let arrayNumberAndSigns = [] //este se puede usar en vez del otro, revisar 
let newArrayStrings = []

class CalculatorComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayNumClicked: "",
      displayNumAndOperations: ""
    }
    this.handleNumberClick = this.handleNumberClick.bind(this)
    this.addNumberToArray = this.addNumberToArray.bind(this)
    this.addNumberAndOperationsToArray = this.addNumberAndOperationsToArray.bind(this)
    this.makeOperation = this.makeOperation.bind(this)
    this.organizeInformation = this.organizeInformation.bind(this)
  }

  handleNumberClick(e){

    let textDisplay = ""
    let event = e.target.innerHTML 
    this.addNumberAndOperationsToArray(event)
    
    if(event === 'AC'){
      textDisplay = ''
      arrayNumber = []
    } else if(Number(event)){
      let numClicked = Number(event)
      let number = this.addNumberToArray(numClicked)
      number = number.join('')
      textDisplay = number    
    } else if (event === '='){
      textDisplay = this.makeOperation(newArrayStrings)
    } else {
      textDisplay = event
      arrayNumber = []
    }

    this.setState({
      displayNumClicked: textDisplay
    })
  }

  addNumberToArray(numClicked){
    arrayNumber.push(numClicked)
    return arrayNumber
  }

  addNumberAndOperationsToArray(event){

    if(event !== "AC"){
      arrayNumberAndSigns.push(event)
    } else {
      arrayNumberAndSigns = []
    }

    this.setState({
      displayNumAndOperations: arrayNumberAndSigns.join("")
    })
    this.organizeInformation(arrayNumberAndSigns)
  }

  organizeInformation(arrayNumberAndSigns){
    let operationSign = null

    newArrayStrings = [...arrayNumberAndSigns]
    newArrayStrings = newArrayStrings.join('').split(/\D/)

    if(newArrayStrings.length > 1){
      let symbol = arrayNumberAndSigns.join('').match(/\D/)
      operationSign = symbol[0]
    }

    for(let counter = 0; counter < newArrayStrings.length; counter++){

      newArrayStrings[counter] = Number(newArrayStrings[counter])

      if(counter % 2 === 1){
        //el problema esta aca
        newArrayStrings[counter + 1] = newArrayStrings[counter]
        newArrayStrings[counter] = operationSign
      }
    }
    
  }

  makeOperation(newArrayStrings){
    let result = null

    for(let counter2 = 0; counter2 < newArrayStrings.length; counter2++){

      let element = newArrayStrings[counter2]

      if(element === '+'){
        let addition = newArrayStrings[counter2 - 1] + newArrayStrings[counter2 + 1]
        result = addition
      }

      if(element === '-'){
        let subtraction = newArrayStrings[counter2 - 1] - newArrayStrings[counter2 + 1]
        result = subtraction
      }

      if(element === '*'){
        let multiplication = newArrayStrings[counter2 - 1] * newArrayStrings[counter2 + 1]
        result = multiplication
      } 

      if(element === '/') {
        let division = newArrayStrings[counter2 - 1] / newArrayStrings[counter2 + 1]
        result = division
      }
    }

    let resultDisplay 

    if(result !== null){
      resultDisplay = arrayNumberAndSigns.join("").concat(result)
    }

    this.setState({
      displayNumAndOperations: resultDisplay
    })

    return result
  }
  

  render() {

    const {displayNumClicked, displayNumAndOperations} = this.state

    const items = numbersAndSymbols.map((element, index) => {
      return <div key={index} className={`element-${index} element`} onClick={this.handleNumberClick}>{element}</div>
    });

    return (
      <div className="calculator-container">
        <div className="display-operation">{displayNumAndOperations}</div>
        <div className="display-number">{displayNumClicked}</div>
        <div className="num-container">{items}</div>
      </div>
    );
  }
}

export default CalculatorComponent;
