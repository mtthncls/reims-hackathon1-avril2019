import React, { Component } from 'react';
import DisplayEggs from "./DisplayEggs";
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Ia from './Components/Ia';


class App extends Component {
  constructor() {
    super()
    this.state= {
          charactersRandomizedFromApi : [],
          eggsRandomizedFromApi : [],
          IAHitpoints : "20",
          userHitpoints : "20",
          selectedEggs: [],
          userCharacter : [],
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

  
  throwEggsToIA = () => {
      const farminglevel = this.state.eggsRandomizedFromApi[0].farming;
      const hitpoints = this.state.userHitpoints;
      this.setState({userHitpoints : hitpoints - farminglevel})
    }

  throwEggsToUser = () => {
    const farminglevel = this.state.eggsRandomizedFromApi[1].farming;
    const hitpoints = this.state.IAHitpoints;
    this.setState({IAHitpoints : hitpoints - farminglevel})
  };

  updateArray = (egg) => {
    this.setState(function (prevState) {
      return {
        selectedEggs: this.state.selectedEggs.length === 0 ?
          [egg] : [...prevState.selectedEggs, egg],
    };
    }
  )};

  render() {
    return (
      <div className="App battleField">
      <Container fluid>
        <Row> 
          <Col xs={2}>
            <div className="user1 d-flex align-items-center bg-dark"> 
              {this.state.charactersRandomizedFromApi.length === 0 ? <p>Wait</p> 
              : <Ia hitMethod ={() => this.throwEggsToIA()} IAHitpoints = {this.state.IAHitpoints} 
                IAName={this.state.charactersRandomizedFromApi[0]}/>};

              <Col xs={2}>
                <div>
                  {this.state.selectedEggs.map(selectedEgg => <DisplayEggs egg ={selectedEgg}/>)}
                </div>
              </Col>

            </div>
          </Col>

          <Col offset={6}/>

          <Col xs={2}>
            <div className="user2 d-flex align-items-center bg-dark">{this.state.charactersRandomizedFromApi.length === 0 ? <p>Wait</p> 
            : <Ia hitMethod ={() => this.throwEggsToUser()} IAHitpoints = {this.state.userHitpoints} IAName={this.state.charactersRandomizedFromApi[1]}/>} </div></Col>

        </Row>
      </Container>

      <Container>
        <Row>
          {this.state.eggsRandomizedFromApi.length === 0 ? <p>loading</p> : this.state.eggsRandomizedFromApi.map(egg => <DisplayEggs eggsCardSelected={this.eggsCardSelected} key={egg.id} egg={egg} selectedEggs={this.updateArray} />) 
            }
        </Row>
      </Container>
      </div>
    );
  }
  }
  
  export default App;
