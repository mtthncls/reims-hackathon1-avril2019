import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Ia from './Components/Ia';


class App extends Component {
  constructor() {
    super()
    this.state = {
      charactersRandomizedFromApi: [],
      eggsRandomizedFromApi: []
    }
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
        this.setState({ eggsRandomizedFromApi: eggsToDisplay })

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
        this.setState({ charactersRandomizedFromApi: charsToDisplay })
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
        <div className="battleField">
          <Container fluid>
            <Row>
              <Col xs={2}><div className="user1 d-flex align-items-center bg-dark"> {this.state.charactersRandomizedFromApi.length === 0 ? <p>Wait</p> : <Ia IAName={this.state.charactersRandomizedFromApi} />}</div></Col>
              <Col offset={8}></Col>
              <Col xs={2}><div className="user2 d-flex align-items-center bg-dark">{this.state.charactersRandomizedFromApi.length === 0 ? <p>Wait</p> : <Ia IAName={this.state.charactersRandomizedFromApi} />}</div></Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
