import React, { Component } from 'react';
import DisplayEggs from "./DisplayEggs";
import { Container, Row } from 'reactstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eggs: '',
    };
  }
  
  componentDidMount() {
    fetch('http://easteregg.wildcodeschool.fr/api/eggs')
      .then(eggsFromAPI => eggsFromAPI.json())
      .then(eggsData => {
        // console.log(eggsData[0].name);
        let eggsToRandomize = this.randomizeAPIDisplay(eggsData);
        // console.log(eggsToRandomize[0].name);
        let eggsToDisplay = this.selectNumberOfDisplay(eggsToRandomize, 30)
        console.log(eggsToDisplay)
        this.setState({eggs: eggsToDisplay})
      }
      );
  
    fetch('http://easteregg.wildcodeschool.fr/api/characters')
      .then(charsFromAPI => charsFromAPI.json())
      .then(charsData => {
        // console.log(charsData[0].name);
        let charsToRandomize = this.randomizeAPIDisplay(charsData);
        // console.log(charsToRandomize[0].name);
        let charsToDisplay = this.selectNumberOfDisplay(charsToRandomize, 10)
        console.log(charsToDisplay)
      }
      );
  };
  randomizeAPIDisplay = (apiResponse) => {
    let currentIndex = apiResponse.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = apiResponse[currentIndex];
      apiResponse[currentIndex] = apiResponse[randomIndex];
      apiResponse[randomIndex] = temporaryValue;
    };
    return apiResponse
  };
  
  selectNumberOfDisplay = (apiRandomizedResponse, displayNumber) => {
    let selectedDisplays = []
    for (let i = 0; i < displayNumber; i++) {
      selectedDisplays.push(apiRandomizedResponse[i])
    }
    return selectedDisplays
  }
  
  
  
    render() {
      return (
        <div className="App">
        <Container>
            <Row >
          {this.state.eggs.length === 0 ? <p>loading</p> : this.state.eggs.map(egg => <DisplayEggs key={egg.id} eggs={egg} />) 
          }
          </Row>
        </Container>
        </div>
      );
    }
  }
  
  export default App;
