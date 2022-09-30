import React from "react";
import numbersAndSymbols from "./arrayData"

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
    this.handleElementsClick = this.handleElementsClick.bind(this)
    this.addNumberToArray = this.addNumberToArray.bind(this)
    this.addNumberAndOperationsToArray = this.addNumberAndOperationsToArray.bind(this)
    this.organizeInformation = this.organizeInformation.bind(this)
    this.makeOperation = this.makeOperation.bind(this)
  }

  handleElementsClick(e){

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
      arrayNumber = []
      arrayNumberAndSigns = []
    } else {
      //aca entra cuando agrego un simbolo
      textDisplay = event
      arrayNumber = []
    }

    this.setState({
      displayNumClicked: textDisplay
    })
  }

  addNumberToArray(numClicked){
    //it adds the number I clicked to the array and displays it on the screen into display-number element 
    arrayNumber.push(numClicked)
    return arrayNumber
  }

  addNumberAndOperationsToArray(event){
    //in this function i add all clicked numbers and signs to arrayNumberAndSigns array
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
    newArrayStrings = [...arrayNumberAndSigns]

    for(let counter = 0; counter < newArrayStrings.length; counter++){
  
      if((Number(newArrayStrings[counter]) &&  Number(newArrayStrings[counter + 1])) || (newArrayStrings[counter + 1] === '0')){
        newArrayStrings[counter] = newArrayStrings[counter] + newArrayStrings[counter + 1]
        newArrayStrings[counter + 1] = newArrayStrings[counter + 2]
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

export default CalculatorComponent;
